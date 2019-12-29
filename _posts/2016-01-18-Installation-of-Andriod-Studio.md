---
layout: post
title: Installation of Android Studio and SDK Tools
date: 2016-01-18 21:36
category: Android Development
author: Chris KY Fung
tags: [Android Studio]
---

![Andriod Studio Setup dialogue](/images/posts/android/Android_Studio_setup.png)

<!--more-->

### Preparation
Beforehand, you have to download the installers of **Android Studio** and **JDK7 or higher** from the following links:

**Download Android Studio and SDK Tools | Android Developers**

http://developer.android.com/sdk/index.html

<span style="color:red;">The file size of This installer has over 1GB. It may take times to download depending on your network speed.</span>

**Java SE Development Kit 7u79**

http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html

### Steps of Installation
1. First, install the JDK7. (It will take 5 to 10 mins)
2. For Windows, add add a new system variable **JAVA_HOME** to Environment Variables.
    i. Select **Start menu** > **Computer** > **System Properties** > **Advanced System Properties**.
	ii. Then open **Advanced tab** > **Environment Variables**.
	iii. Add a new system variable **JAVA_HOME** that points to your _JDK folder_, for example `C:\Program Files\Java\jdk1.7.0_xx`
3. After setup the JDK, run the Android Studio installer (it will take about 10 mins for installation).

* * *
<small>※ Updates: You can find the change log of Android Studio from this page (http://tools.android.com/recent).</small>