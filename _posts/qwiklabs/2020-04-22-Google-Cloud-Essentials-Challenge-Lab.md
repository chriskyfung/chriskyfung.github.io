---
layout: post
title: "QLogbook: Google Cloud Essentials: Challenge Lab"
author: chris
date: 2020-04-22
category: Cloud
tags: [Qwiklabs, Google Cloud, Logbook]
permalink: /blog/qwiklabs/Google-Cloud-Essential-Challenge-Lab
excerpt: Hints for qwiklab GSP313 "Google Cloud Essential &#58; Challenge Lab" | 1. Create a project jumphost instance | 2. Create a Kubernetes service cluster | 3. Setup an HTTP load balancer
image: 
   path: qwiklabs/qwiklabs-GSP313-task1
   ext: png
---

<!--more-->

Qwiklabs implemented a big change to the format of its quests in 2020. Multiple quests patched with a new challenge lab, to test user's skills and knowledge, respectively. New users can no longer complete a quest and earn the badge as easily as before.

In the last few months, I received a few comments that ask for help in those challenge labs. I am going to publish a series of logbooks to provide hints and instructions for those difficult labs.

In this article, we will go through the lab **GSP313** _[Google Cloud Essentials: Challenge Lab](https://www.qwiklabs.com/focuses/10258?parent=catalog)_. This exercise is in the introductory-level Quest called “Google Cloud Essentials”, which is recommended as the quest for the Google Cloud learner. You should learn the fundamental tools and services of the Google Cloud, including the deployment of a virtual machine, a Kubernetes Engine, and HTTP load balancers. The challenge lab is to test those skills and techniques again.

**The challenge contains 3 compulsory tasks:**

1. Create a project jumphost instance;
2. Create a Kubernetes service cluster;
3. Setup an HTTP load balancer to create the web server frontend.

* * *

## Task 1: Create a project jumphost instance

_Hint_: Refer and modify the procedures in the lab GSP001 [Creating a Virtual Machine](https://google.qwiklabs.com/focuses/3563?parent=catalog#step4).

This task is simple. Make sure you create the VM instance with:

- Name: **nucleus-jumphost**
- Zone: **us-east1-b**
- Machine Type: **f1-micro**

{% include picture.html img="qwiklabs/qwiklabs-GSP313-task1" ext="png" alt="Create a project VM instance, called nucleus-jumphost in Google Cloud Platform" %}

## Task 2: Create a Kubernetes service cluster

_Hint_: Refer and modify the procedures in the lab GSP100 [Kubernetes Engine: Qwik Start](https://google.qwiklabs.com/focuses/878?parent=catalog).

Make sure you:

- create the cluster to the zone **us-east1-b** by setting your default compute zone correctly;
- deploy the Docker container **hello-app:2.0**, instead of _hello-app:1.0_.

{% include picture.html img="qwiklabs/qwiklabs-GSP313-task2" ext="png" alt="hello-app deployed on a GCP Kubernetes cluster" %}

## Task 3: Setup an HTTP load balancer

_Hint_: Refer and modify the procedures in the lab GSP007[Set Up Network and HTTP Load Balancers](https://google.qwiklabs.com/focuses/558?parent=catalog).

Make sure you:

- create the instance-group with **--size 2**;
- create the backend-services to the zone **us-east1-b**.

The deployed nginx web servers:

{% include picture.html img="qwiklabs/qwiklabs-GSP313-task3" ext="png" alt="Nginx web servers deployed on Google Cloud Platform" %}

### Summary

In a nutshell, this challenge lab is basic and simple that only requires directly reuse the steps and Cloud Shell commands from the labs in the Google Cloud Essentials quest. I recommend you open the labs that listed in the above hints in new tabs when you are carrying out this challenge lab. You can find all instructions from those references, and try your best to finish the challenge lab by yourself.

If you still have questions, you can leave a comment below.

* * *

**See Also**: [Learning Google Cloud Platform on Qwiklabs: Learning Map, Assistive Tool and Tips](/blog/qwiklabs/Qwiklabs-User-Tips-for-Learning_Google_Cloud_Platform)
