---
layout: post
title: How to find the installation path of Windows store apps for default program settings in Windows 10
date: 2020-02-22 11:32
category: Windows
author: Chris KY Fung
tags: [Windows 10]
permalink: /blog/windows/find-windows10-store-app-path-for-default-program
redirect_from:
 - /blog/2020/02/22/find-windows10-store-app-path-for-default-program
excerpt: Do you want to change a Windows store app as the default program for opening files? Are you looking for the root folder of the Windows Store app for File Association? Here is a procedure of locating the path from the Windows Registry and setting it for a specific file type. In this article, I used the draw.io application as a demonstration.
---

<!--more-->

Recently, I faced a problem to choose a Windows Store app as the default app for a specific file type. The app was not found by using neither [Windows 10's Settings page or the "Open With" option from the right-click menu of the files](https://techforluddites.com/windows-10-change-the-default-programs-for-opening-files/). So I need to go for the "Look for another app on this PC" and locate where is the program (.exe) file.

Windows typically installs conventional programs to *C:\Program Files* or *C:\Program Files (x86)*, while it stores the store apps in a different folder called **WindowsApps** under the ***C:\Program Files*** directory. You can find the folder by enabling the display of hidden files in File Explorer, but Windows will alert that you do not have permission to access the folder. To browser the folder, you might [change the owner and the permission under its Advanced Security Settings](https://www.techmesto.com/windows-store-apps-installed-save-data/). However, it can turn your system at risk. A better way is to look for the installation path from the Windows Registry.

<br>

## Find the key using Registry Editor

The Windows Registry contains the keys and values for all store apps, including their installed locations. You can find them by following this procedure:

1. Press **Start**, search for [*regedit.exe*](https://www.lifewire.com/how-to-open-registry-editor-2625150) and then open it.<br>
![icon of regedit.exe](/images/posts/windows/icon%20of%20regedit.exe.png)

2. Registry Editor will open.

3. Navigate to `Computer\HKEY_CURRENT_USER\Software\Classes\Local Settings\Software\Microsoft\Windows\CurrentVersion\AppModel\Repository\Packages`.

4. Look for the key with the app name, or press **Ctrl+F** to use the "Find" dialog for a quick search under the registry tree.

5. Open the app key you found, there should be a subkey called `PackageID` and another called `PackageRootFolder`, shown as the example below.<br>
![Example registry of a windows store app](/images/posts/windows/Example%20registry%20of%20a%20windows%20store%20app.png)

6. Double-click the name of the subkey `PackageRootFolder`, and copy the value data to the clipboard.

<br>

## Use the "Open With" command to change the default program for the specific file type

1. In File Explorer, right-click on a file whose default program you want to change. Select **Open With** > Choose **Another App**.

2. Scroll down and click on **Look for another app on this PC**.

3. In the "Open with..." dialog, paste the copied path to the field "*File name:*" and hit Enter.<br>
![The app root folder in WindowsApps](/images/posts/windows/The%20app%20root%20folder%20in%20WindowsApps.jpg)

4. The app root folder will open. Find and choose the Program (.exe) file inside the folder and in its subfolders, for the application you want to make as the default.<br>
![The draw.io.exe under WindowsApps](/images/posts/windows/The%20draw-io-exe%20under%20WindowsApps.png)

The specific file type should now associate with the application. You can try to double-click a file to open it with the default program.

* * *

Have a question or suggestion? Let us know in the comments below.