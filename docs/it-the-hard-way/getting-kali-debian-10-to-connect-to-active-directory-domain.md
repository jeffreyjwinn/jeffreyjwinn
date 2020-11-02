I had some issues after installing all the tools and dependencies needed for Active Directory from Linux getting a successful and full connection.

After some research, it turns out the I needed this statement added to /etc/krb5.conf under [libdefaults]:

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">rdns=false</pre>

&#8230;and now we are good!

[***...Get back***](../it-the-hard-way.html)
