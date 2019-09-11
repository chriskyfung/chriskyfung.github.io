---
layout: post
title: "Highlighting words in PDF using the JavaScript console in PDF-Xchange Viewer"
date: 2015-04-09
category: Productivity
tags: PDF-Viewer shorthand makeuseof
---

For a long time, I have used PDF-Xchange Viewer to the PDF files of ebooks, papers, dissertations, etc. I prefer it rather than Adobe Reader. One of the reasons is because Xchange provides a JavaScript console, which can be invoked by hitting Ctrl+J. Thus, we can attempt to automate some annotations. ; for example, search and highlight words. You can find a source code from the knowledge base of Xchange (http://www.tracker-software.com/knowledgebase/385-How-do-I-Highlight-My-Search-Results). However, the original code can only find words that match exactly. Here, I modified the code in line 10 and thereby it highlights words that contains the text to be searched.

### Modified JS script

```js
﻿function DoHighlight(word) {
    var nTotal = 0;
     for (var p = 0; p < this.numPages; p++) {
        var cnt = this.getPageNumWords(p);
        for (var w = 0; w < cnt; w++) {
            var s = this.getPageNthWord(p, w);
            if (String(s).indexOf(word) >= 0) {
                this.addAnnot({
                    page: p,
                     type: "Highlight",
                    quads: this.getPageNthWordQuads(p, w),
                    });
                nTotal++;
               }
            }
        }
     return nTotal;
}
var t = DoHighlight("text to be searched");
console.println(t + " words were highlighted");
```

### Enhance productivity with text expanders

One little problem is that you have to copy and taste the code to the JavaScript console, when you closed the viewer and open it again. It is inconveient. One way to steamline it is to use a text expander, such as PhraseExpress, to create a shortcut/autotext to recall the script more easily and quickly. Thus, when I type the autotext (e.g. JS.h), then the all script is loaded to the console automatically.

* * *

### _See also_
- [How do I use JavaScript in PDF XChange Editor?](https://www.tracker-software.com/knowledgebase/355-How-do-I-use-JavaScript-in-PDF-XChange-Editor)