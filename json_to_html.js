
function mapJson(object, element) {
	if (typeof object === "string") {
		var textNode = document.createElement("text");
		textNode.innerHTML = object;
		element.appendChild(textNode);
		return;
	}
	var newElement = document.createElement(object["tagname"]);
    if(object["attributes"]) {
		for (var key in object["attributes"]) {
			if (object["attributes"].hasOwnProperty(key)) {
				var newAttribute = document.createAttribute(key);
				newAttribute.value = object["attributes"][key];
				newElement.setAttributeNode(newAttribute)
			}
		}
    }
    if(object["content"]) {
		for(var i = 0; i < object["content"].length; i++) {
			mapJson(object["content"][i], newElement);
		}
    }
    //Add it to the page
    element.appendChild(newElement);
}