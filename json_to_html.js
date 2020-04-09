
function mapJson(object, element) {
	if (typeof object === "string") {
		var textNode = document.createElement("text");
		textNode.innerHTML = object;
		element.appendChild(textNode);
		return;
	}
	var newElement = document.createElement(object["TagName"]);
    if(object["Attributes"]) {
		for (var key in object["Attributes"]) {
			if (object["Attributes"].hasOwnProperty(key)) {
				var newAttribute = document.createAttribute(key);
				newAttribute.value = object["Attributes"][key];
				newElement.setAttributeNode(newAttribute)
			}
		}
    }
    if(object["Content"]) {
		for(var i = 0; i < object["Content"].length; i++) {
			mapJson(object["Content"][i], newElement);
		}
    }
    //Add it to the page
    element.appendChild(newElement);
}