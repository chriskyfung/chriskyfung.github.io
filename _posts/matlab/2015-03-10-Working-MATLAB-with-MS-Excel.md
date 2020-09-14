---
layout: post
title: "Working MATLAB with MS Excel"
author: chris
date: 2015-03-10
category: Academic
tags: [MATLAB, MS Excel, Data-Science]
image: 
   path: /images/posts/matlab/excel_addin_menu.png
   width: 251
   height: 262
permalink: /blog/matlab/Working-MATLAB-with-MS-Excel
redirect_from:
 - /blog/2015/03/10/Working-MATLAB-with-MS-Excel
---

This is a tutorial to show the installation of **Spreadsheet Link EX for use with MATLAB and Excel**.

<!--more-->

### Procedures

1. First, make sure you can find the `excllink.xlam` file under your MATLAB program directory `\matlabroot\toolbox\exlink\`.

2. Click Open. In the Add-Ins dialog box, the Spreadsheet Link EX for use with MATLAB and Excel checkbox is selected.

{% include picture.html width="500" height="368"
img="matlab/excel_addins_available.png" alt="image: MS Excel Add-in Dialog" class="ml-5 mb-5" %}

The **Spreadsheet Link EX Add-In** loads now and with each subsequent Excel session. The MATLAB group appears on the top right of the Home tab in your Excel worksheet. Open the Menu and click **Start MATLAB**.

{% include picture.html width="251" height="262"
img="matlab/excel_addin_menu.png" alt="image: Menu of MATLAB Spreadsheet Link EX Add-In in Excel Toolbar" class="mb-5 text-center" %}

The **MATLAB Command Window** button appears on the Microsoft Windows taskbar. Spreadsheet Link EX is ready for use.

{% include picture.html width="147" height="35"
img="matlab/ml_cmd_window_taskbar.excel2010.png" alt="image: Windows taskbar with MS Excel and MATLAB" class="mb-5 text-center" %}
 
Now, you can see a list of the MATLAB options in the context menu when you right-click a cell in Excel.

{% include picture.html width="642" height="615"
img="matlab/excel_addin_menu_right_click.png" alt="image: context menu of MATLAB Spreadsheet Link EX Add-In" class="mb-5" %}

* * *

**Keep on reading**:
- [Matrix Conversion between MATLAB and Microsoft Equation Editor](/blog/matlab/Convert-MATLAB-Matrix-to-MS-Office-Equation)
- [Expand shorten URLs in MATLAB](/blog/matlab/expand-twitter-short-url)