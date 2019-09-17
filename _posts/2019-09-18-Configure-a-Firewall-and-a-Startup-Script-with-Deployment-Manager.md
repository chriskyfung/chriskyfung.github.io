---
layout: post
title: "Qwiklab/Logbook: Configure a Firewall and a Startup Script with Deployment Manager"
date: 2019-09-18
category: Cloud
tags: Qwiklabs Google_Cloud Logbook
---

## Brief Introduction of Challenge Scenario


Tasks:

1. Configure a deployment template to include a startup script. A new Deployment Manager deployment has been created.

2. The deployment includes a virtual machine that has an embedded startup-script.

3. The virtual machine that has a startup-script also has a tag item called http.

4. A firewall rule exists that allows port 80 (http) traffic and is applied using a tag with a value of `http`.

5. Include a startup script for the compute instance that installs the apache web server application. The virtual machine responds to web requests using the Apache web server

6. Check that Deployment manager includes startup script and firewall resources

Refer the Quest called [Deployment Manager](https://www.qwiklabs.com/quests/30)

allow-http


Verify that the Deployment Manager API is enabled
In the GCP Console, on the Navigation menu (mainmenu.png), click APIs & services > Library.
In the search bar, type Deployment Manager and click the result for Google Cloud Deployment Manager V2 API.
Verify that the API is enabled.
![dm_api_enabled.png](https://cdn.qwiklabs.com/tf4lXNzwIxiz5e9TFsJxl8gMQNOYodBlr9xifO6i2MA%3D)

[Configuring Deployment Manager Templates](https://www.qwiklabs.com/focuses/1860)
[Deployment Manager for Appserver](https://www.qwiklabs.com/focuses/1863)
Examine the resource properties

https://www.json2yaml.com/

[REST Resource: instances  |  Compute Engine  |  Google Cloud](https://cloud.google.com/compute/docs/reference/rest/v1/instances)

[Deployment Manager - Automating Network Deployment](https://www.qwiklabs.com/focuses/1235)

Setting Metadata and Using Startup Scripts  |  Cloud Deployment Manager Documentation  |  Google Cloud
https://cloud.google.com/deployment-manager/docs/step-by-step-guide/setting-metadata-and-startup-scripts


```jinja
resources:
- type: compute.v1.instance
  name: vm-test
  properties:
    zone: {{ properties["zone"] }}
    machineType: https://www.googleapis.com/compute/v1/projects/{{ env["project"] }}/zones/{{ properties["zone"] }}/machineTypes/f1-micro
    # For examples on how to use startup scripts on an instance, see:
    #   https://cloud.google.com/compute/docs/startupscript
    disks:
    - deviceName: boot
      type: PERSISTENT
      boot: true
      autoDelete: true
      initializeParams:
        diskName: disk-{{ env["deployment"] }}
        sourceImage: https://www.googleapis.com/compute/v1/projects/debian-cloud/global/images/family/debian-9
    networkInterfaces:
    - network: https://www.googleapis.com/compute/v1/projects/{{ env["project"] }}/global/networks/default
      # Access Config required to give the instance a public IP address
      accessConfigs:
      - name: External NAT
        type: ONE_TO_ONE_NAT
    metadata:
      items:
      - key: startup-script
        value: |
           #!/bin/bash
           apt-get update
           apt-get install -y apache2
    tags:
      items:
      - http
    serviceAccounts:
    - email: 27225449300-compute@developer.gserviceaccount.com
      scopes:
      - https://www.googleapis.com/auth/devstorage.read_only
      - https://www.googleapis.com/auth/logging.write
      - https://www.googleapis.com/auth/monitoring.write
      - https://www.googleapis.com/auth/servicecontrol
      - https://www.googleapis.com/auth/service.management.readonly
      - https://www.googleapis.com/auth/trace.append
- type: compute.v1.firewall
  name: default-allow-http
  properties:
    network: https://www.googleapis.com/compute/v1/projects/{{ env["project"] }}/global/networks/default
    targetTags: 
    - http
    allowed:
    - IPProtocol: tcp
      ports: 
      - '80'
    sourceRanges: 
    - 0.0.0.0/0

    ```