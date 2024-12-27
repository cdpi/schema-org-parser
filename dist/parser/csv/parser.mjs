import { parse as csvParseSync } from "csv-parse/sync";
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
}
class TypeParser extends AbstractParser {
    constructor() {
        super();
    }
    async downloadTypes(release) {
        return this.download(release, "types");
    }
    parseTypes(csv) {
        return this.asMap(this.parse(csv).map(this.parseType));
    }
    parseType(record) {
        let type = {};
        /*
        type.id = record.id;
        type.label = record.label;
        type.comment = record.comment;
        type.subTypeOf = this.nullOrArray(record.subTypeOf);
        type.enumerationtype = this.nullIfBlank(record.enumerationtype);
        type.equivalentClass = this.nullOrArray(record.equivalentClass);
        type.properties = this.nullOrArray(record.properties);
        type.subTypes = this.nullOrArray(record.subTypes);
        type.supersedes = this.nullOrArray(record.supersedes);
        type.supersededBy = this.nullIfBlank(record.supersededBy);
        type.partOf = this.nullIfBlank(record.isPartOf);
        */
        return type;
    }
}
export { PROPERTY_HEADERS, TYPE_HEADERS, PropertyParser, TypeParser };
