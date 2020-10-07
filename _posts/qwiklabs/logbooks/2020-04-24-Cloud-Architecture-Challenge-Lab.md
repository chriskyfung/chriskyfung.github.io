---
layout: post
title: "Qlog: Deploy and Manage Cloud Environments with Google Cloud: Challenge Lab"
author: chris
date: 2020-04-24 +0800
last_modified_at: 2020-06-22 10:05:00 +0800
category: Cloud
tags: [Qwiklabs, Google Cloud, Logbook, Docker, Kubernetes]
permalink: /blog/qwiklabs/Deploy-and-Manage-Cloud-Environments-with-Google-Cloud-Challenge-Lab
redirect_from: /blog/qwiklabs/Cloud-Architecture-Challenge-Lab
excerpt: Hints for qwiklab GSP314 "Deploy and Manage Cloud Environments with Google Cloud&#58; Challenge Lab", including how to creating multiple VPC networks using Deployment Manager configuration, create a Kubernetes cluster with services, set up Cloud Logging, and update the services with Spinnaker.
image: 
   path: /images/posts/qwiklabs/qwiklab-GSP314-spinaker-production.png
   height: 530
css:
   syntax: true
---

<!--more-->

Did the hints from the [last article](/blog/qwiklabs/Getting-Started-Create-and-Manage_Cloud_Resources-Challenge-Lab) help you to finish the first challenge lab? Are you familiar with the basic knowledge from the **Google Cloud Essentials** quest now?

It's important before you move on to the exercise **GSP314** _[Deploy and Manage Cloud Environments with Google Cloud: Challenge Lab](https://www.qwiklabs.com/focuses/10417?parent=catalog)_, formerly known as _Cloud Architecture: Challenge Lab_, which will be studied below. This lab is much complicated than the last one. It will test your skills and knowledge for creating multiple VPC networks using Deployment Manager configuration, create a Kubernetes cluster with services, set up Cloud Logging, and update the services with Spinnaker. It requires you well understand and integrate what you learned and experienced from the labs in the Cloud Architecture quest.

