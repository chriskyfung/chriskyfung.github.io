---
layout: post
title: Launch new theme
date: 2020-06-01 23:59:00 +0800
last_modified_at: 2020-07-14 16:00 +0800
category: Announcement
author: chris
tags: [Changelog, Jekyll]
image: 
  path: /images/posts/jekyll/theme-after-may2020-chriskyfung.github.io.png
  height: 548
---

Since migrated from Wix in 2017, this site has [run on GitHub Pages for over 3 years](/blog/2017/02/26/new-site-is-opened). I knew nearly nothing about [Jekyll](https://jekyllrb.com/) and GitHub at that time. I had just chosen [Architect theme](https://pages-themes.github.io/architect/) from the official theme chooser for GitHub Pages.

{% include picture.html height="514" img="jekyll/Architect-theme-for-GitHub-Pages.png" alt="Architect is a theme for GitHub Pages" caption="Architect theme for GitHub Pages" class="text-center" %}

{:.text-center}
<i class='fas fa-angle-down' style='font-size:48px'></i>

Starting with the official single-page theme, I gradually customized it, built different pages and features based on my untutored HTML and CSS skills. Adding the navigation, the archive, tag pages and paginations for blog posts. The site simply works but there's no doubt that it was made up with messy pieces of codes. Sometimes I felt hard to further extend because no front-end framework was used on it.

{% include picture.html height="548" img="jekyll/theme-before-may2020-chriskyfung.github.io.jpg" alt="My Old Theme" caption="My old theme" class="text-center" %}

In spite of the lack of modern web design elements, at least I made it to be responsive. I believed the customized theme  be good enough for blogging as well as simple and lightweight for deliver my contents. However, it didn't look attractive. It's ugly, right? Hope it wasn't too bad and discouraging to readers. Thus, I wanted to say goodbye to my childlike work.

{:.text-center}
<i class='fas fa-angle-down' style='font-size:48px'></i>

When upgrading this site, I considered to whether I should switch to another blogging platform. I studies Gatsby, Hexo, Hugo, and VuePress. So many interesting static site generators available in the markets. At the end, I decided to stick with Jekyll because it is the simplest one for me. I can easily enhance the site structure without learning new frameworks and languages. As a result, I could focus on renew the theme and drill deeper for Jekyll.

This time I selected a Bootstrap-based theme. It allows me to create the header, footer and sidebar with much nicer responsive web design. The new theme comes with a sticky navigation bar, which automatically hides after scrolling down and show back when you scroll up. You no longer need to scroll back to the top for the navigation.

{% include picture.html width="421" height="494" img="jekyll/off-canvas menu.png" alt="Off-canvas menu" caption="Modern off-canvas menu" class="text-center" %}

With the new theme, you can directly send me a message via the contact form. You can find the link from the nav-bar and footer.

{% include picture.html height="398" img="jekyll/contact-form.png" alt="Contact Form" caption="Contact Form" class="text-center" %}

The new homepage is still mainly for listing my projects. Nevertheless, you can find the featured posts below the hero section and the recent posts on the sidebar. Although the homepage requires to load a larger number of images, the page speed should keep fast. Webp format is used to compress the image sizes. I tried my best to optimize between the performance and your visual experience.

<div class="row">
    <div class="col col-8">
        {% include picture.html width="477" height="257" img="jekyll/featuredbox.jpg" alt="Feature Box" caption="Featured posts on homepage" class="text-center" %}
    </div>
    <div class="col col-4">
        {% include picture.html width="223" height="343" img="jekyll/sidebar-recent-posts.jpg" alt="Sidebar Recent Post List" caption="Recent Post list on sidebar" class="text-center" %}
    </div>
</div>

In addition, [the website is AMP now](/blog/amp-now) that further enhance the page loading performance.

* * *

Hope you better enjoy this site. I'll try to keep improving it to be better. Do you have any comments on the new theme? Feel free to leave a comment if you see anything the can be improved.