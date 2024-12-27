
import { parse as csvParseSync } from "csv-parse/sync";
import { Property, Type } from "../../schema-org.mjs";

const PROPERTY_HEADERS = ["id", "label", "comment", "subPropertyOf", "equivalentProperty", "subproperties", "domainIncludes", "rangeIncludes", "inverseOf", "supersedes", "supersededBy", "isPartOf"];

const TYPE_HEADERS = ["id", "label", "comment", "subTypeOf", "enumerationtype", "equivalentClass", "properties", "subTypes", "supersedes", "supersededBy", "isPartOf"];

interface TypeOrPropertyRecord
	{
	id:string;
	label:string;
	comment:string;
	supersedes:string;
	supersededBy:string;
	isPartOf:string;
	}

interface PropertyRecord extends TypeOrPropertyRecord
	{
	subPropertyOf:string;
	equivalentProperty:string;
	subproperties:string;
	domainIncludes:string;
	rangeIncludes:string;
	inverseOf:string;
	}

interface TypeRecord extends TypeOrPropertyRecord
	{
	subTypeOf:string;
	enumerationtype:string;
	equivalentClass:string;
	properties:string;
	subTypes:string;
	}

interface IParser<T extends TypeOrPropertyRecord>
	{
	parse(csv:string):Array<T>;

	/*
	public async parse():Promise<Schema>
		{
		let schema = {} as Schema;

		schema.properties = await this.downloadAndParseProperties();
		schema.types = await this.parseTypes();

		console.debug(schema.properties.size);
		console.debug(schema.types.size);

		return schema;
		}
	*/
	}

interface IPropertyParser
	{
	downloadProperties(release:string):Promise<string>;

	parseProperty(record:PropertyRecord):Property;
	}

interface ITypeParser
	{
	downloadTypes(release:string):Promise<string>;

	parseType(record:TypeRecord):Type;
	}

abstract class AbstractParser<T extends TypeOrPropertyRecord> implements IParser<T>
	{
	parse(csv:string):Array<T>
		{
		return csvParseSync(csv, {columns: true, skipEmptyLines: true}) as Array<T>;
		}

	protected asMap(array:Array<T>):Map<string, T>
		{
		let map = new Map<string, T>();

		array.forEach(item =>
			{
			map.set(item.id, item);
			});

		return map;
		}

	protected async download(release:string, what:string):Promise<string>
		{
		let url = `https://github.com/schemaorg/schemaorg/raw/refs/heads/main/data/releases/${release}/schemaorg-all-https-${what}.csv`;

		let request = await fetch(url);

		return request.text();
		}
	}

class PropertyParser extends AbstractParser<PropertyRecord> implements IPropertyParser
	{
	constructor()
		{
		super();
		}

	async downloadProperties(release:string):Promise<string>
		{
		return this.download(release, "properties");
		}

	/*
	public parseProperties(csv:string):Map<string, Property>
		{
		let records = csvParseSync(csv, {columns: true, skipEmptyLines: true}) as Array<PropertyRecord>;

		let properties = records.map((record:PropertyRecord) => this.parseProperty(record));

		return this.asMap(properties);
		}
	*/
	/*
	public async downloadAndParseProperties(release:string = RELEASE_28_1):Promise<Map<string, Property>>
		{
		let csv = await this.download(release, "properties");

		return this.parseProperties(csv);
		}
	*/

	parseProperty(record:PropertyRecord):Property
		{
		let property = {} as Property;

		/*
		property.id = record.id;
		property.label = record.label;
		property.comment = record.comment;
		property.subPropertyOf = this.nullOrArray(record.subPropertyOf);
		property.equivalentProperty = this.nullIfBlank(record.equivalentProperty);
		property.subproperties = this.nullOrArray(record.subproperties);
		property.domainIncludes = this.nullOrArray(record.domainIncludes);
		property.rangeIncludes = this.nullOrArray(record.rangeIncludes);
		property.inverseOf = this.nullIfBlank(record.inverseOf);
		property.supersedes = this.nullOrArray(record.supersedes);
		property.supersededBy = this.nullIfBlank(record.supersededBy);
		property.partOf = this.nullIfBlank(record.isPartOf);
		*/

		return property;
		}
	}

class TypeParser extends AbstractParser<TypeRecord> implements ITypeParser
	{
	constructor()
		{
		super();
		}

	async downloadTypes(release:string):Promise<string>
		{
		return this.download(release, "types");
		}

	/*
	public async parseTypes(release:string = RELEASE_28_1):Promise<Map<string, Type>>
		{
		let csv = await this.download(release, "types");

		let records = csvParseSync(csv, {columns: true, skipEmptyLines: true});

		let types = records.map((record:TypeRecord) => this.parseType(record));

		return this.asMap(types);
		}
	*/

	parseType(record:TypeRecord):Type
		{
		let type = {} as Type;

		/*
		type.id = record.id;
		type.label = record.label;
		type.comment = record.comment;
		type.subTypeOf = this.nullOrArray(record.subTypeOf);
		type.enumerationtype = this.nullIfBlank(record.enumerationtype);
		type.equivalentClass = this.nullOrArray(record.equivalentClass);
		type.properties = this.nullOrArray(record.properties);
		type.subTypes = this.nullOrArray(record.subTypes);
		type.supersedes = this.nullOrArray(record.supersedes);
		type.supersededBy = this.nullIfBlank(record.supersededBy);
		type.partOf = this.nullIfBlank(record.isPartOf);
		*/

		return type;
		}
	}

export
	{
	PROPERTY_HEADERS,
	TYPE_HEADERS,
	TypeOrPropertyRecord,
	PropertyRecord,
	TypeRecord,
	IParser,
	IPropertyParser,
	ITypeParser,
	PropertyParser,
	TypeParser
	};
