---
layout: post
title: "[template] OVITO python modifier"
author: chris
date: 2015-11-27
categories:
    - Academic
tags:
    - OVITO
    - Python
    - Molecular dynamics
css:
    syntax: true
image:
    path: /assets/images/write-2160925.svg
    width: "730"
    height: "411"
    hide: true
permalink: blog/2015/11/27/template-OVITO-python-modifier/
---

[OVITO](https://www.ovito.org/) 2.6.0 allows users to program their own modifier in Python. Here provides a template including the common headers and a for-loop for per-particle assignment.

*[OVITO]: Open Visualization Tool

<!--more-->

```python
# Import OVITO modules.

from ovito.io import *
from ovito.modifiers import *
from ovito.data import *

# Import system and NumPy libraries
import sys
import numpy

# Define your own modifier
def modify(frame, input, output):

print("The input contains %i particles." % input.number_of_particles)

# Loop over particles and print their number of bonds.
for particle_index in range(output.number_of_particles):
    # Print particle index (1-based).
    sys.stdout.write("%i " % (particle_index+1))
    
    value1 = <your calculations>
    
    output.particle_proporties.['<key>'].marray[particle_index] = value1
    output.particle_proporties.['<key>'].changed()
    
    # End of particle line

        sys.stdout.write("\n")
```
