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
    /*
    public parseProperties(csv:string):Map<string, Property>
        {
        let records = csvParseSync(csv, {columns: true, skipEmptyLines: true}) as Array<PropertyRecord>;

        let properties = records.map((record:PropertyRecord) => this.parseProperty(record));

        return this.asMap(properties);
        }
    */
    /*
    public async downloadAndParseProperties(release:string = RELEASE_28_1):Promise<Map<string, Property>>
        {
        let csv = await this.download(release, "properties");

        return this.parseProperties(csv);
        }
    */
    parseProperty(record) {
        let property = {};
        /*
        property.id = record.id;
        property.label = record.label;
        property.comment = record.comment;
        property.subPropertyOf = this.nullOrArray(record.subPropertyOf);
        property.equivalentProperty = this.nullIfBlank(record.equivalentProperty);
        property.subproperties = this.nullOrArray(record.subproperties);
        property.domainIncludes = this.nullOrArray(record.domainIncludes);
        property.rangeIncludes = this.nullOrArray(record.rangeIncludes);
        property.inverseOf = this.nullIfBlank(record.inverseOf);
        property.supersedes = this.nullOrArray(record.supersedes);
        property.supersededBy = this.nullIfBlank(record.supersededBy);
        property.partOf = this.nullIfBlank(record.isPartOf);
        */
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
    /*
    public async parseTypes(release:string = RELEASE_28_1):Promise<Map<string, Type>>
        {
        let csv = await this.download(release, "types");

        let records = csvParseSync(csv, {columns: true, skipEmptyLines: true});

        let types = records.map((record:TypeRecord) => this.parseType(record));

        return this.asMap(types);
        }
    */
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
