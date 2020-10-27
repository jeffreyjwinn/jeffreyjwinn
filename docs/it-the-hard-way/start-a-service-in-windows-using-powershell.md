---
id: 419
title: Start a Service in Windows using Powershell
date: 2020-09-04T09:25:12-06:00
author: jwinn
layout: page
guid: https://jwinn.getamonkey.com/?page_id=419
---
As you know, the _OpenSSH_ service for _Windows_ under _Windows 10_ does not start automatically. Not sure why.

To fix that, and with help from the Internet, I wrote this simple _Powershell_ script:

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">Start-Process "$psHome\powershell.exe" -Verb Runas -ArgumentList '-command "Start-Service sshd"'</pre>

&#8230;this calls powershell.exe as Administrator (resulting in a permission dialog) and starts the service. To get to this Powershell script, I placed the following Visual Basic Script (VBS) in my startup area:

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">Set objShell = CreateObject("Wscript.shell")
objShell.run("powershell -Executionpolicy Bypass -nologo -noninteractive -file C:\Users\jeffr\bin\StartService-sshd.ps1")</pre>

&#8230;arguably, this is messy, but it works.