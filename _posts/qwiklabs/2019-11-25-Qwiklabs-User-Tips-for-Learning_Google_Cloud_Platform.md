---
layout: post
title: "Learning Google Cloud Platform on Qwiklabs: Learning Map, Assistive Tool and Tips (2020)"
date: 2020-02-22 22:10 +0800
last_modified_at: 2020-06-20 23:36 +0800
author: chris
categories: [Cloud]
tags: [Qwiklabs, Google Cloud, User tips, Learning map]
permalink: /blog/qwiklabs/qwiklabs-user-tips-for-learning-google-cloud-platform
redirect_from:
 - /blog/2019/11/25/Qwiklabs-User-Tips-for-Learning_Google_Cloud_Platform
 - /blog/qwiklabs/Qwiklabs-User-Tips-for-Learning_Google_Cloud_Platform
image:
  path: /images/posts/qwiklabs/qwiklabs-badges.jpg
  width: "1217"
  height: "684"
excerpt: Over 400 hands-on labs and quests available on Qwiklabs for learning GCP. Therefore, we made a visual map for you to more easily seek your desired learning path.
amp:
  youtube: true
  iframe: true
css:
  custom: >-
    .iframe-bg-white{margin-left:auto;margin-right:auto;max-width:1493px;width:100%;z-index:1050;background:#fff;}
featured: true
---

{% include toc.md %}

## What is Qwiklabs

**[Qwiklabs](https://www.qwiklabs.com)** is a great online self-paced learning platform for getting hands-on experience of the Google Cloud Platform. It has over 400 hands-on labs and quests to learn and practice. If you are not familiar with Qwiklabs, I suggest you watch this video made by Google Cloud Team to get a rough idea about using Qwiklabs for Hands-on Practice with Google Cloud.

{% include youtube.html id="cyp7soKLOYI" title="Using Qwiklabs for Hands-on Practice with Google Cloud | Google Cloud Labs" %}

<br>

After you logged in to Qwiklabs, you can see there are five training categories, i.e.

- Infrastructure & DevOps
- Websites & App Dev
- Big Data
- Machine Learning
- Security, Backup & Recovery

{% include picture.html height="468" img="qwiklabs/qwiklabs-default-catagories.png" alt="Five default training catagories defined by Qwiklabs" %}

You can start your training based on your goal and purpose, or find the quests for GCP using the filter function available on the Catalog page. Qwiklabs grouped different kinds of labs into 56 quests for learning GCP, and divided them to 4 levels: Introductory, Fundamental, Advanced, and Expert. You may also look for the resources by search, but the results are sorted by relevance rather than an appropriate order for study or learning. As a result, I tried to organise the Qwiklabs quests to be a learning map to trace the connections among them.

{% include picture.html height="621" img="qwiklabs/qwiklabs-catalog-with-quest-filter-for-gcp.png" alt="Using filter to find quests for Google Cloud Platform on Qwiklabs Catalog page" %}

## Visual Map of Qwiklabs GCP Quests

I spent about three months to take all the Qwiklabs quests for Google Cloud Platform. In the end, I think that there is a need to create a visual map to indicate and understand the relationships between the quests, thereby an easier way for any beginner to seek their desired learning paths. I illustrated the following map by connecting the blocks based on the quest descriptions. You can navigate in the map and click on the boxes to open the corresponding quest webpages.

<div class="box-highlight">
  <p class="text-center">Learning map for Qwiklabs GCP Quests (keep update)</p>
</div>

<div id="quests-map" class="box-highlight mb-3">
  <amp-iframe width="1493" height="2259" layout="responsive" frameborder="0" sandbox="allow-scripts" src="/images/projects/qwiklabs-quests-map.html"></amp-iframe>
</div>

<!-- Button trigger modal -->
<div class="text-center">
<button class="btn btn-primary btn-lg" on="tap:amp-largemap">
  View Full Size <i class='fas fa-search-plus'></i>
</button>
</div>

<amp-lightbox scrollable id="amp-largemap" layout="nodisplay" animate-in="fade-in">
  <div class="iframe-bg-white">
    <button type="button" class="close" tabindex="-1" on="tap:amp-largemap.close">&times;</button>
    <amp-iframe width="1493" height="2259" layout="intrinsic" frameborder="0" sandbox="allow-scripts" src="/images/projects/qwiklabs-quests-map.svg">
      <span placeholder class="text-center">Loading...</span>
    </amp-iframe>
  </div>
</amp-lightbox>

## Custom Tool for Labelling Completed Labs and Quests

As a Qwiklabs user, I found it is messy and damp to lookup unenrolled quests or incompleted labs from the Qwiklabs Catalog page or Search Results ([www.qwiklabs.com/catalog](https://www.qwiklabs.com/catalog)). I desired to make a straight-forward way to identify the catalog, by adding a green check-circle next to those completed. So, I tried to develop a solution named "[Qwiklabs Lab Completion Tracker](https://github.com/chriskyfung/qwiklabs-completed-labs-tracker)".

The prototyped tool can help you visually identify the completed catalogue items with a green check-circle (<i class="fa fa-check-circle" style="color:green"></i>) showing at the end of a lab or quest title. A demo screenshot is shown below.

{% include picture.html height="482" img="qwiklabs-complete-indicator-quest-page-demo.png" alt="Green Check Marks and Highlights to the completed lab items on a Qwiklabs Quest Page" caption="Fig. Effects on the completed labs on a Quest page (For version >= 0.4.5)" source="projects" class="text-center mb-4" %}

{% include picture.html width="510" height="345" img="qwiklabs-complete-indicator-lab-page-demo.png" alt="Green Check Mark and Highlight displays on a Completed Qwiklabs Lab Page" caption="Fig. Effects on a completed lab page (For version >= 0.4.5)" source="projects" class="text-center mb-4" %}

For more information, you can read the post _"[Userscript for Labelling Completed Qwiklabs]({% post_url qwiklabs/completion-tracker/2019-09-01-Userscript-for-Labelling-Completed-Qwiklabs %})"_.

## Tips for Preparing a Lab

Sometimes, you can find examples and tutorials from the Qwiklabs' blog on [Medium](https://qwiklabs.medium.com/) ([@qwiklabs](https://qwiklabs.medium.com/)). Also, you may search for introductive videos from YouTube, such as the [Qwiklabs](https://www.youtube.com/channel/UCgadTofKslPYREQE8TjY7AA/videos) and the [Google Cloud Platform](https://www.youtube.com/user/googlecloudplatform) channels. The playlist below includes parts of the videos,

<!-- FM:Snippet:Start data:{"id":"include-youtube-playlist","fields":[{"name":"vid","value":"ew-r46FmzSM"},{"name":"playlist_id","value":"PLIivdWyY5sqKOsBSMDTF0M76nXeChgh5D"},{"name":"title","value":"Qwiklabs Quests Previews | Google Cloud Labs"}]} -->
{% include youtube.html id="ew-r46FmzSM" playlist="PLIivdWyY5sqKOsBSMDTF0M76nXeChgh5D" title="Qwiklabs Quests Previews | Google Cloud Labs" %}
<!-- FM:Snippet:End -->

<amp-ad
  width="auto"
  height="325"
  type="a9"
  data-amzn_assoc_placement="adunit0"
  data-amzn_assoc_search_bar="true"
  data-amzn_assoc_tracking_id="cfky05-20"
  data-amzn_assoc_ad_mode="manual"
  data-amzn_assoc_ad_type="smart"
  data-amzn_assoc_marketplace="amazon"
  data-amzn_assoc_region="US"
  data-amzn_assoc_title="Recommended Books"
  data-amzn_assoc_linkid="9cf248fb1fbaccac1da576f76533a29c"
  data-amzn_assoc_asins="1119564417,1491974567,1491962291,B07P5JZCXV"
  layout="fixed-height"
>
</amp-ad>

## See Also 📚

_Resources:_

- [Useful Google Cloud Platform Commands Cheat Sheet]({% post_url qwiklabs/2019-11-06-Useful-Google-Cloud-Platform-Commands-Cheat-Sheet %})

_The Cookbooks of Challenge Quest Series:_

{% include picture.html width="473" height="188" img="qwiklabs/qwiklabs-change-badge-for-Challenge-GCP-Architecture-quest.png" alt="Badges for Challenge-GCP-Architecture: Before and After" class="text-center" caption="Badge Change in 2020" link="/blog/qwiklabs/where-does-my-bear-badge-go" %}

- [☁ Google Cloud Essential Skills: Challenge Lab \| logbook ]({% post_url qwiklabs/logbooks/2019-09-18-Google-Cloud-Essential-Skills-Challenge-Lab %})
- [☁ Deploy a Compute Instance with a Remote Startup Script \| logbook ]({% post_url qwiklabs/logbooks/2019-09-20-Deploy-a-Compute-Instance-with-a-Remote-Startup-Script %})
- [☁ Configure a Firewall and a Startup Script with Deployment Manager \| logbook ]({% post_url qwiklabs/logbooks/2019-09-23-Configure-a-Firewall-and-a-Startup-Script-with-Deployment-Manager %})
- [☁ Configure Secure RDP using a Windows Bastion Host with Terraform \| logbook ]({% post_url qwiklabs/logbooks/2019-09-07-Configure-Windows-Bastion-Host-with-Terraform-on-GCP %})
- [☁ Build and Deploy a Docker Image to a Kubernetes Cluster \| logbook ]({% post_url qwiklabs/logbooks/2019-09-25-Build-and-Deploy-a-Docker-Image-to-a-Kubernetes-Cluster %})
- [☁ Scale Out and Update a Containerized Application on a Kubernetes Cluster \| logbook ]({% post_url qwiklabs/logbooks/2019-09-27-Scale-Out-and-Update-a-Containerized-Application-on-a-Kubernetes-Cluster %})
- [☁ Migrate a MySQL Database to Google Cloud SQL \| logbook ]({% post_url qwiklabs/logbooks/2019-09-30-Migrate-a-MySQL-Database-to-Google-Cloud-SQL %})

_The Hints for Challenge Labs 2020:_

- [☁ Create and Manage Cloud Resources: Challenge Lab \| logbook ]({% post_url qwiklabs/logbooks/2020-04-22-Google-Cloud-Essentials-Challenge-Lab %})
- [☁ Deploy and Manage Cloud Environments with Google Cloud: Challenge Lab \| logbook ]({% post_url qwiklabs/logbooks/2020-04-24-Cloud-Architecture-Challenge-Lab %})
- [☁ Perform Foundational Infrastructure Tasks in Google Cloud: Challenge Lab \| logbook ]({% post_url qwiklabs/logbooks/2020-05-02-Baseline-Infrastructure-Challenge-Lab %})
- [☁ Deploy to Kubernetes in Google Cloud: Challenge Lab \| logbook ]({% post_url qwiklabs/logbooks/2020-05-04-Kubernetes-in-Google-Cloud-Challenge-Lab %})
- [☁ Build a Website on Google Cloud: Challenge Lab \| logbook ]({% post_url qwiklabs/logbooks/2020-07-01-Build-a-Website-on-Google-Cloud-Challenge-Lab %})
- [☁ Automate Interactions with Contact Center AI: Challenge Lab \| logbook ]({% post_url qwiklabs/logbooks/2020-07-22-Automate-Interactions-with-Contact-Center-AI-Challenge-Lab %})
- [☁ Set up and Configure a Cloud Environment in Google Cloud: Challenge Lab \| logbook ]({% post_url qwiklabs/logbooks/2020-07-25-Set-up-and-Configure-a-Cloud-Environment-in-Google-Cloud-Challenge-Lab %})
- [☁ Build and Secure Networks in Google Cloud: Challenge Lab \| logbook ]({% post_url qwiklabs/logbooks/2020-08-11-Build-and-Secure-Networks-in-Google-Cloud-Challenge-Lab %})
- [☁ Insights from Data with BigQuery: Challenge Lab (COVID-19 Open Data) \| logbook ]({% post_url qwiklabs/logbooks/2020-08-16-Insights-from-Data-with-BigQuery-Challenge-Lab %})
- [☁ Perform Foundational Data, ML, and AI Tasks in Google Cloud: Challenge Lab \| logbook ]({% post_url qwiklabs/logbooks/2020-09-07-Perform-Foundational-Data,-ML,-and-AI-Tasks-in-Google-Cloud-Challenge-Lab %})
- [☁ Build and Manage APIs with Apigee: Challenge Lab \| logbook ]({% post_url qwiklabs/logbooks/2020-09-12-Build-and-Manage-APIs-with-Apigee-Challenge-Lab %})
- [☁ Engineer Data in Google Cloud: Challenge Lab \| logbook ]({% post_url qwiklabs/logbooks/2020-08-26-Engineer-Data-in-Google-Cloud-Challenge-Lab %})
- [☁ Explore Machine Learning Models with Explainable AI: Challenge Lab \| logbook ]({% post_url qwiklabs/logbooks/2020-09-20-Explore-Machine-Learning-Models-with-Explainable-AI-Challenge-Lab %})
- [☁ Integrate with Machine Learning APIs: Challenge Lab \| logbook ]({% post_url qwiklabs/logbooks/2020-10-07-Integrate-with-Machine-Learning-APIs-Challenge-Lab %})
- [☁ Implement DevOps in Google Cloud: Challenge Lab" \| logbook ]({% post_url qwiklabs/logbooks/2020-11-13-Implement-DevOps-in-Google-Cloud-Challenge-Lab %})
- [☁ Build and Optimize Data Warehouses with BigQuery: Challenge Lab \| logbook]({% post_url qwiklabs/logbooks/2021-06-25-gsp340-build-and-optimize-data-warehouses-with-bigquery-challenge-lab %})
- [☁ Ensure Access & Identity in Google Cloud: Challenge Lab \| logbook]({% post_url qwiklabs/logbooks/2021-03-10-gsp342-ensure-access-and-identity-in-google-cloud-challenge-lab %})
- [☁  Optimize Costs for Google Kubernetes Engine: Challenge Lab \| logbook]({% post_url qwiklabs/logbooks/2021-03-18-gsp343-optimize-costs-for-google-kubernetes-engine-challenge-lab %})
- [☁ Serverless Firebase Development: Challenge Lab \| logbook]({% post_url qwiklabs/logbooks/2021-07-14-gsp344-serverless-firebase-development-challenge-lab %})

_Quizzes Answers:_

- [☁ Controlling Your Costs [Quiz] \| logbook ]({% post_url qwiklabs/2019-12-29-Controlling-Your-Costs-Quiz %})
