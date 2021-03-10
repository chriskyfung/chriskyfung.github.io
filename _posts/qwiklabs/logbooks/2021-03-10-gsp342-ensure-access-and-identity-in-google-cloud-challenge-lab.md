---
layout: post
title: "☁ Ensure Access & Identity in Google Cloud: Challenge Lab | logbook"
date: 2021-03-03 11:40 +0800
category: Cloud
author: chris
tags: [Qwiklabs, Google Cloud, Logbook]
permalink: /blog/qwiklabs/ensure-access-and-identity-in-google-cloud-challenge-lab
redirect_from:
   - /blog/qwiklabs/GSP342
image:
   path: /images/posts/qwiklabs/gsp342-cover.png
excerpt: A brief procedure for the Google self-paced lab GSP342 on Qwiklabs. You will practice the skills for
amp:
   youtube: true
css:
   syntax: true
   custom: >
      .ml-li { margin-left: 2rem; }
      .tips-card { padding: 1rem; background-color: gold; }
---

# GSP342 Ensure Access & Identity in Google Cloud: Challenge Lab

## Prep

Set a zone
[Set default region and zone in your local client  \|  Compute Engine Documentation](https://cloud.google.com/compute/docs/gcloud-compute#set_default_zone_and_region_in_your_local_client)

```bash
gcloud config set compute/zone us-east1-b

```

## Task 1: Create a custom security role.

**Hints:**
- [GSP190 IAM Custom Roles \| Qwiklabs](https://www.qwiklabs.com/focuses/1035?parent=catalog)
- [Creating a custom role \| Cloud IAM Documentation](https://cloud.google.com/iam/docs/creating-custom-roles#creating_a_custom_role)
role name
- [gcloud iam roles create  \|  Cloud SDK Documentation](https://cloud.google.com/sdk/gcloud/reference/iam/roles/create)

`orca_storage_update`

#### To create a custom role using a YAML file

Create a YAML file that contains the definition for your custom role.

```bash
nano role-definition.yaml

```

```yaml
title: "Edirca Storage Update"
description: "Add and update objects in Google Cloud Storage buckets"
includedPermissions:
- storage.buckets.get
- storage.objects.get
- storage.objects.list
- storage.objects.update
- storage.objects.create

````


```bash
gcloud iam roles create ediorca_storage_update \
  --project $DEVSHELL_PROJECT_ID \
  --file role-definition.yaml


```


## Task 2: Create a service account.

**Hints:**
- [GSP199 Service Accounts and Roles: Fundamentals \| Qwiklabs](https://google.qwiklabs.com/focuses/1038?parent=catalog)
- [Creating a service account \| Cloud IAM Documentation](https://cloud.google.com/iam/docs/creating-managing-service-accounts#creating)
- [gcloud iam service-accounts create  \|  Cloud SDK Documentation](https://cloud.google.com/sdk/gcloud/reference/iam/service-accounts/create)

orca-private-cluster-sa

```bash
gcloud iam service-accounts create orca-private-cluster-sa \
  --display-name "Orca Private Cluster Service Account"

```

## Task 3: Bind a custom security role to a service account.

**Hints:**
- __Same as above__
- [gcloud projects add-iam-policy-binding  \|  Cloud SDK Documentation](https://cloud.google.com/sdk/gcloud/reference/projects/add-iam-policy-binding)

```bash
gcloud projects add-iam-policy-binding $DEVSHELL_PROJECT_ID \
    --member serviceAccount:orca-private-cluster-sa@$DEVSHELL_PROJECT_ID.iam.gserviceaccount.com --role roles/monitoring.viewer

gcloud projects add-iam-policy-binding $DEVSHELL_PROJECT_ID \
    --member serviceAccount:orca-private-cluster-sa@$DEVSHELL_PROJECT_ID.iam.gserviceaccount.com --role roles/monitoring.metricWriter

gcloud projects add-iam-policy-binding $DEVSHELL_PROJECT_ID \
    --member serviceAccount:orca-private-cluster-sa@$DEVSHELL_PROJECT_ID.iam.gserviceaccount.com --role roles/logging.logWriter

gcloud projects add-iam-policy-binding $DEVSHELL_PROJECT_ID \
    --member serviceAccount:orca-private-cluster-sa@$DEVSHELL_PROJECT_ID.iam.gserviceaccount.com --role projects/$DEVSHELL_PROJECT_ID/roles/ediorca_storage_update

```

## Task 4: Create and configure a new Kubernetes Engine private cluster

The cluster must be called `orca-test-cluster`
The cluster must be deployed to the subnet `orca-build-subnet`
The cluster must be configured to use the `orca-private-cluster-sa` service account.
The private cluster options `enable-master-authorized-networks`, `enable-ip-alias`, `enable-private-nodes`, and `enable-private-endpoint` must be enabled.

**Hints:**
- [GSP178 Setting up a Private Kubernetes Cluster \| Qwiklabs ](https://www.qwiklabs.com/focuses/867?parent=catalog)
- [gcloud container clusters create  \|  Cloud SDK Documentation](https://cloud.google.com/sdk/gcloud/reference/container/clusters/create)
- [Locating IP addresses for an instance  \|  Compute Engine Documentation](https://cloud.google.com/compute/docs/instances/view-ip-address)

```bash
JUMPHOST_IP=$(gcloud compute instances describe orca-jumphost \
  --format='get(networkInterfaces[0].networkIP)')

gcloud beta container clusters create orca-test-cluster \
    --network orca-build-vpc
    --subnetwork orca-build-subnet \
    --service-account=SERVICE_ACCOUNT orca-private-cluster-sa@$DEVSHELL_PROJECT_ID.iam.gserviceaccount.com \
    --enable-master-authorized-networks $JUMPHOST_IP/32 \
    --master-authorized-networks \
    --enable-private-nodes \
    --master-ipv4-cidr 10.142.0.0/28
    --enable-ip-alias \
    --enable-private-endpoint

```

## Task 5: Deploy an application to a private Kubernetes Engine cluster

**Hints:**
- [Using kubectl expose to create a Service \| Kubernetes Engine Documentation](https://cloud.google.com/kubernetes-engine/docs/how-to/exposing-apps#using_kubectl_expose_to_create_a_service)

```bash
gcloud container clusters get-credentials orca-test-cluster --internal-ip

kubectl create deployment hello-server --image=gcr.io/google-samples/hello-app:1.0

kubectl get pods

kubectl expose deployment hello-server --name orca-hello-service \
    --type LoadBalancer --port 80 --target-port 8080

```

## Tips and Tricks

## Congratulations!