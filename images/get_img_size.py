#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import print_function
"""
get_image_size.py
====================

    :Name:        get_img_size
    :Purpose:     extract image dimensions given a file path with wildcard

    :Author:      Chris K. Fung

    :Created:     2020-10-07
    :Copyright:   (c) Chris K. Fung 2020
    :Licence:     MIT
"""

import os
import argparse
import glob
import re
from PIL import Image

parser = argparse.ArgumentParser(description='Process image files.')
parser.add_argument('filepath', type=str, help='path of an image file, e.g. .\\posts\dir\filename.ext')
args = parser.parse_args()

try:
    filePath = args.filepath

except TypeError as e:
    parser.print_help()
    sys.exit(1)

print("")
for filename in glob.glob(filePath):
    im = Image.open(filename)
    shortpath = re.match(r".*posts\\(\S+)", filename)[1]
    print('{{% include picture.html img="{}" width="{}" height="{}" %}}'.format(shortpath, im.width, im.height))
print("")

