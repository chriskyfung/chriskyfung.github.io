---
layout: post
title: "☁ Build and Manage APIs with Apigee: Challenge Lab | logbook"
date: 2020-09-13 14:25 +0800
category: Cloud
author: chris
tags: [Qwiklabs, Google Cloud, Logbook, Apigee]
permalink: /blog/qwiklabs/build-and-manage-apis-with-apigee-challenge-lab
redirect_from:
 - /blog/qwiklabs/Build-and-Manage-APIs-with-Apigee-Challenge-Lab
 - /blog/qwiklabs/GSP336
image:
   path: /images/posts/qwiklabs/qwiklab-gsp336-task3-apigee-live-portal.jpg
   width: 962
   height: 639
excerpt: A brief procedure for the Google self-paced lab GSP336 on Qwiklabs. You will practice the skills and knowledge in the Build and Manage APIs with Apigee.
amp:
   youtube: true
css:
   syntax: true
   custom: >
      table { width: 100%; max-width: 400px; margin-bottom: 1.5rem; }
      .ml-li { margin-left: 2rem }
---

In this article, we will go through the lab **GSP336** _[Build and Manage APIs with Apigee: Challenge Lab](https://www.qwiklabs.com/focuses/13360?parent=catalog)_, which is labeled as an [expert-level](https://www.qwiklabs.com/quests/137) exercise. You will practice the skills and knowledge in the Build and Manage APIs with Apigee.

**Topics tested:**

- Create an API Facade and add functionality
- Share the APIs with partners through a developer portal
- Route traffic to different backend implementations of the API

**The challenge contains 4 required tasks:**

{% include picture.html img="qwiklabs/qwiklab-gsp336-checkpoints.png" width="592"
height="277" class="text-center" %}

## Task 1 - Create API Specification and Generate an API Proxy

#### Define a RESTful API in Apigee using an API specification

1. Login to your Apigee account ([https://login.apigee.com/login](https://login.apigee.com/login))
2. In the Apigee console, select **Develop** > **API Proxies** from the left pane.
3. Click on the **+Proxy** button to create a new proxy.
4. Create a **Reverse proxy** by clicking "Use OpenAPI Spec" as shown in the picture below.

   {% include picture.html img="qwiklabs/qwiklab-gsp336-task1-create-apigee-proxy.png" width="1158" height="606" class="ml-li" %}

{:start="5"}
5. In the _Use OpenAPI Spec_ dialog, select **Import from URL** and enter the following values:

   - **OpenAPI Spec URL**: `https://storage.googleapis.com/apigee-quest/data/ourbank-verification-v1.yaml`
   - **Spec name**: _e.g._ `ourbank-verification-v1`

   {% include picture.html img="qwiklabs/qwiklab-gsp336-task1-use-openapi-spec-import-from-url-yaml-file.png" width="1158" height="605" class="ml-li" %}

{:start="6"}
6. Click **Import**.
7. Find the "View JSON response" endpoint URL of Mock Target API from [this Apigee Doc page](https://docs.apigee.com/api-platform/samples/mock-target-api), which is:

   ```url
   https://mocktarget.apigee.net/json
   ```

8. Copy the URL to the field **Target (Existing API)**, then click **Next**.

   {% include picture.html img="qwiklabs/qwiklab-gsp336-task1-apigee-create-proxy-with-mock-target-api.png" width="1158" height="745" class="ml-li" %}

{:start="9"}
9. Check **Add CORS header** to enable CORS headers in Apigee, then click **Next**.

   {% include picture.html img="qwiklabs/qwiklab-gsp336-task1-apigee-create-proxy-with-CORS-header.png" width="927" height="453" class="ml-li" %}

{:start="10"}
10. Click **Next** to continue.

   {% include picture.html img="qwiklabs/qwiklab-gsp336-task1-apigee-create-proxy-condition-flows.png" width="924" height="348" class="ml-li" %}

{:start="11"}
11. Check the box next to **default**, then click **Next**.

   {% include picture.html img="qwiklabs/qwiklab-gsp336-task1-apigee-create-proxy-virtual-hosts.png" width="913" height="367" class="ml-li" %}

{:start="12"}
12. Check the box next to **default**, then click **Create and deploy**.

   {% include picture.html img="qwiklabs/qwiklab-gsp336-task1-create-apigee-proxy-summary.png" width="889" height="419" class="ml-li" %}

Apigee now deploys the API proxy into your test environment. Click **Edit proxy** to view the deployed proxy.

#### Provision a Mock Response in Apigee

1. On the page of **API Proxies** > **Verification-API-v1**, click the **Develop** tab in the top right.
2. To add a policy to your proxy, click on **Proxy Endpoints** → **PreFlow** in the Navigator tab, then in the Response pipeline, click **+ Step** to add a step.

   {% include picture.html img="qwiklabs/qwiklab-gsp336-task1-apigee-proxy-develop-init.png" width="1920" height="1080" class="ml-li" %}

{:start="3"}
3. Select **Assign Message** from the left menu, then click **Add**.

   {% include picture.html img="qwiklabs/qwiklab-gsp336-task1-apigee-proxy-add-assign-message.png" width="763" height="546" class="ml-li" %}

{:start="4"}
4. Modify Policy Assign Message-1:

   - Replace the **Set** element in the policy with the below.

      ```xml
      <Set>
         <Payload contentType="application/json">
            {"valid":true,"message":"mock response"}
         </Payload>
      </Set>
      ```

After the above procedure, the **Proxy Endpoints** → **PreFlow** should look like the picture below.

{% include picture.html img="qwiklabs/qwiklab-gsp336-task1-apigee-proxy-update-assign-message-policy.png" width="630" height="535" class="ml-li text-center" %}

#### Testing

The deployment can be tested using the following curl statement in the Cloud Shell:

```bash
export APIGEE_ORG=<YOUR_APIGEE_ORG_NAME>

curl -X POST \
  https://${APIGEE_ORG}-test.apigee.net/verification-api-v1/verifyCard \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 89236919-eabe-4357-e4c4-079f20ecd798' \
  -d '{
    "number": "2221005276762844",
    "cvv": "345",
    "expiration": "10/2025"
  } '
```

**Replace** `<YOUR_APIGEE_ORG_NAME>` with your Apigee organization name.

#### Upload API Proxy bundle to GCS

1. Go back to Apigee, click on **Project** > **Download Revision** at the top-right of the Deploy tab.

   {% include picture.html img="qwiklabs/qwiklab-gsp336-task1-apigee-proxy-download-revision.png" width="394" height="358" class="ml-li text-center" %}

{:start="2"}
2. Extract the downloaded zip file to your local storage.
3. In the Cloud Console, click on **Navigation Menu** > **Storage**.
4. Create a new bucket.
5. Upload the `apiproxy` folder to the bucket.

## Task 2 - Add Policies to the API Proxy

#### Create a service account with permissions to write logs

1. In the Cloud Console, click on **Navigation Menu** > **IAM & admin** > **Service accounts**.
2. Click **Create Service Account**, then enter the following:

   - Service account name: `apigee-stackdriver`
   - Service account description: `Service account for Apigee Stackdriver integration`

3. Click **Create** to continue.
4. Click into **Select a Role** field and choose **Logging** > **Logs Writer** permission. Click **Continue** then click **Done**.
5. After creating service account 'apigee-stackdriver', click on three dots at the right corner and click **Create Key** in the dropdown, then **Create** to download your JSON output.

#### Create an extension and deploy it to test the environment using this service account

1. Go back to Apigee, navigate to **Admin** > **Extensions** from the left navigation menu, then **+ Add Extension** to create a new extension.
2. On the new Extension Properties page, click on the **Google Stackdriver Logging** extension.
3. Enter a name (e.g. `stackdriver-logging-extension`) and an optional description for the Extension instance, then click **Create**.
4. On the Extension detail page, click the arrow (>) for the test environment to configure the instance for the Apigee environment.
5. In the configuration dialog. enter the following information:

   - Select the latest extension version from the Version dropdown list.
   - Add your GCP Project ID (which you can get from the Home Console).
   - Open the downloaded JSON file and copy/paste the contents into the Credential field in the Apigee UI.

6. Click **Save**.
7. Once the configuration is saved, click on the **Deploy** button for the Test environment.

   {% include picture.html img="qwiklabs/qwiklab-gsp336-task2-create-apigee-stackdriver-logging-extension.png" width="1158" height="650" class="ml-li" %}

#### Create an Extension policy in the PostFlow response path

1. In Apigee, navigate to **Develop** > **API Proxies** from the left menu.
2. Click to open **Verification-API-v1** from the proxy list.
3. Click the **Develop** tab in the top right.
4. To add a policy to your proxy, click on **Proxy Endpoints** → **PostFlow** in the Navigator tab, then in the *Response* pipeline, click **+ Step** to add a step.

   {% include picture.html img="qwiklabs/qwiklab-gsp336-task2-apigee-proxy-add-policy-to-postflow-response-pipeline.png" width="717" height="464" class="ml-li" %}

{:start="5"}
5. In the left menu scroll down to the end, then select **Extension Callout**. Select your extension name from the **Extension** dropdown menu. Select **Log** from the Actions dropdown. Click **Add**.

   {% include picture.html img="qwiklabs/qwiklab-gsp336-task2-apigee-proxy-add-extension-callout-for-stackdriver-logging.png" width="766" height="549" class="ml-li" %}

{:start="6"}
6. Modify Policy Extension Callout-1:

   - Replace the **Input** element in the policy with the below (make sure indentation is correct)
   - Replace `PROJECT_ID_HERE` with GCP Project ID for this lab.

      ```xml
      <Input><![CDATA[
         {  "logName": "example-log",
            "resource": {
                "type": "global",
                "labels": {
                    "project_id": "PROJECT_ID_HERE"
                }
            },
             "message": {"Action":"{request.verb}","ClientIP": "{client.ip}", "developerApp": "{developer.app.name}", "apiKeyParam":"{request.queryparam.apikey}","responsePayload": {response.content}}
        }
      ]]></Input>
      ```

After the above procedure, the **Proxy Endpoints** → **PostFlow** should look like the picture below.

{% include picture.html img="qwiklabs/qwiklab-gsp336-task2-apigee-proxy-update-extension-callout-policy.png" width="772" height="625" class="ml-li" %}

#### Add API Key verification

1. To add a policy to your proxy, click on **Proxy Endpoints** → **PreFlow** in the Navigator tab, then in the *Response* pipeline, click **+ Step** to add a step.

   {% include picture.html img="qwiklabs/qwiklab-gsp336-task2-apigee-proxy-add-api-key-verification-policy-to-preflow-request-pipeline.png" width="859" height="428" class="ml-li" %}

{:start="2"}
2. Select **Verify API Key** from the left menu, then click **Add**.

   {% include picture.html img="qwiklabs/qwiklab-gsp336-task2-apigee-proxy-add-api-key-verification-policy.png" width="754" height="536" class="ml-li" %}

After the above procedure, the **Proxy Endpoints** → **PreFlow** should look like the picture below.

{% include picture.html img="qwiklabs/qwiklab-gsp336-task2-apigee-proxy-preflow-with-api-key-verification-policy.png" width="866" height="449" class="ml-li" %}

#### Create an API Product and an App

1. In Apigee, navigate to **Publish** > **API Products** from the left menu. Then Click **+ API Product**.
2. Create a new API product with the following details:

   - **Name**: _e.g._ `ourBank API`
   - **Display Name**: _e.g._ `ourBank API`
   - **Environment**: Check **test**
   - **Access**: Select **Public** from the dropdown menu
   - In the API resources section, **API proxies** list, click **Add a proxy** and select the **Verification-API-v1** API proxy. Click **Add(1)**.

   The settings should look as follows:

   {% include picture.html img="qwiklabs/qwiklab-gsp336-task3-create-apigee-api-product.png" width="1152" height="899" class="ml-li" %}

{:start="3"}
3. Click **Save** to create the new API product.
4. Navigate to **Publish** > **Apps** from the left menu. Then Click **+ App**.
5. Enter the following:

   - **Name**: _e.g._ `ourBank App`
   - **Display Name**: _e.g._ `ourBank App`
   - **Company / Developer**: Developer
   - **Developer**: Use the helloworld@apigee.com developer account (which has been pre-populated for the Apigee trial environment).

6. Within the Credentials section, click the **Add product** button.
7. Select **ourBank API** from the list and click **Add (1)**.
8. Review that the configuration looks as below, and click **Create**.

   {% include picture.html img="qwiklabs/qwiklab-gsp336-task3-create-apigee-app.png" width="1152" height="899" class="ml-li" %}

{:start="9"}
9. Once the app is created, the page displays details about the app credentials. Click **Show** on the Key row then copy the API key.

#### Testing

Replace `<APP_API_KEY>` with the key from the app credentials. Then, run the following curl statement in the Cloud Shell:

```bash
export APIKEY=<APP_API_KEY>

curl -X POST \
  https://${APIEE_ORG}-test.apigee.net/verification-api-v1/verifyCard?apikey=${APIKEY} \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 89236919-eabe-4357-e4c4-079f20ecd798' \
  -d '{
    "number": "2221005276762844",
    "cvv": "345",
    "expiration": "10/2025"
  } '
```

Successful response message:

```json
{"valid":true,"message":"mock response"}
```

Error response message:

```json
{"fault":{"faultstring":"Invalid ApiKey","detail":{"errorcode":"oauth.v2.InvalidApiKey"}}}
```

## Task 3 - Create a Developer Portal for consuming the APIs

1. In Apigee, navigate to **Publish** > **Portals** from the left menu. Then Click **+ Portal**.
2. Enter a name, _e.g._ `ourBank Develop`

   {% include picture.html img="qwiklabs/qwiklab-gsp336-task3-apigee-create-portal.png" width="618" height="390" class="ml-li text-center" %}

{:start="3"}
3. Select **APIs** from the dropdown menu at the top.
4. In the "Publish an API product" page, click on **Get started**.
5. Select the API Product (_ourBank API_) and click **Next**.

   {% include picture.html img="qwiklabs/qwiklab-gsp336-task3-apigee-add-api-product-to-portal.png" width="812" height="381" class="ml-li" %}

{:start="6"}
6. Click **Next** > **Next** > **Finish**.
7. Click **Live Portal** at the top-right corner to test the new developer portal.

{% include picture.html img="qwiklabs/qwiklab-gsp336-task3-apigee-live-portal.jpg" width="962" height="639" class="ml-li" %}

## Task 4 - Route traffic from mock response to real backend

#### Deploy the real backend on Cloud Function

Go to the Cloud Shell, run the commands given in the lab.

   ```bash
   # Make subdirectories for the code
   mkdir bank-verification-service; cd bank-verification-service

   # Download the code
   wget https://storage.googleapis.com/apigee-quest/code/index.js
   wget https://storage.googleapis.com/apigee-quest/code/package.json

   # Deploy card verification function
   gcloud functions deploy verifyCard --runtime nodejs10 --trigger-http --allow-unauthenticated

   # Deploy address verification function
   gcloud functions deploy verifyAddress --runtime nodejs10 --trigger-http --allow-unauthenticated
   ```

#### Route traffic to these backends based on the incoming requests

1. Go back to Apigee, navigate to **API Proxies** > **Verification-API-v1**, click the **Develop** tab in the top right.
2. To rename the mock API endpoint, click on **Target Endpoints** → **default** in the Navigator tab. Replace `<TargetEndpoint name="default">` to `<TargetEndpoint name="mock">`.

   {% include picture.html img="qwiklabs/qwiklab-gsp336-task4-apigee-rename-mock-target-endpoint.png" width="477" height="261" class="ml-li text-center" %}

{:start="3"}
3. To add a new target endpoint, click on the plus sign (**+**) next to **Target Endpoints** in the Navigator tab.

   {% include picture.html img="qwiklabs/qwiklab-gsp336-task4-apigee-add-new-target-endpoint.png" width="281" height="119" class="ml-li text-center" %}

{:start="4"}
4. Enter the following:

   - **Target Endpoint Name**: _e.g._ `cloud`
   - **HTTP Target**: _The Cloud Function Endpoint_ (_e.g._ `https://<REGION>-<PROJECT-ID>.cloudfunctions.net`)

   {% include picture.html img="qwiklabs/qwiklab-gsp336-task4-apigee-add-new-target-endpoint-cloud.png" width="698" height="457" class="ml-li text-center" %}

{:start="5"}
5. Click on **Proxy Endpoints** → **default** in the Navigator tab. Remove the **Assign Message-1** from the Response pipeline.
6. Click on **Target Endpoints** → **mock** → **PreFlow** in the Navigator tab. Remove the **Assign Message-1** from the Response pipeline. Drag the **Assign Message-1** from **Policies** in the Navigator tab to the Response pipeline.

   {% include picture.html img="qwiklabs/qwiklab-gsp336-task4-apigee-mock-target-endpoint-preflow.png" width="865" height="482" class="ml-li" %}

{:start="7"}
7. Click on **Target Endpoints** → **cloud** → **PreFlow** in the Navigator tab. Drag the **Add CORS** from **Policies** in the Navigator tab to the Response pipeline.
8. Click on **Proxy Endpoints** → **default** → **PreFlow** in the Navigator tab. Replace the **RouteRule** tag with the following code,

   ```xml
   <RouteRule name="mock">
      <Condition>request.queryparam.mock = "true"</Condition>
      <TargetEndpoint>mock</TargetEndpoint>
   </RouteRule>
   <RouteRule name="default">
      <TargetEndpoint>cloud</TargetEndpoint>
   </RouteRule>
   ```

   {% include picture.html img="qwiklabs/qwiklab-gsp336-task4-apigee-proxy-endpoint-preflow-routerules.png" width="474" height="153" class="ml-li text-center" %}

{:start="9"}
9. Click **Save**.

#### Testing

Test the real backend routing using the `curl` statement below.

```bash
curl -X POST \
   https://${APIEE_ORG}-test.apigee.net/verification-api-v1/verifyCard?apikey=${APIKEY} \
   -H 'cache-control: no-cache' \
   -H 'content-type: application/json' \
   -H 'postman-token: 89236919-eabe-4357-e4c4-079f20ecd798' \
   -d '{
      "number": "2221005276762844",
      "cvv": "345",
      "expiration": "10/2025"
   } '
```

Expected output:

```json
{"valid":true,"message":"credit card is valid"}
```

Test the mock response routing using the `curl` statement below.

```bash
curl -X POST \
   'https://${APIEE_ORG}-test.apigee.net/verification-api-v1/verifyCard?mock=true&apikey=${APIKEY}' \
   -H 'cache-control: no-cache' \
   -H 'content-type: application/json' \
   -H 'postman-token: 89236919-eabe-4357-e4c4-079f20ecd798' \
   -d '{
      "number": "2221005276762844",
      "cvv": "345",
      "expiration": "10/2025"
   } '
```

Expected output:

```json
{"valid":true,"message":"mock response"}
```

<br>

**Congratulations! You completed this challenge lab.**

## Demonstration Video

{% include youtube.html id="Hcs40i_2o0E" title="GSP336 Build and Manage APIs with Apigee: Challenge Lab" %}

```conf
⏱Timestamps:
00:00 Start Lab
--- Task 1 ---
00:40 Define a RESTful API in Apigee using an API specification
02:35 Provision a Mock Response in Apigee (Add Assign Message Policy)
03:06 Test the deployment for Task 1
03:58 Upload API Proxy bundle to GCS
--- Task 2 ---
05:11 Create a service account with permissions to write logs
06:28 Create a Google StackdriverLogging extension
07:54 Create an Extension policy in the PostFlow response path
09:27 Add API Key verification
10:03 Create an API Product and An App
11:12 Test the deployment for Task 2
--- Task 3 ---
13:11 Create a Developer Portal for consuming the APIs
--- Task 4 ---
14:30 Deploy the real backend on Cloud Function
15:50 Route traffic from mock response to real backend
18:31 Test the deployment for Task 4
```
