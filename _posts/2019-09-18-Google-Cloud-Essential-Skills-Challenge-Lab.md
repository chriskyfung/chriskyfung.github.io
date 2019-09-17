---
layout: post
title: "Qwiklab/Logbook: Google Cloud Essential Skills: Challenge Lab"
date: 2019-09-18
category: Cloud
tags: Qwiklabs Google_Cloud Logbook
summary: 'A lab summary of qwiklab GSP101 "Google Cloud Essential Skills: Challenge Lab
". '
---


Last time I wrote about a challenging lab entited _"[Configure Secure RDP using a Windows Bastion Host with Terraform](/blog/2019/09/07/Configure-Windows-Bastion-Host-with-Terraform-on-GCP)"_ within the Qwiklabs quest of "[Challenge: GCP Architecture](https://google.qwiklabs.com/quests/47)". Different from normal hand-on-labs in Qwiklabs, the challenge labs do not provide with step-by-step cookbooks for you. Instead, only a scenario is given to you. So, you have to figure out the solutions by yourself as the exercises for who prepare for the [Google Cloud Certified Professional Cloud Architect](https://cloud.google.com/certification/cloud-architect). Some of them are hard and tricky, and you cannot try the labs again and again (because each lab has a limited quota to attempt). So, I am going to make a logbook for each of labs in the challenge quest. I hope the articles would help you if you get stuck in taking those labs.

This time is about the easiest lab in the challenge quest -- **GSP101** _"[Google Cloud Essential Skills: Challenge Lab](https://google.qwiklabs.com/focuses/1734?parent=catalog)"_.


## Brief Introduction of Challenge Scenario


Tasks:

1. Create a Linux virtual machine, name it "apache" and specify the zone as "us-central1-a". (add necessary firewall rules)

2. Configure Apache2 Web Server in your instance

3. Test your server that shows the "Hello World!" page.

Reference
The lab **GSP212** _"[VPC Flow Logs - Analyzing Network Traffic](https://www.qwiklabs.com/catalog?keywords=GSP212)"_

## Install Apache
Configure the VM instance that you created as an Apache webserver and overwrite the default web page.

In the Console, navigate to Navigation menu (mainmenu.png) > Compute Engine > VM instances.

For web-server, click SSH to launch a terminal and connect.

In the web-server SSH terminal, update the package index:

`sudo apt-get update`

Install the apache2 package:

`sudo apt-get install apache2 -y`

Create a new default web page by overwriting the default:

echo '<!doctype html><html><body><h1>Hello World!</h1></body></html>' | sudo tee /var/www/html/index.html

Exit the SSH terminal:


`exit`