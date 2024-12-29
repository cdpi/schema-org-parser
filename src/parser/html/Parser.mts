
import { Thing } from "../../SchemaOrg.mjs";
import { AbstractParser } from "./AbstractParser.mjs";
import { Microdata } from "./Microdata.mjs";
import { ThingParser } from "./ThingParser.mjs";

// CLASS

class Parser extends AbstractParser
	{
	private thingParser:ThingParser;

	constructor()
		{
		super();

		this.thingParser = new ThingParser();
		}

	getTopLevelElements(element:Element):Array<Element>
		{
		return this.getElements(element, Microdata.topLevelSelector);
		}

	parse(element:Element):Array<Thing>
		{
		let topLevelElements = this.getTopLevelElements(element);

		return topLevelElements.map(topLevelElement => this.thingParser.parse(topLevelElement));
		}

	/*
	parse(document:Document):Array<Thing>
		{
		let topLevelElements = this.getTopLevelElements(document.documentElement);

		return topLevelElements.map(topLevelElement => this.parseThing(topLevelElement));
		}
	parseFromString(html:string):Array<Thing>
		{
		return this.parse(new DOMParser().parseFromString(html, "text/html"));
		}
	*/
	}

// CLASS

export
	{
	Parser
	};
