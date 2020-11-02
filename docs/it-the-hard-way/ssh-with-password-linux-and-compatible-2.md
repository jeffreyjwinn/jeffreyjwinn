Same [as in this guide](https://jwinn.getamonkey.com/?page_id=443 "SSH With Password Linux (and compatible)"), you want to use SSH, in this case connecting inside VS Code, without using a password.

Note that this will be a one-way transaction; you can **only** go from Host A to Host B, unless of course you follow this procedure and swap the devices.

First, generate a pair of authentication keys on Host A **without** using a password, being sure to use _Command Prompt_ in Windows. In other words, this is **not** to be done in _Windows Subsystem for Linux (WSL)_:

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">ssh-keygen -t rsa</pre>

&#8230;next, still on Host A, use _SSH_ to create a directory, which may already exist, on Host B. You must use the password this time:

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">ssh foo@b mkdir -p ~/.ssh</pre>

&#8230;now, you have to get the key you generated over to Host B. The only way I&#8217;ve done this so far is cut and paste.

Cut and paste the contents from:

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">~/.ssh/id_rsa.pub</pre>

&#8230;to the _authorized_keys_ file on Host B, probably using _SSH_ and again with a password.

At this point, you should be able to _SSH_ from Host A as the example user &#8216;foo&#8217; (or whatever username you used) to Host B under Windows and in compatible applications such as _VS Code_.

[***...Get back***](../)
