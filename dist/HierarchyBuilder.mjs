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
export { HierarchyBuilder };
