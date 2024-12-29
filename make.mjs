
//@ts-check

import { readFileSync, writeFileSync } from "node:fs";

/**
 * @param {string} path
 * @returns {string}
 */
function extract(path)
	{
	return readFileSync(path, "utf-8").split("// CLASS")[1];
	}

let root = "dist/parser/html/";

let files =
	[
	"Microdata.mjs",
	"AbstractParser.mjs",
	"AtParser.mjs",
	"TypeParser.mjs",
	"PropertyParser.mjs",
	"ThingParser.mjs",
	"Parser.mjs"
	];

let code = ["//GENERATED"];

code.push(extract("dist/SchemaOrg.mjs"));

for (let file of files)
	{
	code.push(extract(`${root}${file}`));
	}

writeFileSync("tests/DEV-schema-org-html-parser.js", code.join("\n"));
