import { TypeParser, PropertyParser, CSVParser } from "./parser/csv/parser.mjs";
import { RELEASE_28_1 } from "./schema-org.mjs";
class HierarchyBuilder {
    types;
    properties;
    //enumerations:Map<string, Enumeration>;
    constructor(schema) {
        this.types = schema.types;
        this.properties = schema.properties;
    }
    getParents(id) {
        const types = this.types;
        let parents = new Set();
        function findParents(id) {
            let type = types.get(id);
            if (!type) {
                return;
            }
            if (!type.subTypeOf) {
                return;
            }
            type.subTypeOf.forEach(subType => {
                findParents(subType);
                let subTypeType = types.get(subType);
                if (subTypeType) {
                    parents.add(subTypeType.label);
                }
            });
        }
        findParents(id);
        return Array.from(parents);
    }
    build() {
        const types = this.types;
        let hierarchy = {};
        types.forEach(type => {
            hierarchy[type.label] = this.getParents(type.id);
        });
        return hierarchy;
    }
}
function csvStatistics(release) {
    new TypeParser().csvStatistics(RELEASE_28_1).then(typesStatistics => {
        console.log("CSV TYPES");
        console.log(typesStatistics);
    });
    new PropertyParser().csvStatistics(RELEASE_28_1).then(propertiesStatistics => {
        console.log("CSV PROPERTIES");
        console.log(propertiesStatistics);
    });
}
function csvCount(release) {
    let parser = new CSVParser(release);
    parser.parse().then(schema => {
        console.log(`${schema.types.size} types`);
        console.log(`${schema.enumerations.size} énumerations`);
        console.log(`${schema.properties.size} propriétés`);
    });
}
export { HierarchyBuilder, csvStatistics, csvCount };
