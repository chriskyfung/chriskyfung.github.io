---
layout: post
title: "Userscript for Labelling Completed Qwiklabs"
author: chris
date: 2019-09-01
last_modified_at: 2020-06-04 18:10:00 +8000
category: Hack
permalink: /blog/qwiklabs/Userscript-for-Labelling-Completed-Qwiklabs
redirect_from:
 - /blog/2019/09/01/Userscript-for-Labelling-Completed-Qwiklabs
tags: [Qwiklabs, userscript]
image: 
  path: qwiklabs/science-1408800_1280
  ext: jpg
---

[Qwiklabs](https://www.qwiklabs.com) is a great online self-paced learning platform for getting hands-on experience of the Google Cloud Platform. It has over 400 hands-on labs and quests to learn and practice.

As a Qwiklabs user, I figure out it is messy and damp to lookup unenrolled quests or incompleted labs from the Qwiklabs Catalog page or Search Results ([www.qwiklabs.com/catalog](https://www.qwiklabs.com/catalog)). I desired to make a straight-forward way to  identify the catalogue items, by adding a green check-circle (<i class="fa fa-check-circle" style="color:green"></i>) next to those completed. So, I tried to develop a solution named "[Qwiklabs Completed Labs Tracker](https://github.com/chriskyfung/qwiklabs-completed-labs-tracker)" (also formerly known as “Qwiklabs Complete Indicator”).

{% include picture.html img="qwiklabs-complete-indicator-catalog-page-old" ext="png" alt="Green Check Mark and Highlight displays on Qwiklabs Catalog Page" caption="Fig. Effects on the Qwiklabs catalog page (For version < 0.4.5)" source="projects" class="text-center" %}

<!--more-->

<br>

**The objectives of this project are:**
- To develop a handy way to implement the enhancement to the Qwiklabs website in a web browser.
- To indicate completed labs and quests in Qwiklabs Catalog pages, thereby easier to inspect the self-learning progress and look for unenrolled quests or incomplete labs.
- To design a location to store and update the name list of the completed items.

<br>

A prototype was developed using Tampermonkey <i class="fa fa-plug"></i> for Google Chrome <i class="fab fa-chrome"></i>. [Tampermonkey](https://www.tampermonkey.net/) is a Chrome extension which allows users easily create, edit and execute Javascript-based <i class="fa fa-code"></i> [Userscripts](https://en.wikipedia.org/wiki/Userscript) in the web browser. With the prototyped userscript, you can visually identify the completed catalogue items. Each catalog item compares with the `status` stored in the JSON-markup data (the current alpha version requires manually labeling it within the userscript). If the corresponding record marked with `finished`, A green check-circle (<i class="fa fa-check-circle" style="color:green"></i>) will append to the end of a lab or quest title. Those items will also be highlighted in light green for v0.4.5 or above. From v0.4.8, any labs and quests unregister to the JSON data will be highlighted in yellow and labeled with a **NEW** badge. The tracking also applies to a Qwiklabs quest page. When you click on a lab, the annotation adds to the heading of the individual lab page. The demo screenshots are shown below.

{% include picture.html img="qwiklabs-complete-indicator-catalog-page-demo" ext="png" alt="Green Check Marks and Highlights on a Qwiklabs Catalog Page" caption="Fig. Effects on the Qwiklabs catalog page (For version >= 0.4.8)" source="projects" class="text-center mb-4" %}

{:.text-center}
<i class='fas fa-angle-down' style='font-size:48px;'></i>

{% include picture.html img="qwiklabs-complete-indicator-quest-page-demo" ext="png" alt="Green Check Marks and Highlights to the completed lab items on a Qwiklabs Quest Page" caption="Fig. Effects on the completed labs on a Quest page (For version >= 0.4.5)" source="projects" class="text-center mb-4" %}

{:.text-center}
<i class='fas fa-angle-down' style='font-size:48px;'></i>

{% include picture.html img="qwiklabs-complete-indicator-lab-page-demo" ext="png" alt="Green Check Mark and Highlight displays on a Completed Qwiklabs Lab Page" caption="Fig. Effects on a completed lab page (For version >= 0.4.5)" source="projects" class="text-center mb-4" %}

The **version 0.4.5** start covering the "*Completed Courses*" and "*Completed Labs*" pages under the **My Learning** section. Since the quests mix with speedrun games in the list of completed courses, each row of the game records highlights in purple color for distinguishing them.

{% include picture.html img="qwiklabs-complete-indicator-courses-table" ext="png" alt="Markers and Highlights on Completed Courses" caption="Fig. Effects on the <i>Completed Courses</i> page (For version >= 0.4.5)" source="projects" class="text-center mb-4" %}

{% include picture.html img="qwiklabs-complete-indicator-labs-table" ext="png" alt="Markers and Highlights on Completed Labs pages" caption="Fig. Effects on the <i>Completed Labs</i> page (For version >= 0.4.5)" source="projects" class="text-center mb-4" %}

From **version 0.4.8**, marker annotations support the "_Your Favorites_", "_Featured Learning_", and "_What's Hots_" sections on the **Home** page as well as the **My Learning** page.

{% include picture.html img="qwiklabs-complete-indicator-home-favorites" ext="png" alt="Markers on Your Favorites" source="projects" class="text-center mb-0" %}

{% include picture.html img="qwiklabs-complete-indicator-home-featured" ext="png" alt="Markers on Featured Learning" source="projects" class="text-center mb-0" %}

{% include picture.html img="qwiklabs-complete-indicator-home-hots" ext="png" alt="Markers on What's Hot" source="projects" class="text-center mb-5" %}

## Future Plans

- [Export Profile as Files](https://github.com/chriskyfung/qwiklabs-completed-labs-tracker/issues/6) #6
- [Import Downloaded Profile](https://github.com/chriskyfung/qwiklabs-completed-labs-tracker/issues/1) #1
- [Save local records in IndexedDB](https://github.com/chriskyfung/qwiklabs-completed-labs-tracker/issues/4) #4
- [Sync IndexedDB across computers](https://github.com/chriskyfung/qwiklabs-completed-labs-tracker/issues/7) #7

* * *

**See Also**

- [Learning Google Cloud Platform on Qwiklabs: Learning Map, Assistive Tool and Tips](/blog/qwiklabs/Qwiklabs-User-Tips-for-Learning_Google_Cloud_Platform)

- [Qwiklab/Logbook: Google Cloud Essential Skills: Challenge Lab](/blog/qwiklabs/Google-Cloud-Essential-Skills-Challenge-Lab)

- [Qwiklabs/Logbook: Configure Secure RDP using a Windows Bastion Host with Terraform](/blog/qwiklabs/Configure-Windows-Bastion-Host-with-Terraform-on-GCP)
