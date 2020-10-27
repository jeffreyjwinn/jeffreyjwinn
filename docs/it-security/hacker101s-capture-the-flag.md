---
id: 285
title: 'Hacker101&#8217;s Capture The Flag'
date: 2020-08-02T17:18:10-06:00
author: jwinn
layout: page
guid: https://jwinn.getamonkey.com/?page_id=285
---
<div id="ez-toc-container" class="ez-toc-v2_0_11 counter-hierarchy counter-decimal ez-toc-grey">
  <div class="ez-toc-title-container">
    <p class="ez-toc-title">
      Table of Contents
    </p>
    
    <span class="ez-toc-title-toggle"><a class="ez-toc-pull-right ez-toc-btn ez-toc-btn-xs ez-toc-btn-default ez-toc-toggle"><i class="ez-toc-glyphicon ez-toc-icon-toggle"></i></a></span>
  </div><nav>
  
  <ul class="ez-toc-list ez-toc-list-level-1">
    <li class="ez-toc-page-1 ez-toc-heading-level-2">
      <a class="ez-toc-link ez-toc-heading-1" href="https://jwinn.getamonkey.com/?page_id=285#(WARNING_ongoing_and_many_outright_spoilers!)" title="(WARNING:  ongoing and many outright spoilers!) ">(WARNING: ongoing and many outright spoilers!) </a><ul class="ez-toc-list-level-4">
        <li class="ez-toc-heading-level-4">
          <ul class="ez-toc-list-level-4">
            <li class="ez-toc-heading-level-4">
              <a class="ez-toc-link ez-toc-heading-2" href="https://jwinn.getamonkey.com/?page_id=285#Trivial_(1_/_flag)" title="Trivial (1 / flag) ">Trivial (1 / flag) </a>
            </li>
            <li class="ez-toc-page-1 ez-toc-heading-level-4">
              <a class="ez-toc-link ez-toc-heading-3" href="https://jwinn.getamonkey.com/?page_id=285#Easy_(2_/_flag)" title="Easy (2 / flag)">Easy (2 / flag)</a>
            </li>
            <li class="ez-toc-page-1 ez-toc-heading-level-4">
              <a class="ez-toc-link ez-toc-heading-4" href="https://jwinn.getamonkey.com/?page_id=285#Moderate" title="Moderate">Moderate</a><ul class="ez-toc-list-level-5">
                <li class="ez-toc-heading-level-5">
                  <a class="ez-toc-link ez-toc-heading-5" href="https://jwinn.getamonkey.com/?page_id=285#(3_/_flag)" title="(3 / flag)">(3 / flag)</a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul></nav>
</div>

## <span class="ez-toc-section" id="(WARNING_ongoing_and_many_outright_spoilers!)"></span>(WARNING: ongoing and _many outright spoilers!_) <span class="ez-toc-section-end"></span> {#mce_0}

Some notes on solving this set of Capture The Flag (CTF) challenges online from [Hacker 101](https://www.hacker101.com/) to get more knowledge.

As before, this guide is both my working notes and goes challenge by challenge, this time in order.

#### <span class="ez-toc-section" id="Trivial_(1_/_flag)"></span>Trivial (1 / flag) <span class="ez-toc-section-end"></span>

**Flag 1 of 1**

Flag is in the referenced PNG file. Pretty simple to find using a source view of the web page or F12 for the Developer&#8217;s Tab in Firefox.

#### <span class="ez-toc-section" id="Easy_(2_/_flag)"></span>Easy (2 / flag)<span class="ez-toc-section-end"></span>

**Flag 1 of 4**

This one was a little more tricky, as you would expect.

After some poking around, creating pages and two hints, I found that _page/4_ could not be read (403). But, just because it can&#8217;t be read doesn&#8217;t mean it can&#8217;t be edited. I used the _edit/4_ URL and found the flag in the included, original content. Nice.

**Flag 3 of 4**

I guess you don&#8217;t get to know which numbered flag you are looking for.

For flag 3, and in the end, after some hints and stumbling around, I created an XSS embedded in a new post and found the flag hidden in the related pop-up. I would not call this &#8220;easy&#8221;, but there you go. The code I based the XSS on:

<pre class="wp-block-code"><code class="">&lt;img src="http://url.to.file.which/not.exist" onerror=window.open("http://34.74.105.127","xss",'height=500,width=500');></code></pre>

**Flag 2 of 4**

Not 100% on how I go this one, but I basically used the code as above (Flag 3 of 4) in the body and subject of a new post, got a generic _Nginx_ welcome page, and when returning to the index, a popup with a flag.

Flag 4 of 4

This flag turned out to the based on an SQL injection. As another poster noted on the interweb, there was no way to know there even was a database involved here, but the hints _do_ say to try all injection types, including SQL.

In the end, the URL I used to get the flag was:

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">http://35.227.24.107/a0255779aa/page/edit/13'</pre>

&#8230;note the single quote. Going back &#8220;home&#8221; gave me the flag, and we move on.

#### <span class="ez-toc-section" id="Moderate"></span>Moderate<span class="ez-toc-section-end"></span>

##### <span class="ez-toc-section" id="(3_/_flag)"></span>(3 / flag)<span class="ez-toc-section-end"></span>

With authentication introduced to the mix, this required some help from another site on the intraweb.

The key was to submit a SQL injection in the username field with the password being set by that injection:

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">SELECT password FROM admins WHERE username = 'UNION SELECT "123" AS password from admins WHERE '1' = '1'</pre>

&#8230;once that was done, a new page show up titled &#8216;Private Page&#8217;. That&#8217;s where I found the first flag.