---
layout: post
title: "☁ Migrate a MySQL Database to Google Cloud SQL"
author: chris
date: 2019-09-30
category: Cloud
tags: [Qwiklabs, Google Cloud, Logbook, WordPress, MySQL]
permalink: /blog/qwiklabs/Migrate-a-MySQL-Database-to-Google-Cloud-SQL
redirect_from:
 - /blog/2019/09/30/Migrate-a-MySQL-Database-to-Google-Cloud-SQL
excerpt: A lab summary of qwiklab GSP306 "Migrate a MySQL Database to Google Cloud SQL" | 1. Check Existing WordPress Resources | 2. Create Cloud SQL Instance | 3. Export SQL Database | 4. Import to Cloud SQL | 5. Authorized Blog Instance to Access Cloud SQL | 6. Reconfigure WordPress to connect the Cloud SQL instance
image: 
   path: /images/posts/qwiklabs/qwiklabs-GSP306-migrating-mysql-to-cloudsql-concepts-sequence.png
   height: 317
css:
   syntax: true
---

This is the last article of the series about the Qwiklabs quest **_"Challenge: GCP Architecture"_**. Compared to the previous labs, this one is more practical and also valuable for non-developers. We will touch a WordPress site in the lab **GSP306** _"[Migrate a MySQL Database to Google Cloud SQL](https://www.qwiklabs.com/focuses/1740?parent=catalog)"_ this time. It is useful if you are going to move or integrate your applications with flexible and scalable Cloud SQL service.

An existing WordPress installation in the Compute Instance called `blog` that is already running in the lab. The blog is connecting with a MySQL database running on the same server. You need to migrate the local database to Google Cloud SQL, and reconfigure the WordPress to access the Cloud database instead.

## Brief Introduction of Challenge Scenario

When you open the page of this lab in Qwiklabs, you can find the task requirements by click the green activity tracker (on the top right of the page) to expand the score box.

{% include picture.html width="602" height="578" img="qwiklabs/score_box_of_qwiklabs_GSP306.png" alt="Screenshot of Green Score box of Qwiklabs Hands-on-lab GSP306" class="shadow-none text-center" %}

The screenshot above shows that there are 5 steps required for completing this lab. Combining with the instruction details, they are translated to the following mission statements.

1. Create a Cloud SQL instance
2. Export and import the `wordpress` database to the Cloud SQL instance
3. Authorize the VM instance `blog` to access the Cloud SQL
4. Change `wp-config.php` points to the Cloud SQL instance
5. Check that the blog still responds to requests

{% include picture.html height="317" img="qwiklabs/qwiklabs-GSP306-migrating-mysql-to-cloudsql-concepts-sequence.png" alt="Scheme diagram of Export / Import Database Mirgration" class="shadow-none" %}

<br>

## Check Existing WordPress Resources

In the lab page, there is the IP of the Demo Blog Site shown in the left panel after provisioning lab resources.

{% include picture.html width="334" height="488" img="qwiklabs/qwiklabs-GSP306-step0-project-information.png" alt="a sample of project information panel" class="shadow-none text-center" %}

In the web console, navigate to _**Compute Engine > VM instances**_. You should find a VM instance called `blog` has been provisioned. A WordPress server is running on this instance.

{% include picture.html height="325" img="qwiklabs/qwiklabs-GSP306-step1-wordpress-server-instance-called-blog.png" alt="VM instances called blog" %}

The instance should have the same external IP as shown in the panel. Copy the external IP and open it in a new tab. A website called Blog-Demo will be displayed.

## Create Cloud SQL Instance

Next, you need to create a new Google Cloud SQL instance to host the migrated database.

In the web console, navigate to _**SQL**_ and click **Create instance**. Choose **MySQL**, give a name to the SQL instance, e.g. `demo`. Generate a root password and then click **Create**.

{% include picture.html height="395" img="qwiklabs/qwiklabs-GSP306-step3-Create-Cloud-SQL-Instance-on-GCP.png" alt="Create Cloud SQL Instance on GCP" %}

