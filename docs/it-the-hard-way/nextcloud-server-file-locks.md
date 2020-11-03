Manually disable locking state:

<blockquote class="wp-block-quote">
  <p>
    put Nextcloud in maintenance mode: edit config/config.php and change this line:<br /> &#8216;maintenance&#8217; => true,<br /> Empty table oc_file_locks: Use tools such as phpmyadmin or connect directly to your database and run (the default table prefix is oc_, this prefix can be different or even empty):<br /> DELETE FROM oc_file_locks WHERE 1<br /> disable maintenance mode (undo first step).<br /> Make sure your cron-jobs run properly (you admin page tells you when cron ran the last time): https://docs.nextcloud.org/server/13/admin_manual/configuration_server/background_jobs_configuration.html 866
  </p>
</blockquote>

Permanent solution (if it happens regularly):

<blockquote class="wp-block-quote">
  <p>
    <br />On your own server: Use redis for this feature. It is faster and so far no problems have been reported. You can follow the instructions for memory-caching in the docs: https://docs.nextcloud.org/server/13/admin_manual/configuration_server/caching_configuration.html#id4 2.8k<br /> Shared hosting (others who can’t install redis): You can disable the file locking, edit your configuration file config/config.php:<br /> &#8216;filelocking.enabled&#8217; => false,<br /> However, disabling is not a good solution. You can run into problems when several processes try to write to a file (especially online editors in the web-interface).&#8221;
  </p>
</blockquote>

[***...Get back***](../it-the-hard-way.html)
