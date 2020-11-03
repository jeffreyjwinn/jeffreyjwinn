From time to time, I&#8217;ll get an error installing where something, probably in the downloading of a file, gets corrupted and _apt/dpkg_ won&#8217;t complete. The error is usually with one or more files in the /_var/cache/apt/archives_ directory.

One solution to this problem is to use _dpkg_ itself to force the issue:

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">dpkg --configure -a</pre>

[***...Get back***](../it-the-hard-way.html)
