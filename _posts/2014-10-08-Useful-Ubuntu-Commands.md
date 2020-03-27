---
layout: post
title: Useful command lines in Ubuntu that help using terminals
date: 2014-10-08 16:21
category: Linux
author: Chris KY Fung
tags: [Ubuntu]
excerpt: A short note about my favorite terminal appliation and the commands for show running processes, get root permission for GUI file manager and find previous commands.
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
- https://www.cyberciti.biz/faq/show-all-running-processes-in-linux/
- https://www.howtogeek.com/107217/how-to-manage-processes-from-the-linux-terminal-10-commands-you-need-to-know/

### Get root permission for GUI file manager

- `sudo nautilus`

### Find previous commands

- `history`
  Display a list of previous commands
- `!`_`n`_
   where _**n**_ is the index of a command displayed by history, e.g. `!4`
- `Ctrl+R`
   Suggest a previous command that start with the chars as you type

### Related

- [Install Chrome Remote Desktop on KDE desktop / Kubuntu 14.04 LTS or higher](/blog/2019/04/04/Install-Chrome-Remote-Desktop-on-Kubuntu)