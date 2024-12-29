import { AtParser } from "./AtParser.mjs";
import { Microdata } from "./Microdata.mjs";
// CLASS
class TypeParser extends AtParser {
    constructor() {
        super();
    }
    // ... itemtype="https://schema.org/AutoRental https://schema.org/AutoRepair https://schema.org/AutoWash" ...
    parse(element) {
        let itemtype = this.getAttribute(element, Microdata.itemtype);
        if (!itemtype) {
            return null;
        }
        return itemtype.split(" ").map(type => type.trim());
    }
}
// CLASS
export { TypeParser };
