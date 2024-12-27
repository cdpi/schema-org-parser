
import { PropertyParser, TypeParser } from "./parser/csv/parser.mjs";
import { RELEASE_28_1 } from "./schema-org.mjs";

let propertiesStatistics = await new PropertyParser().csvStatistics(RELEASE_28_1);
let typesStatistics = await new TypeParser().csvStatistics(RELEASE_28_1);

console.log(propertiesStatistics);
console.log(typesStatistics);
