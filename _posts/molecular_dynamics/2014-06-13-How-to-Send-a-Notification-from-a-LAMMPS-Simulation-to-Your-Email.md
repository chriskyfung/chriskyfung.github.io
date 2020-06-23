---
layout: post
title: "How to Send a Notification from a LAMMPS Simulation to Your Email"
author: chris
date: 2014-06-13
category: Academic
tags: [LAMMPS, Email, Command-line, Molecular dynamics]
image:
  path: lammps/lammps_send_email_transparent
  ext: png
---

Molecular dynamics simulations often take long computational times, from several hours to a few days. It is a boring job to monitor the progress of simulations. Very often, we switch to do other work on another computer, but you may be anxious to see the simulation results. So, how can we better spend our time and focus on our research work? Here is one solution to allow the LAMMPS to send you an email, so you can no longer actively checking the progress of simulations. It is also important to minimize the idle time and maximize the utility of your computer.

<!--more-->

I run my LAMMPS in Ubuntu 12.04 LTS. Because I require the USER-CUDA and USER-REAXC Libraries. The Linux platform also allows me to work more efficiently on a low-end desktop computer that only consists of an Intel Core 2 Duo CPU and 2GB DDRII RAM. So, I am going to show you how to configure the email package and use the shell command of LAMMPS in Ubuntu. You may run the LAMMPS in Microsoft Windows. If so, please read the section at the end of this post.

### For Ubuntu

1. First, you need an email account with supporting SMTP outgoing service. For example, Gmail. The following web page describes how to download and set up the Gmail SMTP service in Ubuntu.

   > <a href="https://foksh.com/site/configure-ubuntu-server-to-send-emails-from-gmail-account/" target="_blank">Configure Ubuntu Server to Send Emails From Gmail Account « Foksh.com</a>

2. Next, we have to add a line at the end of our LAMMPS input script.

   ```bash
   shell echo “Email Content“ | mail -s "Title" to-this-email-address
   ```

   For examples,
  
   ```bash
   shell echo "Simulation has completed" | mail -s "LAMMPS - simulation done" address@email.com
   ```
  
  You can add this line in various places if you want to know the progress of a multi-stage simulation.

### For Windows

I have tested this method in Windows. But the same concept should also work in Windows. I found a web page here (https://www.wikihow.com/Send-Email-Using-Telnet), which describes how to use the cmd prompt and telnet command to ping an SMTP server and send an email. You can try this if you like running LAMMPS in Windows.

{% include picture.html img="lammps/messager" ext="png" alt="messager" class="text-center shadow-none" %}

* * *

**Related**: [Tip for scripting LAMMPS: Create And Rename A Folder Based On The Input Variables](/blog/2014/07/12/Tip-for-scripting-LAMMPS-Create-And-Rename-A-Folder-Based-On-The-Input-Variables)