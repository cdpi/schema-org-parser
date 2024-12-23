import { parse as parseCSV } from "csv-parse/sync";
function url(what, release) {
    return `https://github.com/schemaorg/schemaorg/raw/refs/heads/main/data/releases/${release}/schemaorg-all-https-${what}.csv`;
}
async function download(url) {
    let request = await fetch(url);
    return request.text();
}
async function downloadProperties(release) {
    return download(url("properties", release));
}
async function downloadTypes(release) {
    return download(url("types", release));
}
function parse(csv) {
    return parseCSV(csv, { columns: true, skipEmptyLines: true });
}
function isBlank(text) {
    return (text.trim().length === 0);
}
function nullIfBlank(column) {
    return isBlank(column) ? null : column;
}
function splitAndTrim(column) {
    return column.split(",").map(text => text.trim());
}
function notBlank(column) {
    if (isBlank(column)) {
        throw new Error("blank");
    }
}
function checkProperty(record) {
    notBlank(record.id);
    notBlank(record.label);
    notBlank(record.comment);
    return record;
}
function parseProperty(record) {
    //@ts-ignore
    let property = {};
    property.id = record.id;
    property.label = record.label;
    property.comment = record.comment;
    property.partOf = nullIfBlank(record.isPartOf);
    return property;
}
/*
async function downloadAndParseProperties(release:string):Array<Property>
    {
    return parse(await downloadProperties(release)).map(checkProperty).map(parseProperty);
    }
*/
let release = "28.1";
let csv = await downloadProperties(release);
let properties = parse(csv).map(checkProperty).map(parseProperty);
console.log(properties[0]);
//let types = parse(await downloadTypes(release));
//console.log(types[0]);
