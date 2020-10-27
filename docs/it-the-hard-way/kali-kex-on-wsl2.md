---
id: 439
title: Kali Kex on WSL2
date: 2020-09-15T21:24:55-06:00
author: jwinn
layout: page
guid: https://jwinn.getamonkey.com/?page_id=439
---
If you get an error (Tiger VNC) that says that Tiger can&#8217;t connect to Kex, do this at your WSL2 shell prompt:

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">kex stop</pre>

&#8230;then, start as normal. I updated my BAT file to do this automatically:

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">@echo off

start /B x410.exe /wm

set path=c:\Windows\System32;c:\Users\jeffr\AppData\Local\Microsoft\WindowsApps
kali run if [ -z \"$(pidof kex)\" ]; then "kex stop; export DISPLAY=192.168.5.50:0.0; cd  /home/jwinn; kex kill; kex wtstart; fi;"</pre>