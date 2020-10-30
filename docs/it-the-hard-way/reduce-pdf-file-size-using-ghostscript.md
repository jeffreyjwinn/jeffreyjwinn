# Reduce PDF File Size Using Ghostscript

Thanks to [this](https://www.journaldev.com/34668/reduce-pdf-file-size-in-linux) tip, you can reduce (or simply change) the "dots per inch" (DPI) of a PDF file, as I needed to.

Simply install Ghostscript:

`sudo apt install ghostscript`

...and then use it to change the DPI of your file:

`gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH -sOutputFile=output.pdf input.pdf`

...as the [article](https://www.journaldev.com/34668/reduce-pdf-file-size-in-linux) points out, you can, among other options, specify the DPI settings you want to see in the finished document:

> -dPDFSETTINGS=/screen
>> Has a lower quality and smaller size. (72 dpi)
>
> -dPDFSETTINGS=/ebook
> >Has a better quality, but has a slightly larger size (150 dpi)
>
> -dPDFSETTINGS=/prepress
> >Output is of a higher size and quality (300
> dpi)
>
> -dPDFSETTINGS=/printer
> Output is of a printer type quality (300 dpi)
>
> -dPDFSETTINGS=/default
> >Selects the output which is useful for multiple purposes. Can cause large PDFS.

[***...Get back***](..)
