---
id: 131
title: Remote SSH for Wireshark
date: 2020-07-23T21:30:22-06:00
author: jwinn
layout: page
guid: https://jwinn.getamonkey.com/?page_id=131
---
If, like me, you need to use Wireshark on Windows remotely, you can do that via SSH.

For example, I have a CentOS server that I can use to &#8220;homerun&#8221; all my Ethernet to, allowing me to monitor anything not switched.

With SSH running on the CentOS box, I use:

<pre class="wp-block-code"><code>/usr/sbin/tcpdump -i virbr0 -U -w - 'not (host 192.168.5.130 and port 22)'</code></pre>

&#8230;this will use _tcpdump_ on the named interface (_virbr0_) and avoid noise traffic for the SSH session I&#8217;m using. Easy.