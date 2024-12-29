
import { Thing } from "../../SchemaOrg.mjs";
import { AbstractParser } from "./AbstractParser.mjs";
import { Microdata } from "./Microdata.mjs";

// CLASS

class ThingParser extends AbstractParser
	{
	constructor()
		{
		super();
		}

	parse(element:Element):Thing
		{
		let thing = new Thing();

		thing.set("@type", this.getAttribute(element, Microdata.itemtype));

		this.parseProperties(element, thing);

		return thing;
		}

	parseProperties(thingElement:Element, thing:Thing):void
		{
		let elements = this.getElements(thingElement, Microdata.propertySelector);

		elements.forEach(element =>
			{
			let itemprop = this.getAttribute(element, Microdata.itemprop) as string;

			let itemtype = this.getAttribute(element, Microdata.itemtype);

			if (itemtype)
				{
				thing.set(itemprop, this.parse(element));
				}
			else
				{
				thing.set(itemprop, this.getContent(element));
				}
			});
		}
	}

// CLASS

export
	{
	ThingParser
	};
