
import { parse as csvParseSync } from "csv-parse/sync";
import { RELEASE_28_1, TypeOrProperty, Property, Type, Enumeration, Schema } from "../../SchemaOrg.mjs";
import { Statistics, statistics } from "./statistics.mjs";

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

	[name:string]:string;
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
	}

interface IPropertyParser
	{
	downloadProperties(release:string):Promise<string>;

	parseProperties(csv:string):Map<string, Property>;

	parseProperty(record:PropertyRecord):Property;
	}

interface ITypeParser
	{
	downloadTypes(release:string):Promise<string>;

	parseTypes(csv:string):Map<string, Type>;

	parseType(record:TypeRecord):Type;
	}

interface IEnumerationParser
	{
	parseEnumerations(types:Map<string, Type>):Map<string, Enumeration>;
	}

abstract class AbstractParser<T extends TypeOrPropertyRecord, U extends TypeOrProperty> implements IParser<T>
	{
	parse(csv:string):Array<T>
		{
		return csvParseSync(csv, {columns: true, skipEmptyLines: true}) as Array<T>;
		}

	protected asMap(array:Array<U>):Map<string, U>
		{
		let map = new Map<string, U>();

		array.forEach(item =>
			{
			map.set(item.id, item);
			});

		return map;
		}

	protected stringOrNull(column:string):string|null
		{
		if (column.trim().length === 0)
			{
			return null;
			}

		return column;
		}

	protected arrayOrNull(column:string):Array<string>|null
		{
		if (column.trim().length === 0)
			{
			return null;
			}

		return column.split(",").map(text => text.trim());
		}

	protected async download(release:string, what:string):Promise<string>
		{
		let url = `https://github.com/schemaorg/schemaorg/raw/refs/heads/main/data/releases/${release}/schemaorg-all-https-${what}.csv`;

		let request = await fetch(url);

		return request.text();
		}
	}

class PropertyParser extends AbstractParser<PropertyRecord, Property> implements IPropertyParser
	{
	constructor()
		{
		super();
		}

	async downloadProperties(release:string):Promise<string>
		{
		return this.download(release, "properties");
		}

	parseProperties(csv:string):Map<string, Property>
		{
		return this.asMap(this.parse(csv).map(record => this.parseProperty(record)));
		}

	parseProperty(record:PropertyRecord):Property
		{
		let property = {} as Property;

		property.id = record.id;
		property.label = record.label;
		property.comment = record.comment;
		property.subPropertyOf = this.arrayOrNull(record.subPropertyOf);
		property.equivalentProperty = this.stringOrNull(record.equivalentProperty);
		property.subproperties = this.arrayOrNull(record.subproperties);
		property.domainIncludes = this.arrayOrNull(record.domainIncludes);
		property.rangeIncludes = this.arrayOrNull(record.rangeIncludes);
		property.inverseOf = this.stringOrNull(record.inverseOf);
		property.supersedes = this.arrayOrNull(record.supersedes);
		property.supersededBy = this.stringOrNull(record.supersededBy);
		property.partOf = this.stringOrNull(record.isPartOf);

		return property;
		}

	async csvStatistics(release:string):Promise<Map<string, Statistics>>
		{
		let csv = await this.downloadProperties(release);

		let records = this.parse(csv);

		let map = new Map<string, Statistics>();

		PROPERTY_HEADERS.forEach(header =>
			{
			map.set(header, statistics(records.map(record => record[header])));
			});

		return map;
		}
	}

class TypeParser extends AbstractParser<TypeRecord, Type> implements ITypeParser
	{
	constructor()
		{
		super();
		}

	async downloadTypes(release:string):Promise<string>
		{
		return this.download(release, "types");
		}

	parseTypes(csv:string):Map<string, Type>
		{
		return this.asMap(this.parse(csv).map(record => this.parseType(record)));
		}

	parseType(record:TypeRecord):Type
		{
		let type = {} as Type;

		type.id = record.id;
		type.label = record.label;
		type.comment = record.comment;
		type.subTypeOf = this.arrayOrNull(record.subTypeOf);
		type.enumerationtype = this.stringOrNull(record.enumerationtype);
		type.equivalentClass = this.arrayOrNull(record.equivalentClass);
		type.properties = this.arrayOrNull(record.properties);
		type.subTypes = this.arrayOrNull(record.subTypes);
		type.supersedes = this.arrayOrNull(record.supersedes);
		type.supersededBy = this.stringOrNull(record.supersededBy);
		type.partOf = this.stringOrNull(record.isPartOf);

		return type;
		}

	async csvStatistics(release:string):Promise<Map<string, Statistics>>
		{
		let csv = await this.downloadTypes(release);

		let records = this.parse(csv);

		let map = new Map<string, Statistics>();

		TYPE_HEADERS.forEach(header =>
			{
			map.set(header, statistics(records.map(record => record[header])));
			});

		return map;
		}
	}

class EnumerationParser implements IEnumerationParser
	{
	parseEnumerations(types:Map<string, Type>):Map<string, Enumeration>
		{
		let enumerationTypeIDs = new Set<string>();
		let enumerationMembers = new Map<string, Type>();

		// Rechercher toutes les énumerations et membres d'une énumeration
		types.forEach((type, id) =>
			{
			if (type.enumerationtype !== null)
				{
				enumerationTypeIDs.add(type.enumerationtype);

				enumerationMembers.set(id, type);

				types.delete(id);
				}
			});

		let enumerations = new Map<string, Enumeration>();

		// Transformer le type en énumeration
		enumerationTypeIDs.forEach(enumerationTypeID =>
			{
			let enumeration = types.get(enumerationTypeID) as Enumeration;

			enumeration.enumerationMembers = new Array<Type>();

			enumerations.set(enumerationTypeID, enumeration);

			types.delete(enumerationTypeID);
			});

		// Ajouter les membres de l'énumeration
		enumerationMembers.forEach((enumerationMember, id) =>
			{
			let enumerationID = enumerationMember.enumerationtype as string;

			enumerations.get(enumerationID)?.enumerationMembers.push(enumerationMember);
			});

		return enumerations;
		}
	}

class CSVParser
	{
	readonly release:string;

	constructor(release:string = RELEASE_28_1)
		{
		this.release = release;
		}

	async downloadAndParseProperties():Promise<Map<string, Property>>
		{
		let parser = new PropertyParser();

		let csv = await parser.downloadProperties(this.release);

		return parser.parseProperties(csv);
		}

	async downloadAndParseTypes():Promise<Map<string, Type>>
		{
		let parser = new TypeParser();

		let csv = await parser.downloadTypes(this.release);

		return parser.parseTypes(csv);
		}

	async parse():Promise<Schema>
		{
		let schema = {} as Schema;

		let properties = await this.downloadAndParseProperties();
		let types = await this.downloadAndParseTypes();

		let enumerationParser = new EnumerationParser();

		let enumerations = enumerationParser.parseEnumerations(types);

		schema.properties = properties;
		schema.types = types;
		schema.enumerations = enumerations;

		return schema;
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
	TypeParser,
	EnumerationParser,
	CSVParser
	};
