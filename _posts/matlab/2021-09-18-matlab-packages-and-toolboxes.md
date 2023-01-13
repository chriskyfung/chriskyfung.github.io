---
layout: post
title: "My MATLAB Package and Toolbox Picks"
date: 2021-09-18 01:12
category: Academic
author: chris
tags: [MATLAB]
permalink: /blog/matlab/matlab-packages-and-toolboxes
image: 
   path: /images/posts/matlab/matlab-packages.jpg
excerpt: A collection of useful MATLAB packages and toolboxes that support and improve your workflow, data visualization, code functionility and performance.
---

{% include toc.md %}

## Cross-Product Toolboxes

{% include picture.html img="matlab/vintage-1318361_730x238.png" width="730" height="238" alt="orchestra" class="shadow-none" %}

[MATLink — Communicate with MATLAB from Mathematica](http://matlink.org/)

: MATLink is a Mathematica™ application to communicate with MATLAB™, providing functionality to easily transfer data between the two systems, and use MATLAB functions, scripts, and toolboxes from within Mathematica.

   ***Learn more**:* <cite>[MATLink Package for Mathematica - YouTube](https://www.youtube.com/watch?v=g1rzyVl9VCA)</cite>

[SMATLINK - Let MATLAB Dance with Mathematica](https://www.mathworks.com/matlabcentral/fileexchange/20573-smatlink-let-matlab-dance-with-mathematica "File Exchange - MATLAB Central")

: A toolbox allows calling Mathematica kernel from MATLAB 7.x

[MATLAB R-link](https://www.mathworks.com/matlabcentral/fileexchange/5051-matlab-r-link "File Exchange - MATLAB Central")

: An interface that allows you to call R functions from within MATLAB.

[smop: Small MATLAB to Python compiler](https://github.com/victorlei/smop)

: A Python package translates MATLAB code to Python. See also:
  
- <cite>[A tool to convert MATLAB code to Python - Stack Overflow](https://stackoverflow.com/questions/9845292/a-tool-to-convert-matlab-code-to-python)</cite>
- <cite>[NumPy for MATLAB users — NumPy Manual](https://numpy.org/doc/stable/user/numpy-for-matlab-users.html)</cite>

[oct2py: GNU Octave to Python bridge](https://github.com/blink1073/oct2py)

: A Python package runs M-Files and Octave functions from Python

[Parallel Distributed Processing of Weka Algorithms in MATLAB](https://www.mathworks.com/matlabcentral/fileexchange/33128-parallel-distributed-processing-of-weka-algorithms-in-matlab "File Exchange - MATLAB Central")

: Run Weka algorithms in parallel across distributed computers in MATLAB.

[mweka: Running Machine Learning Tool Weka from MATLAB](https://www.mathworks.com/matlabcentral/fileexchange/24839-mweka-running-machine-learning-tool-weka-from-matlab "File Exchange - MATLAB Central")

: A GUI runs the Weka classifiers and displays the results in MATLAB.

[Plotly | Online MATLAB Graphing](https://www.mathworks.com/matlabcentral/fileexchange/42202-plotly-%7C-online-matlab-graphing "File Exchange - MATLAB Central")

: A package converts your MATLAB figures into online Plotly graphs with a single line of code.

[MATLAB for Kate and Kwrite](https://www.mathworks.com/matlabcentral/fileexchange/4667-matlab-for-kate-and-kwrite "File Exchange - MATLAB Central")

: Syntax highlighting file for Linux/KDE editors Kate and Kwrite.

## Parallel Processing

{% include picture.html img="matlab/cpu-speed_730x173_o70.jpg" width="730" height="173" alt="cpu speedup" class="shadow-none" %}

[Multicore - Parallel processing on multiple cores](https://www.mathworks.com/matlabcentral/fileexchange/13775-multicore-parallel-processing-on-multiple-cores  "File Exchange - MATLAB Central")

: This package provides parallel processing on multiple cores on a single machine or on multiple machines that have access to a common directory.

[GPUBench](https://www.mathworks.com/matlabcentral/fileexchange/34080-gpubench "File Exchange - MATLAB Central")

: This package times different MATLAB GPU tasks and estimates the peak performance of your GPU in floating-point operations per second (FLOP/s). It produces a detailed HTML report showing how your GPU's performance compares to pre-stored performance results from a range of other GPUs.

[pMatlab](https://www.mit.edu/~kepner/pMatlab/)

: This package provides a set of MATLAB data structures and functions that implement distributed MATLAB arrays for Parallel array programming.

[Fast String to Double Conversion](https://www.mathworks.com/matlabcentral/fileexchange/28893-fast-string-to-double-conversion "File Exchange - MATLAB Central")

: A function converts text to double like MATLAB's str2double, but up to 400x faster! multithreaded.

***Learn more**:*

- <cite>[Techniques to Improve Performance - MathWorks](https://www.mathworks.com/help/matlab/matlab_prog/techniques-for-improving-performance.html)</cite>
- <cite>[Profile Your Code to Improve Performance - MathWorks](https://www.mathworks.com/help/matlab/matlab_prog/profiling-for-improving-performance.html)</cite>
- <cite>[Measure the Performance of Your Code - MathWorks](https://www.mathworks.com/help/matlab/matlab_prog/measure-performance-of-your-program.html)</cite>
   `cputime`
   : Estimate elapsed CPU time.
   `tic` and `toc`
   : Start stopwatch timer and read elapsed time from stopwatch, respectively.

## Shorthands

{% include picture.html img="matlab/cooking-tools_730x162_o16.png" width="730" height="162" alt="cooking utensils" class="shadow-none" %}

### MATLAB: Variables and Data Type Operations

[disperse](https://www.mathworks.com/matlabcentral/fileexchange/33866-disperse "File Exchange - MATLAB Central")

: A function assigns elements of an input array to individual output variables with a single function call.

[Shared variable](https://www.mathworks.com/matlabcentral/fileexchange/24742-shared-variable "File Exchange - MATLAB Central")

: A helper class to create a shared object as a nickname, or alias, for some other variable.

[CATSTRUCT](https://www.mathworks.com/matlabcentral/fileexchange/7842-catstruct "File Exchange - MATLAB Central")

: A helper function to concatenate or merge structures with different field names.

[For-Each](https://www.mathworks.com/matlabcentral/fileexchange/48729-for-each "File Exchange - MATLAB Central")

: A toolbox enables simple, readable, and powerful for-loops in MATLAB.

[Pack & Unpack variables to & from structures with enhanced functionality](https://www.mathworks.com/matlabcentral/fileexchange/31532-pack-unpack-variables-to-from-structures-with-enhanced-functionality "File Exchange - MATLAB Central")

: A function converts variables to structures, and vice versa

### Arithmetic Operations

[Round with significant digits](https://www.mathworks.com/matlabcentral/fileexchange/26212-round-with-significant-digits "File Exchange - MATLAB Central")

: A function rounds a number (or the elements of a vector or matrix) towards the nearest number with N significant digits.

### Set Operations

[countmember](https://www.mathworks.com/matlabcentral/fileexchange/7738-countmember "File Exchange - MATLAB Central")

: A function counts the number of times the elements of array A are present in array B.

[CStrAinBP](https://www.mathworks.com/matlabcentral/fileexchange/24380-cstrainbp "File Exchange - MATLAB Central")

: A function finds the overlapping element of 2 cell strings with 10-20 times faster than `INTERSECT`/`ISMEMBER`/`SETDIFF` and `UNION`.

[FINDIND](https://www.mathworks.com/matlabcentral/fileexchange/22786-findind "File Exchange - MATLAB Central")

: A function finds indices of matching elements between two arrays/matrices

### M-File Utilities

[Align equal sign](https://www.mathworks.com/matlabcentral/fileexchange/47918-align-equal-sign "File Exchange - MATLAB Central")

: A function allows you to align equal signs in the MATLAB editor.

[% MATLAB Comment Stripping Toolbox](https://www.mathworks.com/matlabcentral/fileexchange/4645-matlab-comment-stripping-toolbox "File Exchange - MATLAB Central")

: A small collection of utilities for stripping MATLAB comments from MATLAB code.

[BetterHelp](https://www.mathworks.com/matlabcentral/fileexchange/41623-betterhelp "File Exchange - MATLAB Central")

: A toolbox to improve MATLAB's help functionality for functions that do not have their own help files.

### Custom Display Interfaces

[Text progress bar](https://www.mathworks.com/matlabcentral/fileexchange/28067-text-progress-bar)

: A function to create a TEXT progress bar in your command window.

[statusbar](https://www.mathworks.com/matlabcentral/fileexchange/14773-statusbar "File Exchange - MATLAB Central")

: A function to set/get status bar(s) for GUI figures & MATLAB desktop.

[timebar](https://www.mathworks.com/matlabcentral/fileexchange/1255-timebar "File Exchange - MATLAB Central")

: A function creates a progress window, similar to a waitbar, that shows the progress of calculations using a sliding bar, a displayed percentage complete, and an estimated time remaining.

### Import/Export

[SaveEditorProfile.m](https://www.mathworks.com/matlabcentral/fileexchange/47821-saveeditorprofile-m "File Exchange - MATLAB Central")

: A function creates the file 'RestoreEditorProfile.m' in the current directory.

[Straightforward COPY and PASTE functions](https://www.mathworks.com/matlabcentral/fileexchange/28016-straightforward-copy-and-paste-functions?requestedDomain=zh "File Exchange - MATLAB Central")

: Allows very simple manual exchange with other applications through the clipboard.

[MAT2CLIP](https://www.mathworks.com/matlabcentral/fileexchange/8559-mat2clip "File Exchange - MATLAB Central")

: A function copies the contents of 2-D matrix A to the system clipboard.

[num2clip: copy numerical arrays to clipboard](https://www.mathworks.com/matlabcentral/fileexchange/8472-num2clip--copy-numerical-arrays-to-clipboard "File Exchange - MATLAB Central")

: A function copies a numerical array to the clipboard as a tab-separated string ready for pasting.

[matrix2lyx](https://www.mathworks.com/matlabcentral/fileexchange/37349-matrix2lyx "File Exchange - MATLAB Central")

: A function converts a MATLAB matrix to a [LyX](https://www.lyx.org/) table.

[JSON Parser](http://uk.mathworks.com/matlabcentral/fileexchange/20565-json-parser "File Exchange - MATLAB Central")

: A function parses JSON strings. It converts JSON arrays into cell arrays and JSON objects into structures.

[JSONlab: a toolbox to encode/decode JSON files in MATLAB/Octave](https://www.mathworks.com/matlabcentral/fileexchange/33381-jsonlab--a-toolbox-to-encode-decode-json-files-in-matlab-octave "File Exchange - MATLAB Central")

: A toolbox to encode/decode JSON/UBJSON/MessagePack files in MATLAB/Octave.

[xml2struct](https://www.mathworks.com/matlabcentral/fileexchange/28518-xml2struct "File Exchange - MATLAB Central")

: A function converts an XML file into a MATLAB structure for easy access to the data.

[XMLNode](https://www.mathworks.com/matlabcentral/fileexchange/34711-xmlnode "File Exchange - MATLAB Central")

: A toolbox allows you to read an XML document into MATLAB as an XMLNode object.

## File Systems

{% include picture.html img="matlab/files-and-folders_730x146_o16.png" width="730" height="146" alt="database, folder, file, local and remote storages" class="shadow-none" %}

[genpath_exclude](https://www.mathworks.com/matlabcentral/fileexchange/22209-genpath_exclude "File Exchange - MATLAB Central")

: A wrapper for `genpath`, but can exclude/ignore directories using regular expressions.

[lsr](https://www.mathworks.com/matlabcentral/fileexchange/46047-lsr "File Exchange - MATLAB Central")

: A wrapper for `ls`, which lists the files in one or more folders with regexp and combinatorial logic (and, or, not, etc).

[Natural-Order Filename Sort](https://www.mathworks.com/matlabcentral/fileexchange/47434-natural-order-filename-sort "File Exchange - MATLAB Central")

: A toolbox to alphanumeric sort of filenames or filepaths, with the customizable numeric format.

[Recursive directory listing - Enhanced RDIR](https://www.mathworks.com/matlabcentral/fileexchange/32226-recursive-directory-listing-enhanced-rdir "File Exchange - MATLAB Central")

: A function lists files and directories in a directory and its subdirectories recursively.

**Related**: [File I/O and File System in MATLAB]({% post_url matlab/2014-10-11-file-io-and-file-system-in-matlab %})

## Graphics

{% include picture.html img="matlab/charts-6246450_730x278_o128.png" width="730" height="278" alt="histogram, scatter plot, bar chart, line chart, area chart, box plot, circle plot, etc." class="shadow-none" %}

### Advanced Plot Functions

[line_fewer_markers](https://www.mathworks.com/matlabcentral/fileexchange/42560-line_fewer_markers "File Exchange - MATLAB Central")

: An alias of the LINE command, with additional control for markers, in number and location.

[Plot (Big)](https://www.mathworks.com/matlabcentral/fileexchange/40790-plot-big "File Exchange - MATLAB Central")

: A toolbox makes MATLAB's line plots much faster by reduces data to the smallest possible set that looks identical given the number of pixels available on the screen.

[prettyplot](https://www.mathworks.com/matlabcentral/fileexchange/27237-prettyplot "File Exchange - MATLAB Central")

: A function creates prettier line plots with markers without  the line and markers being on top of each other.

[Beautiful and distinguishable line colors + colormap](https://www.mathworks.com/matlabcentral/fileexchange/42673-beautiful-and-distinguishable-line-colors-colormap "File Exchange - MATLAB Central")

: A function creates a plot with lots of lines with very distinguishable and aesthetically pleasing colors. Works for *N* colors.

[Contour Line Smoothing](https://www.mathworks.com/matlabcentral/fileexchange/38862-contour-line-smoothing "File Exchange - MATLAB Central")

: A function creates a contour plot with smooth contour lines by fitting them with a 2-D spline.

[circularGraph](https://www.mathworks.com/matlabcentral/fileexchange/48576-circulargraph "File Exchange - MATLAB Central")

: A function plots an interactive circular graph to illustrate connections in a network in MATLAB.

[boundedline.m](https://www.mathworks.com/matlabcentral/fileexchange/27485-boundedline-m "File Exchange - MATLAB Central")

: A toolbox plots one or more lines with a shaded boundary (can represent error, confidence intervals, etc).

### Figure and Subplot Utilities

[Distribute figures](https://www.mathworks.com/matlabcentral/fileexchange/37176-distribute-figures "File Exchange - MATLAB Central")

: A function distributes figures on different parts of the screen(s). Supports secondary monitor(s).

[Automatically arrange figure windows](https://www.mathworks.com/matlabcentral/fileexchange/48480-automatically-arrange-figure-windows "File Exchange - MATLAB Central")

: A helper function automatically arranges/aligns and fits figures within a monitor screen.

[Panel](https://www.mathworks.com/matlabcentral/fileexchange/20003-panel "File Exchange - MATLAB Central")

: A package provides an alternative to MATLAB's "subplot", providing easier control over layout (particularly, easy elimination of whitespace).

[UISplitPane - Split a container (figure/frame/uipanel) into two resizable sub-containers](https://www.mathworks.com/matlabcentral/fileexchange/23073-uisplitpane-split-a-container-figure-frame-uipanel-into-two-resizable-sub-containers "File Exchange - MATLAB Central")

: A package splits a container (figure/frame/uipanel) into two resizable sub-containers, like Java's JSplitPane.

[GUI to assist with combining/pulling out figures and subplots](https://www.mathworks.com/matlabcentral/fileexchange/40955-gui-to-assist-with-combining-pulling-out-figures-and-subplots "File Exchange - MATLAB Central")

: A GUI assists with generating new figures using data in existent figures.

[Useful Figure Management Utilities](https://www.mathworks.com/matlabcentral/fileexchange/3162-useful-figure-management-utilities "File Exchange - MATLAB Central")

: A package of functions allows figures cascading, circulating, and filling the screen by managing the positioning of a bunch of on-screen figure windows in MATLAB.

[tightfig(hfig)](https://www.mathworks.com/matlabcentral/fileexchange/34055-tightfig-hfig "File Exchange - MATLAB Central")

: A function encloses all axes in the figure without excess space around them.

[tight_subplot(Nh, Nw, gap, marg_h, marg_w)](https://www.mathworks.com/matlabcentral/fileexchange/27991-tight_subplot-nh-nw-gap-marg_h-marg_w "File Exchange - MATLAB Central")

: A function adjusts the spacing between the axes as well as the margins around the axes.

[Clone Figure](https://www.mathworks.com/matlabcentral/fileexchange/26587-clone-figure "File Exchange - MATLAB Central")

: A function allows you to copy a figure to another figure.

[gridSubplot](https://www.mathworks.com/matlabcentral/fileexchange/34326-gridsubplot "File Exchange - MATLAB Central")

: A function allows you to build a figure with subplots given by a vector of figure objects.

[OverlayTable](https://www.mathworks.com/matlabcentral/fileexchange/37688-overlaytable "File Exchange - MATLAB Central")

: A toolbox allows you to create table overlays for figures which include full-text formatting and support for symbols.

### Axis Control and Callbacks

[Fancy DualGraphs](https://www.mathworks.com/matlabcentral/fileexchange/36324-fancy-dualgraphs "File Exchange - MATLAB Central")

: A toolbox allows you to create a double axis to use with MATLAB plotting tools, and automatically draw markers.

[addaxis](https://www.mathworks.com/matlabcentral/fileexchange/9016-addaxis "File Exchange - MATLAB Central")

: A toolbox allows you to add multiple y-axes to plots, and make plots to be zoomable.

[plotxx.m](https://www.mathworks.com/matlabcentral/fileexchange/317-plotxx-m "File Exchange - MATLAB Central")

: A function creates a graph with x-axes on both the top and bottom.

[plotyyy](https://www.mathworks.com/matlabcentral/fileexchange/1017-plotyyy "File Exchange - MATLAB Central")

: A function creates a graph with three y-axes.

[Axis XX](https://www.mathworks.com/matlabcentral/fileexchange/47846-axis-xx "File Exchange - MATLAB Central")

: A toolbox adds multiple X or Y axes to plots, rescale data, use any function, add data tips, zoom, flexible.

[samexaxis (nice subplots with same x axis)](https://www.mathworks.com/matlabcentral/fileexchange/7169-samexaxis-nice-subplots-with-same-x-axis "File Exchange - MATLAB Central")

: A helper function to clean up subplots that have common x-axises.

[Break X Axis](https://www.mathworks.com/matlabcentral/fileexchange/42905-break-x-axis "File Exchange - MATLAB Central")

: A function allows split the x-axis into 2 disjoint regions in order to hide an uninteresting portion of a figure.

### Labels and Annotations

[Axis_Prunelabels -- clean up redundant axis labels](https://www.mathworks.com/matlabcentral/fileexchange/16115-axis_prunelabels-clean-up-redundant-axis-labels "File Exchange - MATLAB Central")

: A function minimizes redundant axis labels in a grid of subplots.

[XYrotalabel - rotate X-axis and Y-axis labels](https://www.mathworks.com/matlabcentral/fileexchange/45663-xyrotalabel-rotate-x-axis-and-y-axis-labels "File Exchange - MATLAB Central")

: A package gives simple control over label rotation with higher stability.

[Curly brace annotation](https://www.mathworks.com/matlabcentral/fileexchange/38716-curly-brace-annotation "File Exchange - MATLAB Central")

: A function to draw curly brace on the current figure.

[REFLINEXYZ](https://www.mathworks.com/matlabcentral/fileexchange/16746-reflinexyz "File Exchange - MATLAB Central")

: A function plots reference lines from the 3D points (X, Y, Z) to the three cartesian planes (YZ, XZ, & XY planes).

[Format Tick Labels](https://www.mathworks.com/matlabcentral/fileexchange/15986-format-tick-labels "File Exchange - MATLAB Central")

: A function replaces axes tick labels with formatted text objects that can include both Tex and LaTex interpreted strings.

[Format Tick Labels (Extended v2)](https://www.mathworks.com/matlabcentral/fileexchange/46431-format-tick-labels-extended-v2 "File Exchange - MATLAB Central")

: A function replaces axes tick labels with formatted text objects that can include both Tex and LaTex interpreted strings.

[textbp: text with legend-style "best" placement](https://www.mathworks.com/matlabcentral/fileexchange/11466-textbp-text-with-legend-style-best-placement "File Exchange - MATLAB Central")

: A function automatically locates text annotation to minimize figure obscuration.

[Add a title to a legend](https://www.mathworks.com/matlabcentral/fileexchange/48331-add-a-title-to-a-legend "File Exchange - MATLAB Central")

: A function adds a title to a legend.

[AddMultipleLegends](https://www.mathworks.com/matlabcentral/fileexchange/43657-addmultiplelegends "File Exchange - MATLAB Central")

: A function adds multiple legends to a single figure/axes.

[legendGrid](https://www.mathworks.com/matlabcentral/fileexchange/37583-legendgrid "File Exchange - MATLAB Central")

: A function displays legend in a grid mode.

[legappend](https://www.mathworks.com/matlabcentral/fileexchange/47228-legappend "File Exchange - MATLAB Central")

: A function adds new entries to a legend.

[simonhenin/columnlegend](https://www.mathworks.com/matlabcentral/fileexchange/27389-simonhenin-columnlegend "File Exchange - MATLAB Central")

: A function creates a legend with a specified number of columns.
  
  ***Remark**: As of MATLAB 2018a, legend() now supports columns, so this function will no longer be maintained*.

### Colors and Styling

[Make Pretty (Publishable) Graphs](https://www.mathworks.com/matlabcentral/fileexchange/35903-make-pretty-publishable-graphs "File Exchange - MATLAB Central")

: A function allows easily Create Publishable Ready Figures. Change Font Size, Line Width, and Background Color. Makes all Axis Labels the same Precision.

[PlotPub - Publication Quality Graphs in MATLAB](https://www.mathworks.com/matlabcentral/fileexchange/47921-plotpub-publication-quality-graphs-in-matlab "File Exchange - MATLAB Central")

: A free and open-source MATLAB library for creating beautiful, publication-quality graphs from instantly generated MATLAB figures or saved MATLAB fig files.

[sciencestagram](https://www.mathworks.com/matlabcentral/fileexchange/42126-sciencestagram "File Exchange - MATLAB Central")

: A function makes your plots look somewhat like they came from the dustiest section of the engineering library.

[figFriends_Tool_EN.zip](https://www.mathworks.com/matlabcentral/fileexchange/46666-figfriends-tool-en-zip "File Exchange - MATLAB Central")

: A package allows you to prepare figures with amplificated parts or another figure for scientific writing.

[gridcolor](https://www.mathworks.com/matlabcentral/fileexchange/9815-gridcolor "File Exchange - MATLAB Central")

: A function changes the color of gridlines to a color different from the label and box color, which is currently not implemented in MATLAB.

[Perceptually improved colormaps](https://www.mathworks.com/matlabcentral/fileexchange/28982-perceptually-improved-colormaps "File Exchange - MATLAB Central")

: A tool returns perceptually balanced colormaps.

### Interactive Control and Callbacks

[draggable](https://www.mathworks.com/matlabcentral/fileexchange/4179-draggable "File Exchange - MATLAB Central")

: A function allows graphical objects to be dragged in a figure.

[dualcursor](https://www.mathworks.com/matlabcentral/fileexchange/2875-dualcursor?requestedDomain=zh "File Exchange - MATLAB Central")

: A utility adds dual vertical cursors to a plot.

[On-figure magnifier](https://www.mathworks.com/matlabcentral/fileexchange/26007-on-figure-magnifier "File Exchange - MATLAB Central")

: A utility provides a powerful zooming tool specially designed for the documentation of original and zoomed 2D graphics of images on the same plot.

[TextZoomable(x,y,varargin)](https://www.mathworks.com/matlabcentral/fileexchange/41513-textzoomable-x-y-varargin "File Exchange - MATLAB Central")

: A function adds texts that zoom as you zoom your plot, rather than staying at a fixed font size.

[Fine Tuning Figure Toolbar](https://www.mathworks.com/matlabcentral/fileexchange/30196-fine-tuning-figure-toolbar "File Exchange - MATLAB Central")

: A function adds a toolbar to fix axis position so as to remove annoying blank margins. Also, set precise figure size.

[MenuBar](https://www.mathworks.com/matlabcentral/fileexchange/29760-menubar "File Exchange - MATLAB Central")

: A function allows the user to create menus anywhere in a figure.

[clickableLegend - Interactive highlighting of data in figures](https://www.mathworks.com/matlabcentral/fileexchange/21799-clickablelegend-interactive-highlighting-of-data-in-figures "File Exchange - MATLAB Central")

: A function creates a legend with clickable strings that let you hide and show objects in a plot.

[Draggable data tips](https://www.mathworks.com/matlabcentral/fileexchange/44065-draggable-data-tips "File Exchange - MATLAB Central")

: A utility enables the user to interactively drag any newly-created data-tip, anywhere in the MATLAB figure.

[linecut](https://www.mathworks.com/matlabcentral/fileexchange/47766-linecut "File Exchange - MATLAB Central")

: A function allows you to interact a 3D plot with a crosshair and dynamically view X and Y linecuts of surf or image data.

  ***Remark**: This function does not work if the figure is being held on status*.

[3D image rotation using sliders](https://www.mathworks.com/matlabcentral/fileexchange/19891-3d-image-rotation-using-sliders "File Exchange - MATLAB Central")

: A GUI represents an image and rotate this image about the three axes in three-dimensional space using sliders.

[Volumetric Data Explorer](https://www.mathworks.com/matlabcentral/fileexchange/41405-volumetric-data-explorer "File Exchange - MATLAB Central")

: An app provides an interactive environment to explore four and five-dimensional data using some of MATLAB's abilities for volumetric visualization and animation.

### Animation Maker

[Animated GIF](https://www.mathworks.com/matlabcentral/fileexchange/21944-animated-gif "File Exchange - MATLAB Central")

: An example illustrates how to capture a series of screenshots, and saves the animation as a GIF image file.

## GUI Components and Utilities

{% include picture.html img="matlab/graphical-user-interface-design_730x220_o16.png" width="730" height="220" alt="gui-component-design" class="shadow-none" %}

[akZoom](https://www.mathworks.com/matlabcentral/fileexchange/41426-akzoom "File Exchange - MATLAB Central")

: A package allows direct zooming and panning with the mouse in 2D plots. Supports plotyy, loglog, subplot, etc.

[Copy Paste](https://www.mathworks.com/matlabcentral/fileexchange/27971-copy-paste "File Exchange - MATLAB Central")

: A package allows a simple Cut, Copy, Paste context menu for edit boxes in GUI.

[GUI Layout Toolbox](https://www.mathworks.com/matlabcentral/fileexchange/27758-gui-layout-toolbox "File Exchange - MATLAB Central")"GUI Layout Toolbox"

: A toolbox provides tools to create sophisticated MATLAB graphical user interfaces that resize gracefully.

[Easy programatic GUI Layout](https://www.mathworks.com/matlabcentral/fileexchange/46509-easy-programatic-gui-layout "File Exchange - MATLAB Central")

: A function creates a GUI with the automatic placement of objects, which allows you to create panels, editboxes, text, listboxes, pushbuttons and more, without having to calculate its position.

[Multiple Tab GUI](https://www.mathworks.com/matlabcentral/fileexchange/25938-multiple-tab-gui "File Exchange - MATLAB Central")

: An example illustrates how to create a figure with multiple Tabs.

[inputsdlg: Enhanced Input Dialog Box (v2.1.2)](https://www.mathworks.com/matlabcentral/fileexchange/25862-inputsdlg--enhanced-input-dialog-box--v2-1-2- "File Exchange - MATLAB Central")

: A function creates an enhanced version of the standard INPUTDLG function with many additional features.

[Image File Get/Put Dialog Boxes](https://www.mathworks.com/matlabcentral/fileexchange/25814-image-file-get-put-dialog-boxes "File Exchange - MATLAB Central")

: A package allows you to easily create open and save image file dialog boxes.

[IMAGEVIEWER](https://www.mathworks.com/matlabcentral/fileexchange/13000-imageviewer "File Exchange - MATLAB Central")

: A GUI for viewing and interactively exploring image files.

[UIGETVARIABLES: Dialog to pass variables from workspace into GUI](https://www.mathworks.com/matlabcentral/fileexchange/37679-uigetvariables-dialog-to-pass-variables-from-workspace-into-gui "File Exchange - MATLAB Central")

: A package creates a dialog box for selecting variables from the base workspace.

***Learn more**:*

- <cite>[MATLAB GUI - MathWorks](https://www.mathworks.com/discovery/matlab-gui.html)</cite>

## Statistics

{% include picture.html img="matlab/distribution-159626_730x174_o16.png" width="730" height="174" alt="normal distributions" class="shadow-none" %}

[MATLAB Tools for Scientist](https://www.mathworks.com/matlabcentral/fileexchange/39044-matlab-tools-for-scientist "File Exchange - MATLAB Central")

: A toolbox for data analysis and visualization using an example of dose-response fitting.

[Calculate number of bins for histogram](https://www.mathworks.com/matlabcentral/fileexchange/21033-calculate-number-of-bins-for-histogram "File Exchange - MATLAB Central")

: A toolbox allows you to calculate the **ideal** number of bins for a histogram, and plots the data with MATLAB's `HIST` function.

[FBD - "Find the Best Distribution" tool](https://www.mathworks.com/matlabcentral/fileexchange/36000-fbd--find-the-best-distribution--tool "File Exchange - MATLAB Central")

: A GUI allows you to find the best distribution that fits your data.

## Curve and Surface Fitting

{% include picture.html img="matlab/measurement_730x183.png" width="730" height="183" alt="land surveying" class="shadow-none" %}

[EzyFit 2.44](https://www.mathworks.com/matlabcentral/fileexchange/10176-ezyfit-2-44 "File Exchange - MATLAB Central")

: A toolbox to perform simple curve fitting of one-dimensional data using arbitrary (non-linear) fitting functions.

[Fitting quadratic curves and surfaces](https://www.mathworks.com/matlabcentral/fileexchange/45356-fitting-quadratic-curves-and-surfaces "File Exchange - MATLAB Central")

: A toolbox provides a fairly comprehensive toolset of estimating quadratic curves and surfaces in an errors-in-variables context, with and without constraints.

[Surface Fitting using gridfit](https://www.mathworks.com/matlabcentral/fileexchange/8998-surface-fitting-using-gridfit "File Exchange - MATLAB Central")

: A function models a surface from data in the form of z(x,y) from scattered or semi-scattered data

## Science and Engineering

{% include picture.html img="matlab/space_730x218_o16.png" width="730" height="218" alt="space - sun, satellite, earth" class="shadow-none" %}

[MathExplorer: Learning Maths using MuPAD for Engineering Students](https://www.mathworks.com/matlabcentral/fileexchange/38833-mathexplorer-learning-maths-using-mupad-for-engineering-students "File Exchange - MATLAB Central")

: A set of MuPAD notebooks that allow engineering students to visualize and experiment with maths.

[degrees and radians](https://www.mathworks.com/matlabcentral/fileexchange/3263-degrees-and-radians "File Exchange - MATLAB Central")

: Two helper functions, one converts degrees to radians, the other rads to deg.

[Simple Units and Dimensions for MATLAB](https://www.mathworks.com/matlabcentral/fileexchange/9873-simple-units-and-dimensions-for-matlab "File Exchange - MATLAB Central")

: A function provides an efficient, easy to use, method of incorporating real-world units.

[unit(varargin)](https://www.mathworks.com/matlabcentral/fileexchange/46045-unit-varargin "File Exchange - MATLAB Central")

: A function converts between different units, and checks that their dimensions are consistent.

[Units and Dimensions Suite for MATLAB](https://www.mathworks.com/matlabcentral/fileexchange/10070-units-and-dimensions-suite-for-matlab "File Exchange - MATLAB Central")

: A complete suite for using real-world units in MATLAB.

[Unit Converters](https://www.mathworks.com/matlabcentral/fileexchange/35258-unit-converters "File Exchange - MATLAB Central")

: Intuitive functions for conversion of acceleration, angle, area, computing, force, frequency, energy, length, mass, power, pressure, speed, temperature, time, or volume.

[Velocity Conversion Toolbox](https://www.mathworks.com/matlabcentral/fileexchange/31665-velocity-conversion-toolbox "File Exchange - MATLAB Central")

: A toolbox converts velocities between mph, m/s,km/h, kts, ft/s.

[Robotics](https://www.mathworks.com/matlabcentral/fileexchange/24361-robotics "File Exchange - MATLAB Central")

: A toolbox draws 16 robots that the user select.

## Debugging

{% include picture.html img="matlab/debug_730x248_o16.png" width="730" height="248" alt="bug fixing" class="shadow-none" %}

[profile_history - display graphical profiling timeline data](https://www.mathworks.com/matlabcentral/fileexchange/46976-profile_history-display-graphical-profiling-timeline-data "File Exchange - MATLAB Central")

: A GUI to analyze the latest profiling session and displays the function-call timings and durations in a graphical timeline.

[tracer4m](https://www.mathworks.com/matlabcentral/fileexchange/28929-tracer4m "File Exchange - MATLAB Central")

: A toolbox traces calls to methods and functions.

[plot_subroutines](https://www.mathworks.com/matlabcentral/fileexchange/46070-plot-subroutines "File Exchange - MATLAB Central")

: A package plots the subroutines in a function and their dependencies on each other.

[intent.m](https://www.mathworks.com/matlabcentral/fileexchange/28492-intent-m "File Exchange - MATLAB Central")

: A toolbox allows you to create a plot of relationships between M-files in the current directory, as inferred by the names of input and output arguments.

[functor](https://www.mathworks.com/matlabcentral/fileexchange/27262-functor "File Exchange - MATLAB Central")

: A package allows you to generate and visualize a mapping between functions and the composition of function handles.

[Automatic Documentation MATLAB source codes](https://www.mathworks.com/matlabcentral/fileexchange/31572-automatische-dokumentation-matlab-quellcodes-automatic-documentation-matlab-source-codes "File Exchange - MATLAB Central")

: A toolbox allows you to generate m2html documentation with Graphviz on projects written in MATLAB.

* * *

**Keep on reading**:

- [Working MATLAB with MS Excel]({% post_url matlab/2015-03-10-Working-MATLAB-with-MS-Excel %})
- [Matrix Conversion between MATLAB and Microsoft Equation Editor]({% post_url matlab/2020-01-15-Convert-MATLAB-Matrix-to-MS-Office-Equation %})
- [Expand shorten URLs in MATLAB]({% post_url matlab/2015-11-29-expand-twitter-short-url %})
