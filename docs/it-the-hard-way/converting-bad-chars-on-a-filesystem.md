If you, like me, use multiple operating systems (OSs), you may run into a situation where one OS does not treat characters the same in file names. This can cause problem between usage, especially when it comes to retaining your file on some kind of storage.

I run my own Nextcloud server, and I use the following _chrontab_ entry to convert bad characters in file names:

<pre class="wp-block-code"><code># auto-convert "bad" chars in filename...
#0 4 * * * convmv -r -f windows-1252 -t UTF-8 /data/jwinn/files --notest</code></pre>

&#8230;note that you must install _convmv_ first (something like: _sudo apt install convmv_) and there are many options for conversion. Also, in your testing, be sure to drop the &#8220;_&#8211;notest_&#8221; as above for a dry run, which is the default.

[***...Get back***](../it-the-hard-way.html)
