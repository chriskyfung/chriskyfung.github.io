---
layout: post
title: Fix Windows 10 reboot loop after upgrade failed
date: 2020-06-17 11:32:00 +0800
category: Windows
author: chris
tags: [Windows 10]
permalink: /blog/windows/find-windows10-boot-loop-after-fail-upgrade
excerpt: 
---

Microsoft released the [Windows Subsystem for Linux version 2 (WSL2) in the Windows 10 May 2020 update](https://www.omgubuntu.co.uk/how-to-install-wsl2-on-windows-10) for general users, whom do not join the Windows Insider Program as beta testers. The WSL 2 uses the latest and greatest in virtualization technology to run a Linux kernel inside of a lightweight utility virtual machine (VM). It has a faster file IO performance and 100% system call compatibility, [compared to the WSL1](https://docs.microsoft.com/en-us/windows/wsl/compare-versions?WT.mc_id=windows-c9-niner). Craig Loewen, Program Manager at Microsoft, demonstrated the WSL2 is about 5-6 times faster than the WSL1 in this [YouTube video](https://youtu.be/MrZolfGm8Zk). He also performed running an app from inside a container using [Docker Desktop for Windows](https://code.visualstudio.com/blogs/2020/03/02/docker-in-wsl2) and [debug it using VS Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl).

To enable the WSL2, your operating system must be Windows 10, Version 2004, Build 19041 or higher. You can find your build number by pressing the **Start** <i class='fab fa-windows'></i> button or **Win + R** keys, and then type in [`winver`](https://support.microsoft.com/en-us/help/13443/windows-which-version-am-i-running) and hit the **Enter** key.

{% include picture.html img="find-windows-10-build-number-in-winver" ext="png" alt="Find Windows 10 Build Number in winver" %}

{% include picture.html img="find-build-number-in-about-windows-10-by-winver" ext="png" alt="Find Version and Build number in About Windows with winver" %}

It will show the **About Windows** dialog. For example, the above screenshot has a Windows 10, Version 1903, Build 18362. Go to [Download Windows 10](https://www.microsoft.com/en-us/software-download/windows10) in the Microsoft website and download the **Update Assistant** from the page.




Windows 10 gets stuck to a black screen with the message **Restoring your previous version of Windows...**
boot loop

{% include picture.html img="restoring-your-previous-version-of-windows-10" ext="png" alt="Restoring your previous version of Windows... Windlows 10" %}

If you google, many search results relate to this issue. However, I found most of them did not work for my computers.