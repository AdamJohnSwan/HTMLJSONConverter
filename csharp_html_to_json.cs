using System;
using HtmlAgilityPack;
using Newtonsoft.Json;
using System.Collections;

public class HtmlAttributes 
{
	public string style {get; set;}
	public string @class {get; set;}
}

public class HtmlElement
{
	[JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
	public ArrayList content { get; set; }
	[JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
	public string tagname {get; set;}
	[JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
	public HtmlAttributes attributes { get; set; }
}

public class Program
{
	public static void Main()
	{
		var html = "<html><div><span>Text1</span>Text2</div></html>";

		var htmlDoc = new HtmlDocument();
		htmlDoc.LoadHtml(html);
		
		var htmlNode = htmlDoc.DocumentNode.SelectSingleNode("//html");
		
		HtmlElement htmlElement = new HtmlElement();
		HtmlElement convertedJson = treeHtml(htmlNode, htmlElement);  
		
		string serializedJson = JsonConvert.SerializeObject(convertedJson);
		Console.WriteLine(serializedJson);
	}
	
	private static HtmlElement treeHtml(HtmlNode element, HtmlElement obj)
	{
		obj.tagname = element.Name;
		var nodeList = element.ChildNodes;
		if (nodeList != null)
		{
			if (nodeList.Count > 0)
			{
				obj.content = new ArrayList();
				for (var i = 0; i < nodeList.Count; i++)
				{
					if (nodeList[i].HasChildNodes)
					{
						obj.content.Add(new HtmlElement());
						(obj.content[i] as HtmlElement).tagname = nodeList[i].Name;
						obj.content[i] = treeHtml(nodeList[i], obj.content[i] as HtmlElement);
					}
					else
					{
						// If it doesn't have child nodes then it is just text
						obj.content.Add(nodeList[i].InnerText);
					}
				}
			}
		}
		// Gotta add the attributes as well
		if (element.Attributes.Count > 0)
		{
			obj.attributes = new HtmlAttributes();
			for (var i = 0; i < element.Attributes.Count; i++)
			{
				if (element.Attributes[i].Name == "style")
				{
					obj.attributes.style = element.Attributes[i].Value;
				}
				if (element.Attributes[i].Name == "class")
				{
					obj.attributes.@class = element.Attributes[i].Value;
				}
			}
		}
		return obj;
	}
	
}