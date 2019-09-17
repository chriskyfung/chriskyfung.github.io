---
layout: post
title: "Qwiklab/Logbook: Migrate a MySQL Database to Google Cloud SQL"
date: 2019-09-11 23:00
category: 
author: 
tags: Qwiklabs Google_Cloud Logbook
summary: 
---

## Brief Introduction of Challenge Scenario

1. Check that there is a Cloud SQL instance
2. Check that there is a user database on the Cloud SQL instance
3. Check that the blog instance is authorized to access Cloud SQL
4. Check that wp-config.php points to the Cloud SQL instance
5. Check that the blog still responds to requests


https://cloud.google.com/sql/docs/mysql/migrate-data


https://cloud.google.com/sql/docs/mysql/replication/replication-from-external

https://cloud.google.com/solutions/migrating-mysql-to-cloudsql-using-automated-migration-workflow-tutorial


The existing MySQL database is called `wordpress` and 
the user called `blogadmin` with 
password `Password1*`


mysqldump \
    -h [MASTER_IP] -P [MASTER_PORT] -u [USERNAME] -p \
    --databases [DBS]  \
    --hex-blob  --skip-triggers  --master-data=1  \
    --order-by-primary --no-autocommit \
    --default-character-set=utf8mb4 --ignore-table [VIEW] \
    --single-transaction --set-gtid-purged=on | gzip | \
    gsutil cp - gs://[BUCKET]/[PATH_TO_DUMP]

mysqldump \
    -h 34.70.72.107 -P 3306 -u blogadmin -p \
    --databases information_schema,wordpress      --hex-blob  --skip-triggers  --master-data=1  \
    --order-by-primary --compact --no-autocommit \
    --default-character-set=utf8 \
    --single-transaction --set-gtid-purged=on  | gzip | \
    gsutil cp - gs://qwiklabs-gcp-f649f32ed11e5ee4/wp-master1.sql.gz


    wEDNGt7iOiIFLfz5