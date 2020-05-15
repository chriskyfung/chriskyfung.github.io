---
layout: post
title: "Matrix Conversion between MATLAB and Microsoft Equation Editor"
date: 2020-01-15 15:21
category: Data-Science
author: Chris KY Fung
tags: [MATLAB, MS Office]
permalink: /blog/matlab/Convert-MATLAB-Matrix-to-MS-Office-Equation
redirect_from:
 - /blog/2020/01/15/Convert-MATLAB-Matrix-to-MS-Office-Equation
image: /images/posts/matlab/convert-matrix-between-matlab-and-ms-equation.jpg
---

![MATLAB TIPS - Convert Matrix between MATLAB and MS Equation](/images/posts/matlab/convert-matrix-between-matlab-and-ms-equation.jpg)

<!--more-->

When I was studying my MPhil and PhD degrees, one bothering job was to rewrite the programmed formulas and computational results that were coded with numerical analysis software, MATLAB to my papers and my theses. At that time, I used Microsoft Word as my primary word processing software. Manually typing and formatting the data (in the MS Equation Editor) consume time and easily generate human mistakes. Thus, I developed a couple of functions to convert matrix data between MATLAB and MS Office Equation formats. The MATLAB codes are available in my GitHub repository.

**Download** [ [GitHub](https://github.com/chriskyfung/matlab-matrix-to-ms-office-equation) ]

The usages are described below.

## Convert from MATLAB to MS Office Equation

The file `mat2mseq.m` contains the function to convert a numerical matrix in MATLAB to a plain-text formatted MS office equation. The function takes two arguments:

- \<m-by-n matrix\> A two-dimensional matrix of numbers
- \<string\> The string format of the numbers (see [sprintf](https://www.mathworks.com/help/matlab/ref/sprintf.html))

**Example** 

```matlab

martixA = [1 0 0; 0 1 0; 0 0 1];
s = mat2mseq(martixA, '%g');

=> s =
     ■(1&0&0@0&1&0@0&0&1)
```

Copy the text output to an equation object in Microsoft Word, OneNote or PowerPoint.

You will obtain ![matrixA](/images/posts/matlab/matrixA.png) in the MS Equation Editor.

## Convert from MS Office Equation to MATLAB

The file `mseq2mat.m` contains the function to convert an MS Equation matrix to numerical data in MATLAB. The function requires the following argument:
- \<string\> a matrix in the MS office equation (in plain-text format)

For example, when you copy ![matrixA](/images/posts/matlab/matrixA.png) from MS Word and paste it to MATLAB. The matrix will be displayed in the plain-text format of MS Equation, like `■(1&0&0@0&1&0@0&0&1)` in the command line. Convert it to numerical data by evaluating the text with the function, as the example below:

```matlab
A = mseq2mat('■(1&0&0@0&1&0@0&0&1)')
	
=> A = 
	[ 1 0 0 ; 
	  0 1 0 ; 
	  0 0 1 ] 
```

## For Developers
To develop your MATH translator, you can read the documentation _"[UTN #28: Nearly Plain-Text Encoding of Mathematics](https://www.unicode.org/notes/tn28/)"_ to explore how Microsoft uses Unicodes in encoding mathematical expressions. If you want to learn about the shortcut commands of MS Equation Editor, this [PDF Note](http://www.iun.edu/~mathiho/useful/Equation%20Editor%20Shortcut%20Commands.pdf) from _Indiana University Northwest_ should be helpful.

Do you use any great tools when writing your reports and essays? Have a question or suggestion? Let us know in the comments below.

* * *

**Related posts:**

- [Working MATLAB with MS Excel](/blog/matlab/Working-MATLAB-with-MS-Excel)
- [Expand shorten URLs in MATLAB](/blog/matlab/expand-twitter-short-url)