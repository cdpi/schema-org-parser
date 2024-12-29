import { AbstractParser } from "./AbstractParser.mjs";
//"@context": "https://schema.org",
//"@type": ["AutoRental", "AutoRepair", "AutoWash"],
// ... itemtype="https://schema.org/AutoRental https://schema.org/AutoRepair https://schema.org/AutoWash" ...
// CLASS
class AtParser extends AbstractParser {
    constructor() {
        super();
    }
}
// CLASS
export { AtParser };
