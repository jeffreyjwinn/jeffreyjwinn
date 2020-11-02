If you want to _SSH_ into a host without a password, follow this short guide.

Note that this will be a one-way transaction; you can **only** go from Host A to Host B, unless of course you follow this procedure and swap the devices.

First, generate a pair of authentication keys on Host A **without** using a password:

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">ssh-keygen -t rsa</pre>

&#8230;next, still on Host A, use _SSH_ to create a directory, which may already exist, on Host B. You must use the password this time:

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">ssh foo@b mkdir -p ~/.ssh</pre>

&#8230;next, and again on Host A, append the key from Host A you generated to the appropriate file on Host B:

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">cat ~/.ssh/id_rsa.pub | ssh foo@b 'cat >> .ssh/authorized_keys'</pre>

At this point, you should be able to _SSH_ from Host A as the example user &#8216;foo&#8217; (or whatever username you used) to Host B.

[***...Get back***](..)
