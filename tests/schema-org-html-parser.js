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


class HTMLParser {
    static topLevelSelector = "[itemscope][itemtype]:not([itemscope][itemtype] *)";
    static propertySelector = "[itemprop]:not([itemprop] *)";
    static itemtype = "itemtype";
    static itemprop = "itemprop";
    static content = "content";
    constructor() {
    }
    getAttribute(element, name) {
        let attribute = element.attributes.getNamedItem(name);
        return (attribute === null) ? null : attribute.value;
    }
    getElements(element, cssSelector) {
        return Array.from(element.querySelectorAll(cssSelector));
    }
    getContent(element) {
        let content = this.getAttribute(element, HTMLParser.content);
        return (content !== null) ? content : element.textContent;
    }
    getTopLevelElements(element) {
        return this.getElements(element, HTMLParser.topLevelSelector);
    }
    parse(document) {
        let topLevelElements = this.getTopLevelElements(document.documentElement);
        return topLevelElements.map(topLevelElement => this.parseThing(topLevelElement));
    }
    parseFromString(html) {
        return this.parse(new DOMParser().parseFromString(html, "text/html"));
    }
    parseThing(element) {
        let thing = new Thing();
        thing.set("@type", this.getAttribute(element, HTMLParser.itemtype));
        this.parseProperties(element, thing);
        return thing;
    }
    parseProperties(thingElement, thing) {
        let elements = this.getElements(thingElement, HTMLParser.propertySelector);
        elements.forEach(element => {
            let itemprop = this.getAttribute(element, HTMLParser.itemprop);
            let itemtype = this.getAttribute(element, HTMLParser.itemtype);
            if (itemtype) {
                thing.set(itemprop, this.parseThing(element));
            }
            else {
                thing.set(itemprop, this.getContent(element));
            }
        });
    }
}


function render(thing) {
    const cell = (text) => `<td>${text}</td>`;
    const row = (cells) => `<tr>${cells.map(cell).join("")}</tr>`;
    const table = (rows) => `<table border="1">${rows.map(row).join("")}</table>`;
    let values = new Array();
    thing.forEach((value, key) => {
        if (value instanceof Map) {
            values.push(new Array(key, render(value)));
        }
        else {
            values.push(new Array(key, value));
        }
    });
    return table(values);
}
