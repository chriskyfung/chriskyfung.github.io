---
layout: post
title: Evernote Tips ─ Create a Quick Search Hotkey with PhraseExpress
date: 2017-05-01 20:48:24 +0800
author: chris
categories: [Productivity]
tags: [Evernote, PhraseExpress, User tips, Shorthand]
permalink: /blog/evernote/quick-search-evernote-with-phraseexpress
css:
  syntax: true
published: false
---

The common way to search the contents in Evernote on your desktop or using the search bar in the desktop application. Another way may be just perform a normal Google search and the related articles in your Evernote account will be displayed if you have installed Evernote Web Clipper in your browser. But the second way does not always work. You may copy a keyword, switch to the Evernote window and paste the text in the search bar. I have searched the contents in Evernote in this way for more than six years. That is an annoying and stupid task repeating many times day by day. I always think about how to get rid of this [hamster wheel](https://www.urbandictionary.com/define.php?term=hamster%20wheel) and remove such inconvenience. Today, I want to introduce a method that I recently created to improve my productivity without difficult coding using python or other programming languages.

<!--more-->

## How to configure your Evernote search shortcut with PhraseExpress

I am a big fun of [Evernote](https://www.evernote.com/referral/Registration.action?sig=f0a699e8560c4fe4cd1cf6c35f32094507754c721ea5f1b69a8698dd21fda726&uid=20626019). As the time passes, Evernote becomes powerful. I almost switch my note activities from MS OneNote to Evernote. I am now paying for a premium account, and it is just one of a few software I am willing to pay for. MS OneNote is free and still have many styling features that is greater than Evernote. It is, however, nowadays the most important is not the editing feature, but the convenience of searching and retrieving target information. Evernote does a much, much better job in this area, with tagging, related articles, search operators and browser integration.

To boost your productivity in using Evernote on your desktop, what will you need to do is only going to download and install [PhraseExpress](https://www.phraseexpress.com/download/), and then copy my script of this program to create a shortcut key.

### What is PhraseExpress

PhraseExpress is an Autotext or auto-complete typing assistant that monitors your keyboard to boost your productivity in typing with auto text expansion. You can create and store your frequently used texts as templates with PhraseExpress, therefore you can quickly recall them later on. You can also assign hotkeys for your favorite programs. I find PhraseExpress increases my productivity and streamlines my flow. PhraseExpress is **free-of-charge** to _personal users_ (but you should purchase a license for commercial or professional use). So, I highly recommend you to download and install PhraseExpress on your desktops. Visit [PhraseExpress’s website](https://www.phraseexpress.com/shop/freeware/).

### How to configure

1. Create a new phrase in **PhraseExpress**

2. Assign a script name to **Description**, e.g. _Go to Evernote_

3. Copy the following script to **Phrase content**

   ```vb
   {#clipboard -copy}{#run -file "C:\Program Files (x86)\Evernote\Evernote\ENScript.exe" -params "showNotes /q "{#trim {#insertclipboard}}""}
   ```

4. Assign a **Hotkey**, e.g. <span class="mono"><kbd>Win</kbd> + <kbd>Shift</kbd> + <kbd>E</kbd></span> (Recommended)

5. Assign a **Autotext** (Optional)

_It can apply to non-editable text, e.g. texts on web pages. But **Don’t** use Autotext method in text editors, the text selected will be replaced as you type in the Autotext._

{% include picture.html height="461"
img="/evernote/phraseexpress-macro-for-everntoe.png" alt="PhraseExpress Macro for finding notes with Evernote CLI on Windows" caption="PhraseExpress Macro for finding notes with Evernote CLI on Windows" class="text-center" %}

### Demonstration

For example, I am writing a Chinese article about PhD. I highlight the text in that I want to search, and then press the Hotkey for my script. The Evernote Desktop will launch in a second with the results of your search queue.

{% include picture.html height="493"
img="evernote/search-evernote-with-shortcut-key-on-windows.png" alt="Press the Hotkey (e.g. Win + Shift + E)" caption="Press the Hotkey (e.g. <kbd>Win</kbd> + <kbd>Shift</kbd> + <kbd>E</kbd>) to call Evernote CLI for searching notes" class="text-center" %}

{% include picture.html height="483"
img="evernote/evernote-search-results-returned-by-cli-shorthand.png" alt="Search results on the Evernote Desktop app activated by the Evernote CLI" caption="Search results on the Evernote Desktop app activated by the Evernote CLI" class="text-center" %}

* * *

**References**:

1. [Control Evernote from the Windows command line - Evernote Developers](https://dev.evernote.com/doc/articles/enscript.php)

2. [Command line arguments in Evernote-ENScript - Windows Desktop Help - Evernote User Forum](https://discussion.evernote.com/forums/topic/80570-command-line-arguments-in-evernoteenscript/)

Does it help? I hope you can leave your comments below.

* * *

**Keep on reading**:

- [Evernote Tips ─ Custom shortcut key for Evernote Text Highlighting](/blog/evernote/custom-evernote-text-highlight-shortcut-key)

- [Evernote Tips ─ Create shortcuts for inserting tables and formatting texts with PhraseExpress](/blog/evernote/add-table-and-formatting-in-evernote-with-phraseexpress)
