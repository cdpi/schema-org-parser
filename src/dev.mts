
import { SchemaOrg } from "./schema-org.mjs";

//SchemaOrg.csvStatistics();

let json = await SchemaOrg.propertiesToJSON();

console.log(json);
