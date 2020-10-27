---
id: 261
title: Backup Your Stuff Using RSYNC
date: 2020-07-31T18:59:03-06:00
author: jwinn
layout: page
guid: https://jwinn.getamonkey.com/?page_id=261
---
Do you want a good backup of your stuff? Of course you do!

I use this script that utilized _rsync_ to backup my entire data storage (in a raw, file-based format) to a separate disk and server:

<pre class="wp-block-code"><code>#!/bin/sh

rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" --progress www-data@dantooine:/data/jwinn/files/ /home/jwinn/Backup</code></pre>

&#8230;put this in your _crontab_, and you are all set:

<pre class="wp-block-code"><code># Backup ALL of data store for Nextcloud....
0 3 * * 7 /home/jwinn/bin/backup-nextcloud.sh >/dev/null 2>&1</code></pre>