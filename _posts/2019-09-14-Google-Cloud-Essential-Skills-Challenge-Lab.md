---
layout: post
title: "Note for Google Cloud Essential Skills: Challenge Lab"
date: 2019-09-14
category: Cloud
tags: Qwiklabs Google_Cloud
---

## Brief Introduction of Challenge Scenario


Tasks:

1. Create a Linux virtual machine, name it "apache" and specify the zone as "us-central1-a". (add necessary firewall rules)

2. Configure Apache2 Web Server in your instance

3. Test your server that shows the "Hello World!" page.


**GSP212** [VPC Flow Logs - Analyzing Network Traffic](https://www.qwiklabs.com/catalog?keywords=GSP212)

## Install Apache
Configure the VM instance that you created as an Apache webserver and overwrite the default web page.

In the Console, navigate to Navigation menu (mainmenu.png) > Compute Engine > VM instances.

For web-server, click SSH to launch a terminal and connect.

In the web-server SSH terminal, update the package index:

`sudo apt-get update`

Install the apache2 package:

`sudo apt-get install apache2 -y`

Create a new default web page by overwriting the default:

echo '<!doctype html><html><body><h1>Hello World!</h1></body></html>' | sudo tee /var/www/html/index.html

Exit the SSH terminal:


`exit`