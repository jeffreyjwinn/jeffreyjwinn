---
id: 428
title: Getting Kali/Debian 10 to Connect to Active Directory Domain
date: 2020-09-06T18:27:56-06:00
author: jwinn
layout: page
guid: https://jwinn.getamonkey.com/?page_id=428
---
I had some issues after installing all the tools and dependencies needed for Active Directory from Linux getting a successful and full connection.

After some research, it turns out the I needed this statement added to /etc/krb5.conf under [libdefaults]:

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">rdns=false</pre>

&#8230;and now we are good!