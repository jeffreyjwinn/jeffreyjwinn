# Use Flock In Shell

Let's say you have a `crontab` entry where scripts are called and these scripts could take a while to run.  When the `cron` job comes back around, you don't want multiple instances of the scripts starting up.

Enter `flock`.  `Flock` will "lock" the script (or app) and not allow the script to execute again until the previous instance is completed.

By way of example, here is a partial of one of my `crontab` entries:

`# rclones for Google Drive`

`0 * * * * /usr/bin/flock -n /tmp/.rclone.CFBArtwork /var/www/bin/rclone-sync-CFBArtwork >/dev/null 2>&1`

`0 * * * * /usr/bin/flock -n /tmp/.rclone.CFBDocuments /var/www/bin/rclone-sync-CFBDocuments >/dev/null >&1`

`0 * * * * /usr/bin/flock -n /tmp/.rclone.CFBSales /var/www/bin/rclone-sync-CFBSales >/dev/null 2>&1`

`0 * * * * /usr/bin/flock -n /tmp/.rclone.CFBTaproom /var/www/bin/rclone-sync-CFBTaproom >/dev/null 2>&1`

`0 * * * * /usr/bin/flock -n /tmp/.rclone.CFBProduction var/www/bin/rclone-sync-CFBProduction >/dev/null >&1`

`0 * * * * /usr/bin/flock -n /tmp/.rclone.CFBtmp /var/www/bin/rclone-sync-CFBtmp >/dev/null 2>&1`

[***...Get back***](../it-the-hard-way.html)
