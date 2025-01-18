---
layout: post
title: "☁ Secure Workloads in Google Kubernetes Engine: Challenge Lab | logbook"
date: 2021-02-23 11:30 +0800
last_modified_at: 2021-06-27 15:00 +0800
categories: [Cloud]
author: chris
tags: [Qwiklabs, Google Cloud, Logbook, Kubernetes, WordPress, Secure VPC]
permalink: /blog/qwiklabs/secure-workloads-in-google-kubernetes-engine-challenge-lab
redirect_from:
   - /blog/qwiklabs/Secure-Workloads-in-Google-Kubernetes-Engine-Challenge-Lab
   - /blog/qwiklabs/GSP335
   - /blog/qwiklabs/gsp335
image:
   path: /images/posts/qwiklabs/gsp335-cover.png
excerpt: A brief procedure for the Google Cloud self-paced training GSP335 on Qwiklabs. You will practice the skills in security at scale on Google Kubernetes Engine (GKE) including how to set up HTTPS and TLS certificate with cert-manager.io, restrict access in GKE with Network Policies, use Binary Authorization for security controls of your images, and deploy PodSecurityPolicy to control access to privileged containers based on role and groups.
amp:
   youtube: true
css:
   syntax: true
   custom: >
      .ml-li { margin-left: 2rem; }
      .callout { background-color:gold; font-size: smaller; padding: 10px; }
---

In this article, we will go through the lab **GSP335** _[Secure Workloads in Google Kubernetes Engine: Challenge Lab](https://www.qwiklabs.com/focuses/13389?parent=catalog)_, which is an [advanced-level](https://www.qwiklabs.com/quests/142) exercise on Qwiklabs. You will practice the skills in security at scale on Google Kubernetes Engine (GKE) including how to set up HTTPS and TLS certificate with cert-manager.io, restrict access in GKE with Network Policies, use Binary Authorization for security controls of your images, and deploy PodSecurityPolicy to control access to privileged containers based on role and groups.

**Topics tested**:

- Enable TLS access using nginx-ingress and cert-manager.io
- Secure traffic with a network policy
- Enable Binary Authorization to ensure only approved images are deployed
- Ensure that pods do not allow escalations to root

## Your challenge

You need to secure a WordPress running on GKE that uses Cloud SQL as its database.

## Task 0: Download the necessary files

Run the following to download all the files for this lab:

```bash
gsutil -m cp gs://cloud-training/gsp335/* .
```

## Task 1: Setup Cluster

You need to create a Kubernetes cluster with the following values:

- zone: Us-central1-c
- machine-type: n1-standard-4
- number of nodes: 2
- enable network policy

Run the following `gcloud` command will create a cluster called **kraken-cluster** with the required specifications:

```bash
gcloud container clusters create kraken-cluster \
   --zone us-central1-c \
   --machine-type n1-standard-4 \
   --num-nodes 2 \
   --enable-network-policy
```

**Tips:** To learn more, open this [Cloud SDK Documentation](https://cloud.google.com/sdk/gcloud/reference/container/clusters/create "gcloud container clusters create - Cloud SDK Documentation") to study the flags for the command line.

<!-- FM:Snippet:Start data:{"id":"jekyll-capture-tags","fields":[{"name":"var","value":"tips1"},{"name":"selection","value":"**Using Cloud Console** \\\nAlternatively, you can create the cluster using the Cloud Console.\n\n   1. Click on the **Navigation Menu** > **Kubernetes Engine** > **Clusters**\n   2. Click **CREATE CLUSTER**\n   3. Set up the cluster as required. Once the cluster is created, run the following in the Cloud Shell to establish a connection:\n\n      ```bash\n      gcloud container clusters get-credentials kraken-cluster  --zone us-central1-c\n      ```"}]} -->
{% capture tips1 %}
**Using Cloud Console** \
Alternatively, you can create the cluster using the Cloud Console.

   1. Click on the **Navigation Menu** > **Kubernetes Engine** > **Clusters**
   2. Click **CREATE CLUSTER**
   3. Set up the cluster as required. Once the cluster is created, run the following in the Cloud Shell to establish a connection:

      ```bash
      gcloud container clusters get-credentials kraken-cluster  --zone us-central1-c
      ```

{% endcapture %}
<!-- FM:Snippet:End -->

{% include callout.html content=tips1 color="gold" %}

## Task 2: Setup WordPress

This task involves the following three subtasks:

- a) Setup the Cloud SQL database and database username and password
- b) Create a service account for access to your WordPress database from your WordPress instances
- c) Create the WordPress deployment and service

