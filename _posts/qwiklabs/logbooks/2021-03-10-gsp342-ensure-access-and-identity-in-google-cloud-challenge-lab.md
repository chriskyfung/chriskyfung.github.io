---
layout: post
title: "☁ Ensure Access & Identity in Google Cloud: Challenge Lab | logbook"
date: 2021-03-12 11:45 +0800
category: Cloud
author: chris
tags: [Qwiklabs, Google Cloud, Logbook, Kubernetes, Secure VPC]
permalink: /blog/qwiklabs/ensure-access-and-identity-in-google-cloud-challenge-lab
redirect_from:
   - /blog/qwiklabs/GSP342
   - /blog/qwiklabs/gsp342
image:
   path: /images/posts/qwiklabs/gsp342-cover.png
excerpt: A brief procedure for the Google Cloud self-paced training GSP342 on Qwiklabs. You will practice the skills in binding IAM security roles to a service account and create a private Kubernetes Engine cluster on Google Cloud Platform.
amp:
   youtube: true
css:
   syntax: true
   custom: >
      .ml-li { margin-left: 2rem; }
---

In this article, we will go through the lab **GSP342** _[Ensure Access & Identity in Google Cloud: Challenge Lab](https://www.qwiklabs.com/focuses/14572?parent=catalog)_, which is an [advanced-level](https://www.qwiklabs.com/quests/150) exercise on Qwiklabs. You will practice the following topics:

- Create a custom security role.
- Create a service account.
- Bind IAM security roles to a service account.
- Create a private Kubernetes Engine cluster in a custom subnet.
- Deploy an application to a private Kubernetes Engine cluster.

## Task 0: Prep

Before stepping inside the main tasks, I suggest you conduct the following preparations.

### 🔍 Inspect provisioned resources

1. In the Cloud Console, navigate to **Compute Engine** > **VM instances**.
2. Click the name of the instance called `orca-jumphost` to view the detail page.
3. Scroll to the **Network interfaces** section, click on the network called `orca-build-vpc`.
4. Find out the region of the `orca-build-vpc` subnet.

### 📍 Set a zone

In the example video, the lab provision created the subnet to the region `us-east1`. Later on, we will need to deploy a Kubernetes cluster to the subnet. To ensure they are in the same region, run the following to configure the default zone (e.g. `us-east1-b`) in the Cloud Shell:

```bash
gcloud config set compute/zone us-east1-b
```

**Useful documentation**: [_Set default region and zone in your local client_  \|  Compute Engine Documentation](https://cloud.google.com/compute/docs/gcloud-compute#set_default_zone_and_region_in_your_local_client)

## Task 1: Create a custom security role

You will create a new custom IAM security role called `orca_storage_update` in this task. The custom role needs to include the permissions necessary to add and update objects in Google Cloud Storage buckets.

**Hints:** Review the lab **GSP190** [_IAM Custom Roles_](https://www.qwiklabs.com/focuses/1035?parent=catalog) on Qwiklabs. You can also read [_Creating a custom role_](https://cloud.google.com/iam/docs/creating-custom-roles#creating_a_custom_role) in the Cloud IAM Documentation.

The following steps show how to create a custom role using a YAML file:

1. Create a YAML file in the Cloud Shell environment.
2. Copy the following to the YAML file.

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

3. Run the following command to create the custom role using the definition in the YAML file.

   ```bash
   gcloud iam roles create orca_storage_update \
      --project $DEVSHELL_PROJECT_ID \
      --file role-definition.yaml
   ```

**Tips:** To learn more, read the details about [gcloud iam roles create](https://cloud.google.com/sdk/gcloud/reference/iam/roles/create) in the Cloud SDK Documentation.

## Task 2: Create a service account

This task only requires you to create a new service account named `orca-private-cluster-sa`.

Run the following command line in the Cloud Shell:

```bash
gcloud iam service-accounts create orca-private-cluster-sa \
   --display-name "Orca Private Cluster Service Account"
```

**Useful documentation:**

- [_GSP199 Service Accounts and Roles: Fundamentals_ \| Qwiklabs](https://google.qwiklabs.com/focuses/1038?parent=catalog)
- [_Creating a service account_ \| Cloud IAM Documentation](https://cloud.google.com/iam/docs/creating-managing-service-accounts#creating)
- [`gcloud iam service-accounts create` \| Cloud SDK Documentation](https://cloud.google.com/sdk/gcloud/reference/iam/service-accounts/create)

## Task 3: Bind a custom security role to a service account

**Tips:** Read about [`gcloud projects add-iam-policy-binding`](https://cloud.google.com/sdk/gcloud/reference/projects/add-iam-policy-binding) in the Cloud SDK Documentation.

The lab requires you to bind these three built-in roles to the service account:

- `roles/monitoring.viewer`
- `roles/monitoring.metricWriter`
- `roles/logging.logWriter`

Run the following to bind them to `orca-private-cluster-sa`:

```bash
gcloud projects add-iam-policy-binding $DEVSHELL_PROJECT_ID \
   --member serviceAccount:orca-private-cluster-sa@$DEVSHELL_PROJECT_ID.iam.gserviceaccount.com --role roles/monitoring.viewer

gcloud projects add-iam-policy-binding $DEVSHELL_PROJECT_ID \
   --member serviceAccount:orca-private-cluster-sa@$DEVSHELL_PROJECT_ID.iam.gserviceaccount.com --role roles/monitoring.metricWriter

gcloud projects add-iam-policy-binding $DEVSHELL_PROJECT_ID \
   --member serviceAccount:orca-private-cluster-sa@$DEVSHELL_PROJECT_ID.iam.gserviceaccount.com --role roles/logging.logWriter
```

Also, bind the custom role `orca_storage_update` created in Task 1 by running the following command:

```bash
gcloud projects add-iam-policy-binding $DEVSHELL_PROJECT_ID \
   --member serviceAccount:orca-private-cluster-sa@$DEVSHELL_PROJECT_ID.iam.gserviceaccount.com --role projects/$DEVSHELL_PROJECT_ID/roles/orca_storage_update
```

## Task 4: Create and configure a new Kubernetes Engine private cluster

The new Kubernetes Engine cluster needs to fulfill the following requirements:

- The cluster must be called `orca-test-cluster`
- The cluster must be deployed to the subnet `orca-build-subnet`
- The cluster must be configured to use the `orca-private-cluster-sa` service account.
- The private cluster options `enable-master-authorized-networks`, `enable-ip-alias`, `enable-private-nodes`, and `enable-private-endpoint` must be enabled.

**Hints:** Review the lab [GSP178 Setting up a Private Kubernetes Cluster](https://www.qwiklabs.com/focuses/867?parent=catalog) on Qwiklabs. If you want to practice with command-line tools, take a look at the detail about [gcloud container clusters create](https://cloud.google.com/sdk/gcloud/reference/container/clusters/create) in the Cloud SDK Documentation.

1. Navigate to **Compute Engine** in the Cloud Console, note down the **Internal IP** address of the `orca-jumphost` instance.

   Alternatively, you can use the following command to obtain the IP address:

   ```bash
   JUMPHOST_IP=$(gcloud compute instances describe orca-jumphost \
   --format='get(networkInterfaces[0].networkIP)')
   ```

   To learn more, read about [Locating IP addresses for an instance](https://cloud.google.com/compute/docs/instances/view-ip-address) in the Compute Engine Documentation.

2. Navigate to **VPC network** in the Cloud Console, note down the IP address range for the regional subnet. You may also lookup the IP range from [https://cloud.google.com/vpc/docs/vpc](https://cloud.google.com/vpc/docs/vpc). The IP address for `us-east1` is `10.142.0.0`.

   ```bash
   SUBNET_IP_RANGE="10.142.0.0/28"
   ```

3. Run the following `gcloud` command to create the cluster with the required configurations:

   ```bash
   gcloud beta container clusters create orca-test-cluster \
      --network orca-build-vpc
      --subnetwork orca-build-subnet \
      --service-account=SERVICE_ACCOUNT orca-private-cluster-sa@$DEVSHELL_PROJECT_ID.iam.gserviceaccount.com \
      --enable-master-authorized-networks $JUMPHOST_IP/32 \
      --master-authorized-networks \
      --enable-private-nodes \
      --master-ipv4-cidr $SUBNET_IP_RANGE
      --enable-ip-alias \
      --enable-private-endpoint
   ```

## Task 5: Deploy an application to a private Kubernetes Engine cluster

The last task is to deploy a simple test application `hello-server` to the Kubernetes Engine cluster. The Cloud Shell cannot directly access the private cluster. So, you have to access it via the jumphost.

1. Navigate to **Compute Engine** in the Cloud Console.
2. Click on the **SSH** button for the `orca-jumphost` instance.
3. In the SSH window, connect to the private cluster by running the following:

   ```bash
   gcloud container clusters get-credentials orca-test-cluster --internal-ip
   ```

4. Deploy the `hello-server` to the private cluster using the following `kubectl` command:

   ```bash
   kubectl create deployment hello-server --image=gcr.io/google-samples/hello-app:1.0
   ```

5. Finally, run the following to expose the application using a load balancer service with mapping from port 80 to 8080:

   ```bash
   kubectl expose deployment hello-server --name orca-hello-service \
      --type LoadBalancer --port 80 --target-port 8080
   ```

   **Useful documentation:** [_Using kubectl expose to create a Service_ \| Kubernetes Engine Documentation](https://cloud.google.com/kubernetes-engine/docs/how-to/exposing-apps#using_kubectl_expose_to_create_a_service)

<br>

**Congratulations! You completed this challenge lab.**

## Demonstration Video

{% include youtube.html id="HiFMZGDBzZo" title="GSP342 Ensure Access & Identity in Google Cloud: Challenge Lab (With Audio Instruction 🔉)" %}

```conf
00:00 Overview & Challenge scenario
00:47 Inspect provisioned resources
01:12 Set default zone according to the region of orca-build-subnet
01:26 Task1: Create a custom security role called `orca_storage_update`
02:44 Task2: Create a service account called `orca-private-cluster-sa`
03:13 Task3: Bind a custom security role to a service account
05:01 Task4: Create and configure a new Kubernetes Engine private cluster
09:07 Task5: Deploy an application to a private Kubernetes Engine cluster
```
