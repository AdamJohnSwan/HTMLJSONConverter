This is a small project used to turn html into json and then turn that json back into html.
This is useful for storing data in object storage and you don't want to store html.

To run the example open up the /examples/example.html file.

Usage is as follows:

**Turn html into json**
Select what part of the document you want to turn into json
```
var initElement = document.getElementById("my-test-div");
```
and then pass that to the `mapDom` function
```
mapDOM(initElement);
```

**Turn json into html**
Parse the json string if need be
```
var pageObj = JSON.parse(jsonString)
```
Select an element on the page where the html to be converted will be added
```
var rootElement = document.getElementById("put-my-html-here")
```
Pass in the object and the element to the `mapJson` function
```
mapJson(pageObj, rootElement)
```