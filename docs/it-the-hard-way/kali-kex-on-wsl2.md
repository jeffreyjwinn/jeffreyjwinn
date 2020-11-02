If you get an error (Tiger VNC) that says that Tiger can&#8217;t connect to Kex, do this at your WSL2 shell prompt:

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">kex stop</pre>

&#8230;then, start as normal. I updated my BAT file to do this automatically:

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">@echo off

start /B x410.exe /wm

set path=c:\Windows\System32;c:\Users\jeffr\AppData\Local\Microsoft\WindowsApps
kali run if [ -z \"$(pidof kex)\" ]; then "kex stop; export DISPLAY=192.168.5.50:0.0; cd  /home/jwinn; kex kill; kex wtstart; fi;"</pre>

[***...Get back***](../it-the-hard-way.html)
