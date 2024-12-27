---
layout: post
title: "☁ Automate Interactions with Contact Center AI: Challenge Lab | logbook"
date: 2020-07-22 12:32 +0800
categories: [Cloud]
author: chris
tags: [Qwiklabs, Google Cloud, Logbook, Cloud AI]
permalink: /blog/qwiklabs/Automate-Interactions-with-Contact-Center-AI-Challenge-Lab
redirect_from:
   - /blog/qwiklabs/GSP311
   - /blog/qwiklabs/gsp311
image:
   path: /images/posts/qwiklabs/qwiklab-gsp311-task6-cloud-dataflow-pipeline.png
   width: 842
   height: 808
excerpt: A brief procedure for the Google Cloud self-paced training GSP311 on Qwiklabs.
amp:
   youtube: true
css:
   syntax: true
---

In this article, we will go through the lab **GSP311** _[Automate Interactions with Contact Center AI: Challenge Lab](https://www.qwiklabs.com/focuses/12008?parent=catalog)_, which is an [expert-level](https://www.qwiklabs.com/quests/127) exercise on Qwiklabs. You will practice the skills and knowledge to deploy Cloud Dataflow Pipeline to transcript audio files and store the data to BigQuery. You will also need to implement Data Loss Prevention API for redacting the sensitive data from the audio transcriptions (such as name, email, phone number, and SSN).

**The challenge contains 8 required tasks:**

1. Create a Regional Cloud Storage bucket
1. Create a Cloud Function
1. Create a BigQuery dataset
1. Create a Pub/Sub topic
1. Create a Regional Cloud Storage bucket with DFaudio folder
1. Deploy Dataflow pipeline
1. Process the sample audio files
1. Run a Data Loss Prevention Job

## Setting up the environment

First of all, open the Cloud Shell to clone the Speech Analysis Framework source repository:

```bash
git clone https://github.com/GoogleCloudPlatform/dataflow-contact-center-speech-analysis.git
```

## Task 1: Create a Cloud Storage Bucket

Make sure you:

- create the bucket in the region `us-central1`

## Task 2: Create a Cloud Function

Make sure you:

- change the Trigger to **Cloud Storage** and select **Finalize** as the Event Type

1. In the Cloud Console, navigate to **Cloud Functions**.
2. Create a new function called `saf-longrun-job-func`.
3. Select **Cloud Storage** from the dropdown for the **Trigger** setting.
4. In the **Event Type** dropdown, select **Finalize/Create**.
5. Click on the **BROWSE** button, and choose the bucket created in Task 1.

   {% include picture.html img="qwiklabs/qwiklab-gsp311-task2-create-cloud-function.png" width="591" height="639" %}

{:start="6"}
6. Select the **Runtime** to be `Node.js 8`
7. Open the [source repository](https://github.com/GoogleCloudPlatform/dataflow-contact-center-speech-analysis/tree/master/saf-longrun-job-func) in a new window.
8. Replace the **INDEX.JS** AND **PACKAGE.JSON** in the Cloud Function with the source codes from the repository.
9. Type `safLongRunJobFunc` in the **Function to execute**.
10. Click on **ENVIRONMENT VARIABLES, NETWORKING, TIMEOUTS AND MORE**, ensure the region is configured to `us-central1` under the **Advanced options**.
11. Click **CREATE**.

## Task 3: Create a BigQuery Dataset

1. Navigate to **BigQuery**, click on **CREATE DATASET**.
2. Assign a Dataset ID, e.g. `lab`.
3. Click **Create dataset**.

## Task 4: Create Cloud Pub/Sub Topic

1. Navigate to **Pub/Sub** > **Topics**, click on **CREATE TOPIC**.
2. Assign a Topic ID, e.g. `speech2text`.
3. Click **Create Topic**.

## Task 5: Create a Cloud Storage Bucket for Staging Contents

1. Navigate to **Cloud Storage**, click on the bucket created in Task 1.
2. Create a folder called `DFaudio` in the bucket.

## Task 6: Deploy a Cloud Dataflow Pipeline

In the Cloud Shell, run the following commands to deploy the Dataflow pipeline

```bash
cd dataflow-contact-center-speech-analysis/saf-longrun-job-dataflow

python -m virtualenv env -p python3
source env/bin/activate
pip install apache-beam[gcp]
pip install dateparser

export PROJECT_ID=[YOUR_PROJECT_ID]
export TOPIC_NAME=speech2text
export BUCKET_NAME=[YOUR_BUCKET_NAME]
export DATASET_NAME=lab
export TABLE_NAME=transcript

python3 saflongrunjobdataflow.py --project=$PROJECT_ID --input_topic=projects/$PROJECT_ID/topics/$TOPIC_NAME --runner=DataflowRunner --region=us-central1 --temp_location=gs://$BUCKET_NAME/tmp --output_bigquery=$DATASET_NAME.$TABLE_NAME --requirements_file="requirements.txt"
```

{% include picture.html img="qwiklabs/qwiklab-gsp311-task6-cloud-dataflow-pipeline.png" width="842" height="808" %}

## Task 7: Upload Sample Audio Files for Processing

In the Cloud Shell, run the following commands to upload the sample audio files into your Audio Uploads Bucket:

```bash
# mono flac audio sample
gsutil -h x-goog-meta-callid:1234567 -h x-goog-meta-stereo:false -h x-goog-meta-pubsubtopicname:$TOPIC_NAME -h x-goog-meta-year:2019 -h x-goog-meta-month:11 -h x-goog-meta-day:06 -h x-goog-meta-starttime:1116 cp gs://qwiklabs-bucket-gsp311/speech_commercial_mono.flac gs://$BUCKET_NAME

# stereo wav audio sample
gsutil -h x-goog-meta-callid:1234567 -h x-goog-meta-stereo:true -h x-goog-meta-pubsubtopicname:$TOPIC_NAME -h x-goog-meta-year:2019 -h x-goog-meta-month:11 -h x-goog-meta-day:06 -h x-goog-meta-starttime:1116 cp gs://qwiklabs-bucket-gsp311/speech_commercial_stereo.wav gs://$BUCKET_NAME
```

> Q: What is the TOP named entity in the 5 audio files processed by the pipeline?
> A: pair

{% include picture.html img="qwiklabs/qwiklab-gsp311-task7-bigquery.png" width="914" height="847" %}

## Task 8: Run a Data Loss Prevention Job

You must make a copy of your BigQuery table before running a Data Loss Prevention Job

1. Navigate to **BigQuery** in the Cloud Console
2. Select the table generated by the Dataflow pipeline.
3. Click on **More** > **Query settings**.
4. Assign a Table name, e.g. `copied`, then click **Save**.

{% include picture.html img="/qwiklabs/qwiklab-gsp311-task8-copy-bigqury-table.png" width="317" height="314" class="text-center" %}

{:start="5"}
5. Run the following SQL query:

   ```sql
   SELECT * FROM `[YOUR_PROJECT_ID].[DATASET_NAME].[TABLE]`
   ```

6. Select the copied table, then click on **EXPORT** > **Scan with DLP**.
7. In the _Create job or job trigger_ pane, assign a Job ID and then click **CREATE**.
8. Click **CONFIRM CREATE**.

<br>

**Congratulations! You completed this challenge lab.**

## Summary

Tasks 1 to 5 were pretty straightforward. If you prefer using the command line to create the resources, please refer to the [README file](https://github.com/GoogleCloudPlatform/dataflow-contact-center-speech-analysis) of the Speech Analysis Framework in the GitHub repository. You can also find the commands to deploy the `saflongrunjobdataflow.py` Python script in Task 6 and the SQL query for getting the answer in Task 7.

Only Task 7 was a little tricky. You will get stuck if you try to make a copy of the table using the **COPY TABLE** button in the BigQuery console. It can copy the table structure but cannot copy the data in the table. Once you know how to correctly clone the table, the task is just a piece of cake.

## <i class="far fa-play-circle"></i> Demonstration Video

{% include youtube.html id="uiKc2_i8IOM" title="GSP311 Automate Interactions with Contact Center AI: Challenge Lab" %}

```conf
⏱Timestamps:
00:00 Lab start
00:59 Task1: Create a Cloud Storage Bucket
01:58 Task2: Create a Cloud Function
04:07 Task3: Create a BigQuery Dataset
05:00 Task4: Create Cloud Pub/Sub Topic
05:52 Task5: Create a Cloud Storage Bucket for Staging Contents
06:21 Task6: Deploy a Cloud Dataflow Pipeline
13:36 Task7: Upload Sample Audio Files for Processing
17:05 Task8: Run a Data Loss Prevention Job
```

* * *

**Keep on reading**:

- [☁ Integrate with Machine Learning APIs: Challenge Lab \| logbook]({% post_url qwiklabs/logbooks/2020-10-07-Integrate-with-Machine-Learning-APIs-Challenge-Lab %})
