---
layout: post
title: "Expand shorten URLs in MATLAB"
author: chris
date: 2020-05-15
category: Academic
tags: [MATLAB, Twitter, Data-Science]
permalink: /blog/matlab/expand-twitter-short-url
image:
    hide: true
css:
    syntax: true
---

Sometimes I use MATLAB scripts to analyze Twitter posts. One issue is that Twitter uses shorten URLs started with `t.co` for the links, such as retweets. To get the original URL, we need to determine the final redirected endpoint by using an URL expander.

<!--more-->

## Method

### The API for getting expanded or redirected URL

The shorten URLs can be restored by using an online URL expander, called [expandurl™ API](http://expandurl.com/api.php). The REST endpoint URL is

```bash
http://expandurl.com/api/v1/
```

The query string to get the JSON response looks like:

```bash
?url={TARGET_URL}&format=json&detailed=true
```

A GET request should in the form of:

```bash
http://expandurl.com/api/v1/?url={TARGET_URL}&format=json&detailed=true
```

where `{TARGET_URL}` is the URL to be expanded.

It will return a response in the JSON format look like:

```json
{
    "url":"{TARGET_URL}",
    "http_code":200,
    "redirect_count":0,
    "total_time":32.04,
    "redirect_time":0,
    "rel_meta_refresh":[{
        "url":"{REDIRECTED_URL}","time":"0"
       }],
    "original_url":"{TARGET_URL}","error_msg":"",
    "rel_canonical":false,"rel_shortlink":false,"advanced_redirect":false
}
```

The `{REDIRECTED_URL}` will be the URL of the final destination, which is what we interest to. To extract it, we can use Regular Expressions or a JSON parser to read data from the JSON response.

### Sending GET request to the REST API

In MATLAB, we can use [`urlread`](https://www.mathworks.com/help/matlab/ref/urlread.html) to download URL content. You can also use [`webread`](https://www.mathworks.com/help/matlab/ref/webread.html) to read content from RESTful web service if you use MATLAB 2014b or above. To send a request to the expandurl™ API, we can write a script like that:

```matlab
targetTweetUrl = 'https://t.co/<ShortenTweetID>';

apiEndpoint = 'http://expandurl.com/api/v1/';
query = '?url={TARGET_URL}&format=json&detailed=true';

fullUrl = [apiEndpoint replace(query, '{TARGET_URL}', targetTweetUrl)];

response = urlread(fullURL);
```

### Receiving data from the API response

For MATLAB/Octave, you can download [JSONlab: a toolbox to encode/decode JSON files](https://www.mathworks.com/matlabcentral/fileexchange/33381-jsonlab-a-toolbox-to-encode-decode-json-files) by [Qianqian Fang](https://www.mathworks.com/matlabcentral/profile/authors/1583198-qianqian-fang) from the **File Exchange** in **MATLAB Central**. The function to convert a JSON String to a MATLAB Struct is called `loadjson`. We can run the following script to get the expanded URL,

```matlab
json = loadjson(response);
redirectUrl = json.rel_meta_refresh.url;
```

_**Note**: You have to sign up a free MathWorks Account if you don't have one_.

Alternatively, you can extract the required parts by string trimming, the code is shown below.

```matlab
substr = strsplit(resonse, { '"url":"', ',"time":' });
redirectUrl = substr{2};
```

* * *

**Keep on reading**:

- [Working MATLAB with MS Excel](/blog/matlab/Working-MATLAB-with-MS-Excel)

- [Matrix Conversion between MATLAB and Microsoft Equation Editor](/blog/matlab/Convert-MATLAB-Matrix-to-MS-Office-Equation)