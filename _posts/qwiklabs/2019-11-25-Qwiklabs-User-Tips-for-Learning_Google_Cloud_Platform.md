---
layout: post
title: "Learning Google Cloud Platform on Qwiklabs: Learning Map, Assistive Tool and Tips (2020)"
date: 2020-02-22 22:10 +0800
last_modified_at: 2020-06-20 23:36 +0800
author: chris
category: Cloud
tags: [Qwiklabs, Google Cloud, User tips, Learning map]
permalink: /blog/qwiklabs/Qwiklabs-User-Tips-for-Learning_Google_Cloud_Platform
redirect_from:
 - /blog/2019/11/25/Qwiklabs-User-Tips-for-Learning_Google_Cloud_Platform
image: 
   path: qwiklabs/qwiklabs-badges
   ext: jpg
excerpt: Over 400 hands-on labs and quests available on Qwiklabs for learning GCP. Therefore, we made a visual map for you to more easily seek a desired learning path.
featured: true
---

<!--more-->

## What is Qwiklabs

[Qwiklabs](https://www.qwiklabs.com) is a great online self-paced learning platform for getting hands-on experience of the Google Cloud Platform. It has over 400 hands-on labs and quests to learn and practice. If you are not familiar with Qwiklabs, I suggest you watch this video made by Google Cloud Team to get a rough idea about using Qwiklabs for Hands-on Practice with Google Cloud.

{% include youtube.html src="https://www.youtube.com/embed/cyp7soKLOYI" %}

<br>

After you logged in to Qwiklabs, you can see there are five training categories, i.e.
- Infrastructure & DevOps
- Websites & App Dev
- Big Data
- Machine Learning
- Security, Backup & Recovery

{% include picture.html img="qwiklabs/qwiklabs-default-catagories" ext="png" alt="Five default training catagories defined by Qwiklabs" %}

You can start your training based on your goal and purpose, or find the quests for GCP using the filter function available on the Catalog page. Qwiklabs grouped different kinds of labs into 56 quests for learning GCP, and divided them to 4 levels: Introductory, Fundamental, Advanced, and Expert. You may also look for the resources by search, but the results are sorted by relevance rather than an appropriate order for study or learning. As a result, I tried to organise the Qwiklabs quests to be a learning map to trace the connections among them.

{% include picture.html img="qwiklabs/qwiklabs-catalog-with-quest-filter-for-gcp" ext="png" alt="Using filter to find quests for Google Cloud Platform on Qwiklabs Catalog page" %}

## Visual Map of Qwiklabs GCP Quests

I spent about three months to take all the Qwiklabs quests for Google Cloud Platform. In the end, I think that there is a need to create a visual map to indicate and understand the relationships between the quests, thereby an easier way for any beginner to seek their desired learning paths. I illustrated the following map by connecting the blocks based on the quest descriptions. You can navigate in the map and click on the boxes to open the corresponding quest webpages.

<div id="quests-map" style="box-shadow: 1px 2px 15px #675bff;">
{% include qwiklabs-quests-map.html %}

<p class="text-center">Learning map for Qwiklabs GCP Quests (keep update)</p>
</div>

<!-- Button trigger modal -->
<p class="text-center">
<button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#LargeMapModal">
  Enlarge Diagram <i class='fas fa-search-plus'></i>
</button>
</p>

<!-- Modal -->
<div class="modal fade" id="LargeMapModal" tabindex="-1" role="dialog" aria-labelledby="LargeMapLabel" aria-hidden="true">
  <div class="modal-dialog" style="max-width:1280px;"  role="document">>
    <div class="modal-content">
      <div class="modal-header">
        <span class="modal-title" id="myModalLabel">Qwiklabs GCP Quests</span>
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
      </div>
      <div class="modal-body text-center">
            {% include qwiklabs-quests-map.html %}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

## Custom Tool for Labelling Completed Labs and Quests

As a Qwiklabs user, I found it is messy and damp to lookup unenrolled quests or incompleted labs from the Qwiklabs Catalog page or Search Results (https://www.qwiklabs.com/catalog). I desired to make a straight-forward way to identify the catalog, by adding a green check-circle next to those completed. So, I tried to develop a solution named "[Qwiklabs Completed Labs Tracker](https://github.com/chriskyfung/qwiklabs-completed-labs-tracker)".

The prototyped tool can help you visually identify the completed catalogue items with a green check-circle (<i class="fa fa-check-circle" style="color:green"></i>) showing at the end of a lab or quest title. A demo screenshot is shown below.

{% include picture.html img="qwiklabs-complete-indicator-quest-page-demo" ext="png" alt="Green Check Marks and Highlights to the completed lab items on a Qwiklabs Quest Page" caption="Fig. Effects on the completed labs on a Quest page (For version >= 0.4.5)" source="projects" class="text-center mb-4" %}

{% include picture.html img="qwiklabs-complete-indicator-lab-page-demo" ext="png" alt="Green Check Mark and Highlight displays on a Completed Qwiklabs Lab Page" caption="Fig. Effects on a completed lab page (For version >= 0.4.5)" source="projects" class="text-center mb-4" %}

For more information, you can read the post _"[Userscript for Labelling Completed Qwiklabs](/blog/qwiklabs/Userscript-for-Labelling-Completed-Qwiklabs)"_.

## Tips for Preparing a Lab

Sometimes, you can find examples and tutorials from the Qwiklabs' blog on [Medium](https://medium.com/@qwiklabs) ([@qwiklabs](https://medium.com/@qwiklabs)). Also, you may search for introductive videos from YouTube, such as the [Qwiklabs](https://www.youtube.com/channel/UCgadTofKslPYREQE8TjY7AA/videos) and the [Google Cloud Platform](https://www.youtube.com/user/googlecloudplatform) channels. The playlist below includes parts of the videos,

{% include youtube.html src="https://www.youtube.com/embed/videoseries?list=PLIivdWyY5sqKOsBSMDTF0M76nXeChgh5D" %}

<script type="text/javascript">
amzn_assoc_placement = "adunit0";
amzn_assoc_search_bar = "true";
amzn_assoc_tracking_id = "craftweek-20";
amzn_assoc_ad_mode = "manual";
amzn_assoc_ad_type = "smart";
amzn_assoc_marketplace = "amazon";
amzn_assoc_region = "US";
amzn_assoc_title = "Recommended Books";
amzn_assoc_linkid = "9cf248fb1fbaccac1da576f76533a29c";
amzn_assoc_asins = "1119564417,1491974567,1491962291,B07P5JZCXV";
</script>
<script src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US"></script>

## List of Quests (Updated: Jun 20, 2020)

<table id="quest-list" class="display">
    <thead>
        <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Level</th>
        <th>Costs</th>
        <th>Env</th>
        </tr>
    </thead>
    <tbody>
        {% for quest in site.data.qwiklabs-quests %}
        <tr>
            <td>{{ quest.id }}</td>
            <td><a href="https://www.qwiklabs.com/quests/{{ quest.id }}" target="_blank">{{ quest.name }}</a></td>
            <td>{{ quest.level }}</td>
            <td>{{ quest.costs }}</td>
            <td>{{ quest.env }}</td>
        </tr>
        {% endfor %}
    </tbody>
</table>

## List of Labs (Updated: Jun 20, 2020)

<table id="lab-list" class="display">
    <thead>
        <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Level</th>
        <th>Costs</th>
        <th>Env</th>
        </tr>
    </thead>
    <tbody>
        {% for lab in site.data.qwiklabs-labs %}
        <tr>
            <td>{{ lab.id }}</td>
            <td><a href="https://www.qwiklabs.com/focuses/{{ lab.id }}?parent=catalog" target="_blank">{{ lab.name }}</a></td>
            <td>{{ lab.level }}</td>
            <td>{{ lab.costs }}</td>
            <td>{{ lab.env }}</td>
        </tr>
        {% endfor %}
    </tbody>
</table>

## **See Also**

_Resources:_

- [Useful Google Cloud Platform Commands Cheat Sheet](/blog/qwiklabs/Useful-Google-Cloud-Platform-Commands-Cheat-Sheet)

_The Cookbooks of Challenge Quest Series:_

{% include picture.html img="qwiklabs/qwiklabs-change-badge-for-Challenge-GCP-Architecture-quest" ext="png" alt="Badges for Challenge-GCP-Architecture: Before and After" class="text-center" caption="Badge Change in 2020" link="/blog/qwiklabs/where-does-my-bear-badge-go" %}

- [Qwiklab/Logbook: Google Cloud Essential Skills: Challenge Lab](/blog/qwiklabs/Google-Cloud-Essential-Skills-Challenge-Lab)
- [Qwiklab/Logbook: Deploy a Compute Instance with a Remote Startup Script](/blog/qwiklabs/Deploy-a-Compute-Instance-with-a-Remote-Startup-Script)
- [Qwiklab/Logbook: Configure a Firewall and a Startup Script with Deployment Manager](/blog/qwiklabs/Configure-a-Firewall-and-a-Startup-Script-with-Deployment-Manager)
- [Qwiklabs/Logbook: Configure Secure RDP using a Windows Bastion Host with Terraform](/blog/qwiklabs/Configure-Windows-Bastion-Host-with-Terraform-on-GCP)
- [Qwiklab/Logbook: Build and Deploy a Docker Image to a Kubernetes Cluster](/blog/qwiklabs/Build-and-Deploy-a-Docker-Image-to-a-Kubernetes-Cluster)
- [Qwiklab/Logbook: Scale Out and Update a Containerized Application on a Kubernetes Cluster](/blog/qwiklabs/Scale-Out-and-Update-a-Containerized-Application-on-a-Kubernetes-Cluster)
- [Qwiklab/Logbook: Migrate a MySQL Database to Google Cloud SQL](/blog/qwiklabs/Migrate-a-MySQL-Database-to-Google-Cloud-SQL)

_The Hints for Challenge Labs 2020:_
- [Qwiklab/Logbook: Getting Started: Create and Manage Cloud Resources: Challenge Lab](/blog/qwiklabs/Getting-Started-Create-and-Manage_Cloud_Resources-Challenge-Lab)
- [Qwiklab/Logbook: Deploy and Manage Cloud Environments with Google Cloud: Challenge Lab](/blog/qwiklabs/Deploy-and-Manage-Cloud-Environments-with-Google-Cloud-Challenge-Lab)
- [Qwiklab/Logbook: Perform Foundational Infrastructure Tasks in Google Cloud: Challenge Lab](/blog/qwiklabs/Perform-Foundational-Infrastructure-Tasks-in-Google-Cloud-Challenge-Lab)
- [QLogbook: Deploy to Kubernetes in Google Cloud: Challenge Lab](/blog/qwiklabs/Deploy-to-Kubernetes-in-Google-Cloud-Challenge-Lab)
- [QLogbook: Build a Website on Google Cloud: Challenge Lab](/blog/qwiklabs/Build-a-Website-on-Google-Cloud-Challenge-Lab)

_Quizzes Answers:_

- [Qwiklab/Logbook: Controlling Your Costs [Quiz]](/blog/qwiklabs/Controlling-Your-Costs-Quiz)

{% include datatables.html %}