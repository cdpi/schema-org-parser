
//@ts-check

import { readFileSync, writeFileSync } from "node:fs";

/**
 * @param {string} path
 * @param {string} separator
 * @returns {string}
 */
function extract(path, separator)
	{
	return readFileSync(path, "utf-8").split(separator)[1];
	}

let thing = extract("dist/schema-org.mjs", "// Thing");
let parser = extract("dist/parser/parser.mjs", "// HTMLParser");
let render = extract("dist/parser/parser.mjs", "// Render");

let code = `//GENERATED\n${thing}\n${parser}\n${render}`;

writeFileSync("tests/schema-org-html-parser.js", code);
