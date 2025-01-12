---
layout: post
title: Fix reboot loop after a fail upgrade of Windows 10, Version 2004, Build 19041
date: 2020-06-23 23:18:00 +0800
categories: [Windows]
author: chris
tags: [Windows 10, WSL2]
permalink: /blog/windows/fix-windows10-boot-loop-after-fail-upgrade
redirect_from: /blog/windows/find-windows10-boot-loop-after-fail-upgrade
image: 
  path: /images/posts/windows/restoring-your-previous-version-of-windows-10-cover.png
  width: 537
  height: 302
  hide: true
amp:
  youtube: true
css:
  custom: >-
    .cli:not(code){
      margin-right: -.3rem;
      padding: .2rem .4rem;
      font-family: Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;
      font-size: 85%;
      background-color: #f7f7f9;
      border-radius: .25rem;
    }
featured: true
---

Microsoft released the Windows 10 May 2020 update. The most compelling feature is the [**Windows Subsystem for Linux version 2 (WSL2)**](https://www.omgubuntu.co.uk/how-to-install-wsl2-on-windows-10), which uses the latest and greatest in virtualization technology to run a Linux kernel inside of a lightweight utility virtual machine (VM).

The WSL2 has a faster File IO performance and 100% system call compatibility, compared to the WSL1 [^vs]. Program Manager _Craig Loewen_ [^Craig] at Microsoft demonstrated the WSL2 is about 5-6 times faster than the WSL1. He also performed running an app from inside a container using [Docker Desktop for Windows](https://code.visualstudio.com/blogs/2020/03/02/docker-in-wsl2) and [debug it using VS Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl). It's great news for developers 👨‍💻.

**To enable the WSL2, your operating system must be Windows 10, Version 2004, Build 19041 or higher**.

You can find your build number by pressing the **Start** <i class='fab fa-windows'></i> button or **Win + R** keys, and then type in **winver** [^winver] and hit the **Enter** key.

{% include picture.html width="460" height="423" img="windows/find-build-number-in-about-windows-10-by-winver.png" alt="Find Version and Build number in About Windows with winver" class="text-center" %}

{% include picture.html width="397" height="203" img="windows/find-windows-10-build-number-in-winver.png" alt="Find Windows 10 Build Number in winver" class="text-center" %}

It will show the **About Windows** dialog. For example, the above screenshot has a Windows 10, Version 1903, Build 18362. This means an update to Windows 10 May 2020 Update is required. I recommend you to watch the video below, which introduces how to get the update by Windows engineer _Savitha Quadros_.

{% include youtube.html id="YtqNzdrtrmw" title="How to get the Windows 10 May 2020 Update" %}

Open the **Windows Update** from the Control panel. If you see &quot;Download and install&quot; as the screenshot below, your device is ready for the update. You can click on it to run the process in the background. The updater will ask you to reboot your device when it finishes the job. 🥳👏

{% include picture.html height="388" img="windows/windows-10-feature-update-2004.png" alt="Windows Update - Feature update to Windows 10, version 2004" class="text-center" caption="Device is ready for update" %}

## DO NOT Try To Force Update Your Windows 10

However, you may see the warning sign as shown in the screenshot below. This indicates that it will have issues during updating or starting. Click on the &quot;[Learn more](https://docs.microsoft.com/en-us/windows/release-health/release-information "https://docs.microsoft.com/en-us/windows/release-information/status-windows-10-2004")&quot; button in the Windows Update settings. One of my PCs associates with that. I tried to work around by downloading the ISO image file and manually update the Windows from a USB drive. _BOOM!..._ 💥 I crash my operation system. Thus, I don't recommend you force update your Windows 10 to the new build.

{% include picture.html height="394" img="windows/windows-10-feature-update-2004-but-your-device-is-not-quite-ready.png" alt="Windows Update - Feature update to Windows 10, version 2004. The Windows 10 May 2020 Update is on its way. We’re offering this update to compatible devices, but your device isn’t quite ready for it. Once your device is ready, you’ll see the update available on this page. There’s nothing you need to do at this time." class="text-center" caption="Device isn’t quite ready for update" %}

When the update fails, the boot loader will try to restore your previous version of Windows. Unfortunately, my Windows 10 gets stuck to a boot loop displaying a black screen with the message **Restoring your previous version of Windows...** 😱

{% include picture.html width="693" height="302" img="windows/restoring-your-previous-version-of-windows-10.png" alt="Restoring your previous version of Windows... Windlows 10" %}

## Fix Reboot Loop After Fail Windows Upgrade

Many search results relate to this issue, if you google it. However, I found most of them did not work for my computer.

Eventually, I troubleshot the problem by **repairing the boot configuration data (BCD) in the EFI partition for Windows 10**. To do that, you need a Windows 10 repair disc or a Windows 10 installation USB drive. If you don't have one, use another computer to visit [Download Windows 10](https://www.microsoft.com/en-us/software-download/windows10) on the Microsoft website. Then, download and run the Media Creation Tool to create a bootable USB or DVD. After preparing the repair media 📀, move it to the fault machine and boot up to the Windows Startup Repair mode.

{% include picture.html width="648" height="350" img="windows/win10_safe_mode.png" alt="Windows 10 Safe mode" class="text-center" %}

In the Advanced options, select the **Command Prompt** option. Use the following commands to identify the partitions:

1. <span class="cli">X:\&gt;</span>`diskpart`
2. <span class="cli">DISKPART&gt;</span>`list disk`
3. <span class="cli">DISKPART&gt;</span>`select disk 0`<br>\* _or the number for the boot disk that has the EFI partition_
4. <span class="cli">DISKPART&gt;</span>`list partition`
5. <span class="cli">DISKPART&gt;</span>`select partition 1`<br>\* _or the number for the EFI partition, which usually is only a few hundred MB in size_
6. <span class="cli">DISKPART&gt;</span>`assign letter=S`
7. <span class="cli">DISKPART&gt;</span>`exit`

Next, change the current path to the partition and use the `bcdboot` command to repair the damaged boot files:

{:start="8"}
8. <span class="cli">X:\&gt;</span>`S:`
9. <span class="cli">S:\&gt;</span>`bcdboot D:\Windows /s S: /f UEFI`<br>\* _replace `D:` with the letter for the partition that has the Windows system_
10. <span class="cli">S:\&gt;</span>`exit`

Reboot your computer, the Windows 10 will start normally if the fix works.

* * *

**Useful External Links**:

- [How to Install Windows 10’s May 2020 Update](https://www.howtogeek.com/675118/how-to-install-windows-10s-may-2020-update/)

- [Windows 10 - Repair EFI Partition \| Windows Ninja - YouTube](https://youtu.be/l_I4K2-Rr_Y)

- [The Windows Subsystem for Linux BUILD 2020 Summary \| Windows Command Line](https://devblogs.microsoft.com/commandline/the-windows-subsystem-for-linux-build-2020-summary/)

If you are new to WSL, here is an article about what you can start with:

- [3 Fun Linux Tools to Run on Windows 10 With WSL \| How-To Geek](https://www.howtogeek.com/744175/3-fun-linux-tools-to-run-on-windows-10-with-wsl/)

  {:.card .card-block style="list-style: none"}
  - 🌞 Get the Weather in the Terminal
  - ⚾ Get Major League Baseball (MLB) Scores with MLB's Stats API
  - <i class="fab fa-twitter" style="color:skyblue"></i> Read Twitter on the Command Line using Python

**Footnotes**:

[^vs]: [Comparing WSL 2 and WSL 1 \| Microsoft Docs](https://docs.microsoft.com/en-us/windows/wsl/compare-versions?WT.mc_id=windows-c9-niner)
[^Craig]: [WSL2: Code faster on the Windows Subsystem for Linux! \| Microsoft Developer - YouTube](https://youtu.be/MrZolfGm8Zk)
[^winver]: [Which version of Windows operating system am I running? \| Windows Support](https://support.microsoft.com/en-us/help/13443/windows-which-version-am-i-running)
