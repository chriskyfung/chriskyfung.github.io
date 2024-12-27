---
layout: post
title: "Qwiklabs Lab Completion Tracker - Version History"
author: chris
date: 2021-09-30 18:00 +08:00
categories: [Cloud, Project]
permalink: /blog/qwiklabs/qwiklab-completion-tracker-versions
tags: [Qwiklabs, Userscript, Changelog]
image: 
  path: /images/posts/qwiklabs/science-1408800_1280.jpg
  height: 411
excerpt: The changelog, the feature highlights, and the screenshots of the previous versions of the "Qwiklabs Lab Completion Tracker".
---

<br>

<amp-img src="https://img.shields.io/github/v/release/chriskyfung/qwiklabs-completed-labs-tracker" width="94" height="20" alt="GitHub release (latest by date)"></amp-img>
<amp-img src="https://img.shields.io/badge/License-GPLv3-blue.svg" width="96" height="20" alt="License: GPL v3"></amp-img>
<amp-img src="https://img.shields.io/github/issues-raw/chriskyfung/qwiklabs-completed-labs-tracker" width="92" height="20" alt="GitHub issues"></amp-img>

<i class='fas fa-chevron-circle-left'></i> [Userscript for Qwiklabs Completion Tracking]({% post_url qwiklabs/completion-tracker/2019-09-01-Userscript-for-Labelling-Completed-Qwiklabs %})

<a href="https://github.com/chriskyfung/qwiklabs-completed-labs-tracker/raw/master/qwiklabs-explorer.user.js" style="box-shadow: none" rel="noopener" target="_blank"><amp-img src="https://img.shields.io/badge/-Install%20Script-brightgreen?color=green&logo=tampermonkey&style=for-the-badge" width="152" height="28" alt="Install Script with Tampermonkey"></amp-img></a>

## v2.0 - Revamp for New Qwiklabs Web Design 🚁

<small><i class="fas fa-calendar-day fa-sm"></i> <time datetime="2021-09-30">2021-09-30</time></small>

Qwiklabs made a significant change in its web design at the end of September 2021. It broke most of the features in our previous versions. I'd made an effort to revise and update the code to keep up with the latest Qwiklabs web design. Today, I'm happy to announce the release the version 2.0 of our Qwiklabs Lab Completion Tracker.

### 🖼 Screenshots of Major Changes in v2.0

{% include picture.html width="1326" height="492" img="card-annotations-by-qwiklabs-lab-completion-tracker_1326x492-o128.png" alt="Card annotations on Qwiklabs Home page by Lab Completion Tracker" caption="Status icons are inserted under the progress bar of activity cards on Qwiklabs Home page" source="projects" class="text-center" %}

{% include picture.html width="1384" height="585" img="features-in-qwiklabs-activities-tab_1384x585-o128.png" alt="Add-ons features on Qwiklabs Profile page by Lab Completion Tracker" caption="The <q>Update database records</q> and <q>View last 100 records</q> add-ons buttons on Qwiklabs Profile page" source="projects" class="text-center" %}

## v1.0 - Fix the Change in My Learning URL

<small><i class="fas fa-calendar-day fa-sm"></i> <time datetime="2021-09-18">2021-09-18</time></small>

- Replaced `/my_learning` with `/profile/activity`.
- Changed the CSS selector and Regular Expression to look up the total number of activities.
- Do not support pages with a URL starting with `/my_learning`.

* * *

## v0.5.5 - Fix Not Recognize Activity Names That Contains Colons (:)

<small><i class="fas fa-calendar-day fa-sm"></i> <time datetime="2021-05-04">2021-05-04</time></small>

- Set a custom attribute to tag the lab/quest 🆔 for the row of unmarked learning activities
- Change to use the lab/quest ID as the key 🗝 for batch update to DB
- Fix the type of lab/quest 🆔 (aka an integer) during update

## v0.5.4 - Fix the Change in My Learning Layout

<small><i class="fas fa-calendar-day fa-sm"></i> <time datetime="2021-04-09">2021-04-09</time></small>

- Added a quick link to view all **My Learning Activity** results
- Revised the way to update the database records with the new format of learning activity data

   {% include picture.html img="qwiklabs/my-qwiklabs-learning-activity-tracker-v0.5.4.png" width="1163" height="534" alt="Quick link and batch update My Learning Activity to database" caption="Effects on the new My Learning Activity section (For v0.5.4)" class="text-center" %}

## v0.5.3

- Eliminate scripts for the `/my_learning/labs` and `/my_learning/courses` pages
- Modified to parse and annotate the new My **Learning Activity** table

## v0.5.2

- Amended for the new **Catalog** page design

## v0.5.1

- One-click update the labs and quests status to the IndexedDB

## v0.5.0

- Store the labs and quests data locally with IndexedDB
- Repackage JavaScript with Async/Await

* * *

## For v0.4.8 or Earlier

- Each catalog item compares with the manually labelled array data storing within the userscript.
- Label the completed labs and quests with a green check-circle (<i class="fa fa-check-circle" style="color:green"></i>) at the end of their titles.

   {% include picture.html height="576"
      img="qwiklabs-complete-indicator-catalog-page-old.png" alt="Green Check Mark and Highlight displays on Qwiklabs Catalog Page" caption="Effects on the Qwiklabs catalog page (For version < 0.4.5)" source="projects" class="text-center" %}

### v0.4.8 - Support Tracking "Home" and "My Learning" Pages

<small><i class="fas fa-calendar-day fa-sm"></i> <time datetime="2020-06-06">2020-06-06</time></small>

- Add **NEW** badges and yellow highlights to any unregistered labs and quests.
- Apply the color scheme to the short tables of the "Completed Courses" and "Completed Labs" pages on the **My Learning** page.
- Apply the annotation scheme to the "Your Favorites", "Featured Learning", and "What’s Hots" sections on the **Home** page.

### v0.4.5

<small><i class="fas fa-calendar-day fa-sm"></i> <time datetime="2020-05-20">2020-05-20</time></small>

- Add green highlight to the titles of completed labs and quests.
- Add annotations to Your Favorites in the **My Learning** page.
- Add color backgrounds to each row in tables of the **Completed Courses** and **Completed Labs** pages.
- Change to use JSON-markup for storing lab and quest data.

The **version 0.4.5** start covering the "*Completed Courses*" and "*Completed Labs*" pages under the **My Learning** section. Since the quests mix with speedrun games in the list of completed courses, each row of the game records highlights in purple color for distinguishing them.

<div class="row">

   {% include picture.html height="339"
   img="qwiklabs-complete-indicator-courses-table.png" alt="Markers and Highlights on Completed Courses" caption="Effects on the <i>Completed Courses</i> page (For version >= 0.4.5)" source="projects" class="col-md-6 text-center mb-4" %}

   {% include picture.html height="337"
   img="qwiklabs-complete-indicator-labs-table.png" alt="Markers and Highlights on Completed Labs pages" caption="Effects on the <i>Completed Labs</i> page (For version >= 0.4.5)" source="projects" class="col-md-6 text-center mb-4" %}

</div>

* * *
