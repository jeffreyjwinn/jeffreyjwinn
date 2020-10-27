---
id: 135
title: 'Favorite UN*X Cheat Sheet'
date: 2020-07-23T21:42:56-06:00
author: jwinn
layout: page
guid: https://jwinn.getamonkey.com/?page_id=135
---
<pre class="wp-block-code"><code>RPM:

     List all installed packages by size:

      rpm -qa --queryformat '%{size} %{name}\n' | sort -rn | more
--
Regexp syntax:



- c matches the non-metacharacter c.
- \c matches the literal character c.
- . matches any character including newline.
- ^ matches the beginning of a string (example: ^1 , only lines starting with a one)
- $ matches the end of a string (example: end$ , only lines ending in "end")
- [abc...] character list, matches any of the characters abc....
- [0-9a-zA-Z] range of characters 0-9 and a-z,A-Z
- [^abc...] negated character list, matches any character except abc....
- r1|r2 alternation: matches either r1 or r2.
- r1r2 concatenation: matches r1, and then r2.
- r+ matches one or more r's.
- r* matches zero or more r's.
- r? matches zero or one r's.
- (r) grouping: matches r.

--
AWK:

Print selected fields

Split up the lines of the file file.txt with ":" (colon) separated fields and print the second field ($2) of each line:
    awk -F":" '{print $2}' file.txt

Same as above but print only output if the second field ($2) exists and is not empty:
    awk -F":" '{if ($2)print $2}' file.txt

Print selected fields from each line separated by a dash:
    awk -F: '{ print $1 "-" $4 "-" $6 }' file.txt

Print the last field in each line:
    awk -F: '{ print $NF }' file.txt

Print every line and delete the second field:
     awk '{ $2 = ""; print }'

Good to know:

- The commandline option -F sets the field separator. The default is space.
- $0 the entire line without the newline at the end
- $1 to $9, $10 to ..., the fields
- NF number of fields
- NR currant line number (counting across all files for multiple files)
- FR line number (just for that file)

Print matching lines

Print field number two ($2) only on lines matching "some regexp":
    awk -F":" '/some regexp/{print $2}' file.txt

Print field number two ($2) only on lines not matching "some regexp":
    awk -F":" '!/some regexp/{print $2}' file.txt or awk -F":" '/some regexp/{next;}{print $2}' file.txt

Print field number two ($2) only on lines matching "some regexp" otherwise print field number three ($3):
    awk -F":" '/some regexp/{print $2;next}{print $3}' file.txt

The "next" command causes awk to continue with the next line and execute "{print $3}" only for non matching lines. This is like
/regexp/{...if..regexp..matches...;next}{...else...}

Print the next two (i=2) lines after the line matching regexp:
    awk '/regexp/{i=2;next;}{if(i){i--; print;}}' file.txt

Print the line and the next two (i=2) lines after the line matching regexp:
    awk '/regexp/{i=2+1;}{if(i){i--; print;}}' file.txt

Print the lines from a file starting at the line matching "start" until the line matching "stop":
    awk '/start/,/stop/' file.txt

Replacement for some common unix commands (useful in a non unix environment)

Count lines (wc -l):
    awk 'END{print NR}'

Search for matching lines (egrep regexp):
    awk '/regexp/'

Print non matching lines (egrep -v regexp):
    awk '!/regexp/'

Print matching lines and ignore case (egrep -i regexp):
    awk 'BEGIN {IGNORECASE=1};/regexp/'

Number lines (cat -n):
    awk '{print FNR "\t" $0}'

Remove duplicate consecutive lines (uniq):
     awk 'a !~ $0{print}; {a=$0}'

Print first 5 lines of file (head -5):
     awk 'NR &lt; 6'

Number non empty lines

This prints all lines and adds a line number to non empty lines:
    awk '/^..*$/{ print NR ":" $0 ;next}{print}' file.txt

Substitute foo for bar on lines matching regexp

    awk '/regexp/{gsub(/foo/, "bar")};{print}' file.txt

Delete trailing white space (spaces, tabs)

    awk '{sub(/[ \t]*$/, "");print}' file.txt

Delete leading white space

    awk '{sub(/^[ \t]+/, ""); print}' file.txt

Add some characters at the beginning of matching lines

Add ++++ at lines matching regexp.
     awk '/regexp/{sub(/^/, "++++"); print;next;}{print}' file.txt

Color gcc warnings in red

     gcc -Wall main.c |& awk '/: warning:/{print "\x1B[01;31m" $0 "\x1B[m";next;}{print}'
The "\x1B" means the ascii character with hex number 1B (ESC).

Print only lines of less than 80 characters

    awk 'length &lt; 80' file.txt

*** VI/VIM Cheat Sheet ***

Cursor movement

