I love Terminator for my terminal solution. I use it on all distros, including Windows under WSL. I like Tilix on UN*X, ConEMU on Windows and of course TMUX whenever needed, but nothing works as well for me as Terminator. It _should_ also work with other xterm-like terminals.

Of course, there are a few issues. One of those is that the title bar on the active terminal window sets itself by some elven witchcraft and never comes back to make any sense.

For example, previous to this solution, were I to _ssh_ to my Windows &#8220;native&#8221; SSH server, I might wind up with a title bar like _C:\WINDOWS\system32\conhost.exe_. When I disconnect, this title would stay. No thanks.

This solution, cobbled together from various sources, goes in every _.bashrc_ file I have. Basically, I create a function in bash to call an extra bit after certain executables are run. Pretty self explanatory, so put this at the end of your _.bashrc_:

<pre class="wp-block-code"><code># set INITIAL Terminator title bar...
ORIG=$PS1
TITLE="\e]2;\$LOGNAME@$HOSTNAME\\a"
PS1=${ORIG}${TITLE}

# for terminator (and related) AFTER doing stuff...
function title()
{
   # change the title of the current window or tab
   echo -ne "\033]0;$*\007"
}

function ssh()
{
   /usr/bin/ssh "$@"
   # revert the window title after the ssh command
   title $USER@$HOST
}

function su()
{
   /bin/su "$@"
   # revert the window title after the su command
   title $USER@$HOST
}</code></pre>

[***...Get back***](../it-the-hard-way.html)
