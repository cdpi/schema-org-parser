
import { PROPERTY_HEADERS, PropertyParser } from "./parser/csv/parser.mjs";
import { statistics } from "./statistics.mjs";

const RELEASE_28_1 = "28.1";

interface TypeOrProperty
	{
	id:string;
	label:string;
	comment:string;
	supersedes:Array<string>|null;
	supersededBy:string|null;
	partOf:string|null;
	}

interface Property extends TypeOrProperty
	{
	subPropertyOf:Array<string>|null;
	equivalentProperty:string|null;
	subproperties:Array<string>|null;
	domainIncludes:Array<string>|null;
	rangeIncludes:Array<string>|null;
	inverseOf:string|null;
	}

interface Type extends TypeOrProperty
	{
	subTypeOf:Array<string>|null;
	enumerationtype:string|null;
	equivalentClass:Array<string>|null;
	properties:Array<string>|null;
	subTypes:Array<string>|null;
	}

interface Schema
	{
	properties:Map<string, Property>;
	types:Map<string, Type>;
	}

class SchemaOrg
	{
	constructor()
		{
		}

	static async csvStatistics()
		{
		let parser = new PropertyParser();

		let csv = await parser.downloadProperties(RELEASE_28_1);

		let records = parser.parse(csv);

		PROPERTY_HEADERS.forEach(header =>
			{
			//@ts-ignore
			let s = statistics(records.map(record => record[header]));
			console.log(header);
			console.log(s);
			});
		}

	/*
let schema = await parser.parse();

console.debug(schema.properties.size);
console.debug(schema.types.size);

console.debug(schema.properties.keys().next());

console.debug(schema.properties.get("https://schema.org/about"));

//console.log();

console.debug(JSON.stringify(Array.from(schema.properties.entries()), null, 4));
*/
	}

export
	{
	RELEASE_28_1,
	TypeOrProperty,
	Property,
	Type,
	Schema,
	SchemaOrg
	};
