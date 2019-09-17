---
layout: post
title: "Qwiklab/Logbook: Google Cloud Essential Skills: Challenge Lab"
date: 2019-09-18
category: Cloud
tags: Qwiklabs Google_Cloud Logbook
summary: 'A lab summary of qwiklab GSP101 "Google Cloud Essential Skills: Challenge Lab
". 1. Brief Introduction of Challenge Scenario | 2. Create a VM instance | 3. Install Apache and Overwrite Default Web Page'
---


Last time I wrote about a challenging lab entited _"[Configure Secure RDP using a Windows Bastion Host with Terraform](/blog/2019/09/07/Configure-Windows-Bastion-Host-with-Terraform-on-GCP)"_ within the Qwiklabs quest of "[Challenge: GCP Architecture](https://google.qwiklabs.com/quests/47)". Different from the normal hand-on-labs in Qwiklabs, the challenge labs do not provide with step-by-step cookbooks for you. Instead, only a scenario is given to you. So, you have to figure out the solutions by yourself as the exercises for who prepare for the [Google Cloud Certified Professional Cloud Architect](https://cloud.google.com/certification/cloud-architect). Some of them are hard and tricky, and you cannot try the labs again and again (because each lab has a limited quota to attempt). So, I am going to make a logbook for each of the labs in the challenge quest. I hope the articles would help you if you get stuck with taking those labs.

This time is about the easiest lab in the challenge quest -- **GSP101** _"[Google Cloud Essential Skills: Challenge Lab](https://google.qwiklabs.com/focuses/1734?parent=catalog)"_. It just asks you to setup a VM instance with running Apache web server. **Pretty BASIC!** If you know how to do that, I recommend you to try your best. Do not read the rest of the article unless you really need some more Hints.

<br>

## Brief Introduction of Challenge Scenario

When you open the page of this lab in Qwiklabs, you can find the task requirements by click the green activity tracker (on the top right of the page) to expand the score box.

![Screenshot of Green Score box of Qwiklabs Hands-on-lab GSP101](/images/score_box_of_qwiklabs_GSP101.png)


This lab requires:

1. Create a Linux virtual machine, name it `apache` and specify the zone as `us-central1-a` with necessary firewall rules (`allow HTTP`).

2. Configure Apache2 Web Server in your instance.

3. Test your server that shows a `"Hello World!"` page.

<br>

## Step 1 - Create a VM instance

To create a Compute Engine instance, the most easy way is through the GCP web console. In the Console, navigate to _Navigation menu_ > _Compute Engine_ > _VM instances_. When you create a new VN instance,

- Make sure you give the instance a name, called `apache`, and
- Select `Allow HTTP traffic` in the Firewall section.

![Create a GCP VM instance called apache via GCP web console](/images/qwiklabs-GSP101-step1-create-GCP-VM-instance.png)

![Select allow HTTP traffic in the firewall setting](/images/qwiklabs-GSP101-step2-allow-HTTP-traffic-in-firewall-setting.png)

You can leave other fields with the default settings, then click **Create**.

![Check your progress: Created Compute Engine instance, called apache](/images/qwiklabs-GSP101-check-progress1-VM-created.png)

<br>

## Install Apache and Overwrite Default Web Page

After the VM instance is really, you have to configure it as an Apache webserver. If you do not remember how to install Apache, I advise you look up the **_command lines_** from the lab **GSP212** _"[VPC Flow Logs - Analyzing Network Traffic](https://www.qwiklabs.com/catalog?keywords=GSP212)"_.

Keep inside the VM instances console, click **SSH** to launch a terminal and connect to the `apache` instance. You will install the packages with the following command-lines.

In the SSH terminal, update the package index:

```bash
sudo apt-get update
```

Install the apache2 package:

```bash
sudo apt-get install apache2 -y
```

<br> 
Copy the External IP of the instance to your web browser. You should see an Apache2 Debian Default Page if the web server is successfully installed.

![Apache2 Debian Default Page](/images/qwiklabs-GSP101-step3-configure-apache2-web-server-in-VM-instance.png)

Finally, you have to overwrite the default web page to rendering with **"Hello World!"**:

```bash
echo '<!doctype html><html><body><h1>Hello World!</h1></body></html>' | sudo tee /var/www/html/index.html
```

Refresh the web page in your browser,

![Hello World!](/images/qwiklabs-GSP101-step4-test-custom-default-web-page.png)


Congratulations! You should accomplish the lab if you follow all above steps.

* * *

Related post: _[Userscript for Labelling Completed Qwiklabs](/blog/2019/09/01/Userscript-for-Labelling-Completed-Qwiklabs)_
