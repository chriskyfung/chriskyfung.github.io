---
layout: post
title: "Qwiklab/Logbook: Scale Out and Update a Containerized Application on a Kubernetes Cluster"
author: Chris KY Fung
date: 2019-09-27
category: Cloud
tags: [Qwiklabs, Google Cloud, Logbook, Kubernetes]
permalink: /blog/qwiklabs/Scale-Out-and-Update-a-Containerized-Application-on-a-Kubernetes-Cluster
redirect_from:
 - /blog/2019/09/27/Scale-Out-and-Update-a-Containerized-Application-on-a-Kubernetes-Cluster
excerpt: A lab summary of qwiklab GSP305 "Scale Out and Update a Containerized Application on a Kubernetes Cluster" | 1. Build a Docker Image of Sample Application with a `v2` tag | 2. Update the Application to the Kubernetes Cluster Using Web Console | 3. Scale out the application so that the Kubernetes cluster deployment
header: 
   teaser: /images/posts/qwiklabs/qwiklabs-GSP305-step3-rolling-update-GKE-application.png
---

In the [last lab](/blog/qwiklabs/Build-and-Deploy-a-Docker-Image-to-a-Kubernetes-Cluster), you built a docker image and created a Kubernetes cluster for a containerized application, called `echo-app`. Considering your developer team delivers a new version of the application to you, so you need to update the running application on the cluster to the new version. You may also need to scale the cluster size to optimize the usage and performance. You will do this in the lab **GSP304** _"[Build and Deploy a Docker Image to a Kubernetes Cluster](https://www.qwiklabs.com/focuses/1738?parent=catalog)"_. This lab will provision the application `echo-app:v1`, as the same in the previous lab. You will continue practising with the `echo-app` application in the `echo-web` deployment, and update its version from v1 to v2.

<br>

## Brief Introduction of Challenge Scenario

When you open the page of this lab in Qwiklabs, you can find the task requirements by click the green activity tracker (on the top right of the page) to expand the score box.

![Screenshot of Green Score box of Qwiklabs Hands-on-lab GSP305](/images/posts/qwiklabs/score_box_of_qwiklabs_GSP305.png)

The screenshot above shows that there are 4 steps required for completing this lab. Combining with the instruction details, they are translated to the following mission statements.

1. Update a docker application and push a new version of image tagged `echo-app:v2` to a container repository (gcr.io).
2. Upload the deployment running on the Kubernetes cluster to `echo-app:v2`.
3. Scale out the application so that the Kubernetes cluster deployment is running 2 replicas.
4. The application must respond to web requests with V2.0.0.

<br>

## Build a Docker Image of Sample Application with a `v2` tag

Just similar to the [steps in the last lab](/blog/qwiklabs/Build-and-Deploy-a-Docker-Image-to-a-Kubernetes-Cluster), you can start with the pre-uploaded archive that contains the sample application and the docker configuration in the Cloud Storage bucket. Use a `gsutil cp` command to copy the archive from the Cloud Storage to the Cloud Shell environment. Next, use `tar -xvzf` command to unzip the files. You may use a code editor to compare the change between the v1 and v2 codes. After that, use `docker` commands to build, tag and push the new container image to Google Container Registry (gcr.io). If you do not remember how to build a docker image on GCP, I recommend you revise the lab _"[Introduction to Docker](https://www.qwiklabs.com/focuses/1029?parent=catalog)"_ before you start.

Edit the line in the `/manifests/echoweb-deployment.yaml` file defining which image to use:
```yaml
apiVersion: apps/v1beta1
kind: Deployment
metadata:
  name: echoweb
  labels:
    app: echo
spec:
  template:
    metadata:
      labels:
        app: echo
        tier: web
    spec:
      containers:
      - name: echo-app
        image: gcr.io/PROJECT_ID/echo-app:v2 # Update this to v2.
                                             # Replace PROJECT_ID
                                             # with your project
        ports:
        - containerPort: 8000
```
**Save** the file.

Build a new docker image of the sample application with a tag called `v2`, and push the image to Google Container Registry,
```bash
docker build -t echo-app:v2 .
export PROJECT_ID=$(gcloud info --format='value(config.project)')
docker tag echo-app:v2 gcr.io/${PROJECT_ID}/echo-app:v2
docker push gcr.io/${PROJECT_ID}/echo-app:v2
```

In the web console, navigate to _**Container Registry > Images**_ to confirm the docker image tagged `v2` has been pushed to the cloud repositories.<br>
![Confirm your docker image tagged v2 existing in Google Container Registry](/images/posts/qwiklabs/qwiklabs-GSP305-step1-new-container-image-tagged-v2-in-container-registry.png)

Next, you need to update the application to the Kubernetes Cluster.

## Update the Application to the Kubernetes Cluster Using Web Console

Navigate to _**Kubernetes Engine > Workloads**_, click the name `echo-web` to show the Deployment details. Press the <i class='fas fa-list-ul'></i> icon to expand menu and select **Rolling Update**.<br>
![Autoscale, Expose, Rolling Update, Scale - menu items on Deployment details page](/images/posts/qwiklabs/qwiklabs-GSP305-step2-expand-menu-in-Kubernetes-Engine-page.png)

In the Rolling Update dialog, modify the end of the image field from `v1` to `v2`.

![Rolling update dialog](/images/posts/qwiklabs/qwiklabs-GSP305-step3-rolling-update-GKE-application.png)

Click **UPDATE**.

## Scale out the application so that the Kubernetes cluster deployment

In this article, I will show you the method using the GCP web console. If you prefer to use command-line tools, you can refer to the lab **GSP053** _"[Managing Deployments Using Kubernetes Engine](https://google.qwiklabs.com/focuses/639?parent=catalog)"_ in Qwiklabs.

Navigate to _**Kubernetes Engine > Workloads**_, click the name `echo-web` to show the Deployment details. Press the <i class='fas fa-list-ul'></i> icon to expand the menu and select **Scale**.<br>

![Seletet Scale from menu items on Deployment details page](/images/posts/qwiklabs/qwiklabs-GSP305-step2-select-scale-from-expanded-menu-in-Kubernetes-Engine-page.png)

In the Scale dialog, type 2 to the field **Replicas**,

![Scale a workload to a new size](/images/posts/qwiklabs/qwiklabs-GSP305-step5-scale-to-2-replicas.png)

Click **SCALE**, then wait for creating/deleting instances until 2 replicas exist in the Kubernetes cluster.

Open the IP address of the external endpoint, you should see a similiar web response:<br>
![Resulted web page](/images/posts/qwiklabs/qwiklabs-GSP305-step6-updated-echo-app-application.png)

Congratulations! You should accomplish the lab if you follow the above steps.

* * *

**Related post:**

- _[Userscript for Labelling Completed Qwiklabs](/blog/qwiklabs/Google-Cloud-Essential-Skills-Challenge-Lab)_