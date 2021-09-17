---
layout: post
title: File I/O and File System in MATLAB
date: 2014-10-07 00:21 +0800
last_modified_at: 2021-08-15 22:21 +0800
category: Academic
author: chris
tags: [MATLAB, File I/O]
permalink: /blog/matlab/file-io-and-file-system-in-matlab
image: 
   path: /images/posts/matlab/matlab-file-system-cover.jpg
featured: true
#excerpt: 
---

## Low-Level File I/O

Write a text file with the following MATLAB built-in functions:

1. `fopen`;
2. `fprintf`;
3. `fclose`.

💡 Learn more: [Export to Text Data Files with Low-Level I/O - MATLAB & Simulink](https://www.mathworks.com/help/matlab/import_export/writing-to-text-data-files-with-low-level-io.html)

## File System

MATLAB can obtain the information from a file system by the following MATLAB built-in functions:

- `dir` - lists files and folders in the current folder.

   **Example output:**

   ```plaintext
   .                .git             README.md
   ..               LICENSE
   ```

- `listing = dir('dirpath')` - return the folder information in a structure array.

   **Example output:**

   ```matlab
listing = 
   
   5x1 struct array with fields:
      
      name
      date
      bytes
      isdir
      datenum
   ```

   {% include picture.html img="matlab/matlab-dir-listing-struct-o8.png" width="476" height="205" %}

   💡 **Learn more**: - [List folder contents - MATLAB dir](https://www.mathworks.com/help/matlab/ref/dir.html)

- `exist(path,'searchType')` - check existence of variable, script, function, folder, or class.

   > searchType — Type of results to search for  \
   > `builtin` \| `class` \| `dir` | `file` | `var`

   💡 **Learn more**: [Check existence of variable, script, function, folder, or class - MATLAB exist](https://www.mathworks.com/help/matlab/ref/exist.html)

## Exclude &apos; . &apos; and &apos; .. &apos; From Listing Files and Folder

The `dir()` function always returns `.` and `..` in its result.

- `.` means the current directory;
- `..` means the parent of the current directory.

They are unnecessary when you solely care about the items inside that directory. You can use the `getProjectDir()` function in my **[matlab-filesystem-io](https://github.com/chriskyfung/matlab-filesystem-io)** library to replace the built-in `dir` function.

_e.g._ `getProjectDir(path)`

 It will call the `dir(path)` function but return the folder information in a struct array without the rows for  `.` and `..`.

## List Files and Folders with non-ASCII Characters

The `dir` function does not support internationalization, such as the characters for the Chinese, Japanese, and Korean (CJK) languages. You need to handle non-ASCII characters using the **java.io.File** Class in MATLAB.

Instead of reinventing the wheel, you can use clone my **[matlab-filesystem-io](https://github.com/chriskyfung/matlab-filesystem-io)** library and use the `jDir()` function to list the files and folders as below.

- `jDir(dirpath)` - list the files and folders in a specific directory using  **java.io.File** (with supporting Asian characters), return the folder information in a structure array with fields: `name` and `isDir`.

   **Example output:**

   {% include picture.html img="matlab/matlab-jdir-listing-struct-o8.png" width="255" height="138" %}

- `jDir(dirpath, 'dir')` - list the folder in a specific directory

   **Example output:**

   ```plaintext
    '.git'
   ```

- `jDir(dirpath, 'file')` - list the files in a specific directory

   **Example output:**

   ```plaintext
    'LICENSE'
    'README.md'
   ```

## Add Folder(s) to The MATLAB Search Path

When you want MATLAB to use files that locate not in the current working directory, you need to add their file locations to the [MATLAB search path](https://www.mathworks.com/help/matlab/matlab_env/what-is-the-matlab-search-path.html) using the following functions:

- `addpath(path)` - adds the specified folders to the top of the search path for the current MATLAB session.

   _e.g._ `addpath('c:\My Documents\')`

   💡 **Learn more**: [Add folders to search path - MATLAB addpath](https://www.mathworks.com/help/matlab/ref/addpath.html)

- `addpath(genpath(path))` - add a folder and recursively add its subfolders to the search paths.

   💡 **Learn more**: [Generate path name - MATLAB genpath](https://www.mathworks.com/help/matlab/ref/genpath.html)

**Keep on reading**:

- [Working MATLAB with MS Excel]({% post_url matlab/2015-03-10-Working-MATLAB-with-MS-Excel %})
- [Expand shorten URLs in MATLAB]({% post_url matlab/2015-11-29-expand-twitter-short-url %})
- [Matrix Conversion between MATLAB and Microsoft Equation Editor]({% post_url matlab/2020-01-15-Convert-MATLAB-Matrix-to-MS-Office-Equation %})
- [My MATLAB Package and Toolbox Picks]({% post_url matlab/2021-09-18-matlab-packages-and-toolboxes %})