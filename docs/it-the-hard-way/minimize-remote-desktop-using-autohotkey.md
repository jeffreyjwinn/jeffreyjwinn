I use AutoHotkey as my keyboard shortcut app under Windows 10. I&#8217;ve been looking for a way to minimize the normally full-screen session with a key combination.

Then I ran across this gem, which works great!:

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">#IfWinActive ahk_class TscShellContainerClass
  ^Capslock::           ; Ctrl+Caps Lock (couldn't make Ctrl+Shift+Caps Lock work for some reason
    ; Need a short sleep here for focus to restore properly.
    Sleep 50
    WinMinimize A    ; need A to specify Active window
    ;MsgBox, Received Remote Desktop minimize hotkey    ; uncomment for debugging
  return
#IfWinActive</pre>

[***...Get back***](..)
