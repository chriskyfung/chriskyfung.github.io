---
layout: post
title: "☁ Optimize Costs for Google Kubernetes Engine: Challenge Lab | logbook"
date: 2021-03-18 11:45 +0800
last_modified_at: 2021-06-29 15:15 +0800
category: Cloud
author: chris
tags: [Qwiklabs, Google Cloud, Logbook, Kubernetes]
permalink: /blog/qwiklabs/optimize-costs-for-google-kubernetes-engine-challenge-lab
redirect_from:
   - /blog/qwiklabs/GSP343
   - /blog/qwiklabs/gsp343
image:
   path: /images/posts/qwiklabs/gsp343-cover.png
excerpt: A brief procedure for the Google Cloud self-paced training GSP342 "Optimize Costs for Google Kubernetes Engine&colon; Challenge Lab" on Qwiklabs. You'll practice the skills in binding IAM security roles to a service account and create a private Kubernetes Engine cluster on Google Cloud Platform.
amp:
   youtube: true
css:
   syntax: true
   custom: >
      .ml-li { margin-left: auto; }
---

In this article, we will go through the lab **GSP343** _[Optimize Costs for Google Kubernetes Engine&colon; Challenge Lab](https://www.qwiklabs.com/focuses/16327?parent=catalog)_, which is an [advanced-level](https://www.qwiklabs.com/quests/157) exercise on Qwiklabs. You will practice the following topics:

- Deploying an app on a multi-tenant cluster
- Migrating cluster workloads to an optimized node pool
- Rolling out an application update while maintaining cluster availability
- Cluster and pod autoscaling

## Task 1: Create our cluster and deploy our app

Make sure that you:

- Create the cluster in the `us-central1` region,
- Use `onlineboutique-cluster` as the cluster name according to the naming scheme for team-resource,
- Make the zonal cluster with only two (2) nodes, and
- Start with machine type `n1-standard-2` (2 vCPU, 8G memory).

**Hints:** Review the README and the files within the [@GoogleCloudPlatform/microservices-demo](https://github.com/GoogleCloudPlatform/microservices-demo) repository on GitHub.

The following example will create the cluster to the zone `us-central1-a` using the command-line tools.

1. Set the zone as a variable in the Cloud Shell.

   ```bash
   ZONE=us-central1-a
   ```

2. Run the following to create the cluster with the specified configuration:

   ```bash
   gcloud container clusters create onlineboutique-cluster \
      --project=${DEVSHELL_PROJECT_ID} --zone=${ZONE} \
       --machine-type=n1-standard-2 --num-nodes=2
   ```

3. After the GKE cluster is created, you need to set up the namespaces `dev` and `prod`.

   ```bash
   kubectl create namespace dev
   kubectl create namespace prod
   ```

4. You will deploy the application to the `dev` namespace. Switch the current namespace from `default` to `dev`:

   ```bash
   kubectl config set-context --current --namespace dev
   ```

5. Copy the application files to the Shell environment, and then deploy the **OnlineBoutique** app to GKE:

   ```bash
   git clone https://github.com/GoogleCloudPlatform/microservices-demo.git
   cd microservices-demo
   kubectl apply -f ./release/kubernetes-manifests.yaml --namespace dev
   ```

6. Wait until the load balancer exposes an External IP for the `frontend-external` service. You can monitor the service status using the following command:

   ```bash
   kubectl get svc -w --namespace dev
   ```

   *Press **CTRL+C** to stop the monitoring.*

   {% include picture.html img="qwiklabs/gsp343-task1-get-frontend-external-ip.png"
      width="1244" height="374" alt="Monitor service status using Watch command" class="ml-li" %}

{:start="7"}
7. Open `http://<EXTERNAL_IP>` in a new tab. You should see the homepage of the Online Boutique application like this:

   {% include picture.html img="qwiklabs/gsp343-task1-deployed-online-boutique-application.jpg"
      width="1248" height="1056" alt="The Homepage of the Online Boutique demo application" class="ml-li" %}

## Task 2: Migrate to an Optimized Nodepool

Make sure that you:

- create a new node pool named `optimized-pool`,
- configure `custom-2-3584` as the machine type, and
- set the number of nodes to `2`;
- migrate the application to the new node pool by cordoning off and draining `default-pool`; and
- delete the `default-pool` after the migration.

**Hints:** Review the lab **GSP767** [_Exploring Cost-optimization for GKE Virtual Machines_](https://www.qwiklabs.com/focuses/15577?parent=catalog) on Qwiklabs.

1. Run the following to create the node pool as specified:

   ```bash
   gcloud container node-pools create optimized-pool \
      --cluster=onlineboutique-cluster \
      --machine-type=custom-2-3584 \
      --num-nodes=2 \
      --zone=$ZONE
   ```

   {% include picture.html img="qwiklabs/gsp343-task2-create-optimized-node-pool.png"
      width="945" height="445" alt="Creating optimized node pool for GKE cluster" class="ml-li" %}

{:start="2"}
2. Wait until the status of the new node pool becomes **OK**.

3. Cordon and drain the `default-pool`:

   ```bash
   for node in $(kubectl get nodes -l cloud.google.com/gke-nodepool=default-pool -o=name); do
      kubectl cordon "$node";
   done
   
   for node in $(kubectl get nodes -l cloud.google.com/gke-nodepool=default-pool -o=name); do
      kubectl drain --force --ignore-daemonsets --delete-local-data --grace-period=10 "$node";
   done
   ```

4. Verify if your pods are running on the new, `optimized-pool, node pool:

   ```bash
   kubectl get pods -o=wide --namespace dev
   ```

5. With the pods migrated, it's safe to delete the `default-pool`:

   ```bash
   gcloud container node-pools delete default-pool \
      --cluster onlineboutique-cluster --zone $ZONE
   ```

   {% include picture.html img="qwiklabs/gsp343-task2-after-cordon-drain-and-delete-default-node-pool.png"
      width="1046" height="275" alt="After cordon, drain, and delete the default pool from the GKE cluster" class="ml-li" %}

## Task 3: Apply a Frontend Update

1. Set a [pod disruption budget](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#-em-poddisruptionbudget-em- "Kubectl Reference Docs") for your `frontend` deployment. Name it `onlineboutique-frontend-pdb` and set the min-availability of your deployment to 1.

   ```bash
   kubectl create poddisruptionbudget onlineboutique-frontend-pdb \
   --selector app=frontend --min-available 1  --namespace dev
   ```

2. Use [`kubectl edit`](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#edit "Kubectl Reference Docs") to update resources:

   ```bash
   KUBE_EDITOR="nano" kubectl edit deployment/frontend --namespace dev
   ```

   Change the following in the configuration:
   - **image** to `gcr.io/qwiklabs-resources/onlineboutique-frontend:v2.1`, and
   - **imagePullPolicy** to `Always`

   Save the file changes.

   {% include picture.html img="qwiklabs/gsp343-task3-kubectl-edit.png" width="863" height="708"
      alt="change the image and image pull policy with kubectl edit" class="ml-li" %}

{:start="3"}
3. (_Optional_) In the Cloud Console, navigate to **Kubernetes Engine** > **Workloads** and click the `frontend` deployment. Go to the **REVISION HISTORY** tab, you should see the latest revision updates to `onlineboutique-frontend:v2.1`.

   {% include picture.html img="qwiklabs/gsp343-task3-frontend-v2.1-in-revision-history.png"
      width="956" height="262" alt="Revision 2" class="ml-li" %}

## Task 4: Autoscale from Estimated Traffic

1. You need to apply **horizontal pod autoscaling** to your **frontend deployment** with:

   - scaling based on a target CPU percentage of 50, and
   - setting the pod scaling between 1 minimum and 13 maximum.

   Run the following to configure the autoscaler:

   ```bash
   kubectl autoscale deployment frontend --cpu-percent=50 \
      --min=1 --max=13 --namespace dev
   ```

2. Check the status of the autoscalers by running:

   ```bash
   kubectl get hpa --namespace dev
   ```

   {% include picture.html img="qwiklabs/gsp343-task4-kubectl-get-hea.png"
      width="1159" height="55" alt="Horizontal pod autoscaler for the frontend deployment" class="ml-li" %}

{:start="3"}
3. Update your **cluster autoscaler** to scale between 1 node minimum and 6 nodes maximum.

   ```bash
   gcloud beta container clusters update onlineboutique-cluster \
      --enable-autoscaling --min-nodes 1 --max-nodes 6 --zone $ZONE
   ```

   {% include picture.html img="qwiklabs/gsp343-task4-cluster-autoscaler.png"
      width="624" height="302" alt="Cluster autoscaler for the optimized node pool" class="ml-li" %}

{:start="4"}
4. To test the autoscalers, run the following to perform a load test to simulate the traffic surge.

   ```bash
   kubectl exec $(kubectl get pod --namespace=dev | grep 'loadgenerator' | cut -f1 -d ' ') \
      -it --namespace=dev -- bash -c "export USERS=8000; sh ./loadgen.sh"
   ```

   The command produces traffic on the store from a `loadgenerator` pod with a high number of concurrent users.

5. Navigate to the OVERVIEW tab of the **frontend deployment**, you should see a sharp increase in CPU, Memory, and Disk utilization after the load test started.

   {% include picture.html img="qwiklabs/gsp343-task4-monitoring-traffic-spike.png"
      width="624" height="302" alt="High CPU, Memory and Disk utilization yielded by traffic spike" class="ml-li" %}

   Scroll to the **Managed Pods** section, you should observe the number of pods increases by the horizontal pod autoscaling.

   {% include picture.html img="qwiklabs/gsp343-task4-cluster-autoscaling-frontend-pods.png"
      width="624" height="302" alt="The frontend pods increase with horizontal pod autoscaling" class="ml-li" %}

Eventually, you will also see new nodes initiate by the cluster autoscaling. But you need to keep patient for a while.

<br>

**Congratulations! You completed this challenge lab.**

## Demonstration Video

{% include youtube.html id="jeB-FIeGKkQ" title="GSP343 Optimize Costs for Google Kubernetes Engine: Challenge Lab | GCP learning tour" %}

```conf
⏱ Timestamps
0:00 Challenge Scenario
0:11 Task1: Create our cluster and deploy our app
2:54 Task2: Migrate to an Optimized Nodepool
5:20 Task3: Apply a Frontend Update
6:39 Task4: Autoscale from Estimated Traffic
8:26 Extra-task: Load Test to Simulate Traffic Surge
```
