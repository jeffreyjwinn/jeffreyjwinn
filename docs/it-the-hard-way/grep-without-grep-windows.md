Grep Without GREP in Windows

You want to use `GREP`, but you don't want to install it in Windows.  That's fine, here's another way using `FINDSTR`:

You can use the ubiquitous (in Windows) `/?` to get help:

>findstr /?

...putting all that together, let's grep without `GREP`:

>findstr /I /S /M /C:"That thing I sent you"

[***...Get back***](../it-the-hard-way.html)
