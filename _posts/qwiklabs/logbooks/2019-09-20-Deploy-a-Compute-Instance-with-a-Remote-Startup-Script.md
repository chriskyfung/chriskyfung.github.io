---
layout: post
title: "☁ Deploy a Compute Instance with a Remote Startup Script | logbook"
author: chris
date: 2019-09-20
category: Cloud
tags: Qwiklabs Google_Cloud Logbook
category: Cloud
tags: [Qwiklabs, Google Cloud, Logbook]
permalink: /blog/qwiklabs/Deploy-a-Compute-Instance-with-a-Remote-Startup-Script
redirect_from:
 - /blog/2019/09/20/Deploy-a-Compute-Instance-with-a-Remote-Startup-Script
excerpt: A lab summary of qwiklab GSP301 "Deploy a Compute Instance with a Remote Startup Script" | 1. Download Sample Startup Script | 2. Upload the Startup Script to a Cloud Storage Bucket | 3. Configure Metadata in Creating VM instance | 4. Inspect Instance Correctly Running Startup Script
description: A step-by-step guilde for deploying a VM instance with automaticlly installing Apache web server package by using a Remote Startup Script on Google Cloud Platform.
image: 
   path: /images/posts/qwiklabs/qwiklabs-GSP301-configure-startup-script-url-to-metadata.png
   width: 454
   height: 174
css:
   custom: >-
      .ml-5 {
         margin-left: 3rem;
      }
---

If you read my [last post](/blog/qwiklabs/Google-Cloud-Essential-Skills-Challenge-Lab), you should know how to manually create a VM instance and configure it as an Apache2 web server with the web console in Google Cloud Platform (GCP). The steps are easy but you can automate and scale your web server installation process by adopting a **Startup Script**. Loading the startup script remotely from a cloud storage bucket is one method. The second lab of the challenge quest, **GSP301** _"[Deploy a Compute Instance with a Remote Startup Script](https://www.qwiklabs.com/focuses/1735?parent=catalog)"_, is to test if you can deploy an Apache server to a VM instance with a remote startup script. You must know how to create a bucket and upload files to Google Cloud Storage, and configure the metadata in the dialog of creating an instance.

## Brief Introduction of Challenge Scenario

When you open the page of this lab in Qwiklabs, you can find the task requirements by click the green activity tracker (on the top right of the page) to expand the score box.

{% include picture.html width="603" height="582"
img="qwiklabs/score_box_of_qwiklabs_GSP301.png" alt="Screenshot of Green Score box of Qwiklabs Hands-on-lab GSP301" caption="Screenshot of Qwiklabs hands-on-lab GSP301 scorebox" class="shadow-none text-center" %}

The screenshot above shows that there are 4 steps required for completing this lab. Combining with the instruction details, they are translated to the following mission statements.

1. Create a Google Cloud Storage bucket, and confirm that the bucket contains a file.

2. Create a Linux virtual machine that runs a remote startup script called `install-web.sh`  from cloud storage.

3. Confirm that an HTTP access firewall rule exists with tag that applies to that virtual machine.

4. Confirm the web server can be connected using HTTP and get a non-error response.

{% include picture.html width="724" height="382"
img="qwiklabs/qwiklab-GSP301-schematic.png" alt="Schematic diagram of Qwiklabs GSP301: Deploy a Compute Instance with a Remote Startup Script" caption="Schematic diagram of GSP301: Deploy a Compute Instance with a Remote Startup Script" class="shadow-none" %}

## Download Sample Startup Script

First of all, find **Sample Startup Script** below the Start button and the timer of the lab. Then, download the startup script file to your computer. This lab requires a minute for provisioning lab resources. You may make use of this interval to download the file or take a drink.

{% include picture.html width="339" height="318"
img="qwiklabs/qwiklabs-GSP301-download-startup-script-file.png" alt="download sample startup script below the qwiklabs start button and lab timer" caption="Download sample startup script below the Qwiklabs start button and lab timer" class="shadow-none"%}

## Upload the Startup Script to a Cloud Storage Bucket

1. In the web console, navigate to **_Storage_**.
2. Create a bucket with a unique bucket name.
3. Upload the `install-web.sh` file to the bucket.
4. Make the file publicly accessible (This ensures the file can be access by the VM instance deployed soon).

{% include picture.html width="397" height="306"
img="qwiklabs/qwiklabs-GSP301-edit-file-permission-in-GCP-storage-bucket.png" alt="Edit the file permissions in Cloud Storage using GCP web console" class="ml-5" %}

{:.ml-5}
Click the three dots (<i class='fas fa-ellipsis-v'></i>) icon at the right end of the filename. Choose **_Edit permissions_** in the dropdown menu.

