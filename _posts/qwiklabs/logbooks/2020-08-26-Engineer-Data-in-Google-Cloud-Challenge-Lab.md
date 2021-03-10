---
layout: post
title: "☁ Engineer Data in Google Cloud: Challenge Lab | logbook"
date: 2020-08-26 15:30 +0800
category: Cloud
author: chris
tags: [Qwiklabs, Google Cloud, Logbook, BigQuery, Data Science, Machine Learning]
permalink: /blog/qwiklabs/Engineer-Data-in-Google-Cloud-Challenge-Lab
redirect_from:
   - /blog/qwiklabs/GSP327
image:
   path: /images/posts/qwiklabs/taxirides.jpg
excerpt: A brief procedure for the Google self-paced lab GSP327 on Qwiklabs. You will practice the skills and knowledge to build a prediction model of taxi fares using machine learning with BigQuery.
amp:
   youtube: true
css:
   syntax: true
---

In this article, we will go through the lab **GSP327** _[Engineer Data in Google Cloud: Challenge Lab](https://www.qwiklabs.com/focuses/12379?parent=catalog)_, which is labeled as an [expert-level](https://www.qwiklabs.com/quests/132) exercise. You will practice the skills and knowledge to build a prediction model of taxi fares using machine learning with BigQuery.

**The challenge contains 6 required tasks:**

1. [Clean your training data](#task-1-clean-your-training-data)
1. [Create a BQML model called taxirides.fare_model](#task-2-create-a-bqml-model-called-taxiridesfare_model)
1. [Perform a batch prediction on new data](#task-3-perform-a-batch-prediction-on-new-data)

## Task 1: Clean your training data

In this task, you need to make a copy of `historical_taxi_rides_raw` to `taxi_training_data` in the given `taxirides` dataset in BigQuery.

{% include picture.html img="qwiklabs/qwiklab-gsp327-task1-taxirides-dataset.png" width="287" height="157" class="text-center" %}

_**Hints**: Refer to the lab **GSP426** [Predict Taxi Fare with a BigQuery ML Forecasting Model](https://www.qwiklabs.com/focuses/1797?parent=catalog) on Qwiklabs_

Make sure that:

- target column is called `fare_amount`

Data Cleaning Tasks:

- Keep rows for `trip_distance` > 0
- Remove rows for `fare_amount` > 2.5
- Ensure that the latitudes and longitudes are reasonable for the use case. ??
- Create a new column called `total_amount` from tolls_amount + fare_amount
- Sample the dataset < 1,000,000 rows
- Only copy fields that will be used in your model

Procedures:

1. In the Cloud Console, navigate to **Menu** > **BigQuery**.
2. Click on **More** > **Query settings** under the Query Editor.

   {% include picture.html img="qwiklabs/qwiklab-gsp327-task1-more-query-settings.png" width="381" height="173" class="text-center" %}

{:start="3"}
3. Select **Set a destination table for query results** under Destination; Enter `taxi_training_data` as the Table name

   {% include picture.html img="qwiklabs/qwiklab-gsp327-task1-query-settings-details.png" width="492" height="492" class="text-center" %}

{:start="4"}
4. Click **Save**
5. Run the following SQL query

   ```sql
   Select
     pickup_datetime,
     pickup_longitude AS pickuplon,
     pickup_latitude AS pickuplat,
     dropoff_longitude AS dropofflon,
     dropoff_latitude AS dropofflat,
     passenger_count AS passengers,
     ( tolls_amount + fare_amount ) AS fare_amount
   FROM
     `taxirides.historical_taxi_rides_raw`
   WHERE
     trip_distance > 0
     AND fare_amount >= 2.5
     AND pickup_longitude > -75
     AND pickup_longitude < -73
     AND dropoff_longitude > -75
     AND dropoff_longitude < -73
     AND pickup_latitude > 40
     AND pickup_latitude < 42
     AND dropoff_latitude > 40
     AND dropoff_latitude < 42
     AND passenger_count > 0
     AND RAND() < 999999 / 1031673361
   ```

## Task 2: Create a BQML model called `taxirides.fare_model`

In this task, you need to:

- Create a model called `taxirides.fare_model`
- Train the model with an RMSE < 10

_**Hints**: Refer to the lab **GSP426** [Predict Taxi Fare with a BigQuery ML Forecasting Model](https://www.qwiklabs.com/focuses/1797?parent=catalog) on Qwiklabs_

#### Create a model

Compose a new query with the given `ST_distance()` and `ST_GeogPoint()` functions in the Query Editor.

Make sure that:
- set `fare_amount` as the label
- train with the data in `taxirides.taxi_training_data`

The SQL query to create the BQML model can be coded to be:

```sql
CREATE or REPLACE MODEL
  taxirides.fare_model OPTIONS (model_type='linear_reg',
    labels=['fare_amount']) AS
WITH
  taxitrips AS (
  SELECT
    *,
    ST_Distance(ST_GeogPoint(pickuplon, pickuplat), ST_GeogPoint(dropofflon, dropofflat)) AS euclidean
  FROM
    `taxirides.taxi_training_data` )
  SELECT
    *
  FROM
    taxitrips
```

Click **Run** and the machine learning process will take about 2 minutes.

#### Evaluate model performance

After the training completed, you can evaluate the **Root Mean Square Error** (**RMSE**) of the prediction model using the following query.

```sql
#standardSQL
SELECT
  SQRT(mean_squared_error) AS rmse
FROM
  ML.EVALUATE(MODEL taxirides.fare_model,
    (
    WITH
      taxitrips AS (
      SELECT
        *,
        ST_Distance(ST_GeogPoint(pickuplon, pickuplat), ST_GeogPoint(dropofflon, dropofflat)) AS euclidean
      FROM
        `taxirides.taxi_training_data` )
      SELECT
        *
      FROM
        taxitrips ))
```

**Results**

{% include picture.html img="qwiklabs/qwiklab-gsp327-task2-eval-rmse-without-euclidean.png" width="340" height="152" class="text-center" caption="RMSE of a modeal trained without euclidean" %}
{% include picture.html img="qwiklabs/qwiklab-gsp327-task2-eval-rmse-with-euclidean.png" width="339" height="131" class="text-center" caption="RMSE of a modeal trained with euclidean" %}

## Task 3: Perform a batch prediction on new data

In this task, you need to use the BQML model to predict the taxi fares of the data given in the `taxirides.report_prediction_data` table.

Make sure that:
- store your results in a table called `2015_fare_amount_predictions`.

Procedures:

1. Select **Set a destination table for query results** under Destination; Enter `2015_fare_amount_predictions` as the Table name

   {% include picture.html img="qwiklabs/qwiklab-gsp327-task3-query-settings-details.png" width="460" height="472" class="text-center" %}

{:start="2"}
2. Click **Save**
3. Run the following SQL query.

   ```sql
   #standardSQL
   SELECT
     *
   FROM
     ML.PREDICT(MODEL `taxirides.fare_model`,
       (
       WITH
         taxitrips AS (
         SELECT
           *,
           ST_Distance(ST_GeogPoint(pickuplon, pickuplat)   , ST_GeogPoint(dropofflon, dropofflat)) AS    euclidean
         FROM
           `taxirides.report_prediction_data` )
       SELECT
         *
       FROM
         taxitrips ))
   ```

At the end of the lab, your BigQuery dataset should contain the following tables.

{% include picture.html img="qwiklabs/qwiklab-gsp327-task3-resulted-tables.png" width="262" height="217" class="text-center" %}

<br/>

**Congratulations! You completed this challenge lab.**

## Demonstration Video

{% include youtube.html id="myYCfRS15fM" title="GSP327 Engineer Data in Google Cloud: Challenge Lab" %}

```conf
⏱Timestamps:
00:00 Start Lab
00:50 Task1: Clean your training data
11:28 Task2: Create a BQML model called `taxirides.fare_model`
19:24 Bouns - Improve model performance by training with ST_distance() and ST_GeogPoint() functions
23:06 Task3: Perform a batch prediction on new data
```

* * *

**Keep on reading**:

- [☁ Insights from Data with BigQuery: Challenge Lab (COVID-19 Open Data) \| logbook]({% post_url qwiklabs/logbooks/2020-08-16-Insights-from-Data-with-BigQuery-Challenge-Lab %})
- [☁ Explore Machine Learning Models with Explainable AI: Challenge Lab \| logbook]({% post_url qwiklabs/logbooks/2020-09-20-Explore-Machine-Learning-Models-with-Explainable-AI-Challenge-Lab %})
