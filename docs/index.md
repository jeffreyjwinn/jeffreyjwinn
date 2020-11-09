{% include header.html %}

## Jeffrey Winn's Blog

## This blog is divided into sections. Some sections have to do with thoughts and ideas, while other sections are work resources.  Enjoy.

[Learned Philosophies](learned-philosophies.md)

[IT The Hard Way](it-the-hard-way.md)

[IT Security](it-security.md)

[Miscellaneous](miscellaneous.md)

[Contact](contact.md)

<form action="{{ page.url | relative_url }}">
  <div class="tipue_search_left"><img src="{{ "/assets/tipuesearch/search.png" | relative_url }}" class="tipue_search_icon"></div>
  <div class="tipue_search_right"><input type="text" name="q" id="tipue_search_input" pattern=".{3,}" title="At least 3 characters" required></div>
  <div style="clear: both;"></div>
</form>

<div id="tipue_search_content"></div>

<script>
$(document).ready(function() {
  $('#tipue_search_input').tipuesearch();
});
</script>

{% include footer.html %}