In the lab scenario, your client has already established a product development environment with Spinnaker and the application delivery pipeline in the network **kraken-build-vpc**. Those resources will be provisioned while the lab starts. You only need to complete the unfinished part of the architecture ([in the red box of the diagram](https://cdn.qwiklabs.com/KQtWhw5izJUfg3%2BL%2B0uLZQ6v44HXVd9BOdAOhhatO3Q%3D)).

**The challenge contains 3 requisite tasks:**

1. Create the Production Environment;
2. Setup the Admin instance;
3. Verify the Spinnaker deployment

* * *

## Task 1: Create the production environment

We can further subdivide it to 3 sub-tasks:

### 1.1 Create the kraken-prod-vpc using the given Deployment Manager configuration

First of all, navigate to **Deployment Manager** in the Console to check the deployment status of **kraken-jumphost**.

{% include picture.html height="548" img="qwiklabs/qwiklab-GSP314-deployment-manager.png" alt="Kraken development environment in Deployment Manager" %}

After the jumphost has been created, navigate to **Compute Engine** > **VM instances**.

1. Click **SSH** button to access the jumphost instance.

2. In the SSH window, go to the `/work/dm` directory.
{% include picture.html width="706" height="556" img="qwiklabs/qwiklab-GSP314-jumphost-ssh.png" alt="SSH console" class="ml-4" %}

{:start="3"}

3. Use an editor to open the configuration file **prod-network.yaml**, and replace `SET_REGION` to `us-east1`.

4. Create the **kraken-prod-vpc** with the YAML file using `gcloud` command.<br>
_Hint_: Refer and modify the `gcloud deployment-manager` command in the lab GSP060 [Deployment Manager - Full Production](https://www.qwiklabs.com/focuses/981?parent=catalog#step9).

### 1.2 Create a Kubernetes cluster in the new network

Return to Cloud Console, click on **Navigation menu** > **Kubernetes Engine** > **Cluster**.

Click **Create Cluster**. Make sure you:

- name the cluser **kraken-prod**
- set the number of nodes to **2**
- choose **kraken-prod-vpc** in the network tab

### 1.3 Create the frontend and backend deployments and services

Hint: Refer and modify the **kubectl create** command in the lab GSP021 [Orchestrating the Cloud with Kubernetes](https://www.qwiklabs.com/focuses/557?parent=catalog).

Return to the SSH window, use the following commands to create the frontend and backend deployments and services:

```bash
cd /work/k8s
kubectl create -f deployment-prod-backend.yaml
kubectl create -f deployment-prod-frontend.yaml
kubectl get pods
kubectl create -f service-prod-backend.yaml
kubectl create -f service-prod-frontend.yaml
kubectl get services
```

Click **Check my progress** to verify **Task 1**.

## Task 2: Setup the Admin instance

### 2.1 Create a VM instance

1. In the Console, click on **Navigation menu** > **Compute Engine** > **VM instances**.

2. Click **Create instance**.

Make sure you:

- name the instance **kraken-admin**
- choose the zone **us-east1-b**
- setup both **kraken-mgmt-subnet** and **kraken-prod-subnet** as the network interfaces in the Networking tab

{% include picture.html width="584" height="567" img="qwiklabs/qwiklab-GSP314-kraken-admin-network.png" class="ml-5" %}

{:.ml-5}
After the instance being created, copy **ID** from its detail page.

### 2.2 Create a Monitoring workspace

1. Click on **Navigation menu** > **Monitoring**.

2. Click **Alerting** from the left menu, then click **Create Policy**.

3. Click **Add Condition**, and then set up the Metrics with the following parameters:

   | Fields        | Options         |
   |---------------|-----------------|
   | Resource Type | GCE VM Instance |
   | Metric        | CPU Utilization `compute.googleapis.com/instance/cpu/utilization` |
   | Filter        | Choose **instance id** and paste the value copied from kraken-admin |
   | Threshold  | 0.5 for 1 minute   |

   {% include picture.html width="706" height="718" img="qwiklabs/qwiklab-GSP314-alerting.png" class="ml-4" %}

{:start="4"}

4. Click **ADD**, and then add an email in the Notification setting.

{:.ml-5}
Click **Check my progress** to verify **Task 2**.

## Task 3: Verify the Spinnaker deployment

_Hint_: Refer to the procedures in the lab GSP114 [Continuous Delivery Pipelines with Spinnaker and Kubernetes Engine](https://www.qwiklabs.com/focuses/552?parent=catalog).

In this lab, several resources have been already provisioned. you **DO NOT** need to implement the following tasks:

- Set up Cloud Pub/Sub to trigger Spinnaker pipelines
- Deploying Spinnaker using Helm
- Configure the Cloud Build triggers
- Configuring the deployment pipelines

### 3.1 Connect the Spinnaker console

The lab manual suggests you use Cloud Shell and `kubectl` to **port forward** the **spin-deck** pod from port **9000** to **8080**, while I perform to work around with the Cloud Console using the following steps.

1. In the Console, click on **Navigation menu** > **Kubernetes Engine** > **ServiceS & Ingress**

2. Search **spin-deck**.

   {% include picture.html width="706" height="332" img="qwiklabs/qwiklab-GSP314-spin-deck.png" lass="ml-4" %}

{:start="3"}

3. Click **Port Forward** at the end of the detail page.
   {% include picture.html width="611" height="223" img="qwiklabs/qwiklab-GSP314-port-forwarding.png" class="ml-4" %}

{:start="4"}

4. The Cloud Shell will launch automatically with the port forwarding command.

   {% include picture.html width="706" height="174" img="qwiklabs/qwiklab-GSP314-port-forwarding-cmd.png" class="ml-4" %}

{:start="5"}

5. Click the **Web Preview** icon at the top of the Cloud Shell window and select **Preview on port 8080**, to open the Spinnaker user interface.
   
   {% include picture.html width="706" height="355" img="qwiklabs/qwiklab-GSP314-spinnaker.png" class="ml-4" %}

### 3.2 Clone your source code repository

1. In the Console, click on **Navigation menu** > **Source Repositories**.

2. Click **sample-app**.

3. Click **Clone** at the top of the repository, and copy the git clone command to the Cloud Shell.

   {% include picture.html width="706" height="500" img="qwiklabs/qwiklab-GSP314-clone-sample-app.png" class="ml-4" %}

{:start="4"}

4. Run the copied command to download the sample application source code, and then set the username and email address for the Git commits in this repository using run the following codes:

{:.ml-5}
```bash
cd sample-app
git config --global user.email "$(gcloud config get-value core/account)"
git config --global user.name "$(gcloud config get-value core/account)"
```

### 3.3 Triggering your pipeline from code changes

From your sample-app directory, change the color of the app from orange to blue:

```bash
sed -i 's/orange/blue/g' cmd/gke-info/common-service.go
```

Tag your change and push it to the source code repository:

```bash
git commit -a -m "Change color to blue"
git tag v1.0.1
git push --tags
```

In the Console, in **Cloud Build** > **History**, the new build will appear in a minute.

Return to the Spinnaker UI and click **Pipelines** to watch the pipeline start to deploy the image to production.

{% include picture.html height="741" img="qwiklabs/qwiklab-GSP314-spinnaker-deploy.png"%}

Once the pipeline completes, the color of the sample application has changed from orange to blue in the canary deployment, click **Check my progress** to verify **Task 3**.

<br/>

**Congratulations! You completed this challenge lab.**

## Summary

This lab is challenging. You might not know what need to do if you cannot spot the similar pieces from the prior training labs. You need to familiar with `kubectl` and `git` commands as well as VPCs and Kubernetes in the multiple network environment. Since some steps are hard to undo, it is necessary to well-check the options and parameters before attempting create resources and update the pipeline.

* * *

**See Also**: [Learning Google Cloud Platform on Qwiklabs: Learning Map, Assistive Tool and Tips](/blog/qwiklabs/Qwiklabs-User-Tips-for-Learning_Google_Cloud_Platform)