# Send Multiple Files Using Find And Swaks 

I needed to send a bunch of pictures one at a time through email.  

To do this, I used my Gmail account, `find` and `swaks`.

If you use Gmail and use two-factor authentication, you will need to get an "app password" to connect to SMTP.  You can find out more about that [here](https://support.google.com/accounts/answer/185833?hl=en).

With that done, Swaks installed, etc., you can use something like the following in your shell:

`find . -name "*.jpg" -exec swaks --to "foo@gmail.com" -s smtp.gmail.com:587 -au "bar@gmail.com" -ap <YOUR PASSWORD>  --attach {} -tls --h-Subject {} --body "Email of Picture: {}" \;`

[***...Get back***](../it-the-hard-way.html)
