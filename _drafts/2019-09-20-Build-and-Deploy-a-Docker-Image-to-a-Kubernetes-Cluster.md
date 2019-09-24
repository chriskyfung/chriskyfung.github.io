---
layout: post
title:  "Qwiklab/Logbook: Build and Deploy a Docker Image to a Kubernetes Cluster"
author: Chris KY Fing
date: 2019-09-11 21:12
category: Cloud
tags: [Qwiklabs, Google Cloud, Logbook]
permalink: /blog/qwiklabs/Configure-a-Firewall-and-a-Startup-Script-with-Deployment-Manager
redirect_from:
 - /blog/2019/09/20/Configure-a-Firewall-and-a-Startup-Script-with-Deployment-Manager
excerpt: A lab summary of qwiklab GSP303 "Configure a Firewall and a Startup Script with Deployment Manager" | 1.  | 2.  | 3.  | 4. 
header: 
   teaser: /images/posts/qwiklabs/
---

## Brief Introduction of Challenge Scenario

Tasks:

1. A simple Go application called `echo-web` with a Dockerfile  and the associated context that allows you to build a Docker image. An application image with a v1 tag has been pushed to the gcr.io repository

2. A new Kubernetes cluster exists. The test Kubernetes Cluster you are creating to just two **N1-standard-2** instances. You must call your cluster `echo-cluster`.

3. Check that an application has been deployed to the cluster

4. Test that a service exists that responds to requests like Echo-app


Steps
Copy the archive called `echo-web.tar.gz` to a Google Cloud storage bucket called gs://[PROJECT_ID]


[Introduction to Docker](https://www.qwiklabs.com/focuses/1029)


`tar -xvzf echo-web.tar.gz`

docker build -t echo-app:v1 .

docker tag echo-app:v1 gcr.io/[project-id]/echo-app:v1
docker push gcr.io/[project-id]/echo-app:v1

gcloud container clusters create echo-cluster

gcloud container clusters get-credentials echo-cluster

kubectl run hello-server --image=gcr.io/google-samples/echo-web:v1 --port 8080

kubectl expose deployment echo-web --type="LoadBalancer"

kubectl get service echo-web