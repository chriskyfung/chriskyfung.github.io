---
layout: post
title: "☁ Getting Started: Create and Manage Cloud Resources: Challenge Lab | logbook"
author: chris
date: 2020-04-22 +0800
last_modified_at: 2020-06-22 09:45:00 +0800
category: Cloud
tags: [Qwiklabs, Google Cloud, Kubernetes, Logbook]
permalink: /blog/qwiklabs/Getting-Started-Create-and-Manage_Cloud_Resources-Challenge-Lab
redirect_from:
   - /blog/qwiklabs/Google-Cloud-Essential-Challenge-Lab
   - /blog/qwiklabs/GSP313
   - /blog/qwiklabs/gsp313
excerpt: Hints for the Google Cloud self-paced training GSP313 "Getting Started&#58; Create and Manage Cloud Resources&#58; Challenge Lab" on Qwiklabs | 1. Create a project jumphost instance | 2. Create a Kubernetes service cluster | 3. Setup an HTTP load balancer
image:
   path: /images/posts/qwiklabs/qwiklabs-GSP313-task1.png
   height: 386
---

<!--more-->

Qwiklabs implemented a big change to the format of its quests in 2020. Multiple quests patched with a new challenge lab, to test user's skills and knowledge, respectively. New users can no longer complete a quest and earn the badge as easily as before.

In the last few months, I received a few comments that ask for help in those challenge labs. I am going to publish a series of logbooks to provide hints and instructions for those difficult labs.

In this article, we will go through the lab **GSP313** _[Getting Started: Create and Manage Cloud Resources: Challenge Lab](https://www.qwiklabs.com/focuses/10258?parent=catalog)_ (formerly known as _Google Cloud Essentials: Challenge Lab_). This exercise is an extension of the [introductory-level](https://www.qwiklabs.com/quests/120) Quest called "[Google Cloud Essentials](https://www.qwiklabs.com/quests/23)", which is recommended as the quest for the Google Cloud learner. You should learn the fundamental tools and services of the Google Cloud, including the deployment of a virtual machine, a Kubernetes Engine, and HTTP load balancers. The challenge lab is to test those skills and techniques again.

**The challenge contains 3 compulsory tasks:**

1. Create a project jumphost instance (zone: us-east1-b);
2. Create a Kubernetes service cluster;
3. Setup an HTTP load balancer to create the web server frontend.

* * *

## Task 1: Create a project jumphost instance

**Hint**: Refer and modify the procedures in the lab GSP001 [Creating a Virtual Machine](https://google.qwiklabs.com/focuses/3563?parent=catalog#step4).

This task is simple. Make sure you create the VM instance with:

- Name: **nucleus-jumphost**
- Zone: **us-east1-b**
- Machine Type: **f1-micro**

{% include picture.html height="386" img="qwiklabs/qwiklabs-GSP313-task1.png" alt="Create a project VM instance, called nucleus-jumphost in Google Cloud Platform" %}

## Task 2: Create a Kubernetes service cluster

**Hint**: Refer and modify the procedures in the lab GSP100 [Kubernetes Engine: Qwik Start](https://google.qwiklabs.com/focuses/878?parent=catalog).

Make sure you:

- create the cluster to the zone **us-east1-b** by setting your default compute zone correctly;
- deploy the Docker container **hello-app:2.0**, instead of _hello-app:1.0_.

{% include picture.html height="366" img="qwiklabs/qwiklabs-GSP313-task2.png" alt="hello-app deployed on a GCP Kubernetes cluster" %}

## Task 3: Setup an HTTP load balancer

**Hint**: Refer and modify the procedures in the lab GSP007 [Set Up Network and HTTP Load Balancers](https://google.qwiklabs.com/focuses/12007?parent=catalog).

Make sure you:

- create the instance-group with **--size 2**;
- create the backend-services to the zone **us-east1-b**.

The deployed nginx web servers:

{% include picture.html width="566" height="312" img="qwiklabs/qwiklabs-GSP313-task3.png" alt="Nginx web servers deployed on Google Cloud Platform" %}

<br>

**Congratulations! You completed this challenge lab.**

### Summary

In a nutshell, this challenge lab is basic and simple that only requires directly reuse the steps and Cloud Shell commands from the labs in the Google Cloud Essentials quest. I recommend you open the labs listed in the above hints in new tabs when you are carrying out this challenge lab. You can find all instructions from those references, and try your best to finish the challenge lab by yourself.

If you still have questions, you can leave a comment below.

* * *

**See Also**: [Learning Google Cloud Platform on Qwiklabs: Learning Map, Assistive Tool and Tips]({% post_url qwiklabs/2019-11-25-Qwiklabs-User-Tips-for-Learning_Google_Cloud_Platform %})
