
function mapDOM(element) {
    var treeObject = {};
    //Recursively loop through DOM elements and assign properties to object
    function treeHTML(element, object) {
        object["tagname"] = element.nodeName;
        var nodeList = element.childNodes;
        if (nodeList != null) {
            if (nodeList.length) {
				object["content"] = [];  
                for (var i = 0; i < nodeList.length; i++) {
					// If nodeType is three then it is a string instead of a html element. So add the string to the object instead of trying to parse its nodes
                  if (nodeList[i].nodeType == 3) {
                      object["content"].push(nodeList[i].nodeValue);
                  } else {
                    object["content"].push({});
                    treeHTML(nodeList[i], object["content"][object["content"].length - 1]);
                  }
                }
            }
        }
        if (element.attributes != null) {
            if (element.attributes.length) {
                object["attributes"] = {};
                for (var i = 0; i < element.attributes.length; i++) {
                    object["attributes"][element.attributes[i].nodeName] = element.attributes[i].nodeValue;
                }
            }
        }
    }
    treeHTML(element, treeObject);
    return treeObject;
}