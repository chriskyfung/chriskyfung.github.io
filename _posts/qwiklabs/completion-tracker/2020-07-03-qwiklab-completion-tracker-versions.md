---
layout: post
title: "Qwiklabs Completed Labs Tracker - Version History"
author: chris
date: 2019-09-01 20:30 +08:00
last_modified_at: 2020-07-03 20:30 +08:00
category: Projects
permalink: /blog/qwiklabs/qwiklab-completion-tracker-versions
tags: [Qwiklabs, Userscript, Changelog]
image: 
  path: qwiklabs/science-1408800_1280
  ext: jpg
excerpt: The changelog, the feature highlights and the screenshots of the previous versions of the "Qwiklabs Completed Labs Tracker".
---

{:.mt-4}
## <i class='fas fa-chevron-circle-left'></i> [Userscript for Qwiklabs Completion Tracking](/blog/qwiklabs/Userscript-for-Labelling-Completed-Qwiklabs)

### For v0.5.0 or higher

* * *

##### v0.5.1 

- One-click update the labs and quests status to the IndexedDB

##### v0.5.0

- Store the labs and quests data locally with IndexedDB
- Repackage JavaScript with Async/Await

### For v0.4.8 or earlier

* * *

- Each catalog item compares with the manually labelled array data storing within the userscript.
- Label the completed labs and quests with a green check-circle (<i class="fa fa-check-circle" style="color:green"></i>) at the end of their titles.

{% include picture.html img="qwiklabs-complete-indicator-catalog-page-old" ext="png" alt="Green Check Mark and Highlight displays on Qwiklabs Catalog Page" caption="Fig. Effects on the Qwiklabs catalog page (For version < 0.4.5)" source="projects" class="text-center" %}

##### v0.4.8

- Add **NEW** badges and yellow highlights to any unregistered labs and quests.
- Apply the color scheme to the short tables of the "Completed Courses" and "Completed Labs" pages on the **My Learning** page.
- Apply the annotation scheme to the "Your Favorites", "Featured Learning", and "What’s Hots" sections on the **Home** page.

##### v0.4.5

- Add green highlight to the titles of completed labs and quests.
- Add annotations to Your Favorites in the **My Learning** page.
- Add color backgrounds to each row in tables of the **Completed Courses** and **Completed Labs** pages.
- Change to use JSON-markup for storing lab and quest data.

The **version 0.4.5** start covering the "*Completed Courses*" and "*Completed Labs*" pages under the **My Learning** section. Since the quests mix with speedrun games in the list of completed courses, each row of the game records highlights in purple color for distinguishing them.

{% include picture.html img="qwiklabs-complete-indicator-courses-table" ext="png" alt="Markers and Highlights on Completed Courses" caption="Fig. Effects on the <i>Completed Courses</i> page (For version >= 0.4.5)" source="projects" class="text-center mb-4" %}

{% include picture.html img="qwiklabs-complete-indicator-labs-table" ext="png" alt="Markers and Highlights on Completed Labs pages" caption="Fig. Effects on the <i>Completed Labs</i> page (For version >= 0.4.5)" source="projects" class="text-center mb-4" %}

* * *
