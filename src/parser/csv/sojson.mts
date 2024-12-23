
import { Parser } from "./parser.mjs";

let parser = new Parser();

let {properties, types} = await parser.parse();

console.log(properties[0]);
console.log(types[0]);
