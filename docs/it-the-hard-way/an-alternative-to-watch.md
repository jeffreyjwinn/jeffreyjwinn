# An Alternative To Watch

I like me some `watch`, but there is no way I'm aware of to turn off the clearing of the screen before your command does its thing again.  That is annoying when, in my example of a temperature change, you wish to see things as they progress.

So, instead of using `watch`, use your shell, something I saw first [here](https://unix.stackexchange.com/questions/56093/output-of-watch-command-as-a-list).

For my example, I used:

    while sleep 5; do
        ./cputemp.py
    done

[***...Get back***](../it-the-hard-way.html)