- h - move cursor left
- j - move cursor down
- k - move cursor up
- l - move cursor right
- w - jump forwards to the start of a word
- W - jump forwards to the start of a word (words can contain punctuation)
- e - jump forwards to the end of a word
- E - jump forwards to the end of a word (words can contain punctuation)
- b - jump backwards to the start of a word
- B - jump backwards to the start of a word (words can contain punctuation)
- 0 - jump to the start of the line
- ^ - jump to the first non-blank character of the line
- $ - jump to the end of the line
- gg - go to the first line of the document
- G - go to the last line of the document
- 5G - go to line 5
- fx - jump to next occurrence of character x
- tx - jump to before next occurrence of character x
- } - Jump to next paragraph (or function/block, when editing code)
- { - Jump to previous paragraph (or function/block, when editing code)

Tip Prefix a cursor movement command with a number to repeat it. For example, 4jmoves down 4 lines.

Insert mode - inserting/appending text

- i - insert before the cursor
- I - insert at the beginning of the line
- a - insert (append) after the cursor
- A - insert (append) at the end of the line
- o - append (open) a new line below the current line
- O - append (open) a new line above the current line
- ea - insert (append) at the end of the word
- Esc - exit insert mode

Editing

- r - replace a single character
- J - join line below to the current one
- cc - change (replace) entire line
- cw - change (replace) to the end of the word
- c$ - change (replace) to the end of the line
- s - delete character and substitute text
- S - delete line and substitute text (same as cc)
- xp - transpose two letters (delete and paste)
- u - undo
- Ctrl + r - redo
- . - repeat last command

Marking text (visual mode)

- v - start visual mode, mark lines, then do a command (like y-yank)
- V - start linewise visual mode
- o - move to other end of marked area
- Ctrl + v - start visual block mode
- O - move to other corner of block
- aw - mark a word
- ab - a block with ()
- aB - a block with {}
- ib - inner block with ()
- iB - inner block with {}
- Esc - exit visual mode

Visual commands

- > - shift text right
- &lt; - shift text left
- y - yank (copy) marked text
- d - delete marked text
- ~ - switch case

Cut and paste

- yy - yank (copy) a line
- 2yy - yank (copy) 2 lines
- yw - yank (copy) word
- y$ - yank (copy) to end of line
- p - put (paste) the clipboard after cursor
- P - put (paste) before cursor
- dd - delete (cut) a line
- 2dd - delete (cut) 2 lines
- dw - delete (cut) word
- D - delete (cut) to the end of the line
- d$ - delete (cut) to the end of the line
- x - delete (cut) character

Exiting

- :w - write (save) the file, but don't exit
- :w !sudo tee % - write out the current file using sudo
- :wq or :x or ZZ - write (save) and quit
- :q - quit (fails if there are unsaved changes)
- :q! or ZQ - quit and throw away unsaved changes

Search and replace

- /pattern - search for pattern
- ?pattern - search backward for pattern
- \vpattern - 'very magic' pattern: non-alphanumeric characters are interpreted as special regex symbols (no escaping needed)
- n - repeat search in same direction
- N - repeat search in opposite direction
- :%s/old/new/g - replace all old with new throughout file
- :%s/old/new/gc - replace all old with new throughout file with confirmations
- :noh - remove highlighting of search matches

Search in multiple files

- :vimgrep /pattern/ {file} - search for pattern in multiple files

e.g. :vimgrep /foo/ **/*

- :cn - jump to the next match
- :cp - jump to the previous match
- :copen - open a window containing the list of matches

Working with multiple files

- :e filename - edit a file in a new buffer
- :bnext or :bn - go to the next buffer
- :bprev or :bp - go to the previous buffer
- :bd - delete a buffer (close a file)
- :ls - list all open buffers
- :sp filename - open a file in a new buffer and split window
- :vsp filename - open a file in a new buffer and vertically split window
- Ctrl + ws - split window
- Ctrl + ww - switch windows
- Ctrl + wq - quit a window
- Ctrl + wv - split window vertically
- Ctrl + wh - move cursor to the left window (vertical split)
- Ctrl + wl - move cursor to the right window (vertical split)
- Ctrl + wj - move cursor to the window below (horizontal split)
- Ctrl + wk - move cursor to the window above (horizontal split)

Tabs

- :tabnew filename or :tabn filename - open a file in a new tab
- Ctrl + wT - move the current split window into its own tab
- gt or :tabnext or :tabn - move to the next tab
- gT or :tabprev or :tabp - move to the previous tab
- #gt - move to tab number #
- :tabmove # - move current tab to the #th position (indexed from 0)
- :tabclose or :tabc - close the current tab and all its windows
- :tabonly or :tabo - close all tabs except for the current one
- :tabdo command - run the command on all tabs (e.g. :tabdo q - closes all opened tabs)
</code></pre>