---
layout: post
title: "☁ Controlling Your Costs [Quiz] | logbook"
date: 2019-11-26 11:56
author: chris
categories: [Cloud]
tags: [Qwiklabs, Google Cloud, Logbook]
permalink: /blog/qwiklabs/controlling-your-costs-quiz
redirect_from:
 - /blog/2019/12/29/Controlling-Your-Costs-Quiz
 - /blog/qwiklabs/Controlling-Your-Costs-Quiz
---

This post records the correct answers for the Qwiklabs quiz ["Knowledge Check: Controlling Your Costs search"](https://www.qwiklabs.com/quizzes/183), which is a part of the quest [_"Optimizing Your GCP Costs"_](https://www.qwiklabs.com/quests/97).

_Last update: 2020-04-29_

<!--more-->

<br>

> Q: Which of the following best describes the ideal use cases for setting up a budget?
>
> <i class="far fa-check-circle" style="color:green"></i> To receive an email alert notification for when your costs hit, or are forecasted to hit, a specified amount.
>
> <i class="far fa-check-circle" style="color:green"></i> To monitor resource consumption at specific intervals before the end of the billing cycle (e.g., at 25%, 50%, etc.)

<br>

> Q: A budget can only be set for _______________ and configured to cover the scope of _____________ and/or ________________.
>
> <i class="far fa-check-circle" style="color:green"></i> A single billing account, projects, products

<br>

> Q: What is meant by the scope of a budget?
>
> <i class="far fa-check-circle" style="color:green"></i> Refers to the combination of GCP projects and products that the budget covers.

<br>

> Q: Which of the following is not a usage-based credit type that you can filter your billing data by?
>
> <i class="far fa-check-circle" style="color:green"></i> Tax reductions issued by Google Cloud for using cloud resources.

<br>

> Q: When should you set up quotas?
>
> <i class="far fa-check-circle" style="color:green"></i> When you want to set a limit on the number of concurrent resources in a project or the number of API requests.

<br>

> Q: Suppose one of your engineers spun up an expensive compute instance in a Test environment and left it running overnight. You receive an alert notification the next day with a significant spike in your costs. Which of the following could you implement using cost management tools to help prevent this from happening in the future?
>
> <i class="far fa-check-circle" style="color:green"></i> Set up a quota limit to cap service usage when developing and testing applications.
>
> <i class="far fa-check-circle" style="color:green"></i> Set up a programmatic budget notification to disable billing for the project specific to the test environment to stop usage when exceeding the budget threshold.
>
> <i class="far fa-times-circle" style="color:red"></i> Disable that individual’s access to all GCP resources until the next billing cycle.
>
> <i class="far fa-times-circle" style="color:red"></i> Use the shared responsibility model to encourage project owners to make cost-effective decisions when consuming GCP resources.
>
> <i class="far fa-times-circle" style="color:red"></i> Change the quota limit for that resource type to unlimited.

<br>

> Q: You run a query for the fifth time in BigQuery, and you receive the following error message - 'Custom quota exceeded: Your usage exceeded the custom quota for QueryUsagePerUserPerDay, which is set by your administrator.' What does this message mean?
>
> <i class="far fa-check-circle" style="color:green"></i> You’ve exceeded the limit on the amount of queries that you can run for the day.
>
> <i class="far fa-check-circle" style="color:green"></i> The limit will be reset the following day.
>
> <i class="far fa-check-circle" style="color:green"></i> Only your project administrator can adjust the quota limit.
>
> <i class="far fa-times-circle" style="color:red"></i> Your access to BigQuery has been revoked indefinitely.

* * *

**Related post:**

- _[Learning Google Cloud Platform on Qwiklabs: Learning Map, Assistive Tool and Tips]({% post_url qwiklabs/2019-11-25-Qwiklabs-User-Tips-for-Learning_Google_Cloud_Platform %})_
