---
layout: post
title: "Install Chrome Remote Desktop on KDE desktop / Kubuntu 14.04 LTS or higher"
author: chris
date: 2019-04-04
category: Linux
tags: [Ubuntu, KDE, remote desktop]
excerpt: Chrome Remote Desktop is a free alternative of Teamviewer. It can access PCs in secured networks. If you want to set up it on Linux, you may encounter many troubles. You must correctly install and setup the configurations for the host component on Linux. For Kubuntu 14.04 LTS, which operates with a KDE desktop environment. I believe that many Kubuntu users also face the same problem and feel disappointed. So, I write this article to share my solution.
image: images/posts/linux/Kubuntu_14.04_LTS.jpg

---

Teamviewer is the primary choice of cross-platform remote desktop software for Windows, Mac, and Linux systems. It is quite often that universities and institutes have a secured network, therefore traditional VNC connect fails to receive incoming packets via listening ports. The Teamviewer allows PC connections beyond private networks, that are blocked by firewalls or router settings. It is also easy to set up, as it installs its host and client at one time. It is wonderful to remotely access your desktop at any time and anywhere. Teamviewer is awesome and free for personal, non-commercial use.

<!--more-->

Remote desktop is useful for research students and part-time researchers. It assists them to read and download journal papers from the databases subscribed by their universities via remotely access their campus networks. I also use remote desktop to monitor the servers for running simulations. However, accessing campus networks is defined as using in a commercial environment, according to the Teamviewer licenses. For many years, the Teamviewer team had not taken any actions to restrict the above usages. However, it has started to detect invalid connections and delivery 'Commercial use suspected' / 'Commercial use detected' messages since 2018. Once your connection pair is restricted, you have to purchase a [service license](https://bit.ly/2Ia9XIr) or [send an appeal to the Teamviewer](https://bit.ly/2WEkbtI) if you believe you used it for personal use only. The monthly license is not cheap (for students). And, sadly there is no plan or offer for educational use. If you think the price is affordable, I'll recommend you to continue using the Teamviewer, which I think is the best remote desktop software. Otherwise, I suggest you try Chrome Remote Desktop as an alternative solution.

Chrome Remote Desktop is a free product provided by Google. It is the only remote desktop software that can access PCs in secured networks as well as the Teamviewer among a bundle of similar software. If you install the Chrome Remote Desktop on Windows or Mac, there should be no big issues. But if you want to set up it on Linux, you may encounter many troubles. You must correctly install and setup the configurations for the host component on Linux.

For Ubuntu users, I think you can find a fix if you use a GNOME or Unity graphical interface. Unfortunately, I didn't find a workable solution for my Kubuntu 14.04 LTS, which operates with a KDE desktop environment. I believe that many Kubuntu users also face the same problem and feel disappointed. So, I write this article to share my solution.

* * *

### **Procedures**

I eventually successfully run the host of Chrome Remote Desktop on my Kubuntu 14.04 LTS. The installation procedures were as below.

#### Part 1 - Installation

Before the following steps, please read [Google's help document](https://support.google.com/chrome/answer/1649523).

<span style="color:red">Note: ** Ubuntu 12.04 is no longer supported due to outdated chrome version **</span>

**Install Google Chrome**

Run the following commands to download and install the Chrome Browser,

```bash
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb
```

**Download and Install Chrome Remote Desktop Host Component Package**

Run the following commands to download and install the host component of Chrome Remote Desktop for 64-bit Debian,

```bash
wget https://dl.google.com/linux/direct/chrome-remote-desktop_current_amd64.deb
sudo dpkg -i chrome-remote-desktop_current_amd64.deb
sudo apt-get install -f
```

**Add Groups**

Use the commands below to add your `<username>` to the chrome-remote-desktop group, and then reboot/logoff for the changes to take effect.

```bash
sudo usermod -a -G chrome-remote-desktop <username>
sudo reboot
```

* * *

### Part 2 - Edit Configuration Files

Create a file called .chrome-remote-desktop-session in your home directory, and add the following line for Kubuntu,

```bash
exec /usr/bin/icewm-session '/usr/bin/startkde'
```

Stop Chrome Remote Desktop,

```bash
/opt/google/chrome-remote-desktop/chrome-remote-desktop --stop
```

Backup the original configuration,

```bash
sudo cp /opt/google/chrome-remote-desktop/chrome-remote-desktop /opt/google/chrome-remote-desktop/chrome-remote-desktop.orig
```

Create and edit a new configuration file,

```bash
sudo nano /opt/google/chrome-remote-desktop/chrome-remote-desktop
```

Find the line for defining `DEFAULT_SIZES` and amend to the remote desktop resolution. For example:
`DEFAULT_SIZES = "1600x900"`

Set the X display number to the current display number (obtain it with echo $DISPLAY from any terminal). On Ubuntu 17.10 and lower, this is usually 0, and on Ubuntu 18.04, this is usually 1.
`FIRST_X_DISPLAY_NUMBER = 0`

Add `#` in front of the following two lines to comment out sections that look for additional displays,

```conf
# while os.path.exists(X_LOCK_FILE_TEMPLATE % display):
# display += 1
```

To reuse the existing X session instead of launching a new one, altering `launch_session()` by commenting out `launch_x_server()` and `launch_x_session()` and instead setting the display environment variable, by adding the last two lines below, so that the function definition ultimately looks like the following:

```conf
def launch_session(self, x_args):
self._init_child_env()
self._setup_pulseaudio()
self._setup_gnubby()
#self._launch_x_server(x_args)
#self._launch_x_session()
display = self.get_unused_display_number()
self.child_env["DISPLAY"] = ":%d" % display
```

Press `Ctrl+X` and then `Y` to save the file and exit the editor. Finally, start Chrome Remote Desktop with the following command.

`/opt/google/chrome-remote-desktop/chrome-remote-desktop --start`

Now you should able to register your Linux desktop as a computer on your Chrome Remote Desktop. Try to remotely access this desktop from other computers to test the connections.

* * *

### Unsolved Problem

Although the above method can set up the Chrome Remote Desktop on an Ubuntu with KDE desktop, I haven't figure out how to register it as a permanent service. The chrome remote desktop service will not start after rebooting the system. You have to manually launch the Chrome Remote Desktop extension from your Chrome browser. If you know how to set the host as a permanent service, please share your method in the comment section below.

* * *

I hope this article can help you to solve your problem.

### References

1. [How to Install Chrome Remote Desktop on Ubuntu 18.04 - Medium](https://medium.com/@vsimon/how-to-install-chrome-remote-desktop-on-ubuntu-18-04-52d99980d83e)
2. [Access another computer with Chrome Remote Desktop - Computer - Google Chrome Help](https://support.google.com/chrome/answer/1649523)
3. [Chrome Remote desktop Install for Linux - Everything Linux 101](https://www.everything-linux-101.com/how-to/remote-control/chrome-remote-desktop-install-for-linux/)

### Related

- [Useful command lines in Ubuntu that help using terminals
](/blog/linux/Useful-Ubuntu-Commands)