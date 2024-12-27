import { PROPERTY_HEADERS, PropertyParser } from "./parser/csv/parser.mjs";
import { statistics } from "./statistics.mjs";
const RELEASE_28_1 = "28.1";
class SchemaOrg {
    constructor() {
    }
    static async csvStatistics() {
        let parser = new PropertyParser();
        let csv = await parser.downloadProperties(RELEASE_28_1);
        let records = parser.parse(csv);
        PROPERTY_HEADERS.forEach(header => {
            //@ts-ignore
            let s = statistics(records.map(record => record[header]));
            console.log(header);
            console.log(s);
        });
    }
}
export { RELEASE_28_1, SchemaOrg };
