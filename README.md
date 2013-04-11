# CuTML

## What I can do
I can cut your **string** and keep the **HTML** tags safe! ò/

##Usage
```
var CuTML = require('CuTML');
var newStr = CuTML(htmlString, options);
```
| Option | Type | Default
|:--|:--|:--
| maxSize | Int | `100` 
| reminder | String | `"... more."` 
| saveTags | Array | `[]`

###Clean usage:
```
var newStr = CuTML('<a>The book is on the table.</a>', {maxSize: 10});
```

CuTML will return a 10 length string with all the tags!

###Non-counted tags:
```
var newStr = CuTML('<span>non-counted text</span><a>The book is on the table.</a>', {maxSize: 10, saveTags: ['span']});
```
All the text inside `<span></span>` tags won't be counted!
