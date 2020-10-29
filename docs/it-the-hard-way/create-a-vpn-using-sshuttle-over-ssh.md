# Create A VPN Using Sshuttle Over SSH

Generally, I use OpenVPN when I can.  But, sometimes, you need to create an ad hoc VPN on the fly without the time or utilities to set things up to use a proper VPN.

Enter Sshuttle.  Sshuttle uses standard SSH to create a VPN between any two hosts where SSH is an option.  As a UNIX Administrator, you probably already have that.

Available under macOS and Linux, you can install shuttle under Linux like so:

`sudo apt install sshuttle -y`

...once installed, the best way (due to some Linux kernel bugs that are out there) is to use the following syntax:

`sudo sshuttle -r USERNAME@SERVER_IP -x SERVER_IP 0/0 -vv`

...or, leave out the `-vv` for less noise.

Once successfully completed, you *should* be using the IP stack of the remote host you've connected into.

Nice!

[***...Get back***](..)
