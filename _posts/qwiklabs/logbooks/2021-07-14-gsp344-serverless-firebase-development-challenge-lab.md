---
layout: post
title: "☁ Serverless Firebase Development: Challenge Lab | logbook"
date: 2021-07-14 11:30 +0800
categories: [Cloud]
author: chris
tags: [Qwiklabs, Google Cloud, Logbook, BigQuery, Data Science]
permalink: /blog/qwiklabs/serverless-firebase-development-challenge-lab
redirect_from:
   - /blog/qwiklabs/GSP344
   - /blog/qwiklabs/gsp344
image:
   path: /images/posts/qwiklabs/gsp344-cover_optimized.png
excerpt: A brief procedure for the Google Cloud self-paced training GSP344 on Qwiklabs. You will practice the skills for deploying a serverless web application with Firestore Database and Cloud Run on Google Cloud Platform.
amp:
   youtube: true   
css:
   syntax: true
---

In this article, we will go through the lab **GSP344** _[GSP344 Serverless Firebase Development: Challenge Lab](https://www.qwiklabs.com/focuses/14677?parent=catalog)_, which is an [advanced-level](https://www.qwiklabs.com/quests/153) exercise on Qwiklabs. You will practice the skills for deploying a serverless web application with Firestore Database and Cloud Run on Google Cloud Platform.

**Topics tested**:

- Firestore Database Create
- Firestore Database Populate
- Cloud Build Rest API Staging
- Cloud Build Rest API Production
- Cloud Build Frontend Staging
- Cloud Build Frontend Production

## Task 1: Create a Firestore database

This task is super easy. In the Google Cloud Console,

1. Navigate to **Firestore**.
2. Select **Native mode** for this project.
3. Choose **nam5 (United States)** as the location of your database.
4. Click **CREATE DATABASE**.

   {% include picture.html img="qwiklabs/gsp334-task1-cloud-firebase-native-mode.png" width="968" height="545" alt="Setup Firebase database using GCP Console" %}

   This usually takes a few minutes to initialize the Cloud Firestore.

## Task 2: Populate the Database

1. Open the Cloud Shell, run the following to clone the repo:

   ```bash
   git clone https://github.com/rosera/pet-theory.git
   ```

2. Follow the instructions to import CSV using the node sample code from `lab06`:

   ```bash
   cd ~/pet-theory/lab06/firebase-import-csv/solution
   npm install
   node index.js netflix_titles_original.csv
   ```

   {% include picture.html img="qwiklabs/gsp344-task2-populate-csv-data-to-firebase.png" width="804" height="277" alt="The shell output of loading the netflix_titles_original.csv file using the node sample code" %}

   After the records written to the database, go back to the Cloud Console and verify the Firebase Database is updated.

   {% include picture.html img="qwiklabs/gsp334-task2-uploaded-data-collection-in-firebase.png" width="1241" height="549" alt="The firestore data collection after importing the records from the netflix_titles_original.csv" %}

## Task 3: Create a REST API

You will need to build and deploy the code in `pet-theory/lab06/firebase-rest-api/solution-01` as a Cloud Run Service via Google Container Registry. Run the following in the Cloud Shell:

```bash
npm install

gcloud builds submit \
  --tag gcr.io/$GOOGLE_CLOUD_PROJECT/rest-api:0.1

gcloud beta run deploy netflix-dataset-service \
  --image gcr.io/$GOOGLE_CLOUD_PROJECT/rest-api:0.1 \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

After the Cloud Run deployed, you can test the service by running the following:

```bash
SERVICE_URL=$(gcloud beta run services describe netflix-dataset-service --platform managed --region us-central1 --format="value(status.url)")

echo $SERVICE_URL

curl -X GET $SERVICE_URL
```

## Task 4: Firestore API access

This time you have to repeat the previous task for revision 0.2 of the code. You can update the service by running the following:

```bash
cd ../solution-02
npm install

gcloud builds submit \
  --tag gcr.io/$GOOGLE_CLOUD_PROJECT/rest-api:0.2

gcloud beta run deploy netflix-dataset-service \
  --image gcr.io/$GOOGLE_CLOUD_PROJECT/rest-api:0.2 \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

After the Cloud Run updated, you can test the service endpoint with `/2019`:

```bash
SERVICE_URL=$(gcloud beta run services describe netflix-dataset-service --platform managed --region us-central1 --format="value(status.url)")

echo $SERVICE_URL

curl -X GET $SERVICE_URL/2019
```

## Task 5: Deploy the Staging Frontend

Next, go to the `pet-theory/lab06/firebase-frontend` directory. You will build and deploy the staging frontend in a similar way.

```bash
gcloud builds submit \
  --tag gcr.io/$GOOGLE_CLOUD_PROJECT/frontend-staging:0.1

gcloud beta run deploy frontend-staging-service \
  --image gcr.io/$GOOGLE_CLOUD_PROJECT/frontend-staging:0.1 \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

{% include picture.html img="qwiklabs/gsp344-task5-staging-frontend.png" width="1219" height="788" alt="Screenshot of the deployed staging frontend" %}

## Task 6: Deploy the Production Frontend

To deploy a production frontend, you need to configure the service endpoint in the `public/app.js` file by modifying the following:

{% include picture.html img="qwiklabs/gsp334-task6-configure-rest-api-service-url-in-app-js.png" width="866" height="328" alt="File head of public/app.js" %}

1. Comment out `const REST_API_SERVICE = "data/netflix.json"`. in line 4.
2. Uncomment `// const REST_API_SERVICE = "https://XXXX-SERVICE.run.app/2000"` in line 5.
3. Replace `https://XXXX-SERVICE.run.app` with the **SERVICE URL** created in Task 4.
4. Re-build and deploy the updated code as `frontend-production` by running the following:

   ```bash
   npm install
   
   gcloud builds submit \
     --tag gcr.io/$GOOGLE_CLOUD_PROJECT/frontend-production:0.1
   
   gcloud beta run deploy frontend-production-service \
     --image gcr.io/$GOOGLE_CLOUD_PROJECT/frontend-production:0.1 \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

**Congratulations! You completed this challenge lab.**

## <i class="far fa-play-circle"></i> Demonstration Video

{% include youtube.html id="4rqeFp87s6I" title="GSP344 Serverless Firebase Development: Challenge Lab | 🐱‍🏍 GCP learning tour" %}

```conf
⏱ Timestamps
00:00 Overview
00:29 Provision the environment
01:04 Task1: Create a Firestore database
01:40 Task2: Populate the Database
02:35 Task3: Create a REST API
06:15 Task4: Firestore API access
08:22 Task5: Deploy the Staging Frontend
11:39 Task6: Deploy the Production Frontend
```
