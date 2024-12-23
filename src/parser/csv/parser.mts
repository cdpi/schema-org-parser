
import { parse as parseCSV } from "csv-parse/sync";

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

let release = "28.1";
let types = parse(await downloadTypes(release));
console.log(types[0]);
