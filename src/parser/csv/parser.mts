
import { parse as parseCSV } from "csv-parse/sync";

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
	//subPropertyOf:string;
	//equivalentProperty:string;
	//subproperties:string;
	//domainIncludes:string;
	//rangeIncludes:string;
	//inverseOf:string;
	//supersedes:string;
	//supersededBy:string;
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

function url(what:string, release:string):string
	{
	return `https://github.com/schemaorg/schemaorg/raw/refs/heads/main/data/releases/${release}/schemaorg-all-https-${what}.csv`;
	}

async function download(url:string):Promise<string>
	{
	let request = await fetch(url);

	return request.text();
	}

async function downloadProperties(release:string):Promise<string>
	{
	return download(url("properties", release));
	}

async function downloadTypes(release:string):Promise<string>
	{
	return download(url("types", release));
	}

function parse(csv:string):Array<any>
	{
	return parseCSV(csv, {columns: true, skipEmptyLines: true});
	}

function isBlank(text:string):boolean
	{
	return (text.trim().length === 0);
	}

function nullIfBlank(column:string):string|null
	{
	return isBlank(column) ? null : column;
	}

function splitAndTrim(column:string):Array<string>
	{
	return column.split(",").map(text => text.trim());
	}

function notBlank(column:string):void
	{
	if (isBlank(column))
		{
		throw new Error("blank");
		}
	}

function checkProperty(record:PropertyRecord):PropertyRecord
	{
	notBlank(record.id);

	notBlank(record.label);

	notBlank(record.comment);

	return record;
	}

function parseProperty(record:PropertyRecord):Property
	{
	//@ts-ignore
	let property:Property = {};

	property.id = record.id;
	property.label = record.label;
	property.comment = record.comment;
	property.partOf = nullIfBlank(record.isPartOf);

	return property;
	}

/*
async function downloadAndParseProperties(release:string):Array<Property>
	{
	return parse(await downloadProperties(release)).map(checkProperty).map(parseProperty);
	}
*/

let release = "28.1";

let csv = await downloadProperties(release);

let properties = parse(csv).map(checkProperty).map(parseProperty);

console.log(properties[0]);

//let types = parse(await downloadTypes(release));
//console.log(types[0]);
