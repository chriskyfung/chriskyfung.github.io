---
layout: post
title: "☁ Explore Machine Learning Models with Explainable AI: Challenge Lab | logbook"
date: 2020-09-28 1:25 +0800
last_modified_at: 2020-10-29 16:20 +0800
categories: [Cloud]
author: chris
tags: [Qwiklabs, Google Cloud, Logbook, TensorFlow, Data Science, Machine Learning]
permalink: /blog/qwiklabs/Explore-Machine-Learning-Models-with-Explainable-AI-Challenge-Lab
redirect_from:
   - /blog/qwiklabs/GSP324
   - /blog/qwiklabs/gsp324
image:
   path: /images/posts/tenserflow-notebook.png
excerpt: A brief procedure for the Google Cloud self-paced training GSP324 on Qwiklabs. You will practice the skills and knowledge in using Cloud AI Platform to build, train and deploy TensorFlow models.
amp:
   youtube: true
css:
   syntax: true
   custom: >
      .ml-li { margin-left: auto }
      .callout { background-color:gold; font-size: smaller; padding: 10px; }
---

In this article, we will go through the lab **GSP324** _[Explore Machine Learning Models with Explainable AI: Challenge Lab](https://www.qwiklabs.com/focuses/12011?parent=catalog)_, which is an [advanced-level](https://www.qwiklabs.com/quests/126) exercise on Qwiklabs. TensorFlow is the dominant AI framework in the industry. You will practice the skills and knowledge in using Cloud AI Platform to build, train and deploy TensorFlow models for machine learning the dataset of the Home Mortgage Disclosure Act (HMDA) in New York.

**Topics tested**:

1. Launching an AI Platform Notebook
1. Downloading and exploring a sample dataset
1. Building and training two different TensorFlow models
1. Deploying models to the Cloud AI Platform
1. Using the What-If Tool to compare the models

## Start a JupyterLab Notebook instance

1. In the Cloud Console, in the search bar, type in **Notebook**.
2. Select **Notebook** for **AI Platform**.
3. On the Notebook instances page, click **New Instance**.
4. In the Customize instance menu, select the latest version of TensorFlow _without_ GPUs.

   {% include picture.html img="qwiklabs/qwiklab-gsp324-task1-new-tensorflow-notebook-1.png" width="1138" height="660" %}

5. In the **New notebook instance** dialog, accept the default options and click **Create**.

   {% include picture.html img="qwiklabs/qwiklab-gsp324-task1-new-tensorflow-notebook-2.png" width="559" height="506" class="text-center" %}

6. After a few minutes, the AI Platform console will display your instance name, followed by Open Jupyterlab.<br><br>Click **Open JupyterLab**. Your notebook is now set up.

## Download the Challenge Notebook

1. In your notebook, click the **terminal**.

   {% include picture.html img="qwiklabs/qwiklab-gsp324-task2-import-dataset-to-jupyter-notebook-1.png" width="985" height="668" %}

2. Clone the repo:

   ```bash
   git clone https://github.com/GoogleCloudPlatform/training-data-analyst
   ```

3. Go to the enclosing folder: `training-data-analyst/quests/dei`
4. Open the notebook file [`what-if-tool-challenge.ipynb`](https://github.com/GoogleCloudPlatform/training-data-analyst/blob/master/quests/dei/what-if-tool-challenge.ipynb).

   {% include picture.html img="qwiklabs/qwiklab-gsp324-task2-import-dataset-to-jupyter-notebook-2.png" width="973" height="690" %}

5. Download and import the dataset `hmda_2017_ny_all-records_labels` by running the first to the eighth cells (the **Get the Train & Test Data** section).

## Build and train your models

1. In the second cell of the **Train your first model on the complete dataset** section, add the following lines to create the model.

   ```python
   model = Sequential()
   model.add(layers.Dense(8, input_dim=input_size))
   model.add(layers.Dense(1, activation='sigmoid'))
   model.compile(optimizer='sgd', loss='mse')
   model.fit(train_data, train_labels, batch_size=32, epochs=10)
   ```

   {% include picture.html img="qwiklabs/qwiklab-gsp324-task3-build-and-train-models-1.jpg" width="1100" height="668" %}

2. Copy the code for training the second model. Modify `model` to `limited_model` as well as `train_data, train_labels` to `limited_train_data, limited_train_labels`. The code for the second model should look like the following.

   ```python
   limited_model = Sequential()
   limited_model.add(layers.Dense(8, input_dim=input_size))
   limited_model.add(layers.Dense(1, activation='sigmoid'))
   limited_model.compile(optimizer='sgd', loss='mse')
   limited_model.fit(limited_train_data, limited_train_labels, batch_size=32, epochs=10)
   ```

   {% include picture.html img="qwiklabs/qwiklab-gsp324-task3-build-and-train-models-2.png" width="964" height="584" %}

3. Run the cells in this section and wait for the finish of model training.

## Deploy the models to AI Platform

Moving on to the **Deploy your models to the AI Platform** section in the notebook.

1. Replace the values of `GCP_PROJECT` and `MODEL_BUCKET` with your project ID and a unique bucket name.
2. Change the `REGION` to `us-west1` (Use the same region of the Notebook instance).

   {% include picture.html img="qwiklabs/qwiklab-gsp324-task4-deploy-models-to-ai-platform-1.jpg" width="865" height="508" %}

3. Run those three cells and then confirm the created bucket and the uploaded model files in Cloud Storage.

   {% include picture.html img="qwiklabs/qwiklab-gsp324-task3-build-and-train-models-3.jpg" width="510" height="166" class="text-center" %}

   ### Create your first AI Platform model: complete_model

   {% include picture.html img="qwiklabs/qwiklab-gsp324-task4-deploy-models-to-ai-platform-3.png" width="678" height="251" class="text-center" caption="The specification for creating AI Platform models listed in the notebook" %}

4. Add the following codes to the notebook cells for your COMPLETE model.

   ```python
   !gcloud ai-platform models create $MODEL_NAME --regions $REGION
   ```

   ```python
   !gcloud ai-platform versions create $VERSION_NAME \
   --model=$MODEL_NAME \
   --framework='TensorFlow' \
   --runtime-version=2.1 \
   --origin=$MODEL_BUCKET/saved_model/my_model \
   --staging-bucket=$MODEL_BUCKET \
   --python-version=3.7 \
   --project=$GCP_PROJECT
   ```

   {:.callout}
   **Remark**: The gcloud ai-platform command group should be `versions` rather than `version`.

   {% include picture.html img="qwiklabs/qwiklab-gsp324-task4-deploy-models-to-ai-platform-1st-model-v2.1.jpg" width="715" height="390" class="text-center" caption="Create your first AI Platform model: complete_model<br>(With params --runtime-version=2.1, --python-version=3.7)" %}

   ### Create your second AI Platform model: limited_model

5. Add the following codes to the notebook cells for your LIMITED model.

   ```python
   !gcloud ai-platform models create $LIM_MODEL_NAME --regions $REGION
   ```

   ```python
   !gcloud ai-platform versions create $VERSION_NAME \
   --model=$LIM_MODEL_NAME \
   --framework='TensorFlow' \
   --runtime-version=2.1 \
   --origin=$MODEL_BUCKET/saved_limited_model/my_limited_model \
   --staging-bucket=$MODEL_BUCKET \
   --python-version=3.7 \
   --project=$GCP_PROJECT
   ```

   {:.callout}
   **Remark**: The gcloud ai-platform command group should be `versions` rather than `version`.

   {% include picture.html img="qwiklabs/qwiklab-gsp324-task4-deploy-models-to-ai-platform-2nd-model-v2.1.png" width="712" height="388" class="text-center" caption="Create your second AI Platform model: limited_model<br>(With params --runtime-version=2.1, --python-version=3.7)" %}

### Troubleshooting runtime version issue

The lab had a serious bug when I was carrying it out on Jun 12, 2020. I couldn't pass the third checkpoint if set up the AI Platform models according to the lab instruction. The issue seems to be caused by the inconsistencies between the GCP training material and the Qwiklabs marking scheme. While the notebook guided to create the models with runtime version 2.1 and Python 3.7, the checkpoint message specified the required runtime version = 1.14 as shown in the below picture.

{% include picture.html img="qwiklabs/qwiklab-gsp324-task4-deploy-models-to-ai-platform-error.png" width="452" height="208" class="text-center" caption="Checkpoint requirement for creating your AI Platform models" %}

Unfortunately, it still doesn't work if you just change the runtime version from 2.1 to 1.14. The runtime version 1.14 must be coupled with Python 3.5, according to the [AI Platform Documentation]( https://cloud.google.com/ai-platform/prediction/docs/runtime-version-list#runtime-version-support). Thus, after replacing the runtime and Python version numbers, correspondingly, the codes for creating the AI Platform models should be modified as shown below.

{% include picture.html img="qwiklabs/qwiklab-gsp324-task4-deploy-models-to-ai-platform-1st-model-v1.14.png" width="675" height="389" class="text-center" caption="Create your first AI Platform model: complete_model<br>(Fixed with --runtime-version=1.14, --python-version=3.5)" %}

{% include picture.html img="qwiklabs/qwiklab-gsp324-task4-deploy-models-to-ai-platform-2nd-model-v1.14.png" width="675" height="389" class="text-center" caption="Create your second AI Platform model: limited_model<br> (Fixed with --runtime-version=1.14, --python-version=3.5)" %}

## Use the What-If Tool to explore biases

Run the last cell in the notebook to activate What-If Tool. Explore the differences between the two models and you should be able to get the answers as follows:

> 1\. In the Performance and Fairness tab, slice by sex (applicant_sex_name_Female). How does the complete model compare to the limited model for females?

{% include picture.html img="qwiklabs/qwiklab-gsp324-task5-what-if-ttol-1.png" width="399" height="79" class="ml-li" alt="The complete model has equal performance across sexes, whereas the limited model is much worse on females" %}

> 2\. Click on one of the datapoints in the middle of the arc. In the datapoint editor, change (applicant_sex_name_Female) to 0, and (applicant_sex_name_Male) to 1. Now run the inference again. How does the model change?

{% include picture.html img="qwiklabs/qwiklab-gsp324-task5-what-if-ttol-2.png" width="397" height="85" class="ml-li" alt="The limited model has a significantly larger delta than the complete model, whereas the complete model has almost no change" %}

> 3\. In the Performance and Fairness tab, use the fairness buttons to see the thresholds for the sexes for demographic parity between males and females. How does this change the thresholds for the limited model?

{% include picture.html img="qwiklabs/qwiklab-gsp324-task5-what-if-ttol-3.png" width="397" height="56" class="ml-li" alt="The thresholds have to be wildly different for the limited model" %}

<br>

**Congratulations! You completed this challenge lab.**

## <i class="far fa-play-circle"></i> Demonstration Video

{% include youtube.html id="UzP2pX1qayA" title="GSP324 Explore Machine Learning Models with Explainable AI: Challenge Lab" %}

```conf
⏱Timestamps:
00:00 Start Lab
00:35 Start a JupyterLab Notebook instance
03:43 Download the Challenge Notebook
05:38 Build and train your models
21:40 Deploy the models to AI Platform (❌ runtime version = 2.1, Python 3.7 )
37:09 Use the What-If Tool to explore biases
47:18 Deploy the models to AI Platform (✔️Troubleshooting runtime version issue)
```

**Keep on reading**:

- [☁ Engineer Data in Google Cloud: Challenge Lab \| logbook]({% post_url qwiklabs/logbooks/2020-08-26-Engineer-Data-in-Google-Cloud-Challenge-Lab %})

**Useful links**:

- [what-if-tool-challenge.ipynb at mGoogleCloudPlatform/training-data-analyst](https://github.com/GoogleCloudPlatform/training-data-analyst/blob/master/quests/dei/what-if-tool-challenge.ipynb)
- [tf.keras.Sequential - TensorFlow Core v2](https://www.tensorflow.org/api_docs/python/tf/keras/Sequential)
- [tf.keras.layers.Dense - TensorFlow Core v2](https://www.tensorflow.org/api_docs/python/tf/keras/layers/Dense)
- [gcloud ai-platform - Google Cloud SDK Documentation](https://cloud.google.com/sdk/gcloud/reference/ai-platform)
- [What-If Tool](https://pair-code.github.io/what-if-tool/)
