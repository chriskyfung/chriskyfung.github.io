---
layout: post
title: "Qlog: Build and Secure Networks in Google Cloud: Challenge Lab"
date: 2020-08-15 12:00 +0800
category: Cloud
author: chris
tags: [Qwiklabs, Google Cloud, Logbook, Secure VPC]
permalink: /blog/qwiklabs/Build-and-Secure-Networks-in-Google-Cloud-Challenge-Lab
image: 
   path: /images/posts/qwiklabs/qwiklab-gsp322-title.jpg
excerpt: A brief procedure for the qwiklab practice GSP322.
amp:
   youtube: true
css:
   syntax: true
   custom: >
      table { width: 100%; max-width: 400px; margin-bottom: 1.5rem; }
      .ml-li { margin-left: 2rem }
---

In this article, we will go through the lab **GSP322** _[Build and Secure Networks in Google Cloud: Challenge Lab](https://www.qwiklabs.com/focuses/12068?parent=catalog)_, which is labeled as an [expert-level](https://www.qwiklabs.com/quests/128) exercise. You will need to set up firewall rules to configure a simple environment securely that only allow SSH to the bastion via IAP.

**The challenge contains 6 required tasks:**

1. Remove the overly permissive rules
2. Start the bastion host instance
3. Create a firewall rule that allows SSH (tcp/22) from the IAP service and add network tag on bastion
4. Create a firewall rule that allows traffic on HTTP (tcp/80) to any address and add network tag on juice-shop
5. Create a firewall rule that allows traffic on SSH (tcp/22) from acme-mgmt-subnet network address and add network tag on juice-shop
6. SSH to bastion host via IAP and juice-shop via bastion


## 1. Remove the overly permissive rules

This task is very simple. You only need to the open-access firewall rules.

1. In the Cloud Console, navigate to **Menu** > **VPC Network** > **Firewall**
2. Check the box next to the rule named `open-access`.
3. Click on **DELETE** to remove it.

{% include picture.html img="qwiklabs/qwiklab-gsp322-task1-delete-open-access.jpg" width="1024" height="576" alt="Remove open-access firewall rules on Google Cloud Platform" %}

## 2. Start the bastion host instance

1. In the Cloud Console, navigate to **Menu** > **Compute Engine** > **VM instances**
2. Check the box next to the instance named `bastion`.
3. Click on **Start** to run the instance.

## 3. Create a firewall rule that allows SSH (tcp/22) from the IAP service and add network tag on bastion

### Add network tag on bastion

1. On the VM instances page, click on the name of the **bastion** instance.
2. Click **EDIT** on the details page.
3. Add `bastion` to the **Network tags** field.
4. Scroll to the button of the page and click **Save**.

### Create firewall rule to allow SSH form the IAP service

Read [**Using IAP for TCP forwarding**](https://cloud.google.com/iap/docs/using-tcp-forwarding#create-firewall-rule) in the Google Cloud Documentation before you create the firewall rule.

{% include picture.html img="qwiklabs/qwiklab-gsp322-iap-ip.jpg" width="916" height="469" alt="create a firewall rule to allow IAP to connect to your VM instances in Google Cloud Console" %}

1. Go back to the Firewall Rules page, and click **Create firewall rule**.
2. Configure the following settings:

   |  Field    |   Value    |
   | ---       | ---        |
   | Name | e.g. `allow-ssh-from-iap` |
   | Direction of traffic | Ingress |
   | Targets | Specified target tags |
   | Target tags | `bastion` |
   | Source IP ranges | `35.235.240.0/20` |
   | Protocols and ports | Select **TCP** and enter `22` to allow SSH |

{% include picture.html img="qwiklabs/qwiklab-gsp322-iap-firewall-rule-settings.jpg" width="552" height="887" alt="Firewall rule settings for the secure remote ssh access via IAP-enabled bastion" class="text-center" %}

## 4. Create a firewall rule that allows traffic on HTTP (tcp/80) to any address and add network tag on juice-shop

### Create firewall rule to allow HTTP traffic to juice-shop

1. On the Firewall Rules page, and click **Create firewall rule**.
2. Configure the following settings:

   |  Field    |   Value    |
   | ---       | ---        |
   | Name | e.g. `allow-http-ingress` |
   | Direction of traffic | Ingress |
   | Targets | Specified target tags |
   | Target tags | `juice-shop` |
   | Source IP ranges | `0.0.0.0/0` |
   | Protocols and ports | Select **TCP** and enter `80` to allow HTTP |

{% include picture.html img="qwiklabs/qwiklab-gsp322-firewall-rule-settings-for-juice-shop.jpg" width="548" height="902" alt="Firewall rule settings for the juice-shop VM instance" class="text-center" %}

### Add network tag on juice-shop

1. On the VM instances page, click on the name of the **juice-shop** instance.
2. Click **EDIT** on the details page.
3. Add `juice-shop` to the **Network tags** field.
4. Scroll to the button of the page and click **Save**.

## 5. Create a firewall rule that allows traffic on SSH (tcp/22) from acme-mgmt-subnet network address and add network tag on juice-shop

1. Navigate to **VPC network** > **VPC networks**.
2. Copy the IP address range of the `acme-mgmt-subnet`.
3. Go back to the Firewall Rules page, and click **Create firewall rule**.
4. Configure the following settings:

   |  Field    |   Value    |
   | ---       | ---        |
   | Name | e.g. `allow-ssh-from-mgmt-subnet` |
   | Direction of traffic | Ingress |
   | Targets | Specified target tags |
   | Target tags | `bastion` and `juice-shop` |
   | Source IP ranges | _IP address range of your aceme-mgmt-subnet_ |
   | Protocols and ports | Select **TCP** and enter `22` to allow SSH |

{% include picture.html img="qwiklabs/qwiklab-gsp322-firewall-rule-settings-for-ssh-from-acme-mgmt-subnet.jpg" width="562" height="887" alt="Firewall rule settings for the SSH traffic from acme-mgmt-subnet" class="text-center" %}

## 6. SSH to bastion host via IAP and juice-shop via bastion

After configuring the firewall rules, try to verify the environment via the bastion.

1. Navigate to **Compute Engine** > **VM instances**.
2. Copy the Internal IP of the **juice-shop** instance.
3. Click on the SSH button in the row of the **bastion** instance.
3. In the SSH console, access the juice-shop from the bastion using the following command:

   ```bash
   ssh <internal-IP-of-juice-shop>
   ```

   (Remember to REPLACE `<internal-IP-of-juice-shop>` with the copied IP address)

<br/>

**Congratulations! You completed this challenge lab.**

## Demonstration Video

{% include youtube.html id="NToEHzJTpgs" title="GSP322 Build and Secure Networks in Google Cloud: Challenge Lab" %}

```ts
0:00 Start Lab and Provisioning
2:18 Remove the overly permissive rules
3:00 Start the bastion host instance
5:37 Create a firewall rule that allows SSH (tcp/22) from the IAP service and add network tag on bastion
7:30 Create a firewall rule that allows traffic on HTTP (tcp/80) to any address and add network tag on juice-shop
9:20 Create a firewall rule that allows traffic on SSH (tcp/22) from acme-mgmt-subnet
11:18 SSH to bastion host via IAP and juice-shop via bastion
```

* * *

**Keep on reading**:

- [Qwiklabs/Logbook: Configure a Firewall and a Startup Script with Deployment Manager](/blog/qwiklabs/Configure-a-Firewall-and-a-Startup-Script-with-Deployment-Manager)
- [Qwiklabs/Logbook: Set up and Configure a Cloud Environment in Google Cloud: Challenge Lab](/blog/qwiklabs/Set-up-and-Configure-a-Cloud-Environment-in-Google-Cloud-Challenge-Lab)
- [Qwiklabs/Logbook: Configure Secure RDP using a Windows Bastion Host with Terraform on GCP](/blog/qwiklabs/Configure-Windows-Bastion-Host-with-Terraform-on-GCP)