{% include picture.html width="527" height="441"
img="qwiklabs/qwiklabs-GSP301-add-allusers-read-permission-to-install-web-sh.png" alt="Add allUsers and Reader access to the file" class="ml-5" %}

{:.ml-5}
Add a new **User**, type `allUsers` to the name field, and choose **Reader**.

{% include picture.html width="632" height="244"
img="qwiklabs/qwiklabs-GSP301-make-install-web-sh-publicly-accessible.png" alt="Confirm the install-web.sh file become pubilcly accessible" class="ml-5" %}

{:start="5"}

5. Click the filename and copy the URL, i.e. `gs://.../install-web.sh` for later use.<br>{% include picture.html width="682" height="299"
img="qwiklabs/qwiklabs-GSP301-obtain-gs-url-startup-script-file.png" alt="Object details in Cloud Storage" caption="Confirm the startup script file become pubilcly accessible" class="ml-5" %}

## Configure Metadata in Creating VM instance

1. Go to **_Compute Engine_**, create a new VM instance.

2. Select `Allow HTTP traffic` under the Firewall section.
{% include picture.html width="464" height="248"
img="qwiklabs/qwiklabs-GSP101-step2-allow-HTTP-traffic-in-firewall-setting.png" alt="Firewall rule setting for creating a VM instance" class="ml-5" %}

{:start="3"}

3. Expand **Management, security, disks, networking, sole tenancy**.

4. In the Metadata section, add `startup-script-url` and paste the URL of the script file as the key value.

{% include picture.html width="454" height="174"
img="qwiklabs/qwiklabs-GSP301-configure-startup-script-url-to-metadata.png" alt="Configure a remote startup script url to the metadata in Crate a VM instance page" class="ml-5" %}

{:.ml-5}
If you want to learn more, please refer [Running Startup Scripts](https://cloud.google.com/compute/docs/startupscript) in Compute Engine Documentation.

{:start="5"}

5. Click **Create** to create the instance.
{% include picture.html width="682" height="174"
img="qwiklabs/qwiklabs-GSP301-check-progress-created-instance-1.png" alt="Successfully created instance-1" caption="The new Compute Engine, `instance-1`" class="ml-5"%}

## Inspect Instance Correctly Running Startup Script

1. Wait for the new VM instance startup.

2. Click the instance name to open its Details tab. Then, expand the Logs and click **Serial port 1 (console)**.

{% include picture.html width="674" height="380"
img="qwiklabs/qwiklabs-GSP301-view-serial-port-of-created-vm-instance.png" alt="Serial port logs showing in the Details tab of instance-1" class="ml-5" %}

{:start="3"}

3. The startup script automatically installs the Apache web server software while creating the VM instance. You should able to find the log events about downloading the startup script and installing the apache packages.

{% include picture.html width="682" height="343"
img="qwiklabs/qwiklabs-GSP301-logs-of-serial-port-1.png" alt="Serial Log: downloading startup script" class="ml-5" %}

{% include picture.html width="682" height="165"
img="qwiklabs/qwiklabs-GSP301-apache-installation-in-logs-of-serial-port-1.png" alt="Serial Logs: installing Apache with startup script" class="ml-5" caption="Logs that shows the execution of the startup script" class="ml-5" %}

{:start="4"}

4. Open the external IP in your web browser. You should view the Apache default page, if the startup script has been successfully executed.

{% include picture.html width="682" height="441"
img="qwiklabs/qwiklabs-GSP101-step3-configure-apache2-web-server-in-VM-instance.png" alt="Apache2 Debian Default Page" caption="The Apache web server installed by the startup script" class="ml-5" %}

Congratulations! You should accomplish the lab if you follow all the above steps.

This post has also been published to Medium. If you like to read and take notes in Medium, please visit [Medium (@chriskyfung)](https://medium.com/@chriskyfung/qwiklab-logbook-deploy-a-compute-instance-with-a-remote-startup-script-2300f5aecc16).

* * *

With the GCP web console, you can to set up a VM instance as a web server without touch any codes. In this lab, you also automate the installation of web server packages using a startup script. But if you need to repeatedly deploy cloud resources more systematically, you go for Cloud Deployment Manager. [Next lab](/blog/qwiklabs/Configure-a-Firewall-and-a-Startup-Script-with-Deployment-Manager) tests your proficiency of building a deployment template for creating a VM instance with appropriate firewall rule for HTTP traffic.

* * *

**See Also**

- [Learning Google Cloud Platform on Qwiklabs: Learning Map, Assistive Tool and Tips](/blog/qwiklabs/Qwiklabs-User-Tips-for-Learning_Google_Cloud_Platform)
- [Qwiklab/Logbook: Google Cloud Essential Skills: Challenge Lab](/blog/qwiklabs/Google-Cloud-Essential-Skills-Challenge-Lab)