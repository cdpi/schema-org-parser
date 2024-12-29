//GENERATED

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


class Microdata {
    static topLevelSelector = "[itemscope][itemtype]:not([itemscope][itemtype] *)";
    static propertySelector = "[itemprop]:not([itemprop] *)";
    static itemtype = "itemtype";
    static itemprop = "itemprop";
    static content = "content";
    constructor() {
    }
}


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


class AtParser extends AbstractParser {
    constructor() {
        super();
    }
}


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


class PropertyParser extends AbstractParser {
    constructor() {
        super();
    }
}


class ThingParser extends AbstractParser {
    constructor() {
        super();
    }
    parse(element) {
        let thing = new Thing();
        thing.set("@type", this.getAttribute(element, Microdata.itemtype));
        this.parseProperties(element, thing);
        return thing;
    }
    parseProperties(thingElement, thing) {
        let elements = this.getElements(thingElement, Microdata.propertySelector);
        elements.forEach(element => {
            let itemprop = this.getAttribute(element, Microdata.itemprop);
            let itemtype = this.getAttribute(element, Microdata.itemtype);
            if (itemtype) {
                thing.set(itemprop, this.parse(element));
            }
            else {
                thing.set(itemprop, this.getContent(element));
            }
        });
    }
}


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