Wait for the instance to be initialized, the process usually takes 5 to 10 minutes.

{% include picture.html height="642" img="qwiklabs/qwiklabs-GSP306-step4-instance-details-of-Cloud-SQL.png" alt="Instance details of the created demo MySQL" %}

You can continue the procedure below without waiting here.

## Export SQL Database

If you read "[Migration from MySQL to Cloud SQL](https://cloud.google.com/solutions/migrating-mysql-to-cloudsql-concept) in the documentation of Google Cloud Solutions. There are two ways to migrate the database, namely, (a) [Export/import approach](https://cloud.google.com/sql/docs/mysql/replication/replication-from-external) or (b) [External replica promotion approach](https://cloud.google.com/solutions/migrating-mysql-to-cloudsql-using-automated-migration-workflow-tutorial).

- **Export/import migration**
This method requires to export the entire source database and import the dump data to replica, typically requires downtime for the database during the entire process to keep data in sync. 
- **External replica promotion migration**
This method process through the automated migration workflow provided by Google Cloud SQL, which aims to minimize the database uptime by promoting the replica database to replace the source after the data is synchronized.

In a production environment, you may consider the automated workflow to take its advantage. In this article, I will only show you the **export/import** approach because it is simpler. I want to make sure you can accomplish this challenge lab.

In the web console, navigate to **_Compute Engine > VM instances_** and click the **SSH** button of the instance called `blog`.

Both WordPress and its MySQL database are running in this VM instance. The existing MySQL database is called `wordpress` and the user called `blogadmin` with password `Password1*`.

In the SSH session, use `mysqldump` to export the MySQL database to a dump file with the following flags:

```bash
mysqldump \
--databases [DATABASE_NAME1, DATABASE_NAME2, ...] -h [INSTANCE_IP] -u [USERNAME] -p \
--hex-blob --skip-triggers --single-transaction --ignore-table [VIEW_NAME1] [...] \
--default-character-set=utf8mb4 > [SQL_FILE].sql
```

In this lab, you can remove the `--ignore-table [VIEW_NAME1]` flag because the database does not include any views. Replace the argument values, the command line should look like:

```bash
mysqldump --databases wordpress -h localhost -u blogadmin -p \
--hex-blob --skip-triggers --single-transaction \
--default-character-set=utf8mb4 > wordpress.sql
```

Now you need to copy the dump file to Cloud Storage. Use the following commands to create a bucket and upload the file to it.

```bash
export PROJECT_ID=$(gcloud info --format='value(config.project)')
gsutil mb gs://${PROJECT_ID}
gsutil cp ~/wordpress.sql gs://${PROJECT_ID}
```

In the web console, navigate to ***Storage*** to confirm the uploaded file.
{% include picture.html height="344" img="qwiklabs/qwiklabs-GSP306-step5-dump-file-in-cloud-storage.png" alt="uploaded wordpress.sql file in cloud storage" %}


## Import to Cloud SQL

Go back to the web console, navigate to ***SQL*** to check whether the cloud SQL instance is ready. Once the instance is online, click the instance name to view the details.

Choose **DATABASES** tab, and click **Create database**.

In the dialog, enter `wordpress` as the name and select `utf8mb4` as the character set.

{% include picture.html height="485" img="qwiklabs/qwiklabs-GSP306-step6-create-databases-in-cloud-sql.png" alt="Add wordpress database to Cloud SQL" %}

Now you prepared an empty database called `wordpress` in the Cloud SQL. Click **IMPORT** button at the top of the page.

In the dialog, click **Browse** to select the dump file in the Cloud Storage, and select `wordpress` in the Database field.
{% include picture.html height="497" img="qwiklabs/qwiklabs-GSP306-step7-import-database-to-cloud-sql.png" alt="" %}

Click **Import** to start the process.

## Authorized Blog Instance to Access Cloud SQL

