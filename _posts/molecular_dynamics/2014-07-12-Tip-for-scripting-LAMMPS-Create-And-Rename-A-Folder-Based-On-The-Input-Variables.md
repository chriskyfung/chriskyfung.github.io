---
layout: post
title: "Tip for scripting LAMMPS: Create And Rename A Folder Based On The Input Variables"
author: chris
date: 2014-07-12
category: Academic
tags: [LAMMPS, Linux, Command-line, Molecular dynamics]
hideimage: true
---

In a molecular dynamics study, simulation is often repeated with different sets of parameters, e.g. dimensions, velocity, initial pressure and temperature. If the parameters are defined as variables in the LAMMPS input script, we can change the value of the variables using the command line/terminal. So, we don't need to modify the script each time.

I like storing each set of the simulation results to a well-labelled folder. This way makes systematic file management for finding the data in the future. For a long time, I did filing manually. It was gloomy and time consuming for creating and naming a new folder as well as moving the files. Recently, I found that the shell command can help to reduce the workload in the filing process.  The shell command has been introduced in my last post about how to send an email in the simulation process.

It is very useful as it allows to call the system commands and other programs.

{% include picture.html img="lammps/new_3folder_80x80" ext="png" alt="image: New folder with LAMMPS scripts" class="text-center" %}

<!--more-->

### Methods

I use the mkdir and cp commands this time.

`shell mkdir FOLDERNAME`  make a new directory named to be FOLDERNAME

`shell cp FILENAME  DESTINATION`   copy the file to another directory

### Example input script

```bash
# Input variables
# -potential (choose the version of Tersoff potential used, options=y1990/y1994)`
# -vx  (velocity = vx  * 100 m s^-1 in x-direction, units = metal )

# Define a string for the folder name (* Don't use spaces in the string, use '_ ' instead)
variable respath string ${vx}x100_m_s-1_Tersoff_${potential}
print "${respath}"

# Make the new folders
shell mkdir ${respath}
shell mkdir ${respath}/log_files
shell mkdir ${respath}/restart_files

# Copy the log file to the defined folder
shell cp log.lammps ${respath}/log_files/

# Use if…then...elif ..else and variable  to select the potential style
if "${potential} == 1990"  then "pair_coeff * * SiC_1990.tersoff C Si C" &
elif "${potential} == y1994"  "pair_coeff        * * SiC_1994.tersoff C Si C" &
else "print 'choose the variable -potential to be y1990 or y1994'" & quit

# Set a variable velocity
fix 1 groupID move linear -$vx 0 0 units box

# set the output paths of restart and dump files
restart     10000 ${respath}/restart_files/*.restart
dump         1 all xyz  500 ${respath}/dump.*.lammpstrj
```

### Example command line

```bash
$ lammps_linux  -v potential  y1990 -v vx  1.0 < in.script
```

### Results

As a result, the LAMMPS will create a folder `1.0x100_m_s-1_Tersoff_y1990` in the current directory. All the log, restart and dump files for this set of variables will be contained under this folder.

* * *

**Related**: [How to Send a Notification from a LAMMPS Simulation to Your Email](/blog/2014/06/13/How-to-Send-a-Notification-from-a-LAMMPS-Simulation-to-Your-Email)

*[LAMMPS]: Large-scale Atomic/Molecular Massively Parallel Simulator