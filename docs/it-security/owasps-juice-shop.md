## <span class="ez-toc-section" id="(WARNING_ongoing_and_many_outright_spoilers!)"></span>(WARNING: ongoing and _many outright spoilers!_) <span class="ez-toc-section-end"></span>

As you well know, The Open Web Application Security Project® (OWASP) is _the_ place to go for web-based security info. They are also keeper of the very important (and a must know) [OWASP Top Ten](https://owasp.org/www-project-top-ten/).

Even better, they make some [tools](https://owasp.org/www-project-zap/) and a collection of resources to help us learn the trade. Once of those is [Juice Shop](https://owasp.org/www-project-juice-shop/).

You can find an excellent reference and exploitation guide [here](https://pwning.owasp-juice.shop/) to get you started. This resource, like many I keep, is really just a working document/reminder set of notes for my own use.



In these notes, I go section by section in an order I prefer. Again, these are solutions, which **I do not encourage you to use as is**. Find out for yourself with some of the links I&#8217;ve provided here. You will learn that way, not by reading my notes

In these notes, kessel is my Juice Shop server ([in my case, a Docker instance under CentOS](https://jwinn.getamonkey.com/?page_id=92)).

#### <span class="ez-toc-section" id="To_find_the_score_board"></span>To find the score board<span class="ez-toc-section-end"></span>

This is really the place to start. So far as I know, the Score Board is the jumping off point for every other challenge in this resource.

<pre class="wp-block-code"><code class="">http://kessel:3000/#/score-board</code></pre>

#### <span class="ez-toc-section" id="DOM_XSS_Enter_into_search_toolbar_at_the_top"></span>DOM XSS. Enter into search toolbar at the top<span class="ez-toc-section-end"></span>

<pre class="wp-block-code"><code class="">&lt;iframe src="javascript:alert(`xss`)"></code></pre>

#### <span class="ez-toc-section" id="Bonus_Payload_Just_as_above,_enter_into_the_search_bar"></span>Bonus Payload. Just as above, enter into the search bar<span class="ez-toc-section-end"></span>

<pre class="wp-block-code"><code class="">&lt;iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/771984076&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true">&lt;/iframe></code></pre>

#### <span class="ez-toc-section" id="Privacy_Policy"></span>Privacy Policy<span class="ez-toc-section-end"></span>

Find this in the area of you Account.

#### <span class="ez-toc-section" id="Login_Admin_At_the_login_page,_login_as"></span>Login Admin. At the login page, login as:<span class="ez-toc-section-end"></span>

Username:

<pre class="wp-block-code"><code class="">' OR TRUE--</code></pre>

&#8230;this is based on the SQLite error that can be seen via the &#8220;developers&#8221; console in the browser. Specifically in Firefox Developer&#8217;s Edition:

<pre class="wp-block-code"><code class="">F12 -> Console</code></pre>

&#8230;and look for errors, then on the tab:

<pre class="wp-block-code"><code class="">Response</code></pre>

&#8230;the password can be anything. (BTW: admin email by default is admin@juice-sh.op

#### <span class="ez-toc-section" id="Login_MC_SafeSearch"></span> Login MC SafeSearch<span class="ez-toc-section-end"></span>

Logged in with the admin email:

<pre class="wp-block-code"><code class="">admin@juice-sh.op</code></pre>

&#8230;and the (eventually guessed at, with help from the tutorial) password:

<pre class="wp-block-code"><code class="">admin123</code></pre>

#### <span class="ez-toc-section" id="View_Basket"></span> View Basket<span class="ez-toc-section-end"></span>

Logged in to my account and navigated to Basket. Then using, the Developer&#8217;s Tools in my preferred version of Firefox (Developer&#8217;s Edition), change the key &#8220;bid&#8221; (found under _Storage -> Session Storage_) from what it was (14) to another number (13, in this case). This constitutes the basket of another user.

#### <span class="ez-toc-section" id="Confidential_Document"></span> Confidential Document <span class="ez-toc-section-end"></span>

You can find the location to look at by navigating to the About Us page and, in the middle of all the boilerplate Lorum Ipsum, find a link that reads &#8221;  
_Check out our boring terms of use if you are interested in such lame stuff_ &#8220;

Copy the link _http://kessel:3000/ftp/_ into your browser and browse away.

#### <span class="ez-toc-section" id="Error_Handling"></span>Error Handling<span class="ez-toc-section-end"></span>

&#8230;no idea, but I &#8220;solved&#8221; this at some point.

#### <span class="ez-toc-section" id="Exposed_Metrics"></span>Exposed Metrics<span class="ez-toc-section-end"></span>

For this one, first check out the link referred to in the listing &#8220;[popular monitoring system](https://github.com/prometheus/prometheus)&#8220;. It will take you to a GitHub project page. 

If you drill down through the documentation on this project page, you will eventually find reference to where the tool is expecting to find its data for scraping. Specifically, you can find it [here](https://github.com/prometheus/prometheus/blob/master/docs/configuration/configuration.md).

In the end, I found the end point on my instance:

<pre class="wp-block-code"><code class="">http://kessel:3000/metrics</code></pre>

#### <span class="ez-toc-section" id="Missing_Encoding"></span>Missing Encoding<span class="ez-toc-section-end"></span>

This one, at least for me, requires some tools available on the web.

First, look on the Photo Wall. There, you will see two images and one entry where and image should be, but is not. The problem here is that the encoding is wrong, at least for browser interpretation.

If you examine the content (again using your F12 Developer&#8217;s Tools), you will see the following URL that your browser can&#8217;t use:

<pre class="wp-block-code"><code class="">assets/public/images/uploads/????-#zatschi-#whoneedsfourlegs-1572600969477.jpg</code></pre>

The problem here is the actual emoji. It _could_ be that your browser is fine with it, but how it is being served just does not work.

Using [tools online](https://onlineunicodetools.com/url-encode-unicode), we take this string and re-encode it in a more browser-friendly way:

<pre class="wp-block-code"><code class="">assets/public/images/uploads/%f0%9f%98%bc-%23zatschi-%23whoneedsfourlegs-1572600969477.jpg
</code></pre>

&#8230;and, viola! We have our new image. 

Note that, even though I &#8220;solved&#8221; the problem and revealed the image, this challenge in the Score Board still shows as unsolved ????.

#### <span class="ez-toc-section" id="Outdated_Whitelist"></span>Outdated Whitelist<span class="ez-toc-section-end"></span>

This one was tricky for me. I had to resort to the [solve](https://pwning.owasp-juice.shop/appendix/solutions.html#let-us-redirect-you-to-one-of-our-crypto-currency-addresses), but I was on the right track, looking at associated JavaScript files. I did think that the entry point would be found in a different section (Other payment options) and not in Add new card.

In the end, this reworked URL did the trick:

<pre class="wp-block-code"><code class="">kessel:3000/redirect?to=https://blockchain.info/address/1AbKfgvw9psQ41NbLi8kufDQTezwG8DRZm</code></pre>

&#8230;what did help was the ability in Firefox Developer&#8217;s Edition to &#8220;prettify&#8221; the code.