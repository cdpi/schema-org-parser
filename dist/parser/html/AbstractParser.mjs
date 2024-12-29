import { Microdata } from "./Microdata.mjs";
// CLASS
class AbstractParser {
    constructor() {
    }
    getAttribute(element, name) {
        let attribute = element.attributes.getNamedItem(name);
        return (attribute === null) ? null : attribute.value;
    }
    getContent(element) {
        let content = this.getAttribute(element, Microdata.content);
        return (content !== null) ? content : element.textContent;
    }
    getElements(element, cssSelector) {
        return Array.from(element.querySelectorAll(cssSelector));
    }
}
// CLASS
export { AbstractParser };