You can perform the first two subtasks simultaneously, while you are creating the cluster in Task 1. It usually takes more time on GCP to create a Cloud SQL instance, compared to a Kubernetes cluster. Both the Cloud SQL and the cluster will be ready when you are going to conduct the rest of the tasks.

### Setup the Cloud SQL database and database username and password

#### Create a Cloud SQL instance

You can create the Cloud SQL instance using either Cloud Console or Cloud Shell. In production, I will suggest you go for the Cloud Console because you can better look at all the configurations. But in this lab, you can simply run the following command to create a default MySQL instance in the region **us-central1**:

```bash
gcloud sql instances create kraken-cloud-sql --region us-central1
```

**Related documentation**:

- [Creating a MySQL instance \| Cloud SQL for MySQL](https://cloud.google.com/sql/docs/mysql/create-instance#create-2nd-gen)
- [gcloud compute instances create \| Cloud SDK Documentation](https://cloud.google.com/sdk/gcloud/reference/compute/instances/create)

It usually requires 5 - 10 minutes to process.

#### Create a database for WordPress

1. In the Cloud Console, click on **Navigation Menu** > **SQL**.
2. Once the Cloud SQL instance is ready, select the **Databases** tab on the left panel.
3. Click **CREATE DATABASE**.
4. Enter `wordpress` as the database name.
5. Click **Create**.

#### Create a user for accessing the Cloud SQL

1. In the **Cloud SQL** page, select the **Users** tab on the left panel.
2. Click **ADD USER ACCOUNT**.
3. Enter `wordpress` as the User name.
4. Enter a password that you can remember.
5. Select **Allow any host (%)** for the name of the Host.
6. Click **Add**.

<!-- FM:Snippet:Start data:{"id":"jekyll-capture-tags","fields":[{"name":"var","value":"tips2"},{"name":"selection","value":"**Command-line method** \\\nYou may also try using the following command line to create the database and the user:\n\n```bash\ngcloud sql databases create wordpress --instance kraken-cloud-sql --charset utf8 --collation utf8_general_ci\n\ngcloud sql users create wordpress --host % --instance kraken-cloud-sql --password Passw0rd\n```\n\n**Tips:** Read this [Cloud SQL Documentation](https://cloud.google.com/sql/docs/mysql/create-manage-databases#create \"Creating and managing MySQL databases \\| Cloud SQL for MySQL\") to learn more.  \\\n**Remark:** However, I got some feedback that it will occasionally fail to pass the checkpoint if using the command line."}]} -->
{% capture tips2 %}
**Command-line method** \
You may also try using the following command line to create the database and the user:

```bash
gcloud sql databases create wordpress --instance kraken-cloud-sql --charset utf8 --collation utf8_general_ci

gcloud sql users create wordpress --host % --instance kraken-cloud-sql --password Passw0rd
```

**Tips:** Read this [Cloud SQL Documentation](https://cloud.google.com/sql/docs/mysql/create-manage-databases#create "Creating and managing MySQL databases \| Cloud SQL for MySQL") to learn more.  \
**Remark:** However, I got some feedback that it will occasionally fail to pass the checkpoint if using the command line.
{% endcapture %}
<!-- FM:Snippet:End -->

{% include callout.html content=tips2 color="gold" %}

### Create a service account for access to your WordPress database from your WordPress instances

Now you need a service account with binding the role `roles/cloudsql.client` and save its credentials as a JSON file. In the Cloud Shell, run the following commands:

```bash
gcloud iam service-accounts create kraken-wordpress-sa

gcloud projects add-iam-policy-binding $DEVSHELL_PROJECT_ID \
   --member="serviceAccount:kraken-wordpress-sa@$DEVSHELL_PROJECT_ID.iam.gserviceaccount.com" \
   --role="roles/cloudsql.client"

gcloud iam service-accounts keys create key.json --iam-account=kraken-wordpress-sa@$DEVSHELL_PROJECT_ID.iam.gserviceaccount.com
```

**Tips:** Read [this documentation](https://cloud.google.com/docs/authentication/production#command-line "Creating a service account \| Cloud IAM Documentation") to learn more about how to authenticate an application as a service account.

After that, save the service account file as a secret in your Kubernetes cluster using the command provided in the official lab instruction.

```bash
kubectl create secret generic cloudsql-instance-credentials --from-file key.json
```

Also, the WordPress database username and password as well.

```bash
kubectl create secret generic cloudsql-db-credentials \
   --from-literal username=wordpress \
   --from-literal password='Passw0rd'
```

### Create the WordPress deployment and service

Run the following to create a persistent volume for your WordPress application:

```bash
kubectl create -f volume.yaml
```

Go to the overview page of your Cloud SQL instance, and copy the **Connection name** as shown below.

{% include picture.html img="/qwiklabs/gsp335-task2-copy-sql-connection-name.jpg" width="881" height="448" alt="Copy the Connection name of Cloud SQL instance from the overview page" %}

Open `wordpress.yaml` with your favorite editor, and replace **INSTANCE_CONNECTION_NAME** (in line 61) with the Connection name of your Cloud SQL instance.

{% include picture.html img="/qwiklabs/gsp335-task2-edit-wordpress-yaml.png" width="796" height="231" alt="Lines 54 to 65 in wordpress.yaml" %}

Save the file changes, and run the following to apply the file to create the WordPress environment in the cluster.

```bash
kubectl apply -f wordpress.yaml
```

To verify the deployment, navigate to the Kubernetes Engine page in the Cloud Console. Now you should see `wordpress` in the Workloads tab as well as the Services tab.

## Task 3: Setup Ingress with TLS

**Tips:** Review the lab **GSP181** [NGINX Ingress Controller on Google Kubernetes Engine](https://www.qwiklabs.com/focuses/872?parent=catalog "Qwiklabs") on Qwiklabs before you start doing Task 3. For more information, you may read the community tutorial [Ingress with NGINX controller on Google Kubernetes Engine](https://cloud.google.com/community/tutorials/nginx-ingress-gke) on the Google Cloud's website.

In this challenge lab, please note that you have to install the same `nginx-ingress` version, which is used in lab GSP181. Otherwise, you will not able to create `nginx-ingress-controller` for continuing the lab.

### Set up nginx-ingress environment

The nginx-ingress will be installed using Helm. A recent, stable version of Helm should be pre-installed on your Cloud Shell. Run `helm version` to check which version you are using and also ensure that Helm is installed:

```bash
helm version
```

Run the following to add the chart repository and ensure the chart list is up to date:

```bash
helm repo add stable https://charts.helm.sh/stable
helm repo update
```

<!-- FM:Snippet:Start data:{"id":"jekyll-capture-tags","fields":[{"name":"var","value":"tips-install-helm"},{"name":"selection","value":"**Install Helm**\n\nIf your environment does not install with Helm, you can run the following to [automatically grab the latest version of Helm and install it locally](https://helm.sh/docs/intro/install/#from-script).\n\n```bash\ncurl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3\nchmod 700 get_helm.sh\n./get_helm.sh\n```"}]} -->
{% capture tips-install-helm %}
**Install Helm**

If your environment does not install with Helm, you can run the following to [automatically grab the latest version of Helm and install it locally](https://helm.sh/docs/intro/install/#from-script).

```bash
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh
```

{% endcapture %}
<!-- FM:Snippet:End -->

{% include callout.html content=tips-install-helm color="gold" %}

Go ahead and use the following `helm` command to install stable nginx-ingress:

```bash
helm install nginx-ingress stable/nginx-ingress --set rbac.create=true
```

Wait until the load balancer gets deployed and exposes an external IP. You get to monitor the `nginx-ingress-controller` service by running the following command:

```bash
kubectl get service nginx-ingress-controller -w
```

### Set up your DNS record

Once the service obtained an external IP address, press **Ctrl + C** to stop the previous command. You can now continue to set up your DNS record.

A shell script called `add_ip.sh` is provided, and you have downloaded it to the Cloud Shell at the beginning of the lab. Execute it by running this command:

```bash
. add_ip.sh
```

### Set up cert-manager.io

You can find the [official installation guide for Kubernetes](https://cert-manager.io/docs/installation/kubernetes/#installing-with-regular-manifests) from the cert-manager website.

Run the following commands to deploy the cert-manager:

```bash
kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.2.0/cert-manager.yaml

kubectl create clusterrolebinding cluster-admin-binding \
   --clusterrole=cluster-admin \
   --user=$(gcloud config get-value core/account)
```

Navigate to the Kubernetes Engine page in the Cloud Console, now you should have the workloads look like this:

{% include picture.html img="/qwiklabs/gsp335-task3-deployed-workloads.png" width="1046" height="494" alt="GKE Workloads after installing the nginx-ingress and cert-manager" %}

Edit `issuer.yaml` and set the email address. The file should become like this:

{% include picture.html img="/qwiklabs/gsp335-task3-edit-issuer-yaml.png" width="844" height="417" alt="Editing email in the issuer.yaml" %}

Save the file changes and run the following to apply them to setup the letsencrypt prod issuer:

```bash
kubectl apply -f issuer.yaml
```

### Configure nginx-ingress to use an encrypted certificate for your site

Edit `ingress.yaml` and set your `YOUR_LAB_USERNAME.labdns.xyz` DNS record to lines 11 and 14 like this:

{% include picture.html img="/qwiklabs/gsp335-task3-edit-ingress-yaml.png" width="731" height="476" alt="Set DNS and domain name to the issuer.yaml" %}

Save the file changes and run the following:

```bash
kubectl apply -f ingress.yaml
```

**Tips:** To learn more, read the [Securing NGINX-ingress](https://cert-manager.io/docs/tutorials/acme/nginx-ingress/) tutorial on the cert-manager website.

Open your domain name `https://YOUR_LAB_USERNAME.labdns.xyz` with HTTPS in a new tab. Now the WordPress application should be accessible like this:

{% include picture.html img="/qwiklabs/gsp335-task3-success-deployed-wordpress.png" width="1249" height="736" alt="The WordPress deployed on the secured GKE" %}

## Task 4: Set up Network Policy

Open the `network-policy.yaml` in an editor. You should see there are already two network policies. The first one is to deny all ingress from the internet and the second one is to allow the traffic from `ngnix-ingress` to `wordpress`.

You need to add one more network policy to allow ingress traffic from the internet into `nginx-ingress`. Use the second network policy as a template to compose a new policy. Change values of `name` and `spec` to the configuration like this:

```yaml
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
   name: allow-world-to-nginx-ingress
   namespace: default
spec:
   podSelector:
      matchLabels:
         app: nginx-ingress
   policyTypes:
   - Ingress
   ingress:
   - {}
```

Append the new policy to the `network-policy.yaml`, and save the file.  \
Run the following to apply the configuration file:

```bash
kubectl apply -f network-policy.yaml
```

**Related documentation:**

- [Creating a cluster network policy \| Kubernetes Engine Documentation](https://cloud.google.com/kubernetes-engine/docs/how-to/network-policy#using-gcloud-init)
- [Network Policies \| Kubernetes](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
- [Declare Network Policy \| Kubernetes](https://kubernetes.io/docs/tasks/administer-cluster/declare-network-policy/)

## Task 5: Setup Binary Authorization

**Tips:** Review the lab **GSP479** [Google Kubernetes Engine Security: Binary Authorization](https://www.qwiklabs.com/focuses/5154?parent=catalog) on Qwiklabs before start doing Task 5.

### Configure Binary Authorization Policy

1. In the Cloud Console, navigate to **Security** > **Binary Authorization**.
2. Enable the **Binary Authorization API**.
3. On the Binary Authorization page, click on **CONFIGURE POLICY**.
4. Select _Disallow all images_ for the **Default rule**.
5. Scroll down to Images exempt from this policy, click **ADD IMAGE PATH**.
6. Paste `docker.io/library/wordpress:latest` to the textbox, and click **DONE**.
7. Repeat the above two steps to add the following image paths:
   - us.gcr.io/k8s-artifacts-prod/ingress-nginx/*
   - gcr.io/cloudsql-docker/*
   - quay.io/jetstack/*

{% include picture.html img="/qwiklabs/gsp335-task5-custom-exempt-images.png" width="824" height="691" alt="Images exempt from Binary Authorization policy" class="ml-li" %}

{:start="8"}
8. Click **SAVE POLICY**.

### Enable Binary Authorization in Google Kubernetes Engine

1. Navigate to **Kubernetes Engine** > **Clusters**.
2. Click your cluster name to view its detail page.
3. Click on the pencil icon for Binary authorization under the Security section.

{% include picture.html img="/qwiklabs/gsp335-task5-enable-binary-authorization-in-gke.png" width="823" height="191" alt="Edit Binary Authorization in Google Kubernetes Engine" class="ml-li" %}

{:start="4"}
4. Check **Enable Binary Authorization** in the dialog.
5. Click **SAVE CHANGES**.

Your cluster will start updating its binary authorization settings. Wait until the update finish.

## Task 6: Setup Pod Security Policy

**Tips:** Review the lab **GSP496** [Hardening Default GKE Cluster Configurations](https://www.qwiklabs.com/focuses/5158?parent=catalog) on Qwiklabs to get some ideas about how to deploy the PodSecurityPolicy objects. To learn more, you can find more details from the following documentation:

- [Using PodSecurityPolicies \| Kubernetes Engine Documentation](https://cloud.google.com/kubernetes-engine/docs/how-to/pod-security-policies)
- [Pod Security Policies \| Kubernetes](https://kubernetes.io/docs/concepts/policy/pod-security-policy/)

The challenge lab provides the following Pod Security Policy demo files for you to use:

- `psp-restrictive.yaml`
- `psp-role.yaml`
- `pop-use.yaml`

Running the following command to deploy each file:

```bash
kubectl apply -f <filename>.yaml
```

Unfortunately, you will fail to delopy `psp-restrictive.yaml` and receive the following error message:

{% include picture.html img="/qwiklabs/gsp335-task6-no-matches-for-kind-podsecuritypolicy-in-version-extensions-v1beta1.png" width="1209" height="55" alt="no matches for kind PodSecurityPolicy in version extensions/v1beta1" %}

Open `psp-restrictive.yaml` with an editor, and replace `appVersion: extensions/v1beta1` with `policy/v1beta1`.

Save the changes, and run the `kubectl apply` command again.

{% include picture.html img="/qwiklabs/gsp335-task6-deploy-podsecurity-policy-files.png" width="1037" height="144" alt="podsecuritypolicy.policy, rolebinding.rbac.authorization.k8s.io, clusterrole.rbac.authorization.k8s.io created" %}

**Congratulations! You completed this challenge lab.**

## <i class="far fa-play-circle"></i> Demonstration Video

{% include youtube.html id="bpeOjFZklpg" title="GSP335 Secure Workloads in Google Kubernetes Engine: Challenge Lab" %}

```conf
⏱Timestamps:
00:00 Task0: Download the necessary files
00:19 Task1: Setup Cluster
Task2: Setup WordPress
00:37 - a) Create a Cloud SQL instance
00:59 - b) Create a service account
01:54 - c) Create MySQL user and password
03:14 - d) Create secrets for access to WP
03:52 - e) Create WP deployment and service
Task3: Setup Ingress with TLS
04:58 - a) Set up cert-manager.io
06:30 - b) Set up cert-manager.io
07:43 - c) Configure nginx-ingress to use an  encrypted certificate for your site
09:04 Task4: Set up Network Policy
10:10 Task5: Setup Binary Authorization
12:40 Task6: Setup Pod Security Policy
```

**Keep on reading**:

- [☁ Set up and Configure a Cloud Environment in Google Cloud: Challenge Lab \| logbook]({% post_url qwiklabs/logbooks/2020-07-25-Set-up-and-Configure-a-Cloud-Environment-in-Google-Cloud-Challenge-Lab %})
- [☁ Build and Secure Networks in Google Cloud: Challenge Lab \| logbook]({% post_url qwiklabs/logbooks/2020-08-11-Build-and-Secure-Networks-in-Google-Cloud-Challenge-Lab %})
- [☁ Deploy to Kubernetes in Google Cloud: Challenge Lab \| logbook]({% post_url qwiklabs/logbooks/2020-05-04-Kubernetes-in-Google-Cloud-Challenge-Lab %})
- [☁ Migrate a MySQL Database to Google Cloud SQL \| logbook]({% post_url qwiklabs/logbooks/2019-09-30-Migrate-a-MySQL-Database-to-Google-Cloud-SQL %})
