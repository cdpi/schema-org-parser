import { PROPERTY_HEADERS, PropertyParser } from "./parser/csv/parser.mjs";
import { statistics } from "./statistics.mjs";
const RELEASE_28_1 = "28.1";
class SchemaOrg {
    constructor() {
    }
    static async propertiesToJSON() {
        let parser = new PropertyParser();
        let csv = await parser.downloadProperties(RELEASE_28_1);
        let properties = parser.parseProperties(csv);
        let values = Array.from(properties.values());
        return JSON.stringify(values, null, 2);
    }
    static async csvStatistics() {
        let parser = new PropertyParser();
        let csv = await parser.downloadProperties(RELEASE_28_1);
        let records = parser.parse(csv);
        let map = new Map();
        PROPERTY_HEADERS.forEach(header => {
            map.set(header, statistics(records.map(record => record[header])));
        });
        console.log(map);
    }
}
export { RELEASE_28_1, SchemaOrg };
