
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

/*
interface Schema
	{
	properties:Map<string, Property>;
	types:Map<string, Type>;
	}
*/

class SchemaOrg
	{
	constructor()
		{
		}

	/*
	static async propertiesToJSON():Promise<string>
		{
		let parser = new PropertyParser();

		let csv = await parser.downloadProperties(RELEASE_28_1);

		let properties = parser.parseProperties(csv);

		let values = Array.from(properties.values());

		return JSON.stringify(values, null, 2);
		}
	*/
	}

export
	{
	RELEASE_28_1,
	TypeOrProperty,
	Property,
	Type,
	//Schema,
	SchemaOrg
	};
