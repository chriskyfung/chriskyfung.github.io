---
layout: post
title: "Qwiklab/Logbook: Deploy a Compute Instance with a Remote Startup Script"
date: 2019-09-16
category: Cloud
tags: Qwiklabs Google_Cloud Logbook
---

## Brief Introduction of Challenge Scenario

Tasks:

1. Create a storage bucket for startup scripts, and confirm that a Google Cloud Storage bucket exists that contains a file


2. Create a Linux virtual machine that runs a startup script from cloud storage. Confirm that a compute instance has been created that has a remote startup script called install-web.sh configured

3. Confirm that a HTTP access firewall rule exists with tag that applies to that virtual machine

4. Deploy an application on an instance. Connect to the server ip-address using HTTP and get a non-error response


installs the Apache web server software

In the GCP Console, go to the VM Instances page.
GO TO THE VM INSTANCES PAGE

Click Create instance.
On the Create a new instance page, fill in the properties for your instance. For advanced configuration options, expand the Management, security, disks, networking, sole tenancy section.
In the **Metadata** section, provide `startup-script-url` as the metadata key.
In the **Value** box, provide a URL to the startup script file, either in the gs://[BUCKET]/[FILE] or https://storage.googleapis.com/[BUCKET]/[FILE] format.
In the Identity and API access section, select a service account that has access to read your startup script file in Cloud Storage. For example, the service account should have permissions of the Storage Object Viewer role.
Click Create to create the instance.

Metadata

https://cloud.google.com/compute/docs/startupscript



Serial Console