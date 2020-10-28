Recently (today), I discovered my little Raspberry Pi 3 that I use as a weather forecast display next to my office/lab/sanctuary had sprung a bad MicroSD (storage for the device). So, I had to replace it.

First, I imaged a 32G MicroSD card with the latest Raspian OS, then I turned to a recent backup I had made of my MagicMirror install.

Upon startup, it did not work. I was getting and error that essentially pointed to a problem with some npm somewhere.

I tried everything I could think of:

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">npm install
npm install --force
sudo npm install</pre>

&#8230;and so on. Nothing. Then, I ran across a post that gave me the info I needed. As my normal pi user, and in the ~/MagicMirror directory, I ran:

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">npm rebuild</pre>

&#8230;and all is well!

[***...Get back***](..)
