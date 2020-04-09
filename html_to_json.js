
function mapDOM(element) {
    var treeObject = {};
    //Recursively loop through DOM elements and assign properties to object
    function treeHTML(element, object) {
        object["TagName"] = element.nodeName;
        var nodeList = element.childNodes;
        if (nodeList != null) {
            if (nodeList.length) {
				object["Content"] = [];  
                for (var i = 0; i < nodeList.length; i++) {
					// If nodeType is three then it is a string instead of a html element. So add the string to the object instead of trying to parse its nodes
                  if (nodeList[i].nodeType == 3) {
                      object["Content"].push(nodeList[i].nodeValue);
                  } else {
                    object["Content"].push({});
                    treeHTML(nodeList[i], object["Content"][object["Content"].length - 1]);
                  }
                }
            }
        }
        if (element.attributes != null) {
            if (element.attributes.length) {
                object["Attributes"] = {};
                for (var i = 0; i < element.attributes.length; i++) {
                    object["Attributes"][element.attributes[i].nodeName] = element.attributes[i].nodeValue;
                }
            }
        }
    }
    treeHTML(element, treeObject);
    return treeObject;
}