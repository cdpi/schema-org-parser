
import { Thing } from "../../schema-org.mjs";

//"@context": "https://schema.org",
//"@type": ["AutoRental", "AutoRepair", "AutoWash"],
// ... itemtype="https://schema.org/AutoRental https://schema.org/AutoRepair https://schema.org/AutoWash" ...

class Parser
	{
	private static readonly topLevelSelector:string = "[itemscope][itemtype]:not([itemscope][itemtype] *)";
	private static readonly propertySelector:string = "[itemprop]:not([itemprop] *)";
	private static readonly itemtype:string = "itemtype";
	private static readonly itemprop:string = "itemprop";
	private static readonly content:string = "content";

	getElements(element:HTMLElement, cssSelector:string):Array<HTMLElement>
		{
		return Array.from(element.querySelectorAll(cssSelector));
		}

	getTopLevelElements(element:HTMLElement):Array<HTMLElement>
		{
		return this.getElements(element, Parser.topLevelSelector);
		}

	getAttribute(element:HTMLElement, name:string):string|null
		{
		let attribute = element.attributes.getNamedItem(name);

		return (attribute === null) ? null : attribute.value;
		}

	getContent(element:HTMLElement):string
		{
		//let content = this.getAttribute(element, Microdata.content);
		//return (content !== null) ? content : element.textContent as string;
		throw "getContent";
		}

	parse(element:HTMLElement):void
		{
		let topLevelElements = this.getTopLevelElements(element);

		//return topLevelElements.map(topLevelElement => this.thingParser.parse(topLevelElement));
		}

	/*
	parseFromString(html:string):Array<Thing>
		{
		return this.parse(new DOMParser().parseFromString(html, "text/html"));
		}
	*/

	// ... itemtype="https://schema.org/AutoRental https://schema.org/AutoRepair https://schema.org/AutoWash" ...
	parseType(element:HTMLElement):Array<string>|null
		{
		let itemtype = this.getAttribute(element, Parser.itemtype);

		if (!itemtype)
			{
			return null;
			}

		return itemtype.split(" ").map(type => type.trim());
		}

	parseThing(element:HTMLElement):Thing
		{
		let thing = new Thing();

		//thing.set("@type", this.parseType(element));

		thing = this.parseProperties(element, thing);

		//this.prop(element)(thing);

		return thing;
		}

	/*
	prop(element:HTMLElement):(thing:Thing) => void
		{
		return (thing:Thing) =>
			{
			let elements = this.getElements(element, Parser.propertySelector);
			elements.forEach(element =>
				{
				});
			};
		}
	*/

	parseProperties(element:HTMLElement, thing:Thing):Thing
		{
		let elements = this.getElements(element, Parser.propertySelector);

		elements.forEach(element =>
			{
			});

		return thing;
		}

	parseProperty(element:HTMLElement):void
		{
		let itemprop = this.getAttribute(element, Parser.itemprop) as string;

		let itemtype = this.getAttribute(element, Parser.itemtype);

		/*
		if (itemtype)
			{
			thing.set(itemprop, this.parse(element));
			}
		else
			{
			thing.set(itemprop, this.getContent(element));
			}
		*/
		}
	}

export
	{
	Parser
	};
