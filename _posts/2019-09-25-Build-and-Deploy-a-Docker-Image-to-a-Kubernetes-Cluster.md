---
layout: post
title:  "Qwiklab/Logbook: Build and Deploy a Docker Image to a Kubernetes Cluster"
author: Chris KY Fing
date: 2019-09-25
category: Cloud
tags: [Qwiklabs, Google Cloud, Logbook, Docker, Kubernetes]
permalink: /blog/qwiklabs/Build-and-Deploy-a-Docker-Image-to-a-Kubernetes-Cluster
redirect_from:
 - /blog/2019/09/25/Build-and-Deploy-a-Docker-Image-to-a-Kubernetes-Cluster
excerpt: A lab summary of qwiklab GSP304 "Configure a Firewall and a Startup Script with Deployment Manager" | 1. Create a Kubernetes Cluster | 2. Build a Docker Image of Sample Application | 3a. Deploy the Application to the Kubernetes Cluster Using Web Console (Method 1)  | 3b. Deploy the Application to the Kubernetes Cluster Using Cloud Shell (Method 2)

header: 
   teaser: /images/posts/qwiklabs/qwiklabs-GSP304-step3-echo-app-image-in-container-registry.png
---

Containerization with Docker and Kubernetes (K8s) is an emerging application architecture for deploying, scaling and managing distributed applications. The challenge lab **GSP304** _"[Build and Deploy a Docker Image to a Kubernetes Cluster](https://www.qwiklabs.com/focuses/1738?parent=catalog)"_ is a test to assess the essential professional skills in deploying your application on GKE.


## Brief Introduction of Challenge Scenario

When you open the page of this lab in Qwiklabs, you can find the task requirements by click the green activity tracker (on the top right of the page) to expand the score box.

![Screenshot of Green Score box of Qwiklabs Hands-on-lab GSP304](/images/posts/qwiklabs/score_box_of_qwiklabs_GSP304.png)

1. Use the sample application and docker configuration to build a docker image, and push the image to the gcr.io repository with a `v1` tag.

2. A new Kubernetes cluster called `echo-cluster` exists.

3. The application called `echo-app` has been deployed to the cluster.

4. The service called `echo-web` exists that responds to requests like Echo-app.

<br>

## Create a Kubernetes Cluster

In the web console, navigate to _**Kubernetes Engine > Clusters**_. Click **Create a cluster** with:
- Cluster name: `echo-cluster`
- Num of Nodes: 2
- Machine type: N1-standard-2

I recommend starting from preparing the hardware because the process takes time. You can continue doing the steps in the next section. The cluster should be ready, when you finish building and pushing the docker image to Container Registry.

<br>

## Build a Docker Image of Sample Application

If you do not remember how to build a docker image on GCP, I recommend you revise the lab _"[Introduction to Docker](https://www.qwiklabs.com/focuses/1029?parent=catalog)"_ before you start.

