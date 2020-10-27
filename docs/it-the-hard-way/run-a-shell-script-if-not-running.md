---
id: 395
title: Run a Shell Script if NOT Running
date: 2020-08-30T10:15:18-06:00
author: jwinn
layout: page
guid: https://jwinn.getamonkey.com/?page_id=395
---
Sometimes, you have a shell script that you wish to run _only_ if one isn&#8217;t already running. For example, you usually don&#8217;t want your script to run until the other one is done, and sometime the script (or a sub-script) isn&#8217;t smart enough to that.

Other than better coding, one way to do this is by using a shell wrapper to start the script:

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">#!/bin/sh

if ps -ef|grep -v grep|grep cron.php;then
	exit 0
else
	php /var/www/html/nextcloud/cron.php
	exit 0
fi</pre>

&#8230;in this example, we are using _grep_ to see if the end task is running (while avoiding _grep_ itself) and if it is not, we run the target.