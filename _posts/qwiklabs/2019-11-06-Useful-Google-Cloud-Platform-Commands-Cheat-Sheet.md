---
layout: post
title: Useful Google Cloud Platform Commands Cheat Sheet (15 Practical Tips)
date: 2019-11-06 13:12 +0800
categories:
    - Cloud
author: chris
tags:
    - Google Cloud
    - User tips
    - GCLOUD
    - Terraform
    - Qwiklabs
    - Shorthand
permalink: /blog/qwiklabs/useful-google-cloud-platform-commands-cheat-sheet
redirect_from:
    - /blog/qwiklabs/Useful-Google-Cloud-Platform-Commands-Cheat-Sheet
css:
    syntax: true
featured: true
image:
    path: /assets/images/write-2160925.svg
    width: "730"
    height: "431"
    hide: true
---

**gcloud** is the primary CLI tool for the Google Cloud Platform. You can find a shortlist of the frequently used commands below. There are also some examples of **gsutil** and **terraform** command-line tools. Mastering them helps you to script and automate many GCP operations.

<!--more-->

{% include toc.md %}

## Install gcloud command-line tool

#### For Linux

Visit [https://cloud.google.com/sdk/docs/#linux](https://cloud.google.com/sdk/docs/#linux) to obtain the download link of Google Cloud SDK and download the latest package. Unzip the file, and run these commands:

```bash
./google-cloud-sdk/install.sh
./google-cloud-sdk/bin/gcloud init
```

#### For Debian / Ubuntu

Follow the instruction below to install the Cloud SDK:

1. Add the Cloud SDK distribution URI as a package source:

    ```bash
    echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list

    sudo apt-get install apt-transport-https ca-certificates

    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -
    ```

2. Update and install the Cloud SDK:

    ```bash
    sudo apt-get update && sudo apt-get install google-cloud-sdk

    gcloud init
    ```

* * *

## The `gcloud` Commands Cheat Sheet

#### Find the Project ID

The most frequently `gcloud` command I used in Google Cloud Shells is to set the project ID as an environment variable with the Linux export command:

```bash
export PROJECT_ID=$(gcloud info --format='value(config.project)')

echo $PROJECT_ID
```

There are so many situations that use the project ID as a parameter. This keeps your codes much tiny and secure by using the environment variable.

For example, the project ID is often used as the namespace of the bucket names in Google Cloud Storage:

```bash
export BUCKET=${PROJECT_ID}

gsutil mb gs://${BUCKET}
```

Every bucket name must be unique across the entire Google Cloud Storage. Using the project ID as prefix or suffix is a good practice for uniqueness and consistency of the bucket names.

#### Extract a value from a JSON output of a **gcloud** command

```bash
gcloud compute ... --format=json | jq -r '<key>')
```

`jq` is a lightweight and flexible command-line JSON processor. With the `-r` option, it outputs raw strings, not JSON texts. Use `jq --help` to show the help, or visit [its official site](https://stedolan.github.io/jq/) for more details.

#### Find the Service Account for Compute Engine API

Besides the project ID, a service account email is required for several command-line tools, like creating a VM instance to GCE. You can extract the service account for the Compute Engine API using the following code:

```bash
export SERVICE_ACCOUNT=$(gcloud --project=$PROJECT_ID \
    iam service-accounts list --format=json | jq -r '.[] | select \
    (.displayName=="Compute Engine default service account").email')

echo $SERVICE_ACCOUNT
```

#### Find the used IP address

```bash
export USED_IP_ADDRESS=$(gcloud compute addresses describe $USED_IP \
    --region=us-central1 --format=json | jq -r '.address')

echo $USED_IP_ADDRESS
```

#### Change default zone

To set a default zone to use when working with zonal Compute Engine resources, such as us-west1-b, run:

```bash
gcloud config set compute/zone us-west1-b
```

To list all zones in a project in table form, run:

```bash
gcloud compute zones list
```

For more details, please read [gcloud compute zones list](https://cloud.google.com/sdk/gcloud/reference/compute/zones/list) in Cloud SDK Documentation.

#### SSH into a Compute Engine server

```bash
gcloud compute ssh user@your-server-name-1-vm
```

_Replace `user` and `your-server-name-1-vm` with yours._

#### Download a folder from the server through SCP

```bash
gcloud compute scp --recurse user@your-server-name-1-vm:/path/to/the/directory/that/you/want/to/download/to/your/local/machine/ ./
```

_Replace `user`, `your-server-name-1-vm` and `/path/to/the/directory/that/you/want/to/download/to/your/local/machine/` with yours._

#### Create a new Kubernetes Cluster

Enabling Kubernetes Engine API:

```bash
gcloud services enable container.googleapis.com
```

The following command is an example to create a new Kubernetes cluster named `my-cluster` with _two_ nodes (_N1 standard 1_) in the zone **us-central1-f**:

```bash
gcloud container clusters create my-cluster \
--num-nodes 2 \
--machine-type n1-standard-1 \
--zone us-central1-f
```

You will receive warnings in the output that can be safely ignored. For more details, please read [gcloud container clusters create](https://cloud.google.com/sdk/gcloud/reference/container/clusters/create) in Cloud SDK Documentation.

* * *

## The `gsutil` Cheat Sheet

**gsutil** is the command-line Google Storage utilities. Equivalent to `aws s3` but for the Google Cloud Platform, it allows you to access Google Cloud Storage from the command line.

#### Create a multi-regional bucket

```bash
gsutil mb -c multi_regional gs://${BUCKET}
```

#### Copy local file(s)/directory into a GCS bucket

```bash
gsutil cp <filename> gs://${BUCKET}
```

#### List all your buckets

```bash
gsutil ls
```

For more about **gsulit**, please read https://cloud.google.com/storage/docs/gsutil or run:

```bash
gsutil help
```

* * *

## Terraform Commands Cheat Sheet

#### Switch the version of Terraform with tfswitch

Confirm your Terraform version by using:

```bash
terraform version
```

Your output should look like this:

```bash
Terraform v0.12.x
```

To switch to the desired version by using a Terraform version manager **tfswitch**, run the following codes to install and configure `tfswitch`:

```bash
wget https://github.com/warrensbox/terraform-switcher/releases/download/0.7.737/terraform-switcher_0.7.737_linux_amd64.tar.gz
mkdir -p ${HOME}/bin
tar -xvf terraform-switcher_0.7.737_linux_amd64.tar.gz -C ${HOME}/bin
export PATH=$PATH:${HOME}/bin
tfswitch -b ${HOME}/bin/terraform 0.11.14
echo "0.11.14" >> .tfswitchrc
exit
```

#### Run Terraform

```bash
terraform init
```

The **terraform init** command is used to initialize a working directory containing the Terraform configuration files. This command performs several different initialization steps in order to prepare a working directory for use and is always safe to run multiple times, to bring the working directory up to date with changes in the configuration:

```bash
terraform plan -out=tfplan
```

The **terraform plan** command is used to create an execution plan. Terraform performs a refresh, unless explicitly disabled, and then determines what actions are necessary to achieve the desired state specified in the configuration files. This command is a convenient way to check whether the execution plan for a set of changes matches your expectations without making any changes to real resources or to the state. For example, terraform plan might be run before committing a change to version control, to create confidence that it will behave as expected.

The optional **-out** argument can be used to save the generated plan to a file for later execution with terraform apply.

```bash
terraform apply tfplan
```

The **terraform apply** command is used to apply the changes required to reach the desired state of the configuration, or the pre-determined set of actions generated by a terraform plan execution plan.

* * *

## Other useful Linux Commands

#### Create a text file with content

```bash
cat > <your-filename> <<EOF
/*
text contents
*/
EOF
```

_Replace `<your-filename>` and `/*text contents*/` with yours._

* * *

This list will be kept updated. If you need more, please leave me your feedback, questions, comments, suggestions below.

**See Also**: [Learning Google Cloud Platform on Qwiklabs: Learning Map, Assistive Tool and Tips]({% post_url qwiklabs/2019-11-25-Qwiklabs-User-Tips-for-Learning_Google_Cloud_Platform %})
