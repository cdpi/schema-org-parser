import { AbstractParser } from "./AbstractParser.mjs";
import { Microdata } from "./Microdata.mjs";
import { ThingParser } from "./ThingParser.mjs";
// CLASS
class Parser extends AbstractParser {
    thingParser;
    constructor() {
        super();
        this.thingParser = new ThingParser();
    }
    getTopLevelElements(element) {
        return this.getElements(element, Microdata.topLevelSelector);
    }
    parse(element) {
        let topLevelElements = this.getTopLevelElements(element);
        return topLevelElements.map(topLevelElement => this.thingParser.parse(topLevelElement));
    }
}
// CLASS
export { Parser };
