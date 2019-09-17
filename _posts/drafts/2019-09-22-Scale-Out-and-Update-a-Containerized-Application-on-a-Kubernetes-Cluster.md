---
layout: post
title: "Qwiklab/Logbook: Scale Out and Update a Containerized Application on a Kubernetes Cluster"
date: 2019-09-22 22:19
category: Cloud
tags: Qwiklabs Google_Cloud Logbook
summary: 
---

## Brief Introduction of Challenge Scenario

1. Update a docker application and push a new version to a container repository. Check that there is a tagged image in gcr.io for echo-app:v2
2. Echo-app:v2 is running on the Kubernetes cluster
3. Scale out the application so that it is running 2 replicas. The Kubernetes cluster deployment reports 2 replicas.
4. The application must respond to web requests with V2.0.0


docker build -t echo-app:v2 .

export PROJECT_ID=<your project id>

docker tag echo-app:v2 gcr.io/$PROJECT_ID/echo-app:v2
docker push gcr.io/$PROJECT_ID/echo-app:v2