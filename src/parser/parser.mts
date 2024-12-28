
import { Thing } from "../schema-org.mjs";

// HTMLParser

class HTMLParser
	{
	private static readonly topLevelSelector:string = "[itemscope][itemtype]:not([itemscope][itemtype] *)";
	private static readonly propertySelector:string = "[itemprop]:not([itemprop] *)";
	private static readonly itemtype:string = "itemtype";
	private static readonly itemprop:string = "itemprop";
	private static readonly content:string = "content";

	constructor()
		{
		}

	getAttribute(element:Element, name:string):string|null
		{
		let attribute = element.attributes.getNamedItem(name);

		return (attribute === null) ? null : attribute.value;
		}

	getElements(element:Element, cssSelector:string):Array<Element>
		{
		return Array.from(element.querySelectorAll(cssSelector));
		}

	getContent(element:Element):string
		{
		let content = this.getAttribute(element, HTMLParser.content);

		return (content !== null) ? content : element.textContent as string;
		}

	getTopLevelElements(element:Element):Array<Element>
		{
		return this.getElements(element, HTMLParser.topLevelSelector);
		}

	parse(document:Document):Array<Thing>
		{
		let topLevelElements = this.getTopLevelElements(document.documentElement);

		return topLevelElements.map(topLevelElement => this.parseThing(topLevelElement));
		}

	parseFromString(html:string):Array<Thing>
		{
		return this.parse(new DOMParser().parseFromString(html, "text/html"));
		}

	private parseThing(element:Element):Thing
		{
		let thing = new Thing();

		thing.set("@type", this.getAttribute(element, HTMLParser.itemtype));

		this.parseProperties(element, thing);

		return thing;
		}

	private parseProperties(thingElement:Element, thing:Thing):void
		{
		let elements = this.getElements(thingElement, HTMLParser.propertySelector);

		elements.forEach(element =>
			{
			let itemprop = this.getAttribute(element, HTMLParser.itemprop) as string;

			let itemtype = this.getAttribute(element, HTMLParser.itemtype);

			if (itemtype)
				{
				thing.set(itemprop, this.parseThing(element));
				}
			else
				{
				thing.set(itemprop, this.getContent(element));
				}
			});
		}
	}

// HTMLParser

// Render

function render(thing:Thing):string
	{
	const cell = (text:string) => `<td>${text}</td>`;

	const row = (cells:Array<string>) => `<tr>${cells.map(cell).join("")}</tr>`;

	const table = (rows:Array<Array<string>>) => `<table border="1">${rows.map(row).join("")}</table>`;

	let values = new Array();

	thing.forEach((value, key) =>
		{
		if (value instanceof Map)
			{
			values.push(new Array(key, render(value as Thing)));
			}
		else
			{
			values.push(new Array(key, value as string));
			}
		});

	return table(values);
	}

// Render

export
	{
	HTMLParser,
	render
	};
