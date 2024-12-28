const RELEASE_28_1 = "28.1";
// Thing
class Thing extends Map {
    constructor() {
        super();
    }
    dump() {
        this.forEach((value, property) => {
            if (value instanceof Map) {
                value.dump();
            }
            else {
                console.log(`${property}: ${value}`);
            }
        });
    }
}
// Thing
class SchemaOrg {
    constructor() {
    }
}
export { RELEASE_28_1, Thing, SchemaOrg };
