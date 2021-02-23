---
layout: post
title: "☁ Google Cloud Essential Skills: Challenge Lab | logbook"
author: chris
date: 2019-09-18
category: Cloud
tags: [Qwiklabs, Google Cloud, Logbook]
permalink: /blog/qwiklabs/Google-Cloud-Essential-Skills-Challenge-Lab
redirect_from:
 - /blog/2019/09/18/Google-Cloud-Essential-Skills-Challenge-Lab
excerpt: A lab summary of qwiklab GSP101 "Google Cloud Essential Skills&#58; Challenge Lab" | 1. Brief Introduction of Challenge Scenario | 2. Create a VM instance | 3. Install Apache and Overwrite Default Web Page
image: 
   path: /images/posts/qwiklabs/qwiklabs-GSP101-step4-test-custom-default-web-page.png
   width: 348
   height: 146
css:
   syntax: true
---

<!--more-->

Last time I wrote about a challenging lab entitled _"[Configure Secure RDP using a Windows Bastion Host with Terraform](/blog/qwiklabs/Configure-Windows-Bastion-Host-with-Terraform-on-GCP)"_ within the Qwiklabs quest of "[Cloud Architecture: Design, Implement, and Manage](https://google.qwiklabs.com/quests/124)". Different from the normal hand-on-labs in Qwiklabs, the challenge labs do not provide step-by-step cookbooks for you. Instead, only a scenario is given to you. So, you have to figure out the solutions by yourself as the exercises for who prepare for the [Google Cloud Certified Professional Cloud Architect](https://cloud.google.com/certification/cloud-architect). Some of them are hard and tricky, and you cannot try the labs again and again (because each lab has a limited quota to attempt). So, I am going to make a logbook for each of the labs in the challenge quest. I hope the articles would help you if you get stuck with taking those labs.

This time is about the easiest lab in the challenge quest -- **GSP101** _"[Google Cloud Essential Skills: Challenge Lab](https://google.qwiklabs.com/focuses/1734?parent=catalog)"_. It just asks you to set up a VM instance with running Apache webserver. **Pretty BASIC!** If you know how to do that, I recommend you to try your best. Do not read the rest of the article unless you really need some more Hints.

**Note**: Please DO NOT confuse the current lab with _GSP313 Getting Started: Create and Manage Cloud Resources: Challenge Lab_. If you're looking for that logbook, please [click on the link here](/blog/qwiklabs/Getting-Started-Create-and-Manage_Cloud_Resources-Challenge-Lab).

## Brief Introduction of Challenge Scenario

When you open the page of this lab in Qwiklabs, you can find the task requirements by click the green activity tracker (on the top right of the page) to expand the score box.

{% include picture.html width="606" height="334"
img="qwiklabs/score_box_of_qwiklabs_GSP101.png" alt="Screenshot of Green Score box of Qwiklabs Hands-on-lab GSP101" class="shadow-none text-center" %}

The screenshot above shows that there are 6 steps required for completing this lab. Combining with the instruction details, they are translated to the following mission statements.

1. Create a Linux virtual machine, name it `apache` and specify the zone as `us-central1-a` with necessary firewall rules (`allow HTTP`).

2. Configure Apache2 Web Server in your instance.

3. Test your server that shows a `"Hello World!"` page.

## Step 1 - Create a VM instance

To create a Compute Engine instance, the easiest way is through the GCP web console. In the Console, navigate to _Compute Engine_ > _VM instances_. When you create a new VN instance,

- Make sure you give the instance a name, called `apache`, and
- Select `Allow HTTP traffic` under the Firewall section.

{% include picture.html height="600"
img="qwiklabs/qwiklabs-GSP101-step1-create-GCP-VM-instance.png" alt="Create a GCP VM instance called apache via GCP web console" %}

{% include picture.html width="464" height="248"
img="qwiklabs/qwiklabs-GSP101-step2-allow-HTTP-traffic-in-firewall-setting.png" alt="Select allow HTTP traffic in the firewall setting" %}

You can leave other fields with the default settings, then click **Create**.

{% include picture.html height="241"
img="qwiklabs/qwiklabs-GSP101-check-progress1-VM-created.png" alt="Check your progress: Created Compute Engine instance, called apache" %}

## Step 2 - Install Apache and Overwrite Default Web Page

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

{% include picture.html height="472"
img="qwiklabs/qwiklabs-GSP101-step3-configure-apache2-web-server-in-VM-instance.png" alt="Apache2 Debian Default Page" %}

<br>

Finally, you have to overwrite the default web page to rendering with **"Hello World!"**:

```bash
echo '<!doctype html><html><body><h1>Hello World!</h1></body></html>' | sudo tee /var/www/html/index.html
```

Refresh the web page in your browser,

{% include picture.html width="348" height="146"
img="qwiklabs/qwiklabs-GSP101-step4-test-custom-default-web-page.png" alt="Hello World!" %}

Congratulations! You should accomplish the lab if you follow all the above steps.

This post has also been published to Medium. If you like to read and take notes in Medium, please visit [Medium (@chriskyfung)](https://medium.com/@chriskyfung/qwiklab-logbook-google-cloud-essential-skills-challenge-lab-dda48c5915cf).

* * *

Creating a Compute Engine instance as a web server using the web console is pretty basic. It is always a good start for you to build anything from scratch, and manually install packages via an SSH terminal. Alternatively, you can initialize identical instances with a startup script automatically, and you can practise it in the next lab, _[Qwiklab/Logbook: Deploy a Compute Instance with a Remote Startup Script](/blog/qwiklabs/Deploy-a-Compute-Instance-with-a-Remote-Startup-Script)_.

* * *

**See Also**

- [Learning Google Cloud Platform on Qwiklabs: Learning Map, Assistive Tool and Tips](/blog/qwiklabs/Qwiklabs-User-Tips-for-Learning_Google_Cloud_Platform)
