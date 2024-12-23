import { parse as csvParseSync } from "csv-parse/sync";
const RELEASE_28_1 = "28.1";
class ParseError extends Error {
    constructor(message) {
        super(message);
    }
}
class Parser {
    release;
    constructor(release = RELEASE_28_1) {
        this.release = release;
    }
    async parseProperties() {
        let csv = await this.download(this.url("properties"));
        let records = csvParseSync(csv, { columns: true, skipEmptyLines: true });
        return records.map((record) => this.checkProperty(record))
            .map((record) => this.parseProperty(record));
    }
    async parseTypes() {
        let csv = await this.download(this.url("types"));
        let records = csvParseSync(csv, { columns: true, skipEmptyLines: true });
        return records.map((record) => this.checkType(record))
            .map((record) => this.parseType(record));
    }
    async parse() {
        let properties = await this.parseProperties();
        let types = await this.parseTypes();
        return { properties, types };
    }
    url(what) {
        return `https://github.com/schemaorg/schemaorg/raw/refs/heads/main/data/releases/${this.release}/schemaorg-all-https-${what}.csv`;
    }
    async download(url) {
        let request = await fetch(url);
        return request.text();
    }
    isBlank(text) {
        return (text.trim().length === 0);
    }
    nullIfBlank(column) {
        return this.isBlank(column) ? null : column;
    }
    splitAndTrim(column) {
        return column.split(",").map(text => text.trim());
    }
    nullOrArray(column) {
        if (this.isBlank(column)) {
            return null;
        }
        return this.splitAndTrim(column);
    }
    notBlank(column, columnName) {
        if (this.isBlank(column)) {
            throw new ParseError(`Column '${columnName}' is blank`);
        }
    }
    notContainsComma(column, columnName) {
        if (column.includes(",")) {
            throw new ParseError(`Column '${columnName}' contains comma`);
        }
    }
    checkProperty(record) {
        this.notBlank(record.id, "id");
        this.notContainsComma(record.id, "id");
        this.notBlank(record.label, "label");
        this.notContainsComma(record.label, "label");
        this.notBlank(record.comment, "comment");
        this.notContainsComma(record.equivalentProperty, "equivalentProperty");
        this.notContainsComma(record.inverseOf, "inverseOf");
        this.notContainsComma(record.supersededBy, "supersededBy");
        this.notContainsComma(record.isPartOf, "isPartOf");
        return record;
    }
    parseProperty(record) {
        //@ts-ignore
        let property = {};
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
        return property;
    }
    checkType(record) {
        this.notBlank(record.id, "id");
        this.notContainsComma(record.id, "id");
        this.notBlank(record.label, "label");
        this.notContainsComma(record.label, "label");
        this.notBlank(record.comment, "comment");
        this.notContainsComma(record.isPartOf, "isPartOf");
        return record;
    }
    parseType(record) {
        //@ts-ignore
        let type = {};
        type.id = record.id;
        type.label = record.label;
        type.comment = record.comment;
        type.partOf = this.nullIfBlank(record.isPartOf);
        return type;
    }
}
export { RELEASE_28_1, ParseError, Parser };
