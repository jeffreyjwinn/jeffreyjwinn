---
id: 303
title: 'ntdll.dll: VERR_CR_X509_CPV_NOT_VALID_AT_TIME Error on Windows 10'
date: 2020-08-03T17:10:34-06:00
author: jwinn
layout: page
guid: https://jwinn.getamonkey.com/?page_id=303
---
I am on the &#8220;insider build&#8221; program. Until a bit ago, I was on the &#8220;beta&#8221; channel, not the &#8220;dev&#8221; or &#8220;Pre Release&#8221; channels.

Curiously, while on the beta channel, the certificates associated with some of my needed files (specifically here, _ntdll.dll_) expired. That was demonstrated, for me, by not being able to run any Virtualbox Virtual Machines (VM), something I very much need to do.

Here are some shots of the errors I was seeing:<figure class="wp-block-image">

<img loading="lazy" width="522" height="307" src="https://jwinn.getamonkey.com/wp-content/uploads/2020/08/Annotation-2020-08-03-153043.png" alt="" class="wp-image-304" srcset="https://jwinn.getamonkey.com/wp-content/uploads/2020/08/Annotation-2020-08-03-153043.png 522w, https://jwinn.getamonkey.com/wp-content/uploads/2020/08/Annotation-2020-08-03-153043-300x176.png 300w" sizes="(max-width: 522px) 100vw, 522px" /> </figure> <figure class="wp-block-image"><img loading="lazy" width="277" height="487" src="https://jwinn.getamonkey.com/wp-content/uploads/2020/08/Annotation-2020-08-03-153053.png" alt="" class="wp-image-305" srcset="https://jwinn.getamonkey.com/wp-content/uploads/2020/08/Annotation-2020-08-03-153053.png 277w, https://jwinn.getamonkey.com/wp-content/uploads/2020/08/Annotation-2020-08-03-153053-171x300.png 171w" sizes="(max-width: 277px) 100vw, 277px" /></figure> 

&#8230;and some snipped log entries, pointing out the problem:  


<pre class="wp-block-code"><code>5174.4b04:   00007ff9bc0b9000-00007ff9bc12cfff 0x0002/0x0080 0x1000000  \Device\HarddiskVolume1\Windows\System32\ntdll.dll
5174.4b04:   00007ff9bc12d000-00007ffffffeffff 0x0001/0x0000 0x0000000
5174.4b04: \Device\HarddiskVolume1\Windows\System32\ntdll.dll: VERR_CR_X509_CPV_NOT_VALID_AT_TIME for 0xf91937b2; retrying against current time: 0x5f287bfd.
5174.4b04: Error (rc=-23033):
5174.4b04: supHardenedWinVerifyProcess failed with Unknown Status -23033 (0xffffa607): Certificate is not valid (ValidTime=2020-08-03T21:05:01.000000000Z Validity=[2019-02-20T22:40:22.000000000Z...2020-07-31T22:40:22.000000000Z]): \Device\HarddiskVolume1\Windows\System32\ntdll.dll
5174.4b04: Error -23033 in supR3HardNtChildPurify! (enmWhat=5)
5174.4b04: supHardenedWinVerifyProcess failed with Unknown Status -23033 (0xffffa607): Certificate is not valid (ValidTime=2020-08-03T21:05:01.000000000Z Validity=[2019-02-20T22:40:22.000000000Z...2020-07-31T22:40:22.000000000Z]): \Device\HarddiskVolume1\Windows\System32\ntdll.dll
5174.4b04: supR3HardNtEnableThreadCreationEx:</code></pre>

Information out there on the world wide web was hard to come by. The hint was provided [here](https://www.virtualbox.org/ticket/16202).

Essentially, I had to change my insider program channel to _dev_. Will the signatures for the _beta_ channel be updated past 7/31/2020? Probably, but I can&#8217;t wait for that. So, for now, I run slightly more risk with a more aggressive build, where less testing is done before release. Notes related to this from Microsoft [here](https://blogs.windows.com/windowsexperience/2020/07/29/announcing-windows-10-insider-preview-build-20180/).  


As Kurt Vonnegut wrote, &#8220;So it goes.&#8221;

Bugs, bugs, bugs!

Related to this, after going to the _dev_ channel update, turns out there is a bug with (at least) WSL 1 and your PATH variable. An issue known to Microsoft, referenced again [here](https://blogs.windows.com/windowsexperience/2020/07/29/announcing-windows-10-insider-preview-build-20180/).

In short, [I have a Visual Basic Script (VBS) that calls a batch file to run my preferred terminal, Terminator, over WSL 1](https://jwinn.getamonkey.com/?page_id=193). That stopped working after this channel change (yay!). Note that the same should be related to anything WSL (including _wsl.exe_).

To get around that, I changed my batch script to shorten the &#8220;normal&#8221; path from Windows:

<pre class="wp-block-code"><code>@echo off

start /B x410.exe /wm

set path=c:\Windows\System32;c:\Users\jeffr\AppData\Local\Microsoft\WindowsApps
pengwin run if [ -z \"$(pidof terminator)\" ]; then "export DISPLAY=192.168.5.50:0.0; terminator;  fi;"</code></pre>

&#8230;and everything is fine again. For now.