1. (_Optional_)  While the provisioning of lab resources, you may click the [link](https://www.qwiklabs.com/instructions/162200/download) below the timer to download the given archive called `echo-web.tar.gz`. You may spend some time to study the contained files in your local storage.<br>
![Download "Sample Application with Docker Configuration"](/images/posts/qwiklabs/qwiklabs-GSP304-step1-Download-Sample-Application-Files.png)

2. The `echo-web.tar.gz` file has already been copied to a Google Cloud storage bucket called `gs://[PROJECT_ID]` during the lab provision. Navigate to **_Storage_**, confirm the file exists in the bucket. Then, click the file name and copy the URL of the file from its detail page.<br>
![Look for the given archive in Cloug Storage](/images/posts/qwiklabs/qwiklabs-GSP304-step2-echo-web-tar-gz-in-cloud-storage.png)

3. Open a Cloud Shell, use the following commands to copy and unzip `echo-web.tar.gz` to the shell environment:<br>
```bash
export PROJECT_ID=$(gcloud info --format='value(config.project)')
gsutil cp gs://${PROJECT_ID}/echo-web.tar.gz .
`tar -xvzf echo-web.tar.gz`
```

4. Build a docker image of the sample application with a tag called `v1`, and push the image to Google Container Registry,
```bash
docker build -t echo-app:v1 .

docker tag echo-app:v1 gcr.io/${PROJECT_ID}/echo-app:v1
docker push gcr.io/${PROJECT_ID}/echo-app:v1
```

5. In the web console, navigate to _**Container Registry > Images**_ to confirm the docker image has been pushed to the cloud repositories.<br>
![Confirm your docker image existing in Google Container Registry](/images/posts/qwiklabs/qwiklabs-GSP304-step3-echo-app-image-in-container-registry.png)

Next, you need to deploy the application to the Kubernetes Cluster. There are two ways to do this: (1) deploy using web console, and (2) deploy using Cloud Shell. You can choose either way to finish the lab.

<br>

## Deploy the Application to the Kubernetes Cluster Using Web Console (Method #1)

1. In the Container Registry page, click the image name **echo-app**. There should be an image version with a tag `v1` . Click three-dots icon (<i class='fas fa-ellipsis-v'></i>) and select **Deploy to GKE**.<br>
![Deploy an image to GKE using web console](/images/posts/qwiklabs/qwiklabs-GSP304-step4-deploy-docker-image-in-container-registry.png)

2. The web console will be redirected to _**Kubernetes Engine**_ > **Create a deployment** dialog,<br>
![select a container image in Create a deployment dialog](/images/posts/qwiklabs/qwiklabs-GSP304-step5-create-a-deployment-to-GKE.png)<br>
Click **CONTINUE**.

3. In the Configuration section, enter `echo-app` as the application name and choose `echo-cluster` as the cluster in which the deployment will be created.<br>
![edit configuration in Create a deployment dialog](/images/posts/qwiklabs/qwiklabs-GSP304-step6-create-a-deployment-to-GKE-configuration.png)<br>
Click **CREATE NEW CLUSTER**.

4. Navigate to _**Kubernetes Engine > Workload**_ page, wait the status of the deployment becomes **OK**.<br>
![Confirm the deployment status](/images/posts/qwiklabs/qwiklabs-GSP304-step7-deployed-echo-app.png)

5. Click the name **echo-app**, then click **Expose** displayed at the top right corner of the Deploymemt Details page to create a service for the deployment.<br>
![Snapshot of Deploymemt Details page](/images/posts/qwiklabs/qwiklabs-GSP304-step8-details-of-echo-app.png)

6. In the **Expose a deployment** dialog, configure the service with a new port mapping as below:
- Port: `80`
- Target port: `8000`
- Protocol: `TCP`
- Service type: `Load balancer`
- Service name: `echo-web`<br>
![Snapshot of Expost a deployment dialog](/images/posts/qwiklabs/qwiklabs-GSP304-step9-Port-mapping-with-Load-balancer.png)
Click **Expose** to create the service.<br>
![Service details page of the deployed GKE service](/images/posts/qwiklabs/qwiklabs-GSP304-step10-Service-details-of-echo-web.png)

7. In the service details, copy and open the IP address of the external endpoints in a new tab of your browser. The sample application should look like:<br>
![Snapshot of the deployed echo-web application](/images/posts/qwiklabs/qwiklabs-GSP304-step11-deployed-echo-web.png)

## Deploy the Application to the Kubernetes Cluster Using Cloud Shell (Method #2)

Alternatively, you can deploy the application using cloud shell instead.
After creating your cluster, you need to get authentication credentials to interact with the cluster.

To authenticate the cluster run the following command, 
```bash
gcloud container clusters get-credentials echo-cluster
```

Run the following `kubectl run` command in Cloud Shell to create a new Deployment `echo-app` from the `echo-app` container image with opening TCP port 8000:
```bash
kubectl run echo-app --image=gcr.io/${PROJECT_ID}/echo-app:v1 --port 8000
```

Now create a Kubernetes Service, which is a Kubernetes resource that lets you expose your application (that responds on **port 8000**) to external traffic that respond to normal web requests on **port 80**, by running the following `kubectl expose` command:
```bash
kubectl expose deployment echo-app --name echo-web --type="LoadBalancer"
 --type LoadBalancer --port 80 --target-port 8000
```

Inspect the `echo-web` Service by running kubectl get:
```bash
kubectl get service echo-web
```

Copy and open the IP address of the external endpoints in a new tab of your browser, the sample application should look like:<br>
![Snapshot of the deployed echo-web application](/images/posts/qwiklabs/qwiklabs-GSP304-step11-deployed-echo-web.png)

Congratulations! You should accomplish the lab if you follow the above steps.

* * *

**Related post:**

- _[Userscript for Labelling Completed Qwiklabs](/blog/qwiklabs/Google-Cloud-Essential-Skills-Challenge-Lab)_