import { CSVParser } from "./parser/csv/parser.mjs";
let parser = new CSVParser();
parser.parse().then(schema => {
    console.log(`${schema.properties.size} propriétés`);
    console.log(`${schema.types.size} types`);
    console.log(`${schema.enumerations.size} énumerations`);
    /*
    schema.enumerations.forEach(enumeration =>
        {
        console.log(enumeration.label);
        enumeration.enumerationMembers.forEach(enumerationMember =>
            {
            console.log(" - " + enumerationMember.label);
            });
        });
    */
});
