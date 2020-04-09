var initElement = document.getElementById("my-test-div");
pageObj = mapDOM(initElement);
var parsedHtml = document.getElementById("parsedHtml");
parsedHtml.innerHTML = JSON.stringify(pageObj);
var rootElement = document.getElementById("parsedJson");
mapJson(pageObj, rootElement)