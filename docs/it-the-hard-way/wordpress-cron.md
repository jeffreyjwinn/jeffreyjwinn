---
id: 415
title: 'WordPress &#8220;cron&#8221;'
date: 2020-09-01T13:35:37-06:00
author: jwinn
layout: page
guid: https://jwinn.getamonkey.com/?page_id=415
---
For reasons that I, frankly, haven&#8217;t bothered to investigate, my updated _WordPress_ blog (yes, the one you are reading now) has not been processing its routine tasks. This means, most importantly, that my backups are not.

So, we turn again to _cron_. After some research, I made this script, which is places in the _~/bin_ directory of the appropriate _Nginx_ user (in my case, _www-data_) as _wp-updraft-backup-cron.php_:

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">&lt;?php

define('UPDRAFTPLUS_CONSOLELOG', true);
define('DOING_CRON', true);
require_once('/usr/share/wordpress/wp-load.php');
do_action('updraft_backup_all');</pre>

&#8230;I know that this script _should_ run just the specific plugin _Updraft Backup_, but it seems to unclog whatever else is waiting to process.

So, that&#8217;s good.

Note that, as this script is simple PHP, you must call it with PHP from cron:

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">15 */2 * * *    /usr/bin/php /usr/share/wordpress/bin/wp-updraft-backup-cron.php >/dev/null 2>&1</pre>