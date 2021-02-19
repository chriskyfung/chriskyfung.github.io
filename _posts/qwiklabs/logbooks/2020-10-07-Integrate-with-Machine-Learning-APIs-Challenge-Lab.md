---
layout: post
title: "☁ Integrate with Machine Learning APIs: Challenge Lab"
date: 2020-10-7 17:30 +0800
category: Cloud
author: chris
tags: [Qwiklabs, Google Cloud, Logbook]
permalink: /blog/qwiklabs/Integrate-with-Machine-Learning-APIs-Challenge-Lab
image: 
   path: /images/posts/qwiklabs/gsp329-cover.png
   fit: left
excerpt: A brief procedure for the qwiklab practice GSP329. You will practice the skills and knowledge for getting a service account credentials to run Cloud Vision API, Google Translate API, and BigQuery API via a Python script.
amp:
   youtube: true
css:
   syntax: true
   custom: >
      .ml-li { margin-left: 2rem }
---

In this article, we will go through the lab **GSP329** _[Integrate with Machine Learning APIs: Challenge Lab](https://www.qwiklabs.com/focuses/12704?parent=catalog)_, which is labeled as an [advanced-level](https://www.qwiklabs.com/quests/136) exercise. You will practice the skills and knowledge for getting service account credentials to run Cloud Vision API, Google Translate API, and BigQuery API via a Python script.

**Topics tested**:

1. Grant the service account admin privileges for BigQuery and Cloud Storage.
1. Create and download a service account credentials file to provide Google Cloud credentials to a Python application.
1. Modify a Python script to extract text from image files using the Google Cloud Vision API.
1. Modify a Python script to translate text using the Google Translate API.
1. Check which languages are in the extracted data by executing a BigQuery SQL query.

## Task 1: Configure a service account to access the Machine Learning APIs, BigQuery, and Cloud Storage

In the Cloud Shell, create a new service account that provides credentials for the script using the following commands. (Remember to replace `<Your_Project_ID>` with your GCP project ID)

```bash
export PROJECT=<Your_Project_ID>
gcloud iam service-accounts create my-account --display-name my-account
```

> Tip 1. You do not need to provide any specific permissions to a service account to access most of the Google Machine Learning APIs such as the Google Cloud Vision and Translation APIs. The Python script does need permissions to access BigQuery and to create objects in Cloud Storage. The easiest way to do that is to bind the service account to `roles/bigquery.admin` and `roles/storage.admin`.

Once you have created the account, bind the BigQuery Admin and Cloud Storage Admin roles to the Service Account to provide the IAM permissions required to process files from Cloud Storage and insert the result data into a BigQuery table.

```bash
gcloud projects add-iam-policy-binding $PROJECT --member=serviceAccount:my-account@$PROJECT.iam.gserviceaccount.com --role=roles/bigquery.admin
gcloud projects add-iam-policy-binding $PROJECT --member=serviceAccount:my-account@$PROJECT.iam.gserviceaccount.com --role=roles/storage.admin
```

## Task 2: Create and download a credential file for your Service Account

Run the following commands to download the JSON format IAM credentials file for the service account, and configure the name of the credential file as an environment variable.

```bash
gcloud iam service-accounts keys create key.json --iam-account=my-account@$PROJECT.iam.gserviceaccount.com
export GOOGLE_APPLICATION_CREDENTIALS=key.json
```

> Tip 2. You must set an environment variable to provide the details of the credentials file that should be used by the Python script to access the Google Cloud APIs.

In the Cloud Console, navigate to **IAM & Admin** > **Service Accounts** to confirm the status of the service account (`my-account`).

{% include picture.html img="qwiklabs/gsp329-task2-confirm-new-service-account.png" width="959" height="606" %}

## Task 3: Modify the Python script to extract text from image files

Navigate to **Storage** in the Cloud Console, then click on the bucket name to explore the image files and the Python script that have been provided for you.

{% include picture.html img="qwiklabs/gsp329-task3-analyze.py-in-cloud-storage-bucket.png" width="1254" height="945" %}

Run the following **gsutil** command to copy the file `analyze-images.py` from the Cloud Storage bucket into the Cloud Shell.

```bash
gsutil cp gs://$PROJECT/analyze-images.py .
```

Open the Cloud Shell Editor to review and edit the script file.

{% include picture.html img="qwiklabs/gsp329-task3-analyze-image-py-file.png" width="1259" height="934" %}

There are three unfinished parts in the script that you must complete to make the correct Machine Learning API calls. All of them are preceded with a comment using the label `# TBD:`. You will need to make use of the Vision API, the Translation API, and the BigQuery API. The import of the Google Cloud Library modules for the required APIs have been done in line 7 of the script file. Note down the name of their API clients that have also been declared from lines 25 to 32.

In Task 3, you need to add your codes to the following part of the script file.

{% include picture.html img="qwiklabs/gsp329-task3-python-code-init.png" width="730" height="531" %}

> Tip 3. You can find details about the Vision API Client `document_text_detection` API call in the [Python API Documentation reference page for the Vision API Client](https://googleapis.dev/python/vision/latest/gapic/v1/api.html#google.cloud.vision_v1.ImageAnnotatorClientdocument_text_detection) and the details of the Vision API annotation response object in the [Python API Documentation reference page for the Vision API Objects](https://googleapis.dev/python/vision/latest/gapic/v1/types.html#google.cloud.vision_v1.types.AnnotateImageResponse)

{:style="font-family:monospace"}
**TBD**: Create a Vision API image object called image_object  
**Ref**: [google.cloud.vision_v1.types.Image](https://googleapis.dev/python/vision/latest/gapic/v1/types.html#google.cloud.vision_v1.types.Image)

```python
        image_object = vision.types.Image()
        image_object.content = file_content
```

where `file_content` is the image content extracted from a JEPG or a PNG file via lines 51 and 52 of the script.

{:style="font-family:monospace"}
**TBD**: Detect text in the image and save the response data into an object called response  
**Ref**: [google.cloud.vision_v1.ImageAnnotatorClient.document_text_detection](https://googleapis.dev/python/vision/latest/gapic/v1/api.html#google.cloud.vision_v1.ImageAnnotatorClient.document_text_detection)

```python
        response = vision_client.document_text_detection(image=image_object)
```

This line uses the Cloud Vision API to extract text data from each image inside the for loop.

**Note**: Make sure that you indent the codes correctly.

## Task 4: Modify the Python script to translate the text using the Translation API

In Task 4, you need to add your codes to the following part of the script file.

{% include picture.html img="qwiklabs/gsp329-task4-python-code-init.png" width="730" height="416" %}

> Tip 4. For details about the Translation API Client translate API call, see the [Python API Documentation for the Translation V2 API Client](https://googleapis.dev/python/translation/2.0.1/client.html#google.cloud.translate_v2.client.Client.translate)

{:style="font-family:monospace"}
**TBD**: For non EN locales pass the description data to the translation API  
**Ref**: [google.cloud.translate_v2.client.Client.translate](https://googleapis.dev/python/translation/latest/client.html#google.cloud.translate_v2.client.Client.translate)

```python
            # Set the target_language locale to 'en')
            translation = translate_client.translate(desc, target_language='en')
```

This line uses the Translation API to translate the non-English text into English.

**Note**: Make sure that you indent the codes correctly.

## Task 5: Identify the most common non-English language used in the signs in the data set

In Task 5, you need to remove the comment characters to enable the line of code in the following part of the script.

{% include picture.html img="qwiklabs/gsp329-task5-python-code-init.png" width="730" height="167" %}

### Process the image files using the updated Python

Save the changes and then run the modified script file in the Cloud Shell:

```bash
export BUCKET=$PROJECT
python analyze-images.py $PROJECT $BUCKET
```

You should see an output like that:

{% include picture.html img="qwiklabs/gsp329-task3-to-5-python-results.png" width="1256" height="1191" %}

### Confirm that image data has been successfully uploaded to BigQuery

Go back to the Cloud Console, navigate to **BigQuery**.

Preview the table `image_text_detail` in the dataset called `image_classification_dataset` in your project.

{% include picture.html img="qwiklabs/gsp329-task5-biquery-table-preview.png" width="1215" height="506" %}

Confirm that image data has been successfully processed by running the following Query in BigQuery:

```SQL
SELECT locale,COUNT(locale) as lcount FROM image_classification_dataset.image_text_detail GROUP BY locale ORDER BY lcount DESC
```

The query results should look like:

{% include picture.html img="qwiklabs/gsp329-task5-query-results.png" width="653" height="356" %}

<br/>

**Congratulations! You completed this challenge lab.**

## Demonstration Video

{% include youtube.html id="kEEqbeqR6og" title="GSP329 Integrate with Machine Learning APIs: Challenge Lab" %}

```ts
00:00 Lab Overview
01:56 Start Lab
03:21 Confirm Cloud Vision, AutoML Translation, and BigQuery APIs are enabled
04:55 Task 1: Configure a service account to access the Machine Learning APIs, BigQuery, and Cloud Storage
06:54 Task 2: Create and download a credential file for your Service Account
08:05 Task 3: Modify the Python script to extract text from image files
12:50 Task 4: Modify the Python script to translate the text using the Translation API
14:05 Task 5: Identify the most common non-English language used in the signs in the data set
14:35 Process the image files using the updated Python
17:21 Confirm that image data has been successfully uploaded to BigQuery
```

* * *

**References**:

📌 Hints for Tasks 1 - 2  
  [Classify Text into Categories with the Natural Language API - Qwiklabs](https://www.qwiklabs.com/focuses/1749?parent=catalog)

📌 Hints for Tasks 3 - 5  
  [Integrating Machine Learning APIs - Google Codelabs](https://developers.google.com/codelabs/cloud-ml-apis)
{% include picture.html img="qwiklabs/gsp329-codelabs-reference.png" width="965" height="603" class="ml-li" %}

* * *

**Keep on reading**:

- [Qwiklab/Logbook: Automate Interactions with Contact Center AI: Challenge Lab](/blog/qwiklabs/Automate-Interactions-with-Contact-Center-AI-Challenge-Lab)
- [Qwiklabs/Logbook: Perform Foundational Data, ML, and AI Tasks in Google Cloud: Challenge Lab](/blog/qwiklabs/Perform-Foundational-Data-ML-and-AI-Tasks-in-Google-Cloud-Challenge-Lab)

**Useful links**:

- [Extract, Analyze, and Translate Text from Images with the Cloud ML APIs - Qwiklabs](https://www.qwiklabs.com/focuses/1836?parent=catalog)
- [Integrate with Machine Learning APIs: Challenge Lab Tutorial - by Ajil - Sep, 2020 - Medium](https://medium.com/@ajiltu/integrate-with-machine-learning-apis-challenge-lab-tutorial-4ed8c5cb983e)

