# Mount USB under WSL

I needed to update a large ZIP file I was preparing for someone.  Having originally created the file using ZIP, I wanted to refresh the archive using the `-r` switch.

Upon a WSL restart (forced by using `wsl --shutdown` at a command prompt in Windows), I found that the USB target, which is mounted under Windows as drive F:, did not appear.

I found what I needed to know [here](https://www.scivision.dev/mount-usb-drives-windows-subsystem-for-linux/).

First, I created the mount point I wanted to use in WSL:

`sudo mkdir /mnt/f`

...then, I mounted the USB drive:

`sudo mount -f drvfs f: /mntf`

...and I could perform my ZIP archive refresh.

[***...Get back***](../it-the-hard-way.html)
