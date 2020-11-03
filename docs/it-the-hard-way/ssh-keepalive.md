This is (primarily) for a Linux box. It should work with any _compliant_ OS.

To enable the keep alive system-wide (root access required), edit _/etc/ssh/ssh_config_; to set the settings for just your user, edit _~/.ssh/config_ (create the file if it doesn’t exist). Insert the following:

<pre class="wp-block-code"><code>Host *
     ServerAliveInterval 300
     ServerAliveCountMax 2</code></pre>

You can also make your OpenSSH server keep alive all connections with clients by adding the following to _/etc/ssh/sshd_config_:

<pre class="wp-block-code"><code>ClientAliveInterval 300
ClientAliveCountMax 2</code></pre>

[***...Get back***](../it-the-hard-way.html)
