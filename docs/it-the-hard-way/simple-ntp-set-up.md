# Simple NTP (Network Time Protocol) Set Up

Time is important on both workstations and servers.  If the time is off, this can impact things like certificate exchange, running services, even the ability to log in.

To correct this, the best advice is to configure and use a time service.  In my case, I want a single server (192.168.5.100) to connect with `NTP` "pools" on the Internet, and then configure my clients to talk to that server, rather than fill up the network with `NTP` traffic.

###Server Setup (assumes Debian Linux):

sudo apt install ntp

sudo ufw allow 123/udp

_(or `iptables`, etc.)_


Edit The Config:

    sudo vi /etc/ntp.conf

From /etc/ntpd.conf _(note **`changes`**)_:

    # /etc/ntp.conf, configuration for ntpd; see ntp.conf(5) for help

    driftfile /var/lib/ntp/ntp.drift

    # Leap seconds definition provided by tzdata
    leapfile /usr/share/zoneinfo/leap-seconds.list

    # Enable this if you want statistics to be logged.
    #statsdir /var/log/ntpstats/

    statistics loopstats peerstats clockstats
    filegen loopstats file loopstats type day enable
    filegen peerstats file peerstats type day enable
    filegen clockstats file clockstats type day enable


    # You do need to talk to an NTP server or two (or three).
    #server ntp.your-provider.example

    # pool.ntp.org maps to about 1000 low-stratum NTP servers.  Your server will
    # pick a different set every time it starts up.  Please consider joining the
    # pool: <http://www.pool.ntp.org/join.html>
    pool 0.debian.pool.ntp.org iburst
    pool 1.debian.pool.ntp.org iburst
    pool 2.debian.pool.ntp.org iburst
    pool 3.debian.pool.ntp.org iburst


    # Access control configuration; see /usr/share/doc/ntp-doc/html/accopt.html for
    # details.  The web page <http://support.ntp.org/bin/view/Support/AccessRestrictions>
    # might also be helpful.
    #
    # Note that "restrict" applies to both servers and clients, so a configuration
    # that might be intended to block requests from certain clients could also end
    # up blocking replies from your own upstream servers.

    # By default, exchange time with everybody, but don't allow configuration.
    restrict -4 default kod notrap nomodify nopeer noquery limited
    restrict -6 default kod notrap nomodify nopeer noquery limited

    # Local users may interrogate the ntp server more closely.
    restrict 127.0.0.1
    restrict ::1

    # Needed for adding pool entries
    restrict source notrap nomodify noquery

    # Clients from this (example!) subnet have unlimited access, but only if
    # cryptographically authenticated.
    #restrict 192.168.123.0 mask 255.255.255.0 notrust

**`restrict 192.168.5.0 mask 255.255.255.0 trust`**


    # If you want to provide time to your local subnet, change the next line.
    # (Again, the address is an example only.)
    #broadcast 192.168.123.255

**`broadcast 192.168.5.255`**

    # If you want to listen to time broadcasts on your local subnet, de-comment the
    # next lines.  Please do this only if you trust everybody on the network!
    #disable auth
    #broadcastclient

`sudo systemctl daemon-reload`

`sudo systemctl restart ntp`


Check Service:

    ntpq -p



###Client Setup (assumes WSL 2):

    sudo apt install ntpdate

    sudo apt install ntpsec

Edit Config _(note **`changes`**)_:

    sudo vi /etc/ntpsec/ntp.conf

    From /etc/ntpsec/ntp.conf:

        # /etc/ntpsec/ntp.conf, configuration for ntpd; see ntp.conf(5) for help

        driftfile /var/lib/ntpsec/ntp.drift
        leapfile /usr/share/zoneinfo/leap-seconds.list

        # To enable Network Time Security support as a server, obtain a certificate
        # (e.g. with Let's Encrypt), configure the paths below, and uncomment:
        # nts cert CERT_FILE
        # nts key KEY_FILE
        # nts enable

        # You must create /var/log/ntpsec (owned by ntpsec:ntpsec) to enable logging.
        #statsdir /var/log/ntpsec/
        #statistics loopstats peerstats clockstats
        #filegen loopstats file loopstats type day enable
        #filegen peerstats file peerstats type day enable
        #filegen clockstats file clockstats type day enable

        # This should be maxclock 7, but the pool entries count towards maxclock.
        tos maxclock 11

        # Comment this out if you have a refclock and want it to be able to discipline
        # the clock by itself (e.g. if the system is not connected to the network).
        tos minclock 4 minsane 3

        # Specify one or more NTP servers.

        # Public NTP servers supporting Network Time Security:
        # server time.cloudflare.com nts

**`server 192.168.5.100 prefer iburst`**

        # pool.ntp.org maps to about 1000 low-stratum NTP servers.  Your server will
        # pick a different set every time it starts up.  Please consider joining the
        # pool: <https://www.pool.ntp.org/join.html>

**`#pool 0.debian.pool.ntp.org iburst`**

**`#pool 1.debian.pool.ntp.org iburst`**

**`#pool 2.debian.pool.ntp.org iburst`**

**`#pool 3.debian.pool.ntp.org iburst`**

        # Access control configuration; see /usr/share/doc/ntpsec-doc/html/accopt.html
        # for details.
        #
        # Note that "restrict" applies to both servers and clients, so a configuration
        # that might be intended to block requests from certain clients could also end
        # up blocking replies from your own upstream servers.

        # By default, exchange time with everybody, but don't allow configuration.
        restrict default kod nomodify nopeer noquery limited

        # Local users may interrogate the ntp server more closely.
        restrict 127.0.0.1
        restrict ::1

_(NOTE:  requires `systemd` on WSL 2...may also have to force create directory:  `/var/log/ntpsec/`...then:  `sudo chown ntpsec:ntpsec /var/log/ntpsec/`)

`sudo systemctl daemon-reload`

`sudo systemctl start ntpsec`

`sudo systemctl status ntpsec`

Check Service:

    ntpq -p

[***...Get back***](../it-the-hard-way.html)
