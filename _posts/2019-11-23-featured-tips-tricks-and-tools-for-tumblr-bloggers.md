---
layout: post
title: Featured Tips, Tricks, and Tools for Tumblr Bloggers (2019)
date: 2019-11-23 20:09
category: Web Development
author: Chris KY Fung
tags: [Tumblr, user tips, Custom Theme, shorthand]
permalink: /blog/tumblr-tricks/featured-tips-tricks-and-tools-for-tumblr-bloggers
redirect_from:
 - /blog/2019/11/23/featured-tips-tricks-and-tools-for-tumblr-bloggers
image: /images/posts/tumblr/tips-tricks-and-tools-for-tumblr-bloggers.png
---

![Tips, Tricks, and Tools for Tumblr Bloggers](/images/posts/tumblr/tips-tricks-and-tools-for-tumblr-bloggers.png)

**Tumblr**  is a popular micro-blogging and social media platform, which is lightweight and highly-customizable with HTML, CSS and JavaScript. It is completely free without storage and bandwidth limits, like Facebook, Twitter, Blogger and Medium, but you can tailor-made your theme and use your custom domain name. It also allows monetizing with Google Adsense. Tumblr is a good alternative of WordPress and GitHub Page for hosting blog websites because no complex PHP or Jekyll knowledge is required. But the shortage of Tumblr includes slow page speed and limited SEO settings. On the whole, Tumblr is a great blogging platform for beginners. You can make use of the following plugins, tools, tips-and-tricks to enrich your Tumblr sites.

<!--more-->
<br>

## Personalize Your Tumblr Site:

If you prefer to present your Tumblr like a normal website, you definitely want to erase the Tumblr controls, buttons and toolbars from your pages. You can follow the **two** instructions below to kill them from
screens.

### Remove the “Follow,” “Unfollow” and “Join Tumblr” buttons

You can follow the procedures below to disable the Tumblr buttons for non-Tumblr users:

1. In the Tumblr Dashboard, click on the _Account_ → **Edit Appearance**
2. Click on **Edit Theme** button (same **Customize**)
3. Scroll to the button and click **Advanced Settings** <br>
![](/images/posts/tumblr/uncheck-promote-tumblr-in-tumblr-theme-advanced-options.png)
<br>

4. Uncheck **Promote Tumblr!**
5. Click **Save**

### Hide the "Open / Install the App" from mobile pages

When a Tumblr site is opened with a mobile device, buttons asking users to open/install the native Tumblr app will be rendered by default (as shown in the image below).

![](/images/posts/tumblr/get-n-open-tumblr-app-in-tumblr-mobile-page-300.png)

1. Copy the following CSS codes to clipboard

    ```css
    tumblr_controls, .tmblr-iframe {
        visibility:hidden;
        padding-top: 0 !important;
        /* Hide the tumblr-iframe objects*/
    }
    tumblr_controls, .iframe-controls--desktop {
        visibility:visible;
        /* Keep showing Tumblr control bottons for logged-in users*/
    }
    ```

2. Navigate to **Edit Appearance** > **Edit Theme** > **Advanced Settings** from your Tumblr dashboard, paste the code below **ADD CUSTOM CSS**
3. Click **Save**.

<br>

### Recover Custom Themes

Tumblr automatically backups your custom theme when you make and save any changes, and you can revert to previous versions. I think many Tumblr bloggers may not know this important feature because it isn't written clearly in the Tumblr Help Center. _Weird_!

