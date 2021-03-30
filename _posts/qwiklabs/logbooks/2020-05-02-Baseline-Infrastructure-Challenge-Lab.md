---
layout: post
title: "☁ Perform Foundational Infrastructure Tasks in Google Cloud: Challenge Lab | logbook"
author: chris
date: 2020-05-02 +0800
last_modified_at: 2020-08-04 10:08:00 +0800
category: Cloud
tags: [Qwiklabs, Google Cloud, Logbook, Cloud Function]
permalink: /blog/qwiklabs/Perform-Foundational-Infrastructure-Tasks-in-Google-Cloud-Challenge-Lab
redirect_from:
   - /blog/qwiklabs/Baseline-Infrastructure-Challenge-Lab
   - /blog/qwiklabs/GSP315
   - /blog/qwiklabs/gsp315
excerpt: A brief procedure for the Google Cloud self-paced training GSP315 "Perform Foundational Infrastructure Tasks in Google Cloud&#58; Challenge Lab" on Qwiklabs.
image:
   path: /images/posts/qwiklabs/map.jpg
   height: 565
amp:
   youtube: true
---

<!--more-->

Did the hints from the [last article]({% post_url qwiklabs/logbooks/2020-04-24-Cloud-Architecture-Challenge-Lab %}) help you to finish the Deploy and Manage Cloud Environments with Google Cloud: Challenge Lab? This time moves back to a very easy lab. A brief procedure for  **GSP315** _[Perform Foundational Infrastructure Tasks in Google Cloud: Challenge Lab](https://www.qwiklabs.com/focuses/10379?parent=catalog)_ (formerly known as _Baseline Infrastructure: Challenge Lab_) is listed below.

**The challenge contains 4 required tasks:**

1. Create a bucket;
2. Create a Pub/Sub topic;
3. Create the Cloud Function;
4. Remove the previous cloud engineer.

Actually, would anyone need to read this guide? Because I think everybody can do this lab. There is nothing worth highlighting and discussing with you. Therefore, I only wrote the key points for this lab below.

* * *

## Task 1: Create a bucket

1. In the console, click the **Navigation menu** > **Storage**.

2. Click Create a bucket.

## Task 2: Create a Pub/Sub topic

1. In the console, click the **Navigation menu** > **Pub/Sub** > **Topics**.

2. Click **Create a topic**.

\* Make sure you remember the topic name, which will be used in Task 3.

## Task 3: Create the Cloud Function

1. In the console, click the **Navigation menu** > **Cloud Functions**.

2. Click **Create function**.

3. In the Create function dialog, enter the following values:

{:.table}
   | Field               |   Value       |
   |---------------------|---------------|
   | Function to execute | thumbnail     |
   | Runtime             | Node.js 8     |
   | Trigger             | Cloud Storage |

{:start="4"}
4. Copy the given `index.js` and `package.json` to the dialog.

   Make sure you replace the text **REPLACE_WITH_YOUR_TOPIC** with the topic you created in task 2, in line 15 of index.js.

5. Upload a JPG or PNG image file to the bucket created in Task 1.

   {% include picture.html width="706" height="547" img="qwiklabs/map.jpg" %}

## Task 4: Remove the previous cloud engineer

1. In the console, click the **Navigation menu** > **I AM**.

2. Find the second user.

3. Click the pencil icon, select **Delete**.

<br>

**Congratulations! You completed this challenge lab.**

## Summary

All tasks can be done with the Cloud Console. There should be no difficulty for you to finish them. I think this lab is even simpler than [Getting Started: Create and Manage Cloud Resources: Challenge Lab]({% post_url qwiklabs/logbooks/2020-04-22-Google-Cloud-Essentials-Challenge-Lab %}).

**9 credits!** Is this cheating money? I hope this beginner's guide to Qwiklabs will help you to get started. If you have any additional questions, feel free to ask me in the comments section below.

## Demonstration Video

{% include youtube.html id="5UrQ9D-epG8" title="GSP315 Perform Foundational Infrastructure Tasks in Google Cloud= Challenge Lab" %}

```conf
⏱Timestamps:
0:00 Start Lab 🔬
0:35 Task 1: Create a bucket
0:57 Task 2: Create a Pub/Sub topic
1:15 Task 3: Create the Cloud Function
4:10 Task 4: Remove the previous cloud engineer
```

* * *

**See Also**: [Learning Google Cloud Platform on Qwiklabs: Learning Map, Assistive Tool and Tips]({% post_url qwiklabs/2019-11-25-Qwiklabs-User-Tips-for-Learning_Google_Cloud_Platform %})
