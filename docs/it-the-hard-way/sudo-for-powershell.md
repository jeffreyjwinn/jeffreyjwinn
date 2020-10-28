I&#8217;m working on a better way to do this, but for now I have a way to &#8220;_sudo_&#8221; in _Powershell_ to get Administrator access.

First, using _Powershell_ (as your regular user), create a function:

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">Function sudoit {Start-Process "powershell" -Verb "runas"}</pre>

&#8230;next, connect that function to an alias. Again in _Powershell_:

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">Set-Alias -Name sudo -Value sudoit</pre>

&#8230;then, you can use the alias &#8216;_sudo_&#8216;. Note that this will open up a new window with Administrator privileges. Not the ideal solution, but the best I&#8217;ve found so far.

I have seen a problem where desired changes made, in my case, by other applications (apps) to the _Powershell_ syntax, do not stick. The key, at least for me, is to make changes to the file _C:\Users\jeffr\Documents\PowerShell\Microsoft.PowerShell_profile.ps1_. Changes here seem to perpetuate through subsequent shell start ups. Now you know.

[***...Get back***](..)
