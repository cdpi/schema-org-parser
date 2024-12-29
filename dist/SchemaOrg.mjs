const RELEASE_28_1 = "28.1";
// CLASS
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
// CLASS
class SchemaOrg {
    constructor() {
    }
}
export { RELEASE_28_1, Thing, SchemaOrg };
