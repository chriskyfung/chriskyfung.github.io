---
layout: post
title: "☁ Build and Optimize Data Warehouses with BigQuery: Challenge Lab | logbook"
date: 2021-06-25 10:30 +0800
categories: [Cloud]
author: chris
tags: [Qwiklabs, Google Cloud, Logbook, BigQuery, Data Science]
permalink: /blog/qwiklabs/build-and-optimize-data-warehouses-with-bigquery-challenge-lab
redirect_from:
   - /blog/qwiklabs/GSP340
   - /blog/qwiklabs/gsp340
image:
   path: /images/posts/qwiklabs/gsp340-cover.png
excerpt: A brief procedure for the Google Cloud self-paced training GSP340 on Qwiklabs. You will practice the skills for creating a day-partitioned table in BigQuery and populating data from different datasets to it for the analysis of the Covid-19 pandemic.
amp:
   youtube: true   
css:
   syntax: true
   custom: >
      .ml-li { margin-left: auto; }
---

In this article, we will go through the lab **GSP340** _[GSP340 Build and Optimize Data Warehouses with BigQuery: Challenge Lab](https://www.qwiklabs.com/focuses/14341?parent=catalog)_, which is an [advanced-level](https://www.qwiklabs.com/quests/147) exercise on Qwiklabs. You will practice how to create a day-partitioned table in BigQuery and populate data from different datasets, related to the Covid-19 pandemic.

**Topics tested**:

- Use BigQuery to access public COVID and other demographic datasets.
- Create a new BigQuery dataset that will store your tables.
- Add a new date partitioned table to your dataset.
- Add new columns to this table with appropriate data types.
- Run a series of JOINS to populate these new columns with data drawn from other tables.

## Task 1: Create a table partitioned by data

In this task, you will need to:

- create a new dataset
- create a table in that dataset
- set partition by date with an expiry of 90 days
- copy the schema from the source table
- copy the data from the source table for all countries except the United Kingdom (GBR), Brazil (BRA), Canada (CAN) and the United States (USA).

1. In the Cloud Console, navigate to the **BigQuery** page.
2. Click your _Project ID_ under the BigQuery Explorer, then click **CREATE DATASET**.
3. Give the new dataset an ID (e.g. `oxford_policy_tracker`), and click **Create dataset**.
4. Add the [COVID 19 Government Response public dataset](https://console.cloud.google.com/bigquery?p=bigquery-public-data&d=covid19_govt_response&page=dataset) to the BigQuery Explorer by opening the link in your browser. \

   {:.callout}
   Alternatively, you can click on **+ ADD DATA** > **Explore public datasets** then search for `oxford covid-19 government response tracker`, click on the item. Then, click **VIEW DATASET** on the detail page.

   {% include picture.html img="qwiklabs/gsp340-task1-add-oxford-covid-19-governement-response-tracker.png" width="868" height="401" class="ml-li" alt="Oxford COVID 19 Government Response Tracker in GCP BigQuery public dataset" %}

5. Use a filter to find the table `oxford_policy_tracker` inside the `bigquery-public-data` as shown below.

   {% include picture.html img="qwiklabs/gsp340-task1-oxford-policy-tracker-schema.png" width="1237" height="696" class="ml-li" alt="Schema of the BigQuery table `bigquery-public-data.covid19_govt_response.oxford_policy_tracker`" %}

6. Click **COMPOSE NEW QUERY**. Copy the following to the query editor,

   ```sql
   CREATE OR REPLACE TABLE oxford_policy_tracker.<NEW_TABLE_NAME>
   PARTITION BY date
   OPTIONS(
   partition_expiration_days=90,
   description="oxford_policy_tracker table in the COVID 19 Government Response public dataset with  an expiry time set to 90 days."
   ) AS
   SELECT
      *
   FROM
      `bigquery-public-data.covid19_govt_response.oxford_policy_tracker`
   WHERE
      alpha_3_code NOT IN ('GBR', 'BRA', 'CAN','USA')
   ```

   Replace `<YOUR_DATASET_ID>` with your dataset ID and `<NEW_TABLE_NAME>` to a table name you desired.

7. Click **RUN** to process the query.

**Tips:** To learn more, read the section [_Creating a partitioned table from the result of a query_](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#creating_a_partitioned_table_from_the_result_of_a_query "Using data definition language statements \| BigQuery \| Google Cloud") in the BigQuery documentation.

If you are interested in the dataset, go to [www.bsg.ox.ac.uk/covidtracker](https://www.bsg.ox.ac.uk/covidtracker "COVID-19 Government Response Tracker \| Blavatnik School of Government") to find more information about the OxCGRT research project. You can also visit the [OxCGRT/covid-policy-tracker](https://github.com/OxCGRT/covid-policy-tracker) repository on GitHub to get the CSV-formatted data for any other projects.

## Task 2: Add new columns to your table

**Tips:** Read [_Manually adding an empty column_](https://cloud.google.com/bigquery/docs/managing-table-schemas#manually_adding_an_empty_column "Modifying table schemas \| BigQuery"), [_Adding columns_](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#adding_columns "Using data definition language statements \| BigQuery"), and [_Adding a `RECORD` column_](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#adding_a_record_column "Using data definition language statements \| BigQuery") in the BigQuery documentation.

The query for adding columns to your table should look like this:

```sql
ALTER TABLE oxford_policy_tracker.<YOUR_TABLE_NAME>
ADD COLUMN population INT64,
ADD COLUMN country_area FLOAT64,
ADD COLUMN mobility STRUCT<
   avg_retail      FLOAT64,
   avg_grocery     FLOAT64,
   avg_parks       FLOAT64,
   avg_transit     FLOAT64,
   avg_workplace   FLOAT64,
   avg_residential FLOAT64
   >
```

Before running the above query, replace `<YOUR_DATASET_ID>` and `<NEW_TABLE_NAME>` with your dataset ID and table name, correspondingly.

## Task 3: Add country population data to the population column

In this task, you need to populate the `population` column in your table with the data in the table `covid_19_geographic_distribution_worldwide` under the `covid19_ecdc` public dataset based on each country and date combination. You can use **SQL JOINs** to bring the data together.

**Tips**: Read [_UPDATE using joins_](https://cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax#update_using_joins "Data manipulation language syntax \| BigQuery") in the BigQuery documentation as well as the template in the Challenge scenario provided by Qwiklabs.

We can divide this task into two steps:

### Create a new table to store the country population data from European Center for Disease Control COVID 19 public dataset table

```sql
CREATE OR REPLACE TABLE oxford_policy_tracker.pop_data_2019 AS
SELECT
  country_territory_code,
  pop_data_2019
FROM 
  `bigquery-public-data.covid19_ecdc.covid_19_geographic_distribution_worldwide`
GROUP BY
  country_territory_code,
  pop_data_2019
ORDER BY
  country_territory_code
```

### Use SQL JOINs to fill the population data to your table

The query for the **SQL JOIN** should look like this:

```sql
UPDATE
   `oxford_policy_tracker.<YOUR_TABLE_NAME>` t0
SET
   population = t1.pop_data_2019
FROM
   `oxford_policy_tracker.pop_data_2019` t1
WHERE
   CONCAT(t0.alpha_3_code) = CONCAT(t1.country_territory_code);
```

Before running the above query, replace `<YOUR_DATASET_ID>` and `<NEW_TABLE_NAME>` with your dataset ID and table name, correspondingly.

## Task 4: Add country area data to the country_area column

Similar to Task 3, using a join to populate country area data from the table `country_names_area` under the `census_bureau_international` public dataset.

The query for the SQL JOIN should look like this:

```sql
UPDATE
   `oxford_policy_tracker.<YOUR_TABLE_NAME>` t0
SET
   t0.country_area = t1.country_area
FROM
   `bigquery-public-data.census_bureau_international.country_names_area` t1
WHERE
   t0.country_name = t1.country_name
```

Before running the above query, replace `<YOUR_DATASET_ID>` and `<NEW_TABLE_NAME>` with your dataset ID and table name, correspondingly.

## Task 5: Populate the mobility record data

Still using a join clause, you need to handle the structured RECORD of the mobility data.

**Tips:** Read [_UPDATE nested fields_](https://cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax#update_nested_fields) in the BigQuery documentation as well as the **Tips and Tricks** section provided on the Qwiklabs.

Before joining the nested data, you have to transform the data from the table `mobility_report` under the `covid19_google_mobility` public dataset. You are required to compute the average value of each child column in the source table for each country and date combination. Then, update the resulting data to the record structure in your working table.

The query for updating the mobility record should look like this:

```sql
UPDATE
   `oxford_policy_tracker.<YOUR_TABLE_NAME>` t0
SET
   t0.mobility.avg_retail      = t1.avg_retail,
   t0.mobility.avg_grocery     = t1.avg_grocery,
   t0.mobility.avg_parks       = t1.avg_parks,
   t0.mobility.avg_transit     = t1.avg_transit,
   t0.mobility.avg_workplace   = t1.avg_workplace,
   t0.mobility.avg_residential = t1.avg_residential
FROM
   ( SELECT country_region, date,
      AVG(retail_and_recreation_percent_change_from_baseline) as avg_retail,
      AVG(grocery_and_pharmacy_percent_change_from_baseline)  as avg_grocery,
      AVG(parks_percent_change_from_baseline) as avg_parks,
      AVG(transit_stations_percent_change_from_baseline) as avg_transit,
      AVG(workplaces_percent_change_from_baseline) as avg_workplace,
      AVG(residential_percent_change_from_baseline)  as avg_residential
      FROM `bigquery-public-data.covid19_google_mobility.mobility_report`
      GROUP BY country_region, date
   ) AS t1
WHERE
   CONCAT(t0.country_name, t0.date) = CONCAT(t1.country_region, t1.date)
```

Before running the above query, replace `<YOUR_DATASET_ID>` and `<NEW_TABLE_NAME>` with your dataset ID and table name, correspondingly.

## Task 6: Query missing data in population & country_area columns

You will need to find the countries that are missing the `population` and `country_area`. The result should be a list of the countries ordered by country name. If a country misses both the population and country area, it should appear twice in the list.

**Tips:** The **SQL UNION ALL** operator is recommended in the **Tips and Tricks** section provided on the Qwiklabs. It combines the result of two queries without removing the overlapping results. Read [this SQLShank article](https://www.sqlshack.com/sql-union-vs-union-all-in-sql-server/ "SQL Union vs Union All in SQL Server \| sqlshack.com"), if you want to understand the difference between the **SQL UNION** and **UNION ALL** operators.

First, try to run the following to query the countries that do not have the population data.

```sql
SELECT country_name, population
FROM `oxford_policy_tracker.<YOUR_TABLE_NAME>`
WHERE population is NULL
```

Next, try to run the following to query the countries that do not have the country area data.

```sql
SELECT country_name, country_area
FROM `oxford_policy_tracker.<YOUR_TABLE_NAME>`
WHERE WHERE country_area IS NULL
```

The results above contain duplicate rows if you carefully observe them. Refine the queries by adding the **DISTINCT** option to remove any duplicates. Also, keep only the `country_name` column in the results by unselecting the `population` and `country_area` columns. Last, combine the two queries using **UNION ALL** and order by country name. The final query should become like this:

```sql
SELECT DISTINCT country_name
FROM `oxford_policy_tracker.<YOUR_TABLE_NAME>`
WHERE population is NULL
UNION ALL
SELECT DISTINCT country_name
FROM `oxford_policy_tracker.<YOUR_TABLE_NAME>`
WHERE country_area IS NULL
ORDER BY country_name ASC
```

Replace `<YOUR_DATASET_ID>` and `<NEW_TABLE_NAME>` with your dataset ID and table name, and run the query. The result should be:

{% include picture.html img="qwiklabs/gsp340-task6-union-result-v2.png" width="556" height="459" alt="Output of Union ALL"  class="text-center" %}

**Congratulations! You completed this challenge lab.**

## <i class="far fa-play-circle"></i> Demonstration Video

{% include youtube.html id="C49jYtIMAsg" title="GSP340 Build and Optimize Data Warehouses with BigQuery: Challenge Lab (UPDATED ON JUNE 2021)" %}

```conf
⏱Timestamps:
00:00 Start Lab and Overview
00:22 Task 1: Create a table partitioned by date
01:29 Task 2: Add new columns to your table
01:55 Task 3: Add country population data to the population column
02:53 Task 4: Add country area data to the country_area column
03:22 Task 5: Populate the mobility record data
03:55 Task 6: Query missing data in population & country_area columns
```

**Keep on reading:**

- [☁ Insights from Data with BigQuery: Challenge Lab (COVID-19 Open Data) \| logbook]({% post_url qwiklabs/logbooks/2020-08-16-Insights-from-Data-with-BigQuery-Challenge-Lab %})
