This was a bugger to fix. Here&#8217;s what I did. I run WSL v1 as v2 interferes with my much-loved Virtualbox use. I can&#8217;t run Docker, but as previously mentioned, at this time Docker on Windows sucks.

First, as root, install OpenSSH Server:

<pre class="wp-block-code"><code>apt install openssh-server</code></pre>

&#8230;then edit the file _/etc/ssh/sshd_config_ to look like this:

<pre class="wp-block-code"><code>#	$OpenBSD: sshd_config,v 1.103 2018/04/09 20:41:22 tj Exp $

# This is the sshd server system-wide configuration file.  See
# sshd_config(5) for more information.

# This sshd was compiled with PATH=/usr/bin:/bin:/usr/sbin:/sbin

# The strategy used for options in the default sshd_config shipped with
# OpenSSH is to specify options with their default value where
# possible, but leave them commented.  Uncommented options override the
# default value.

Include /etc/ssh/sshd_config.d/*.conf

Port 2222
#AddressFamily any
ListenAddress 0.0.0.0
#ListenAddress ::

#HostKey /etc/ssh/ssh_host_rsa_key
#HostKey /etc/ssh/ssh_host_ecdsa_key
#HostKey /etc/ssh/ssh_host_ed25519_key

# Ciphers and keying
#RekeyLimit default none

# Logging
SyslogFacility AUTH
LogLevel DEBUG

# Authentication:

#LoginGraceTime 2m
#PermitRootLogin prohibit-password
#StrictModes yes
#MaxAuthTries 6
#MaxSessions 10

#PubkeyAuthentication yes

# Expect .ssh/authorized_keys2 to be disregarded by default in future.
#AuthorizedKeysFile	.ssh/authorized_keys .ssh/authorized_keys2

#AuthorizedPrincipalsFile none

#AuthorizedKeysCommand none
#AuthorizedKeysCommandUser nobody

# For this to work you will also need host keys in /etc/ssh/ssh_known_hosts
#HostbasedAuthentication no
# Change to yes if you don't trust ~/.ssh/known_hosts for
# HostbasedAuthentication
#IgnoreUserKnownHosts no
# Don't read the user's ~/.rhosts and ~/.shosts files
#IgnoreRhosts yes

# To disable tunneled clear text passwords, change to no here!
PasswordAuthentication yes
#PermitEmptyPasswords no

# Change to yes to enable challenge-response passwords (beware issues with
# some PAM modules and threads)
ChallengeResponseAuthentication no

# Kerberos options
#KerberosAuthentication no
#KerberosOrLocalPasswd yes
#KerberosTicketCleanup yes
#KerberosGetAFSToken no

# GSSAPI options
#GSSAPIAuthentication no
#GSSAPICleanupCredentials yes
#GSSAPIStrictAcceptorCheck yes
#GSSAPIKeyExchange no

# Set this to 'yes' to enable PAM authentication, account processing,
# and session processing. If this is enabled, PAM authentication will
# be allowed through the ChallengeResponseAuthentication and
# PasswordAuthentication.  Depending on your PAM configuration,
# PAM authentication via ChallengeResponseAuthentication may bypass
# the setting of "PermitRootLogin without-password".
# If you just want the PAM account and session checks to run without
# PAM authentication, then enable this but set PasswordAuthentication
# and ChallengeResponseAuthentication to 'no'.
UsePAM yes

#AllowAgentForwarding yes
#AllowTcpForwarding yes
#GatewayPorts no
X11Forwarding yes
#X11DisplayOffset 10
#X11UseLocalhost yes
#PermitTTY yes
PrintMotd yes
#PrintLastLog yes
#TCPKeepAlive yes
#PermitUserEnvironment no
#Compression delayed
ClientAliveInterval 240
#ClientAliveCountMax 3
#UseDNS no
#PidFile /var/run/sshd.pid
#MaxStartups 10:30:100
#PermitTunnel no
#ChrootDirectory none
#VersionAddendum none

# no default banner path
#Banner none

# Allow client to pass locale environment variables
AcceptEnv LANG LC_*

# override default of no subsystems
Subsystem	sftp	/usr/lib/openssh/sftp-server

# Example of overriding settings on a per-user basis
#Match User anoncvs
#	X11Forwarding no
#	AllowTcpForwarding no
#	PermitTTY no
#	ForceCommand cvs server</code></pre>

Note the port (2222) especially in this file. This is needed if you have an SSH server already running under Windows natively.

Start the server for WSL:

<pre class="wp-block-code"><code>service start ssh</code></pre>

<div id="ez-toc-container" class="ez-toc-v2_0_11 counter-hierarchy counter-decimal ez-toc-grey">
  <div class="ez-toc-title-container">
    <p class="ez-toc-title">
      Table of Contents
    </p>
    
    <span class="ez-toc-title-toggle"><a class="ez-toc-pull-right ez-toc-btn ez-toc-btn-xs ez-toc-btn-default ez-toc-toggle"><i class="ez-toc-glyphicon ez-toc-icon-toggle"></i></a></span>
  </div><nav>
  
  <ul class="ez-toc-list ez-toc-list-level-1">
    <li class="ez-toc-page-1 ez-toc-heading-level-4">
      <a class="ez-toc-link ez-toc-heading-1" href="https://jwinn.getamonkey.com/?page_id=193#Cron_on_WSL" title="Cron on WSL">Cron on WSL</a>
    </li>
    <li class="ez-toc-page-1 ez-toc-heading-level-4">
      <a class="ez-toc-link ez-toc-heading-2" href="https://jwinn.getamonkey.com/?page_id=193#%E2%80%A6back_to_our_SSH_server_on_WSL_story" title="&#8230;back to our SSH server on WSL story">&#8230;back to our SSH server on WSL story</a>
    </li>
  </ul></nav>
</div>

#### <span class="ez-toc-section" id="Cron_on_WSL"></span>Cron on WSL<span class="ez-toc-section-end"></span>

Note that, as WSL does not have the full _systemd_ subset, you will not be able to use something like _systemctl_ to enable and routinely start your services. The best way I&#8217;ve found to get around this is to add a _cron_ job. Which brings up another problem. Cron under WSL itself.

To solve this problem, I searched around and found the following solution.

First, I have a .bat file that I keep in a folder called (uniquely) bin on my Windows 10 box, _cron.bat_:

<pre class="wp-block-code"><code>@echo off

start /B x410.exe /wm

pengwin run if [ -z \"$(pidof cron)\" ]; then "sudo /etc/init.d/cron start;  fi;"</code></pre>

&#8230;as you can see, this file will start the X-Windows app _410_ (which should already be running), then it will call the main executable for my WSL Linux implementation, _Pengin_. 

That instance will check to see if _cron_ is already running, and if it is not, it will execute, as root, cron from _/etc/init.d/cron_.

This file, in turn, is called by another file, _cron.vbs_. This is a _Visual Basic_ file that I have placed a copy of in my startup area (via _Windows+R_ and yhen _shell:startup_). It looks like this:

<pre class="wp-block-code"><code>Set WshShell = CreateObject("WScript.Shell") 
WshShell.Run chr(34) & "C:\Users\jeffr\bin\cron.bat" & Chr(34), 0
Set WshShell = Nothing</code></pre>

So, in theory, when Windows starts, it will use a shell via startup command line option to _Pengwin_ to start _cron_ on WSL.

#### <span class="ez-toc-section" id="%E2%80%A6back_to_our_SSH_server_on_WSL_story"></span>&#8230;back to our SSH server on WSL story<span class="ez-toc-section-end"></span>

Now that we have a working cron and working ssh, we need to adjust some security setting in Windows.

First, open up Windows Firewall, Advanced and add two rules; one for incoming and one for outgoing. Both rules should allow any IP access port 2222, which is where the SSH server on WSL will be looking for it&#8217;s connections.

Second, and depending on what kind of networking and what IP address your implementation of WSL is using, we need to use _netsh_ to redirect the traffic we are interested in to the correct port and IP. I ran the following from an elevated command prompt:

<pre class="wp-block-code"><code>netsh interface portproxy add v4tov4 listenport=2222 listenaddress=0.0.0.0 connectport=2222 connectaddress=0.0.0.0</code></pre>

That&#8217;s it. Now I can connect to my WSL instance using an alternate port:

<pre class="wp-block-code"><code>ssh -p 2222 jwinn@corellia</code></pre>

One confusion you might have is if you can scan your host and see the open port, but not get connected with the following error on the client side: 

<pre class="wp-block-code"><code>ssh_exchange_identification: read: Connection reset by peer</code></pre>

From what I can tell, this is caused by never fully connecting to the SSH server on WSL, likely because the traffic is not being routed correctly but the port is open. That&#8217;s what the _netsh_ command referenced above does.

[***...Get back***](..)
