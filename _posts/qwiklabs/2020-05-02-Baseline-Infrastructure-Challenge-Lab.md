---
layout: post
title:  "QLogbook: Baseline Infrastructure: Challenge Lab"
author: chris
date: 2020-05-02
category: Cloud
tags: [Qwiklabs, Google Cloud, Logbook]
permalink: /blog/qwiklabs/Baseline-Infrastructure-Challenge-Lab
excerpt: A brief procedure for qwiklab GSP315 "Baseline-Infrastructure-Challenge-Lab &#58; Challenge Lab".
image: images/posts/qwiklabs/map.jpg
---

<!--more-->

Did the hints from the [last article](/blog/qwiklabs/Cloud-Architecture-Challenge-Lab) help you to finish the Cloud Architecture: Challenge lab? This time moves back to a very easy lab. A brief procedure for  **GSP315** _[Baseline Infrastructure: Challenge Lab](https://www.qwiklabs.com/focuses/10379?parent=catalog)_ are listed below.

**The challenge contains 4 required tasks:**

1. Create a bucket;
2. Create a Pub/Sub topic;
3. Create the Cloud Function;
4. Remove the previous cloud engineer.

Actually, would anyone need to read this guide? Because I think everybody can do this lab. There is nothing worth for you to highlight and discuss with you. Therefore, I only wrote the key points for this lab below.

* * *

## Task 1: Create a bucket

1. In the console, click the **Navigation menu** > **Storage**.

2. Click Create a bucket.

<br>

## Task 2: Create a Pub/Sub topic

1. In the console, click the **Navigation menu** > **Pub/Sub** > **Topics**.

2. Click **Create a topic**.

Make sure you remember the topic name, which will be used in Task 3.

<br>

## Task 3: Create the Cloud Function

1. In the console, click the **Navigation menu** > **Cloud Functions**.

2. Click **Create function**.

3. In the Create function dialog, enter the following values:

   | Field               |   Value       |
   |---------------------|---------------|
   | Function to execute | thumbnail     |
   | Runtime             | Node.js 8     |
   | Trigger             | Cloud Storage |

4. Copy the given `index.js` and `package.json` to the dialog.

   Make sure you replace the text **REPLACE_WITH_YOUR_TOPIC** with the topic you created in task 2, in line 15 of index.js.

5. Upload a JPG or PNG image file to the bucket created in Task 1.

   ![](/images/posts/qwiklabs/map.jpg)

<br>

## Task 4: Remove the previous cloud engineer

1. In the console, click the **Navigation menu** > **I AM**.

2. Find the second user.

3. Click the pencil icon, select **Delete**.

<br>

## Summary

All tasks can be done with the Cloud Console. There should be no difficulty for you to finish them. I think this lab is even simpler than [Google Cloud Essentials: Challenge Lab](/blog/qwiklabs/Google-Cloud-Essential-Challenge-Lab). 9 credits! Is this cheating money?

* * *

**Related:** [Learning Google Cloud Platform on Qwiklabs: Learning Map, Assistive Tool and Tips](/blog/qwiklabs/Qwiklabs-User-Tips-for-Learning_Google_Cloud_Platform)
