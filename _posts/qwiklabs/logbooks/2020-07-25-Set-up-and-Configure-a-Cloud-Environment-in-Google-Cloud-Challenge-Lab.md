---
layout: post
title: "☁ Set up and Configure a Cloud Environment in Google Cloud: Challenge Lab"
date: 2020-07-25 16:00 +0800
last_modified_at: 2020-10-08 4:25 +0800
category: Cloud
author: chris
tags: [Qwiklabs, Google Cloud, Logbook, Kubernetes, WordPress, Secure VPC]
permalink: /blog/qwiklabs/Set-up-and-Configure-a-Cloud-Environment-in-Google-Cloud-Challenge-Lab
image: 
   path: /images/posts/qwiklabs/qwiklab-gsp321-title.jpg
excerpt: A brief procedure for the qwiklab practice GSP321. You will practice the skills and knowledge for deploy VPCs for development and production, a Kubernetes cluster and a Cloud SQL instance for a WordPress site.
amp:
   youtube: true
css:
   syntax: true
   custom: >
      table { width: 100%; max-width: 400px; margin-bottom: 1.5rem; }
      .ml-li { margin-left: 2rem }
---

In this article, we will go through the lab **GSP321** _[Set up and Configure a Cloud Environment in Google Cloud: Challenge Lab](https://www.qwiklabs.com/focuses/10603?parent=catalog)_, which is labeled as an [expert-level](https://www.qwiklabs.com/quests/119) exercise. You will practice the skills and knowledge for deploy VPCs for development and production, a Kubernetes cluster and a Cloud SQL instance for a WordPress site.

**The challenge contains 9 required tasks:**

1. Create development VPC manually
1. Create production VPC using Deployment Manager
1. Create bastion host
1. Create and configure Cloud SQL Instance
1. Create Kubernetes cluster
1. Prepare the Kubernetes cluster
1. Create a WordPress deployment
1. Enable monitoring
1. Provide access for an additional engineer

## Task 1: Create development VPC manually

Make sure you create all resources in the `us-east1` region and `us-east1-b` zone.

1. In the Google Cloud Console, navigate to **VPC network** > **VPC networks**
2. Click on **Create VPC network**.
3. Enter `griffin-dev-vpc` to the **Name** field.
4. Select **Custom** for the Subnet creation mode.
5. Add `griffin-dev-wp` subnet with the following parameters:

   | Field     | Value      |
   | ---       |  ---       |
   | Name:      | `griffin-dev-wp` |
   | Region:    | `us-east1` |
   | IP address range: | `192.168.16.0/20` |

6. Click **+ Add subnet** and add `griffin-dev-mgmt` subnet with the following parameters

   | Field     | Value      |
   | ---       |  ---       |
   | Name:      | `griffin-dev-mgmt` |
   | Region:    | `us-east1` |
   | IP address range: | `192.168.32.0/20` |

5. Click **Create**.

## Task 2: Create production VPC using Deployment Manager

1. Copy the Deployment Manager configuration files to Cloud Shell using the following command:

   ```bash
   gsutil cp -r gs://cloud-training/gsp321/dm ~/
   ```

2. Edit `prod-network.yaml` configuration file

   ```bash
   cd dm
   edit prod-network.yaml
   ```

3. Replace `SET_REGION` to `us-east1` in the editor, and then save the change.

4. Go back to the Cloud Shell, use the following command to create the production VPC network with the configuration files:

   ```bash
   gcloud deployment-manager deployments create griffin-prod --config prod-network.yaml
   ````

5. Go back to the Cloud Console, navigate to **Deployment Manager** to confirm the deployment.

   {% include picture.html img="qwiklabs/qwiklab-gsp321-prod-vpc-by-deployment-manager.jpg" alt="Create griffin-dev-vpc network using Deployment Manager" width="1069" height="472" class="ml-li" %}

## Task 3: Create bastion host

1. In the Cloud Console, navigate to **Compute Engine** > **VM instances**.
2. Click **Create**.
3. Use the following parameters to create the bastion host:

   | Field     | Value      |
   | ---       |  ---       |
   | Name:      | `griffin-dev-db` |
   | Region:    | `us-east1` |  

4. Expand the **Management, security, disks, networking, sole tenancy** section.
5. In the **Networking** tab, add `bastion` to the Network tags.
6. Click **Add network interface**, make sure that you set up two Network interfaces,

   - `griffin-dev-mgmt`
   - `griffin-prod-mgmt`

7. Click **Create**.
8. Navigate to **VPC network** > **Firewall**.
9. Click **CREATE FIREWALL RULE**.
10. Configure the rule with the following parameters:

    | Field     | Value      |
    | ---       |  ---       |
    | Name:      | `allow-bastion-dev-ssh` |
    | Network:   | `griffin-dev-vpc` |
    | Targets:   | `bastion` |
    | Source IP ranges: | `192.168.32.0/20` |
    | Protocols and ports: | tcp: `22` |

11. Click **CREATE**.
12. Click **CREATE FIREWALL RULE** again.
13. Configure another rule with the following parameters:

    | Field     | Value      |
    | ---       |  ---       |
    | Name:      | `allow-bastion-prod-ssh` |
    | Network:   | `griffin-prod-vpc` |
    | Targets:   | `bastion` |
    | Source IP ranges: | `192.168.48.0/20` |
    | Protocols and ports: | tcp: `22` |

14. Click **CREATE**.

## Task 4: Create and configure Cloud SQL Instance

1. In the Cloud Console, navigate to **SQL**.
2. Click **CREATE INSTANCE**.
3. Click **Choose MySQL**.
4. Use the following parameters to create the instance:

   | Field     | Value      |
   | ---       |  ---       |
   | Name:      | `griffin-dev-db` |
   | Region:    | `us-east1` |
   | Zone:      | `us-east1-b` |
   | Root password: | e.g. `12345678` |

   **Note**: In real practice, you must set a strong password.

5. Click **Create**.
6. Click the `griffin-dev-db` in the SQL pane after it has created.
7. Under **Connect to this instance**, click on **Connect using Cloud Shell**.
8. Go back to the Cloud Shell, run:

   ```bash
   gcloud sql connect griffin-dev-db --user=root --quiet
   ```

9. Enter the **Root password** generated in Step 4.
10. In the SQL console, run the following query to create the wordpress database:

   ```sql
   CREATE DATABASE wordpress;
   GRANT ALL PRIVILEGES ON wordpress.* TO "wp_user"@"%" IDENTIFIED BY "stormwind_rules";
   FLUSH PRIVILEGES;
   ```

11. Enter `exit` to quit the SQL shell.

## Task 5: Create Kubernetes cluster

Create a 2 node cluster (n1-standard-4) called `griffin-dev`, in the `griffin-dev-wp` subnet, and in the zone `us-east1-b`.

1. In the Cloud Console, navigate to **Kubernetes Engine** > **Clusters**.
2. Click **Create cluster**.
3. In the Cluster basics tab, configure:

   Name: `griffin-dev`  
   Zone: `us-east1-b`

5. In the left pane, click **default-pool** under **NODE POOLS** and set

   Number of nodes: `2`


6. Click **Nodes** Under **default-pool**, and set

   Machine type: `n1-standard-4`

7. Go to the **Network** tab, set

   Network: `griffin-dev-vpc`  
   Node subnet: `griffin-dev-wp`

   {% include picture.html img="qwiklabs/qwiklab-gsp321-k8s-vpc-networking.png" width="913" height="947" alt="Networking settings for new Kubernetes cluster griffin-dev" %}

{:start="8"}
8. Click **CREATE**.
  
## Task 6: Prepare the Kubernetes cluster

1. In the Cloud Shell, use the following command to copy the files for the Kubernetes:

   ```bash
   gsutil cp -r gs://cloud-training/gsp321/wp-k8s ~/
   ```

2. Open `wp-k8s/wp-env.yaml` with the Cloud Shell Editor.

   ```bash
   cd ~/wp-k8s
   edit wp-env.yaml
   ```

3. Replace `username_goes_here` and `password_goes_here` to `wp_user` and `stormwind_rules`, respectively.
4. Save the file change.
5. After the Kubernetes cluster has created, click on the **Connect** button.
6. Run the following command to connect the cluster:

   ```bash
   gcloud container clusters get-credentials griffin-dev --zone=us-east1
   ```

7. Deploy the configuration to the cluster using:

   ```bash
   kubectl apply -f wp-env.yaml
   ```

8. Use the command below to create the key, and then add the key to the Kubernetes environment:

{:.ml-li}
   ```bash
   gcloud iam service-accounts keys create key.json \
       --iam-account=cloud-sql-proxy@$GOOGLE_CLOUD_PROJECT.iam.gserviceaccount.com
   kubectl create secret generic cloudsql-instance-credentials \
       --from-file key.json
   ```

## Task 7: Create a WordPress deployment

1. Open `wp-k8s/wp-deployment.yaml` with the Cloud Shell Editor

   ```bash
   cd ~/wp-k8s
   edit wp-deployment.yaml
   ```

2. Replace `YOUR_SQL_INSTANCE` with `griffin-dev-db`'s Instance connection name.

{% include picture.html img="qwiklabs/qwiklab-gsp321-sql-conf-yaml.jpg" width="673" height="155" class="ml-li text-center" %}

3. Save the file change.
4. Go back to the Cloud Shell, run the following commands:

   ```bash
   kubectl create -f wp-deployment.yaml
   kubectl create -f wp-service.yaml
   ```

5. Copy the External endpoints of the deployed **wordpress** service and open it in your browser.

{% include picture.html img="qwiklabs/qwiklab-gsp321-dev-wordpress.png" alt="WordPress Installation" width="1024" height="768" class="ml-li" %}

## Task 8: Enable monitoring

1. Go back to the Cloud Console, and navigate to **Monitoring**.
2. In the Monitoring console, click **Uptime checks** in the left pane.
3. Click **CREATE UPTIME CHECK**.
4. Configure using the following parameters:

   | Field     | Value      |
   | ---       |  ---       |
   | Title     | `WordPress Uptime` |
   | Check Type | `HTTP` |
   | Resource Type | `URL` |
   | Hostname | `YOUR-WORDPRESS_ENDPOINT` |
   | Path     | `/` |

{% include picture.html img="qwiklabs/qwiklab-gsp321-uptime-check.jpg" alt="new GCP uptime checks monitoring" width="567" height="534" class="ml-li text-center" %}

{:start="5"}
5. Click **TEST**.
6. Click **SAVE** if there is no error.

## Task 9: Provide access for an additional engineer

1. In the Cloud Console, navigate to **IAM & Admin** > **IAM**.
2. Click **+ADD**.
3. In the Add members to ... pane, copy and paste the **second user account** for the lab to the **New members** field.
4. In the Role dropdown, select **Project** > **Editor**.
5. Click **SAVE**.

<br/>

**Congratulations! You completed this challenge lab.**

## Demonstration Video

{% include youtube.html id="p3jUogiOQqk" title="GSP321 Set up and Configure a Cloud Environment in Google Cloud: Challenge Lab (Revised Ed.)" %}

```ts
00:00 Lab start and provisioning
01:06 Create development VPC manually
02:50 Create production VPC using Deployment Manager
07:29 Create a bastion host
08:43 Create the firewall rule to enable SSH connection to the bastion host
11:33 Create a MySQL Cloud SQL Instance
13:03 Create a Kubernetes cluster
15:04 Create the worpdress database
17:03 Prepare the Kubernetes cluster
20:15 Create a WordPress deployment
23:34 Create an uptime check for the WordPress development site.
25:04 Provide access for an additional engineer
```

* * *

**Keep on reading**:

- [Qwiklabs/Logbook: Build and Secure Networks in Google Cloud: Challenge Lab](/blog/qwiklabs/Build-and-Secure-Networks-in-Google-Cloud-Challenge-Lab)
- [Qwiklab/Logbook: Deploy to Kubernetes in Google Cloud: Challenge Lab](/blog/qwiklabs/Deploy-to-Kubernetes-in-Google-Cloud-Challenge-Lab)
- [Qwiklab/Logbook: Build a Website on Google Cloud: Challenge Lab](/blog/qwiklabs/Build-a-Website-on-Google-Cloud-Challenge-Lab)
- [Qwiklab/Logbook: Migrate a MySQL Database to Google Cloud SQL](/blog/qwiklabs/Migrate-a-MySQL-Database-to-Google-Cloud-SQL)

**Useful external link**:

- [VM Migration: Modernize an Application Stack with GKE and MySQL \| Qwiklabs](https://www.qwiklabs.com/focuses/6898?parent=catalog)