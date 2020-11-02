I&#8217;ve used this for Windows Subsystem for Linux (WSL). It could probably be used for Docker as well (as they suffer some of the same restrictions).

The script, in this case for SSH:

<pre class="wp-block-code"><code>#!/bin/bash

RESTART="/usr/bin/service ssh restart"

#Path to pgrep command
PGREP="/usr/bin/pgrep"

# Httpd daemon name: Under RHEL/CentOS/Fedora it is httpd
PID="sshd"

$PGREP ${PID}

if [ $? -ne 0 ] # if not running
then
 # restart
 $RESTART
fi</code></pre>

&#8230;and the crontab entry to run it, every 5 minutes:

<pre class="wp-block-code"><code># Start SSHD daemon if not running...
*/5 * * * *     /root/bin/ssh-crond.sh > /dev/null 2>&1</code></pre>

[***...Get back***](../it-the-hard-way.html)
