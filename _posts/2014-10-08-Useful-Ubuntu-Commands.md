---
layout: post
title: Useful command lines in Ubuntu that help using terminals
date: 2014-10-08 16:21
last_modified_at: 2017-03-01 17:59
category: Linux
author: Chris KY Fung
tags: [Ubuntu]
permalink: /blog/linux/Useful-Ubuntu-Commands
redirect_from:
 - /blog/2014/10/08/Useful-Ubuntu-Commands
excerpt: A short note about my favorite terminal application and the commands to show running processes, get root permission for GUI file manager, find previous commands and execute a shell script.
---

<!--more-->

## My favorite terminal application

![Terminator icon](/images/posts/linux/terminator.png)

[Terminator](https://launchpad.net/terminator/) allows you to open multiple terminals in one window, which can boost your productivity by operating two or more shells side by side or in grids.

It can be installed to Ubuntu by running the following code:

```bash
sudo apt-get install terminator
```

**Shortcut keys:**

|          Action         |   Shortcut   |
|-------------------------|--------------|
| Split horizontally      | Shift+Ctrl+O |
| Split Vertically        | Shift+Ctrl+E |
| Focus on above terminal | Alt + UP     |
| Focus on terminal below | Alt + Down   |
| Focus on left terminal  | Alt + Left   |
| Focus on right terminal | Alt + Right  |
| Create a new Tab        | Shift+Ctrl+T |
| Switch to previous Tab  | Ctrl+PageUp  |
| Switch to next Tab      | Ctrl+PageDown|
| Create a new Window     | Shift+Ctrl+I |
| Focus on next window    | Alt + TAB    |
| Close window            | Shift+Ctrl+Q |
| Close terminal          | Shift+Ctrl+W |
| Increase font size      | Ctrl + **+** |
| Decrease font size      | Ctrl + **-** |
| Restore original font size | Ctrl + 0  |
| Resize termainal      |Shift+Ctrl+Arrow|
| Toggle Full Screen      | F11          |

* * *

## Useful commands

### Show running processes in Linux

- `top`
- `ps -A`

For more infomation, please find from:
- [Show All Running Processes in Linux using ps/htop commands - nixCraft](https://www.cyberciti.biz/faq/show-all-running-processes-in-linux/)
- [How to Manage Processes from the Linux Terminal: 10 Commands You Need to Know - How-To Geek](https://www.howtogeek.com/107217/how-to-manage-processes-from-the-linux-terminal-10-commands-you-need-to-know/)

### Get root permission for GUI file manager

- `sudo nautilus`

### Find previous commands

- `history`
  Display a list of previous commands
- `!`_`n`_
   where _**n**_ is the index of a command displayed by history, e.g. `!4`
- `Ctrl+R` Find the historical commands
   Suggest a previous command that starts with the chars as you type

### Execute a shell script

In Ubuntu, a shell script is a .sh file that contains a series of commands in a Unix shell, similar to a batch (.bat) file in Windows. In a .sh file, it is often typed with `#! /bin/bash` in the first line to indicate that is a [bash script](https://en.wikipedia.org/wiki/Bash_(Unix_shell)). For example,

```bash
#! /bin/bash

echo "System"
uname -o
echo "Memory Usage"
free -m
echo "Local Library Path"
echo $LD_LIBRARY_PATH
```

Save as `test.sh`, and then need the file executable, by running the following command in the terminal:

```bash
chmod +x test.sh
```

`chmod` is a command to change file permission, `+x` is the argument to set execute permission to the file.

After that, you can `./` in front of the filename to execute the shell file in the terminal, i.e.

```bash
./test.sh
```

### Related

- [Install Chrome Remote Desktop on KDE desktop / Kubuntu 14.04 LTS or higher](/blog/2019/04/04/Install-Chrome-Remote-Desktop-on-Kubuntu)

### Read More

- [Linux Commands - Complete Guide | LinOxide](https://linoxide.com/linux-how-to/linux-commands-brief-outline-examples/)
- [Beginners/BashScripting - Community Help Wiki | Official Ubuntu Documentation](https://help.ubuntu.com/community/Beginners/BashScripting)
- [How to Find Files on Linux With 3 Easy Commands | MakeUseOf](https://www.makeuseof.com/tag/3-examples-teach-find-files-linux/)
- [5 commands to check memory usage on Linux | BinaryTides](https://www.binarytides.com/linux-command-check-memory-usage)
- [10 Useful du (Disk Usage) Commands to Find Disk Usage of Files and Directories | TecMint](https://www.tecmint.com/check-linux-disk-usage-of-files-and-directories/)