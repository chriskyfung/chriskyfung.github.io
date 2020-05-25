---
layout: post
title: Simple PHP commands for WordPress administrators
date: 2020-05-22 10:40
category: WordPress
author: Chris KY Fung
tags: [WordPress, PHP]
permalink: /blog/wordpress/simple-php-commands-for-wordpress-administrator
image: /images/posts/wordpress/wordpress-1863504.svg
header:
  showteaser: false
  
---

![WordPress - Code is Poetry](/images/posts/wordpress/wordpress-1863504.svg)

<!--more-->

## Get blog info

See WordPress version and number of posts

```php
global $wpdb;

$query = "SELECT COUNT(*) FROM {$wpdb->posts} WHERE post_type='post' AND post_status='publish'";
$post_count = $wpdb->get_var($query);

echo get_bloginfo('name').' is using Wordpress '.get_bloginfo('version').' and has '.$post_count.' published posts.';
```

**Example response:**

```matlab
Example Blog is using Wordpress 5.4.1 and has 3 published posts.
```

## List plugins

List files in Plugins directory

```php
$files = scandir("wp-content/plugins");

foreach($files as $file) {
    echo $file."\n";
}
```

**Example response:**

```matlab
.
..
elementor
index.php
responsive-lightbox
yoast
```

## Check free space on your server

Very useful snippet to check the free space on your server

```php
$bytes = disk_free_space(".");
$si_prefix = array( 'B', 'KB', 'MB', 'GB', 'TB', 'EB', 'ZB', 'YB' );
$base = 1024;
$class = min((int)log($bytes , $base) , count($si_prefix) - 1);
echo $bytes . '<br />';
echo sprintf('%1.2f' , $bytes / pow($base,$class)) . ' ' . $si_prefix[$class] . '<br />';
```

**Example response:**

```matlab
138288971776<br />128.79 GB<br />
```

## Get theme directory in WordPress

WordPress comes with a number of useful functions you can use to get the current theme path or URL. You can run the following PHP code to list their values:

```php
echo 'The URL of the current theme (parent):' . PHP_EOL;
echo get_template_directory_uri() . PHP_EOL;
echo 'The URL of the current theme (child):' . PHP_EOL;
echo get_stylesheet_directory_uri() . PHP_EOL;
echo 'the URL of the current theme stylesheet URL' . PHP_EOL;
echo get_stylesheet_uri() . PHP_EOL;
echo 'the URL of the theme directory.' . PHP_EOL;
echo get_theme_root_uri() . PHP_EOL;
echo 'the URL of the file path of the themes directory without a trailing slash' . PHP_EOL;
echo get_theme_root() . PHP_EOL;
echo 'Array of themes located in the themes directory' . PHP_EOL;
echo get_theme_roots() . PHP_EOL;
echo 'The full file path to the current theme directory' . PHP_EOL;
echo get_stylesheet_directory() . PHP_EOL;
echo 'The full file path to the current theme directory' . PHP_EOL;
echo get_template_directory() . PHP_EOL;
```

**Example response:**

```matlab
The URL of the current theme (parent):
https://example.com/wp-content/themes/twentytwenty
The URL of the current theme (child):
https://example.com/wp-content/themes/twentytwenty
the URL of the current theme stylesheet URL
https://example.com/wp-content/themes/twentytwenty/style.css
the URL of the theme directory.
https://example.com/wp-content/themes
the URL of the file path of the themes directory without a trailing slash
/home/www/html/example.com/wp-content/themes
Array of themes located in the themes directory
/themes
The full file path to the current theme directory
/home/www/html/example.com/wp-content/themes/twentytwenty
the full file path to the current theme directory
/home/www/html/example.com/wp-content/themes/twentytwenty
```

**Reference**: [Get Theme Directory In WordPress - Paulund](https://paulund.co.uk/get-theme-directory-in-wordpress)

* * *

## Get the URL of the WP upload directory

```php
echo wp_get_upload_dir()['baseurl'];
```

**Example response:**

```matlab
https://example.com/wp-content/uploads
```

## Rename files with garbled filename

The command `ls -i` shows the inode number of files

```php
echo `ls -i ./filepath`;
```

The command `find -inum` returns the filepath of a specific inode in the file system

```php
echo `find ./filepath -inum 55340444  `; 
```

With the parameter and the placeholder `-exec {}`, the command apply the second part to rename the specific inode file

```php
echo `find ./filepath -inum 55340444 -exec mv {} newfilepath \;`;
```
