
import { parse as csvParseSync } from "csv-parse/sync";

interface PropertyRecord
	{
	id:string;
	label:string;
	comment:string;
	subPropertyOf:string;
	equivalentProperty:string;
	subproperties:string;
	domainIncludes:string;
	rangeIncludes:string;
	inverseOf:string;
	supersedes:string;
	supersededBy:string;
	isPartOf:string;
	}

interface Property
	{
	id:string;
	label:string;
	comment:string;
	subPropertyOf:Array<string>|null;
	equivalentProperty:string|null;
	subproperties:Array<string>|null;
	domainIncludes:Array<string>|null;
	rangeIncludes:Array<string>|null;
	inverseOf:string|null;
	supersedes:Array<string>|null;
	supersededBy:string|null;
	partOf:string|null;
	}

interface TypeRecord
	{
	id:string;
	label:string;
	comment:string;
	subTypeOf:string;
	enumerationtype:string;
	equivalentClass:string;
	properties:string;
	subTypes:string;
	supersedes:string;
	supersededBy:string;
	isPartOf:string;
	}

interface Type
	{
	id:string;
	label:string;
	comment:string;
	partOf:string|null;
	}

const RELEASE_28_1 = "28.1";

class ParseError extends Error
	{
	constructor(message:string)
		{
		super(message);
		}
	}

class Parser
	{
	readonly release:string;

	constructor(release:string = RELEASE_28_1)
		{
		this.release = release;
		}

	public async parseProperties():Promise<any>
		{
		let csv = await this.download(this.url("properties"));

		let records = csvParseSync(csv, {columns: true, skipEmptyLines: true});

		return records.map((record:PropertyRecord) => this.checkProperty(record))
			.map((record:PropertyRecord) => this.parseProperty(record));
		}

	public async parseTypes():Promise<any>
		{
		let csv = await this.download(this.url("types"));

		let records = csvParseSync(csv, {columns: true, skipEmptyLines: true});

		return records.map((record:TypeRecord) => this.checkType(record))
			.map((record:TypeRecord) => this.parseType(record));
		}

	public async parse():Promise<any>
		{
		let properties = await this.parseProperties();
		let types = await this.parseTypes();

		return {properties, types};
		}

	private url(what:string):string
		{
		return `https://github.com/schemaorg/schemaorg/raw/refs/heads/main/data/releases/${this.release}/schemaorg-all-https-${what}.csv`;
		}

	private	async download(url:string):Promise<string>
		{
		let request = await fetch(url);

		return request.text();
		}

	private isBlank(text:string):boolean
		{
		return (text.trim().length === 0);
		}

	private nullIfBlank(column:string):string|null
		{
		return this.isBlank(column) ? null : column;
		}

	private splitAndTrim(column:string):Array<string>
		{
		return column.split(",").map(text => text.trim());
		}

	private nullOrArray(column:string):Array<string>|null
		{
		if (this.isBlank(column))
			{
			return null;
			}

		return this.splitAndTrim(column);
		}

	private notBlank(column:string, columnName:string):void
		{
		if (this.isBlank(column))
			{
			throw new ParseError(`Column '${columnName}' is blank`);
			}
		}

	private notContainsComma(column:string, columnName:string):void
		{
		if (column.includes(","))
			{
			throw new ParseError(`Column '${columnName}' contains comma`);
			}
		}

	private checkProperty(record:PropertyRecord):PropertyRecord
		{
		this.notBlank(record.id, "id");
		this.notContainsComma(record.id, "id");

		this.notBlank(record.label, "label");
		this.notContainsComma(record.label, "label");

		this.notBlank(record.comment, "comment");

		this.notContainsComma(record.equivalentProperty, "equivalentProperty");

		this.notContainsComma(record.inverseOf, "inverseOf");

		this.notContainsComma(record.supersededBy, "supersededBy");

		this.notContainsComma(record.isPartOf, "isPartOf");

		return record;
		}

	private parseProperty(record:PropertyRecord):Property
		{
		//@ts-ignore
		let property:Property = {};

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

		return property;
		}

	private checkType(record:TypeRecord):TypeRecord
		{
		this.notBlank(record.id, "id");
		this.notContainsComma(record.id, "id");

		this.notBlank(record.label, "label");
		this.notContainsComma(record.label, "label");

		this.notBlank(record.comment, "comment");

		this.notContainsComma(record.isPartOf, "isPartOf");

		return record;
		}

	private parseType(record:TypeRecord):Type
		{
		//@ts-ignore
		let type:Type = {};

		type.id = record.id;
		type.label = record.label;
		type.comment = record.comment;

		type.partOf = this.nullIfBlank(record.isPartOf);

		return type;
		}
	}

export
	{
	RELEASE_28_1,
	Property,
	ParseError,
	Parser
	};