While the database is importing to the cloud SQL, choose **USERS** tab and click **Create user account**.

In the dialog, enter `blogadmin` as the user name and `Password1*` as the password.

{% include picture.html height="501" img="qwiklabs/qwiklabs-GSP306-step8-create-user-in-cloud-sql.png" alt="Add blogadmin to " %}

Choose **CONNECTIONS** tab, under the Public IP click **Add network**.

Copy the IP of the Demo Blog site to the Network field, and format the number in form of a CIDR notation `X.X.X.0/24`.

{% include picture.html width="471" height="712" img="qwiklabs/qwiklabs-GSP306-step9-athorized-networks.png" alt="" class="text-center" %}

Click **Done** and **Save** to authorize the VM instance `blog` to access the Cloud SQL.

## Reconfigure WordPress to connect the Cloud SQL instance

For this lab, the WordPress site configuration file is located in the `/var/www/html/wordpress/` directory. Use the following commands to change the current directory and list the files,

```bash
cd /var/www/html/wordpress/
ls
```

You should find a file called `wp-config.php`.

{% include picture.html height="114" img="qwiklabs/qwiklabs-GSP306-step11-locate-wordpress-config-file.png" alt="" %}

(_Optional_)  Before changing the WordPress configuration, I recommend you stop the local MySQL server using the following commands in the SSH session:

```bash
sudo service mysql stop
sudo service mysql status
```

Refresh the Demo Blog Site, the website becomes fail to render.
{% include picture.html width="670" height="190" img="qwiklabs/qwiklabs-GSP306-step10-stop-local-mysql-server.png" alt="" %}

Now you edit the WordPress configuration, such that it points to the Cloud SQL instance.

Open the `wp-config.php`, such as using nano editor"

```bash
sudo nano wp-config.php
```
The file looks like below,

{% include picture.html height="571" img="qwiklabs/qwiklabs-GSP306-step12-edit-wp-config-php-file.png" alt="" %}

Find the following lines in the file,

```php
/** MySQL hostname */
define('DB_HOST', 'localhost');
```

Replace `localhost` with the Public IP of the Cloud SQL instance, e.g,

```php
/** MySQL hostname */
define('DB_HOST', '35.226.248.101');
```

Press **Ctrl + x** and type **Y** to save and exit the file.

If you refresh the website in your web browser, it should be restored. That means the WordPress site is connected to the Cloud SQL. Otherwise, use the following command to restart the webserver,

```bash
sudo service apache2 restart
sudo service apache2 status
```

(Optional) Test the website to check if any issues after migration.

{% include picture.html height="682" img="qwiklabs/qwiklabs-GSP306-step2-Blog-Demo-wordpress-site.png" alt="Screenshot of the Blog-Demo Website" %}

Congratulations! You should accomplish the lab if you follow the above steps. Also, you earned a badge if you completed the quest _"[Cloud Architecture: Design, Implement, and Manage](https://google.qwiklabs.com/quests/124)"_. You become a cloud expert now!

This post has also been published to Medium. If you like to read and take notes in Medium, please visit [Medium (@chriskyfung)](https://medium.com/@chriskyfung/qwiklab-logbook-migrate-a-mysql-database-to-google-cloud-sql-7c129ba586c9).

* * *

Next time, I will try to write a review about different quests in Qwiklabs. I hope you will visit my site again. See you soon!

**Keep on reading**:

- [Learning Google Cloud Platform on Qwiklabs: Learning Map, Assistive Tool and Tips](/blog/qwiklabs/Qwiklabs-User-Tips-for-Learning_Google_Cloud_Platform)
- [☁ Set up and Configure a Cloud Environment in Google Cloud: Challenge Lab](/blog/qwiklabs/Set-up-and-Configure-a-Cloud-Environment-in-Google-Cloud-Challenge-Lab)

**Useful external link**:

- [VM Migration: Modernize an Application Stack with GKE and MySQL \| Qwiklabs](https://www.qwiklabs.com/focuses/6898?parent=catalog)
