---
layout: post
title: Evernote Tips ─ Create shortcuts for inserting tables and formatting texts with PhraseExpress
date: 2017-06-09 15:36:40 +0800
author: chris
category: Productivity
tags: [Evernote, PhraseExpress, User tips, Shorthand]
permalink: /blog/evernote/add-table-and-formatting-in-evernote-with-phraseexpress
amp:
    youtube: true
---

Last time, I introduced [How to create a shorthand for quick searching your Evernote](/blog/evernote/quick-search-evernote-with-phraseexpress). This time I’ll introduce two more productivity tips for Evernote users. Let’s create shorthands with PhraseExpress.

(1) [insert a table via a custom Autotext](#1-insert-a-table-via-a-custom-autotext)

(2) [Format texts to heading styles via custom hotkeys](#2-format-texts-to-heading-styles-via-custom-hotkeys)

* * *

## 1. Insert a table via a custom Autotext

Many people just type plain text in their notebook. If you do so, you may not interest about it or even not using Evernote. One of my friends uses Google Keep for jogging down his ideas. But if you like Evernote, you possibly organize your data and ideas with tables. I use a table to compare two ideas side by side. I also use tables to arrange images next to corresponding texts. Make use of tables in Evernote can help you to make more systematic notes.

I summarized the three ways of inserting a table given in Evernote Desktop, and demonstrated my shorthand in the following video.

{% include youtube.html id="I7mAzCR8oHU" title="Shorthand to insert a table in Evernote with PhraseExpress" %}

Which are the most convenient, the last one that I proposed?

**Pros**

1.  operating as you type without leaving your hands from keyword
2.  calling the function with natural language, easy-to-remember

With setting a shorthand with PhraseExpress, you add a table seamlessly as you are typing your text content. You don’t need to move your hand between mouse and keyboard. You also don’t know to find where are the button in the toolbar or the main menu. All you need to do is just type in your custom Autotext, e.g. “add t…”, the option prompts in the auto-expand menu. This should reduce your brain load and avoid confusion with the layout of other programs.

{% include picture.html width="481" height="299"
img="evernote/Add-Table-to-Evernote-using-PhraseExpress.png" alt="Add Table to Evernote using PhraseExpress" caption="1 - Add Table to Evernote using PhraseExpress" class="text-center" %}

Here is my PhraseExpress setup.

{% include picture.html width="481" height="529"
img="evernote/PhraseExpress-macro-for-add-table-to-evernote.png" alt="PhraseExpress macro for add table to Evernote" caption="PhraseExpress macro for add table to Evernote" class="text-center" %}

**How to configure:**

1.  Open **PhraseExpress**.
2.  Create a new phrase, and give it a description for your to recognize, e.g. “_add Table to Evernote_”.
3.  Copy and paste this code to **Phrase content**.

    `{#ALT -chars o}{#sleep 500}{#NONE -chars T}`

4.  Define an Autotext for you to remember easily, or simply choose **SmartComplete**.

5.  Enable **Execute only in specific programs**, and restrict to this shorthand to only execute in Evernote.

    {% include picture.html width="680" height="441"
img="evernote/Restrict-PhraseExpress-to-Evernote.png" alt="Advance configuration - Restrict PhraseExpress to Evernote" class="text-center" %}

* * *

## 2. Format texts to heading styles via custom hotkeys

Evernote doesn’t have Heading Formatting, such kind of advance styling functions as in MS Word or OneNote. Although many Evernote users have requested for this feature in the Evernote Forum ([link to the post](https://discussion.evernote.com/forums/topic/23474-heading-1-2-and-3-in-evernote/)), Evernote Corp. intents to keep it as a distraction-free text editor. You can only manually bold texts and enlarge the font size to visually distinguish a line as a heading.

Manual operations sometimes generate the inconsistencies to formatting and style. I create the following method to format texts to heading with PhraseExpress.

{% include youtube.html id="4YNrVFuEUSo" title="Shortcut for formating texts to heading styles in Evernote with PhraseExpres" %}

Does it help? I hope you can leave your comments below.

* * *

**Keep on reading**:

1. [Evernote Tips ─ Custom shortcut key for Evernote Text Highlighting](/blog/evernote/custom-evernote-text-highlight-shortcut-key)

2. [Evernote Tips ─ Create a Quick Search Hotkey with PhraseExpress](/blog/evernote/quick-search-evernote-with-phraseexpress)
