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
let release = "28.1";
let types = parse(await downloadTypes(release));
console.log(types[0]);
