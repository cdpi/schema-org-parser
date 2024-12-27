import { parse as csvParseSync } from "csv-parse/sync";
import { RELEASE_28_1 } from "../../schema-org.mjs";
import { statistics } from "./statistics.mjs";
const PROPERTY_HEADERS = ["id", "label", "comment", "subPropertyOf", "equivalentProperty", "subproperties", "domainIncludes", "rangeIncludes", "inverseOf", "supersedes", "supersededBy", "isPartOf"];
const TYPE_HEADERS = ["id", "label", "comment", "subTypeOf", "enumerationtype", "equivalentClass", "properties", "subTypes", "supersedes", "supersededBy", "isPartOf"];
class AbstractParser {
    parse(csv) {
        return csvParseSync(csv, { columns: true, skipEmptyLines: true });
    }
    asMap(array) {
        let map = new Map();
        array.forEach(item => {
            map.set(item.id, item);
        });
        return map;
    }
    stringOrNull(column) {
        if (column.trim().length === 0) {
            return null;
        }
        return column;
    }
    arrayOrNull(column) {
        if (column.trim().length === 0) {
            return null;
        }
        return column.split(",").map(text => text.trim());
    }
    async download(release, what) {
        let url = `https://github.com/schemaorg/schemaorg/raw/refs/heads/main/data/releases/${release}/schemaorg-all-https-${what}.csv`;
        let request = await fetch(url);
        return request.text();
    }
}
class PropertyParser extends AbstractParser {
    constructor() {
        super();
    }
    async downloadProperties(release) {
        return this.download(release, "properties");
    }
    parseProperties(csv) {
        return this.asMap(this.parse(csv).map(record => this.parseProperty(record)));
    }
    parseProperty(record) {
        let property = {};
        property.id = record.id;
        property.label = record.label;
        property.comment = record.comment;
        property.subPropertyOf = this.arrayOrNull(record.subPropertyOf);
        property.equivalentProperty = this.stringOrNull(record.equivalentProperty);
        property.subproperties = this.arrayOrNull(record.subproperties);
        property.domainIncludes = this.arrayOrNull(record.domainIncludes);
        property.rangeIncludes = this.arrayOrNull(record.rangeIncludes);
        property.inverseOf = this.stringOrNull(record.inverseOf);
        property.supersedes = this.arrayOrNull(record.supersedes);
        property.supersededBy = this.stringOrNull(record.supersededBy);
        property.partOf = this.stringOrNull(record.isPartOf);
        return property;
    }
    async csvStatistics(release) {
        let csv = await this.downloadProperties(release);
        let records = this.parse(csv);
        let map = new Map();
        PROPERTY_HEADERS.forEach(header => {
            map.set(header, statistics(records.map(record => record[header])));
        });
        return map;
    }
}
class TypeParser extends AbstractParser {
    constructor() {
        super();
    }
    async downloadTypes(release) {
        return this.download(release, "types");
    }
    parseTypes(csv) {
        return this.asMap(this.parse(csv).map(record => this.parseType(record)));
    }
    parseType(record) {
        let type = {};
        type.id = record.id;
        type.label = record.label;
        type.comment = record.comment;
        type.subTypeOf = this.arrayOrNull(record.subTypeOf);
        type.enumerationtype = this.stringOrNull(record.enumerationtype);
        type.equivalentClass = this.arrayOrNull(record.equivalentClass);
        type.properties = this.arrayOrNull(record.properties);
        type.subTypes = this.arrayOrNull(record.subTypes);
        type.supersedes = this.arrayOrNull(record.supersedes);
        type.supersededBy = this.stringOrNull(record.supersededBy);
        type.partOf = this.stringOrNull(record.isPartOf);
        return type;
    }
    async csvStatistics(release) {
        let csv = await this.downloadTypes(release);
        let records = this.parse(csv);
        let map = new Map();
        TYPE_HEADERS.forEach(header => {
            map.set(header, statistics(records.map(record => record[header])));
        });
        return map;
    }
}
class CSVParser {
    release;
    constructor(release = RELEASE_28_1) {
        this.release = release;
    }
    async downloadAndParseProperties() {
        let parser = new PropertyParser();
        let csv = await parser.downloadProperties(this.release);
        return parser.parseProperties(csv);
    }
    async downloadAndParseTypes() {
        let parser = new TypeParser();
        let csv = await parser.downloadTypes(this.release);
        return parser.parseTypes(csv);
    }
}
export { PROPERTY_HEADERS, TYPE_HEADERS, PropertyParser, TypeParser, CSVParser };
