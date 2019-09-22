---
layout: post
title: "Qwiklab/Logbook: Deploy a Compute Instance with a Remote Startup Script"
date: 2019-09-20
category: Cloud
tags: Qwiklabs Google_Cloud Logbook
category: Cloud
tags: [Qwiklabs, Google Cloud, Logbook]
permalink: /blog/qwiklabs/Deploy-a-Compute-Instance-with-a-Remote-Startup-Script
redirect_from:
 - /blog/2019/09/20/Deploy-a-Compute-Instance-with-a-Remote-Startup-Script
excerpt: A lab summary of qwiklab GSP301 "Deploy a Compute Instance with a Remote Startup Script" | 1. Download Sample Startup Script | 2. Upload the Startup Script to a Cloud Storage Bucket | 3. Configure Metadata in Creating VM instance | 4. Inspect Instance Correctly Running Startup Script
header: 
   teaser: /images/posts/qwiklabs/qwiklabs-GSP301-configure-startup-script-url-to-metadata.png
---

If you read my [last post](/blog/qwiklabs/Google-Cloud-Essential-Skills-Challenge-Lab), you should know how to manually create a VM instance and configure it as an Apache2 web server with the web console in Goolge Cloud Platform (GCP). The steps are easy but you can automate and scale up your web server installation process by adopting **Startup Script**. Loading the startup script remotely from a cloud storage bucket is one method. The second lab of the challenge quest, **GSP301** _"[Deploy a Compute Instance with a Remote Startup Script](https://www.qwiklabs.com/focuses/1735?parent=catalog)"_, is to test if you can deploy an Apache server to a VM instance with a remote startup script. You must know how to create a bucket and upload files to Google Cloud Storage, and configure the metadata in the dialog of create an incstance.

## Brief Introduction of Challenge Scenario

When you open the page of this lab in Qwiklabs, you can find the task requirements by click the green activity tracker (on the top right of the page) to expand the score box.

![Screenshot of Green Score box of Qwiklabs Hands-on-lab GSP101](/images/posts/qwiklabs/score_box_of_qwiklabs_GSP301.png)


The screenshot above shows that there are 4 steps required for completing this lab. Combining with the instruction details, they are translated to the following mission statements.

1. Create a Google Cloud Storage bucket, and confirm that the bucket contains a file.

2. Create a Linux virtual machine that runs a remote startup script called `install-web.sh`  from cloud storage.

3. Confirm that a HTTP access firewall rule exists with tag that applies to that virtual machine.

4. Comfirm the web server can be connected using HTTP and get a non-error response.

<br>

## Download Sample Startup Script

First of all, find **Sample Startup Script** below the Start button and the timer of the lab. Then, download the startup script file to your computer. This lab requires a minute for provisioning lab resoureces. You may make use of this interval to download the file or take a drink.

![download sample startup script below the qwiklabs start button and lab timer](/images/posts/qwiklabs/qwiklabs-GSP301-download-startup-script-file.png)

## Upload the Startup Script to a Cloud Storage Bucket

1. In the web console, go to **_Storage_**.
2. Create a bucket with a unique bucket name.
3. Upload the `install-web.sh` file to the bucket.
4. Make the file publicly accessible (This ensures the file can be access by the VM instance deployed soon).
 <br>![GCP web console](/images/posts/qwiklabs/qwiklabs-GSP301-edit-file-permission-in-GCP-storage-bucket.png)<br>
 Click the three dots (<i class='fas fa-ellipsis-v'></i>) icon at the right end of the filename. Choose **_Edit permissions_** in the dropdown menu.<br>
![Add allUsers and Reader access to the file](/images/posts/qwiklabs/qwiklabs-GSP301-add-allusers-read-permission-to-install-web-sh.png)<br>
Add a new **User**,type `allUsers` to the name field, and choose **Reader**.<br>
![Confirm the install-web.sh file become pubilcly accessible](/images/posts/qwiklabs/qwiklabs-GSP301-make-install-web-sh-publicly-accessible.png)<br>

5. Click the filename and copy the URL, i.e. `gs://.../install-web.sh` for later use.<br>![Object details in Cloud Storage](/images/posts/qwiklabs/qwiklabs-GSP301-obtain-gs-url-startup-script-file.png)

## Configure Metadata in Creating VM instance

1. Go to **_Compute Engine_**, create a new VM instance.
2. Select `Allow HTTP traffic` in the Firewall section.
![Firewall rule setting for creating a VM instance](/images/posts/qwiklabs/qwiklabs-GSP101-step2-allow-HTTP-traffic-in-firewall-setting.png)
3. Expand **Management, security, disks, networking, sole tenancy**.
4. In the Metadata section, add `startup-script-url` and paste the URL of the script file as the key value.
![Configure a remote startup script url to the metadata in Crate a VM instance page](/images/posts/qwiklabs/qwiklabs-GSP301-configure-startup-script-url-to-metadata.png)
If you want to learn more, please refer [Running Startup Scripts](https://cloud.google.com/compute/docs/startupscript) in Compute Engine Documentation.
<br>
5. Click **Create** to create the instance.
![Successfully created instance-1](/images/posts/qwiklabs/qwiklabs-GSP301-check-progress-created-instance-1.png)

## Inspect Instance Correctly Running Startup Script

1. Wait for the new VM instance startup.
2. Click the instance name to open its Details tab. Then, expand the Logs and click **Serial port 1 (console)**.
![Serial port logs showing in the Details tab of instance-1](/images/posts/qwiklabs/qwiklabs-GSP301-view-serial-port-of-created-vm-instance.png)
installs the Apache web server software
3. You should able to find the lines about downloading the startup script and installing the apache packages.
![Serial Log: downloading startup script](/images/posts/qwiklabs/qwiklabs-GSP301-logs-of-serial-port-1.png)<br><br>
![Serial Logs: installing Apache with startup script](/images/posts/qwiklabs/qwiklabs-GSP301-apache-installation-in-logs-of-serial-port-1.png)

4. Open the external IP in your web browser. You should view the Apache default page, if the startup script has been successfully executed.
![Apache2 Debian Default Page](/images/posts/qwiklabs/qwiklabs-GSP101-step3-configure-apache2-web-server-in-VM-instance.png)

Congratulations! You should accomplish the lab if you follow all above steps.

* * *

Related posts:

- _[Userscript for Labelling Completed Qwiklabs](/blog/qwiklabs/Google-Cloud-Essential-Skills-Challenge-Lab)_

- _[Qwiklab/Logbook: Google Cloud Essential Skills: Challenge Lab](/blog/qwiklabs/Google-Cloud-Essential-Skills-Challenge-Lab)_