In the **[Recover Custom Theme](https://www.tumblr.com/themes/recover)** page, choose the blog that you want to recover, and click **View backups**. You will obtain a list of the old versions. You can click **Show changes** to inspect the code changes and click **Revert** to restore back the theme.

![Screenshot of Recover Tumblr Custom Themes](/images/posts/tumblr/RecoverCustomTheme.png)

* * *

## Plugins for Tumblr Sites:

### Amazon Associates Ads Loader for Tumblr

![Amazon Associates Ads Loader for Tumblr](https://github.com/chriskyfung/amzn_assoc_loader_for_tumblr/raw/master/images/amzn_assoc_loader_for_tumblr.png)

Tumblr blocks executing Javascript snippets directly embedded in a post body. For that reason, Amazon Ads cannot display if we just copy an Ads code to a Tumblr post. To workaround, I created a converter to format the Ads code to HTML data, and a plugin to insert the Ads back to the post body by interpreting the HTML elements in the DOM File.

For more detail, please visit the repository in GitHub ([https://github.com/chriskyfung/amzn_assoc_loader_for_tumblr](https://github.com/chriskyfung/amzn_assoc_loader_for_tumblr)).

<script type="text/javascript">
amzn_assoc_placement = "adunit0";
amzn_assoc_search_bar = "true";
amzn_assoc_tracking_id = "cfky05-20";
amzn_assoc_ad_mode = "manual";
amzn_assoc_ad_type = "smart";
amzn_assoc_marketplace = "amazon";
amzn_assoc_region = "US";
amzn_assoc_title = "My Amazon Picks";
amzn_assoc_linkid = "bfc0f57bf0ff0a864c81efdd3904066e";
amzn_assoc_asins = "1118335953,1119950155,B082RSGN62,B00GOMDPRI";
</script>
<script src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US"></script>

### Tumblr Featured Posts Plugin<br><small>_by [BANDIT DESIGN](https://blog.bandit.co.nz/post/87511743/tumblr-featured-posts-javascript-plugin)_ </small>

This plugin outputs a link to render posts tagged with "featured". Click [Demo](https://test-featured-plugin.tumblr.com/) to visit the sample site I made.

To implement the plugin, copy the following codes within your HTML `<head>`,

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js" language="javascript" type="text/javascript"></script>  
<script src="https://lab.bandit.co.nz/sites/tumblr/bandit-tumblr-featured.js" language="javascript" type="text/javascript"></script>
```

Add the following html tag to your custom theme,

```html
<ul id="featured"></ul>
```

A link named with "Featured" will be shown at where you place the `<ui>` tag. When you click this link, the plugin will send an API request, `https://<blog-name>.tumblr.com/api/read/json?num=50&tagged=featured` to get the data of the first 50 posts tagged with "featured". Thus, the posts found can be shown at the top or somewhere on the top separately from the main post feed.

![sample screenshot of Tumblr Featured Posts Plugin by BANDIT DESIGN](/images/posts/tumblr/tumblr-featured-post-plugin.png)


* * *

## 3rd-Party Applications:

### Hashtag Tools

Hashtags are useful to categorize posts and help audiences to search your contents. You can edit the tags by using the official **Mass Post Editor** under the Tumblr dashboard. But it looks pretty crummy, especially fails to show non-English characters. Alternatively, I adopt the following 3rd-party applications to oversee and manipulate the tags of my Tumblr blogs.

#### Tumblr Tag List Generator <small>(drunkonschadenfreude.com)</small>

![Screenshot of Tumblr Tag List Generator by drunkonschadenfreude.com](/images/posts/tumblr/TumblrTagListGenerator-drunkonschadenfreude.com.png)

You can get a dynamically updated tag list of your Tumblr blog by using this tag list generator. Just enter your Tumblr blog name to it and click **Generate**, it will return the code for you to copy into your theme or a custom page.

There are several parameters for you to define the appearance of the tag list or word cloud. The generator provides a preview for the resulted code. The image below demonstrates three different samples that I had made.

![Sample Demos of Tumblr Tag List Generator by drunkonschadenfreude.com](/images/posts/tumblr/TumblrTagListGenerator-drunkonschadenfreude.com-demos.png)

#### Find Untagged Tumblr Posts <small>(finduntaggedtumblrposts.com)</small>

![Screenshot of Find Untagged Tumblr Posts (finduntaggedtumblrposts.com)](/images/posts/tumblr/FindUntaggedTumblrPosts-finduntaggedtumblrposts.com.png)

This application is a crawler that scans through a Tumblr site and reports the untagged posts that have been found. So, you can verify if every post in your site has been tagged.

#### Tag Replacer <small>(tags.circumfluo.us)</small>

![Tag Replacer ([tags.circumfluo.us](https://tags.circumfluo.us))](/images/posts/tumblr/tagreplacer-tags.circumfluo.us.png)

Tag Replacer is a great tool that speedups tag editing. It can search the posts with a specific tag from your Tumblr blog and perform a **bulk tag replace/delete** process. _Quick & Easy_!

Since the application edits your data, you have to grant it _access_, _read_ and _write_ permissions for the first time use. Click **Connect to tumblr**, then it will be redirected to the authorization page.
![Connect to tumblr - Tag Replacer (tags.circumfluo.us)](/images/posts/tumblr/tagreplacer-tags.circumfluo.us-connect-to-tumblr.png)

![Authorize Tag Replacer (tags.circumfluo.us)](/images/posts/tumblr/tagreplacer-tags.circumfluo.us-connect-to-tumblr-authorize.png)

If you worry about the security, you can revoke the app after tag editing. In your Tumblr dashboard, navigate to **Settings** > **Apps**, and click the "**x**" button to remove the app.

![Remove Tag Replacer (tags.circumfluo.us)from Tumblr App page](/images/posts/tumblr/tagreplacer-tags.circumfluo.us-remove-app.png)

The Tag Replacer is an open-source project under Peer Production License.  You can find and download the source code from this GitHub repository ([https://github.com/cubeghost/tagreplacer](https://github.com/cubeghost/tagreplacer)).

<br>

### Download & Backup Tools

#### TumblrTree

![TumblThree demo screenshot](/images/posts/tumblr/TumblThree.png)

**[TumblThree](https://www.jzab.de/content/tumblthree)** is a _free and open-source_ Tumblr Blog Backup Application for Windows. You can download both its source codes and executable files from [this GitHub repository](https://github.com/TumblThreeApp/TumblThree/releases) ([https://github.com/TumblThreeApp/TumblThree/releases](https://github.com/TumblThreeApp/TumblThree/releases)).

To use the application, unzip the downloaded _TumblThree-vx.x.x.x-Application.zip_ file, and run **TumblThree.exe**.

1. Enter a URL, e.g. `<blog-name>.tumblr.com`, to the textbox at the bottom-left corner, and then click the **Add Blog** button in the toolbar.
2. Edit the variables in the **Detail** tab of the sidebar menu.
3. Select the blog(s) in the list, and click **Add to Queue** button.
4. Confirm the queues by switching the sidebar to the **Queue** tab.
5. Click **Crawl** button in the toolbar.

By default, the files will be downloaded to separate folders with the name of the blogs under the same directory of the application.

![TumblThree demo screenshot](/images/posts/tumblr/TumblThree-resulted-folders.png)

The screenshot below shows the files been downloaded from Google Design's Tumblr blog.

![TumblThree demo screenshot](/images/posts/tumblr/TumblThree-resulted-google-design-files.png)

* * *

## API Tools:

### pytumblrtools

A set of python scripts for manipulating Tumblr blogs
([https://github.com/chriskyfung/pytumblrtools](https://github.com/chriskyfung/pytumblrtools))

- Transfer Tumblr posts to a new account
- List the URLs of all blog posts and export as a CSV file to local storage
- List all tags with counts, and export as a CSV file to local storage (Can use `SPECTAG` to specify the only lookup the posts contain this given tag.)
- Replace a string in the body and caption of all text and photo

* * *

## Suggested Reading: <span style='font-size:small'>(Get Tips Feed <a href="https://www.diigo.com/rss/user/chriskyfung?query=%23tumblr&sort=updated" target="_blank"><i class='fas fa-rss' style="color:orange;"></i></a>)</span>

- [How to add a custom Open Graph image tag to your tumblr blog](/blog/tumblr-tricks/how-to-add-a-custom-open-graph-image-tag-to-a-tumblr-blog)

- [A Guide to the Best Tumblr Features for Bloggers](https://www.lifewire.com/tumblr-features-for-bloggers-3476404)

- [Tumblr SEO: An Internet Marketers Guide to Owning Tumblr
](https://elite-strategies.com/tumblr-seo/)

- [The Complete Guide to Tumblr Search Engine Optimization (SEO)
](https://www.pitiya.com/tumblr-seo.html)

- [Is it possible to Monetize tumblr Blog by AdSense?](https://www.bloggerspice.com/2016/01/how-to-Add-adsense-ads-on-tumblr-blog.html)

- [30+ Tumblr Tips Tricks, and Tools (2019) - Hongkiat](https://www.hongkiat.com/blog/tumblr-tips-tricks-tools/)

<ul style="margin-left:30px;">
<li><u>Tips & Tricks</u></li>
    <ul>
        <li><del>Avoid Reblogging Long Posts As Links</del></li>
        <li>Use Keyboard Shortcuts On The Dashboard</li>
        <li><del>Allow Users To Reply To Your Posts From The Dashboard</del></li>
        <li>Customize Follow & Share Buttons</li>
        <li>Send Asks To Other Users From The Dashboard</li>
        <li><strong>Recover Old Themes</strong></li>
        <li>Mass Edit Posts And Tags</li>
        <li>Queue Your Posts</li>
        <li>Delay Your Reply To Asks</li>
        <li>Play Around With Tumblr’s Logo</li>
        <li>View Search The Old Fashioned Way</li>
        <li><strong>Share A Preview Of A Draft</strong></li>
        <li>Rearrange Queued Posts</li>
        <li><del>Find Out What Your Friends Like</del></li>
        <li>Search For Posts On Blogs Without Search Bar</li>
        <li>View Tagged Posts From Earliest To Latest</li>
        <li>Search For Posts On A Specific Date</li>
        <li>View Archives</li>
        <li>Find All Your Tags</li>
        <li>Display Individual Author’s Avatar</li>
    </ul>
<li><u>Extensions & Tools</u></li>
    <ul>
        <li><span class="discontinued">Missing E</span></li>
        <li><span class="discontinued"><del>Add A View Count</del></span></li>
        <li>Add A Music Player</li>
        <li>Get A Dashboard Theme</li>
        <li><span class="discontinued"><del>Endless Scrolling</del></span></li>
        <li><del>Share Content Via Bookmarklet</del></li>
        <li><span class="discontinued"><del>Customize Your Mouse Cursor</del></span></li>
        <li><span class="discontinued"><del>Customize your Scroll Bar</del></span></li>
        <li>Tumblr Savior</li>
        <li>#Wrap</li>
        <li>Google Analytics</li>
        <li>Disqus</li>
        <li>Check Your Post Limit</li>
    </ul>
</ul>

## References:
- [Customization with META - Build Themes](https://buildthemes.tumblr.com/ch3/customization)
- [Removing "Open"/"Install the App" header toolbar from mobile Tumblr page : web_design](https://www.reddit.com/r/web_design/comments/3vtb1z/removing_openinstall_the_app_header_toolbar_from/)
- [How to increase you Tumblr SEO. - How to increase you Tumblr SEO. - Nerd Ramblings](https://nerdramblings.tumblr.com/post/4388960162/how-to-increase-you-tumblr-seo)
- [Tumblr Vs. Medium: Comparing Popular Blogging Platforms](https://www.lifewire.com/tumblr-vs-medium-comparing-popular-blogging-platforms-3485755)

This post has also been published to Medium. If you like to read and take notes in Medium, please visit [Medium (@chriskyfung)](https://medium.com/@chriskyfung/featured-tips-tricks-and-tools-for-tumblr-bloggers-2019-25c51fad73ee).

<style>
    .discontinued {
        position: relative;
        color: lightgrey;
    }
    .discontinued::after {
        font-family: "Font Awesome 5 Free";
        content: " \f057 Discontinued";
        color: red;
        font-size: smaller;
        vertical-align: super;
    }
</style>