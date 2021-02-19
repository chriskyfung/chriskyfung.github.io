---
layout: post
title: "☁ Insights from Data with BigQuery: Challenge Lab (COVID-19 Open Data)"
date: 2020-08-16 06:48 +0800
last_modified_at: 2020-10-08 03:56 +0800
category: Cloud
author: chris
tags: [Qwiklabs, Google Cloud, Logbook, BigQuery, Data Science]
permalink: /blog/qwiklabs/Insights-from-Data-with-BigQuery-Challenge-Lab
image: 
   path: /images/posts/qwiklabs/qwiklab-gsp787-00.jpg
   fit: right
excerpt: A brief procedure for the qwiklab practice GSP787. You will practice BigQuery for the data analysis of the COVID-19 open dataset `bigquery-public-data.covid19_open_data.covid19_open_data`.
amp:
   youtube: true
css:
   syntax: true
   custom: >-
      amp-accordion section[expanded] .show-more {
        display: none;
      }

      amp-accordion section:not([expanded]) .show-less {
        display: none;
      }
featured: true
custom_head: >-
   <script async custom-element="amp-accordion" src="https://cdn.ampproject.org/v0/amp-accordion-0.1.js"></script>
---

In this article, we will go through the lab **GSP322** _[Insights from Data with BigQuery: Challenge Lab](https://www.qwiklabs.com/focuses/11988?parent=catalog)_, which is labeled as an [expert-level](https://www.qwiklabs.com/quests/123) exercise. You will practice BigQuery for the data analysis of the COVID-19 open dataset `bigquery-public-data.covid19_open_data.covid19_open_data`.

## Open Public Dataset

1. In the Cloud Console, navigate to **Menu** > **BigQuery**.
2. Click **+ ADD DATA** > **Explore public datasets** from the left pane.
3. Search `covid19_open_data` and then select **COVID-19 Open Data**
4. Use Filter to locate the table `covid19_open_data` under the `covid19_open_data` dataset.

{% include picture.html img="qwiklabs/qwiklab-gsp787-covid-19-open-data.jpg" width="993" height="559" alt="BigQuery Results" %}

{% include picture.html img="qwiklabs/qwiklab-gsp787-tables.jpg" width="982" height="618" alt="BigQuery Results" %}

## Query 1: Total Confirmed Cases

{% include picture.html img="qwiklabs/qwiklab-gsp787-01.jpg" width="1349" height="531" alt="BigQuery Results" %}

Copy the following code to the Query editor and then click **Run**.

```sql
SELECT
  SUM(cumulative_confirmed) AS total_cases_worldwide
FROM
  `bigquery-public-data.covid19_open_data.covid19_open_data`
WHERE
  date = "2020-04-15"
```

This query sums up the cumulative confirmed cases of all records on 15 April, 2020.

## Query 2: Worst Affected Areas

{% include picture.html img="qwiklabs/qwiklab-gsp787-02.jpg" width="1330" height="513" alt="BigQuery Results" %}

Copy the following code to the Query editor and then click **Run**.

```sql
SELECT
    COUNT(*) AS count_of_states
FROM (
SELECT
    subregion1_name AS state,
    SUM(cumulative_deceased) AS death_count
FROM
  `bigquery-public-data.covid19_open_data.covid19_open_data`
WHERE
  country_name="United States of America"
  AND date='2020-04-10'
  AND subregion1_name IS NOT NULL
GROUP BY
  subregion1_name
)
WHERE death_count > 100
```

Make sure that you use `country_name` to filter the US reconds instead of `country_code`, and use `subregion1_name` to group the states in the US.

## Query 3: Identifying Hotspots

{% include picture.html img="qwiklabs/qwiklab-gsp787-03.jpg" width="1365" height="843" alt="BigQuery Results" %}

Copy the following code to the Query editor and then click **Run**.

{:style="margin-bottom:0"}
```sql
SELECT
  *
FROM (
SELECT 
  subregion1_name as state, 
  sum(cumulative_confirmed) as total_confirmed_cases
FROM
  `bigquery-public-data.covid19_open_data.covid19_open_data`
WHERE
  country_code="US"
  AND date='2020-04-10'
  AND subregion1_name is NOT NULL
GROUP BY
  subregion1_name
ORDER BY
  total_confirmed_cases DESC
)
WHERE
  total_confirmed_cases > 1000
```

{:style="margin-top:-20px;padding:0px 5px;font-size:small"}
💬 Thanks [Random32543654e474362](https://chriskyfung.gitlab.io/disqus-amp/q.html?url=https://chriskyfung.github.io/blog/qwiklabs/Insights-from-Data-with-BigQuery-Challenge-Lab#comment-5100690845) for providing the update of Query 3.

<amp-accordion disable-session-states animate>
  <section>
    <header><span class="show-more">&nbsp;<i class='fas fa-caret-down'></i> Show previous solution</span> <span class="show-less">&nbsp;<i class='fas fa-caret-up'></i> Hide previous solution</span></header>
    <div style="background-color:#efefef;padding:10px">
{% highlight sql %}
SELECT
    subregion1_name AS state,
    SUM(cumulative_confirmed) AS total_confirmed_cases
FROM
    `bigquery-public-data.covid19_open_data.covid19_open_data`
WHERE
    country_name="United States of America"
    AND date = "2020-04-10"
GROUP BY subregion1_name
HAVING total_confirmed_cases > 1000
ORDER BY total_confirmed_cases DESC
{% endhighlight %}
Due to Qwiklabs' poor design, you have to format <b>GROUP BY</b>, <b>HAVING</b> and <b>ORDER BY</b> to single-line statements, respectively.
</div>
  </section>
</amp-accordion>

## Query 4: Fatality Ratio

{% include picture.html img="qwiklabs/qwiklab-gsp787-04.jpg" width="1341" height="546" alt="BigQuery Results" %}

Copy the following code to the Query editor and then click **Run**.

```sql
SELECT SUM(cumulative_confirmed) AS total_confirmed_cases, SUM(cumulative_deceased) AS total_deaths, (SUM(cumulative_deceased)/SUM(cumulative_confirmed))*100 AS case_fatality_ratio
FROM `bigquery-public-data.covid19_open_data.covid19_open_data`
WHERE country_name="Italy" AND date BETWEEN "2020-04-01" AND "2020-04-30"
```

Originally, it should be `date='2020-04-30'`. I don't know why Qwiklabs replaced it with a date range.

## Query 5: Identifying specific day

{% include picture.html img="qwiklabs/qwiklab-gsp787-05.jpg" width="1449" height="550" alt="BigQuery Results" %}

Copy the following code to the Query editor and then click **Run**.

```sql
SELECT
 date
FROM
  `bigquery-public-data.covid19_open_data.covid19_open_data`
WHERE
 country_name = 'Italy'
 AND cumulative_deceased > 10000
ORDER BY date
LIMIT 1
```

Make sure that you use **ORDER BY** to sort the results by date.

## Query 6: Finding days with zero net new cases

{% include picture.html img="qwiklabs/qwiklab-gsp787-06.jpg" width="1366" height="767" alt="BigQuery Results" %}

Copy the following code to the Query editor and then click **Run**.

```sql
WITH india_cases_by_date AS (
  SELECT
    date,
    SUM(cumulative_confirmed) AS cases
  FROM
    `bigquery-public-data.covid19_open_data.covid19_open_data`
  WHERE
    country_name="India"
    AND date between '2020-02-21' and '2020-03-15'
  GROUP BY
    date
  ORDER BY
    date ASC
 )

, india_previous_day_comparison AS
(SELECT
  date,
  cases,
  LAG(cases) OVER(ORDER BY date) AS previous_day,
  cases - LAG(cases) OVER(ORDER BY date) AS net_new_cases
FROM india_cases_by_date
)
SELECT
  COUNT(date)
FROM
  india_previous_day_comparison
WHERE
  net_new_cases = 0
```

## Query 7: Doubling rate

{% include picture.html img="qwiklabs/qwiklab-gsp787-07.jpg" width="1333" height="855" alt="BigQuery Results" %}

Copy the following code to the Query editor and then click **Run**.

```sql
WITH us_cases_by_date AS (
  SELECT
    date,
    SUM( cumulative_confirmed ) AS cases
  FROM
    `bigquery-public-data.covid19_open_data.covid19_open_data`
  WHERE
    country_name="United States of America"
    AND date between '2020-03-22' and '2020-04-20'
  GROUP BY
    date
  ORDER BY
    date ASC
 )

, us_previous_day_comparison AS
(SELECT
  date,
  cases,
  LAG(cases) OVER(ORDER BY date) AS previous_day,
  cases - LAG(cases) OVER(ORDER BY date) AS net_new_cases,
  (cases - LAG(cases) OVER(ORDER BY date))*100/LAG(cases) OVER(ORDER BY date) AS percentage_increase
FROM us_cases_by_date
)
SELECT
  Date,
  cases AS Confirmed_Cases_On_Day,
  previous_day AS Confirmed_Cases_Previous_Day,
  percentage_increase AS Percentage_Increase_In_Cases
FROM
  us_previous_day_comparison
WHERE
  percentage_increase > 10
```

## Query 8: Recovery rate

{% include picture.html img="qwiklabs/qwiklab-gsp787-08.jpg" width="1292" height="866" alt="BigQuery Results" %}

Copy the following code to the Query editor and then click **Run**.

```sql
WITH cases_by_country AS (
  SELECT
    country_name AS country,
    SUM(cumulative_confirmed) AS cases,
    SUM(cumulative_recovered) AS recovered_cases
  FROM
    `bigquery-public-data.covid19_open_data.covid19_open_data`
  WHERE
    date="2020-05-10"
  GROUP BY
    country_name
)

, recovered_rate AS (
  SELECT
    country, cases, recovered_cases,
    (recovered_cases * 100)/cases AS recovery_rate
  FROM
    cases_by_country
)

SELECT country, cases AS confirmed_cases, recovered_cases, recovery_rate
FROM
   recovered_rate
WHERE
   cases > 50000
ORDER BY recovery_rate DESC
LIMIT 10
```

## Query 9: CDGR - Cumulative Daily Growth Rate

{% include picture.html img="qwiklabs/qwiklab-gsp787-09.jpg" width="1325" height="777" alt="BigQuery Results" %}

Copy the following code to the Query editor and then click **Run**.

```sql
WITH
  france_cases AS (
  SELECT
    date,
    SUM(cumulative_confirmed) AS total_cases
  FROM
    `bigquery-public-data.covid19_open_data.covid19_open_data`
  WHERE
    country_name="France"
    AND date IN ('2020-01-24',
      '2020-05-10')
  GROUP BY
    date
  ORDER BY
    date)
, summary as (
SELECT
  total_cases AS first_day_cases,
  LEAD(total_cases) OVER(ORDER BY date) AS last_day_cases,
  DATE_DIFF(LEAD(date) OVER(ORDER BY date),date, day) AS days_diff
FROM
  france_cases
LIMIT 1
)

select first_day_cases, last_day_cases, days_diff, POWER(last_day_cases/first_day_cases,1/days_diff)-1 as cdgr
from summary
```

## Create a Datastudio report

{% include picture.html img="qwiklabs/qwiklab-gsp787-10.jpg" width="858" height="257" alt="BigQuery Results" %}

1. Copy the following code to the Query editor and then click **Run**.

   ```sql
   SELECT
     date, SUM(cumulative_confirmed) AS country_cases,
     SUM(cumulative_deceased) AS country_deaths
   FROM
     `bigquery-public-data.covid19_open_data.covid19_open_data`
   WHERE
     date BETWEEN '2020-03-15'
     AND '2020-04-30'
     AND country_name='United States of America'
   GROUP BY date
   ```

2. Click on **EXPLORE DATA** > **Explore with Data Studio**.
3. Authorize Data Studio to access BigQuery.
4. You may fail to create a report for the first-time logon of Data Studio. Click **+ Blank Report** and accept the Terms of Service. Go back to the BigQuery page and click **Explore with Data Studio** again.
5. In the new Data Studio report, select **Add a chart** > **Time series Chart**.
6. Add `country_cases` and `country_deaths` to the Metric field.
7. Click **Save** to commit the change.

If you fail to get the score of this task, remove all data and reports from the Datastudio console before retry.

<br/>

**Congratulations! You completed this challenge lab.**

## Demonstration Video

{% include youtube.html id="3zxclCMoQeM" title="GSP787 Insights from Data with BigQuery: Challenge Lab (COVID-19 Open Data)" %}

```ts
00:00 Start Lab
00:30 Open "COVID-19 Open data" public dataset
01:34 Query 1: Total Confirmed Cases
03:10 Query 2: Worst Affected Areas
07:07 Query 3: Identifying Hotspots
09:17 Query 4: Fatality Ratio
12:30 Query 5: Identifying specific day
13:19 Query 6: Finding days with zero net new cases
14:47 Query 7: Doubling rate
18:25 Query 8: Recovery rate
24:36 Query 9: CDGR - Cumulative Daily Growth Rate
25:32 Create a Datastudio report
```

**References**:

- [Watch - Hands-on Lab: Insights into Data with BigQuery - Challenge Lab](https://cloudonair.withgoogle.com/events/next20-studyjam/watch?talk=w5-talk-3)

* * *

**Keep on reading**:

- [☁ Engineer Data in Google Cloud: Challenge Lab](/blog/qwiklabs/Engineer-Data-in-Google-Cloud-Challenge-Lab)