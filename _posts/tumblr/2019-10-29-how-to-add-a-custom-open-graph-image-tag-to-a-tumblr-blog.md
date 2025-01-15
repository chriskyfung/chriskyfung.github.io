---
layout: post
title: How to add a custom Open Graph image tag to your tumblr blog
date: 2019-10-30 00:00
categories:
    - Web Development
author: chris
tags:
    - Tumblr
    - Custom Theme
    - Open Graph
    - Meta Tags
permalink: /blog/tumblr-tricks/how-to-add-a-custom-open-graph-image-tag-to-a-tumblr-blog/
redirect_from:
    - /blog/2019/10/30/how-to-add-a-custom-open-graph-image-tag-to-a-tumblr-blog
amp:
    gist: true
css:
    syntax: true
image:
    path: /assets/images/write-2160925.svg
    width: "730"
    height: "431"
    hide: true
---

Basically, Tumblr auto-generates Facebook Open Graph and/or Twitter Card markups to your blogs without a clear mechanism. I found that some of my Tumblr blog posts including the markups, but some of them not. Indeed, we have a lack of control over what kind of information to be auto-tagged. The Tumblr crawler may also pick up incorrect contents, especially og:type and og:image. You can use [Facebook Sharing Debugger tool](https://developers.facebook.com/tools/debug/) to inspect the tags of your posts.

<!--more-->

{% include toc.md %}

{% include picture.html width="548" height="288" img="tumblr/Tumblr-Facebook-OpenGraph-Tags-Block.png" alt="Example Facebook Open Graph tags auto-generated in the Tumblr blog" caption="Sample of Facebook Open Graph tags auto-generated in the Tumblr blog" class="text-center" %}

You may want to fix the tags, so you explicitly define your own in your Custom Theme. Tumblr will stop auto-generate the entire markup, once you add an Open Graph meta tags. Therefore, you need to reengineer those by your own codes. Here is an example found on GitHub gists:

<!-- FM:Snippet:Start data:{"id":"amp-gist","fields":[{"name":"gist_id","value":"1603502"},{"name":"height","value":"1200"}]} -->
<amp-gist data-gistid="1603502" layout="fixed-height" height="1200"></amp-gist>
<!-- FM:Snippet:End -->

<br>You can refer the documentation ["Creating a custom Tumblr HTML theme"](https://www.tumblr.com/docs/hk/custom_themes) for more details and study the custom theme variables. One big challenge is how to set an og:image tag, since only some types of posts, such as Photo and Audio, possesses a variable tag for obtaining the URL of the post images. Most other post types do not have a way to access the image resources contained within the post objects. For example, only `{Title}` and `{Body}` variables are available for describing Text posts. This causes a big problem to me because I use Text posts as the primary type of my blog articles.

To workaround, I figured out a way to map between each post and an external image source. Each Tumblr post has a unique identifier called `{PostID}`, so I used this variable to look up the corresponding file located in my own cloud storage.

The following cloud services are some possible choices for static web hosting:

- Google Cloud Storage
- Amazon S3
- GitHub Page

The traffic of my Tumblr blogs is subtle. So, I chose to host on a GitHub Page, as it is entirely free with 1GB storage and a _soft_ bandwidth limit of 100GB per month. This is more than enough for hosting the cover images of all my blog posts. For more details about GitHub Page, please read ["About GitHub Pages"](https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages/about-github-pages) in GitHub Help.

## Create a GitHub Page for hosting your images

In this section, I will demonstrate how to set up a GitHub repository to a GitHub page with a custom domain. First, I suggest you create a new repository. If you have multiple Tumblr blogs, you can distribute their resources to individual repositories or put all files to a single repository with separate folders.

In the **Settings** tab of the new repository, go to **GitHub Pages** section and configure the settings as below:

 - Source: `master branch`
 - Theme: _(Optional) chooses a theme as you like_
 - Custom domain: _(Optional) recommends using a subdomain, e.g. `res.example.com`_
 - Enforce HTTPS: _(Optional)_

{% include picture.html height="618" img="tumblr/GitHub-Page-Settings.png" alt="Example GitHub Pages configuration" caption="Example GitHub Pages configuration"%}

If you use a subdomain as the custom domain, add a CNAME record to your DNS server and point it to `<your-github-username>.github.io`. Otherwise, the Project Site URL will under the domain `github.io`, in the form of `http(s)://<your-github-username>.github.io/<repository-name>/`.

Go back to the **Code** tab of the repository, I suggest creating a folder, called `og-images` and store all post cover images to it. You can also upload and host your CSS and JavaScript files in the same way.

{% include picture.html width="472" height="128" img="tumblr/GitHub-Page-Files.png" alt="" caption="Example file structure for the GitHub Page" %}

## Add og tags to your Custom Theme

Log in your Tumblr account and go to edit the HTML code of your theme. Next, add the following code in the HTML head and **replace** `<your-github-page-url>` with your GitHub Page URL,

```html
    {block:hidden}
        <meta name="if:OG Tags" content="1" />
    {/block:hidden}

    {block:IfOGTags}
        <!-- og -->
        <meta property="og:title" content="{block:PostSummary}{PostSummary} - {/block:PostSummary}{block:DayPage}{DayOfMonth} {ShortMonth} - {/block:DayPage}{block:TagPage}#{Tag} - {/block:TagPage}{block:SearchPage}{SearchQuery} - {/block:SearchPage}" />
        <meta property="og:site_name" content="{title}" />
        <meta property="og:locale" content="zh_HK"/>
        <meta property="og:locale:alternate" content="zh_tw" />
        <meta property="og:locale:alternate" content="en_US" />
        {block:Description}
            <meta property="og:description" content="{MetaDescription}" />
        {/block:Description}
        {block:IndexPage}
            <meta property="og:type" content="website" />
            <meta property="og:url" content="{URL}" />
            <meta property="og:image" content="{PortraitURL-128}"/>
        {/block:IndexPage}
        {block:PermalinkPage}
            <meta property="og:type" content="article" />
            <meta property="og:url" content="{Permalink}" />
            {block:Posts}
                {block:Text}
                    <meta property="og:image" content="https://<your-github-page-url>/og-images/{PostID}.png"/>
                {/block:Text}
                {block:Photo}
                    <meta property="og:image" content="{PhotoURL-500}"/>
                {/block:Photo}
                {block:Photoset}
                    {block:Photos}
                        <meta property="og:image" content="{PhotoURL-500}"/>
                    {/block:Photos}
                {/block:Photoset}
                {block:Link}
                    {block:Thumbnail}
                        <meta property="og:image" content="{Thumbnail}"/>
                    {/block:Thumbnail}
                {/block:Link}
                {block:Video}
                    {block:Caption}<meta property="og:description" content="{PlaintextCaption}"/>{/block:Caption}
                    {block:VideoThumbnail}
                                <meta property="og:image" content="{VideoThumbnailURL}"/>
                    {/block:VideoThumbnail}
                {/block:Video}
            {/block:Posts}
        {/block:PermalinkPage}
    {/block:IfOGTags}
```

Please replace the `og:locale` tags with your languages, you can find the choices from [Yoast SEO's Knowledge Base](https://developer.yoast.com/features/opengraph/api/changing-og-locale-output/)

The above code specifies the `og:image` of all Text posts to point at **`https://<your-github-page-url>/og-images/{PostID}.png`**. For example:
- `https://res.example.com/og-images/1234.png` _(with a custom domain)_, or
- `https://john.github.io/repository-abc/og-images/1234.png` _(without custom domain)_

So, you must upload an image to the same path. Otherwise, this will cause a _File Not Found Error_.

## Format and Upload images to GitHub repository

To correctly link between each post and its Open Graph image, you must store each image file with a proper filename to the GitHub repository. I suggest you follow the procedure below,

1. Carefully copy the **`{PostID}`** of each post and use it to rename its corresponding file.<br>* You can find the `{PostID}` from a post URL,<br>e.g. `https://example.tumblr.com/post/{PostID}/......`.

2. Convert all image files to PNG format and name them with **.png** extension.<br>* This ensures that all the images will be renamed with the same format, i.e. **`{PostID}`**.png.

3. Use a Git tool to commit and push the files to the GitHub repository.

4. Finally, use [Facebook's Sharing Debugger](https://developers.facebook.com/tools/debug/) to inspect whether the og:image tag is properly crawled.

{% include picture.html width="0" height="0" img="tumblr/GitHub-Page-og-images.png" alt="" caption="An <code>og-images</code> repository uploaded with cover images for Tumblr posts" %}

I hope you think this trick is helpful, and share with other Tumblr bloggers. If you have any questions, please feel free to leave a comment below. Also, if you know any better solution, I wish you can share with me.

* * *

**See Also**: [Featured Tips, Tricks, and Tools for Tumblr Bloggers](/blog/tumblr-tricks/featured-tips-tricks-and-tools-for-tumblr-bloggers)

**Associated Project**: <i class='fab fa-tumblr-square'></i> <i class='fab fa-python'></i> [Tumblr Quick Tools in Python](https://github.com/chriskyfung/pytumblrtools)
