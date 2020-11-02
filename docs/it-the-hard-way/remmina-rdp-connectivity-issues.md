# Remmina Remote Desktop Protocol (RDP) Connectivity Issues

I recently had an issue using Remmina to RDP to a Debian desktop from an Xubuntu desktop where the connection would never fully complete.  The target host is running XRDP.

After much searching around, I found that the key was to set the following options in the connection profile in Remmina under "Advanced Options":

*Turn on:* Relax order checks

...and:

*Turn on:* Glyph cache

...if you, while monitoring your XRDP log in your target *user* directory, notice something like this:

`rdpClientConCheck: rdpClientConGotData failed`

...you might have the same problem.

[***...Get back***](../it-the-hard-way.html)
