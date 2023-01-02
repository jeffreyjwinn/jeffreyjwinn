With the release of a version of [Windows Subsystem for Linux (WSL) that support systemd](https://devblogs.microsoft.com/commandline/systemd-support-is-now-available-in-wsl/), we now have the ability to do many new things, including run system-level services.

For example, previously, this command would get you nowhere:

    systemctl status nginx

...in order to use this feature, and [from the official release info](https://devblogs.microsoft.com/commandline/systemd-support-is-now-available-in-wsl/):

**This change is only available in the Microsoft Store version of WSL version 0.67.6 and higher.**

...once you have this release, which is only available to Windows 11 clients, note that you must add the following in `/etc/wsl.conf`:

    [boot]
    systemd=true

[***...Get back***](../it-the-hard-way.html)
