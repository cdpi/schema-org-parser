import { Thing } from "../../schema-org.mjs";
//"@context": "https://schema.org",
//"@type": ["AutoRental", "AutoRepair", "AutoWash"],
// ... itemtype="https://schema.org/AutoRental https://schema.org/AutoRepair https://schema.org/AutoWash" ...
class Parser {
    static topLevelSelector = "[itemscope][itemtype]:not([itemscope][itemtype] *)";
    static propertySelector = "[itemprop]:not([itemprop] *)";
    static itemtype = "itemtype";
    static itemprop = "itemprop";
    static content = "content";
    getElements(element, cssSelector) {
        return Array.from(element.querySelectorAll(cssSelector));
    }
    getTopLevelElements(element) {
        return this.getElements(element, Parser.topLevelSelector);
    }
    getAttribute(element, name) {
        let attribute = element.attributes.getNamedItem(name);
        return (attribute === null) ? null : attribute.value;
    }
    getContent(element) {
        //let content = this.getAttribute(element, Microdata.content);
        //return (content !== null) ? content : element.textContent as string;
        throw "getContent";
    }
    parse(element) {
        let topLevelElements = this.getTopLevelElements(element);
        //return topLevelElements.map(topLevelElement => this.thingParser.parse(topLevelElement));
    }
    /*
    parseFromString(html:string):Array<Thing>
        {
        return this.parse(new DOMParser().parseFromString(html, "text/html"));
        }
    */
    // ... itemtype="https://schema.org/AutoRental https://schema.org/AutoRepair https://schema.org/AutoWash" ...
    parseType(element) {
        let itemtype = this.getAttribute(element, Parser.itemtype);
        if (!itemtype) {
            return null;
        }
        return itemtype.split(" ").map(type => type.trim());
    }
    parseThing(element) {
        let thing = new Thing();
        //thing.set("@type", this.parseType(element));
        thing = this.parseProperties(element, thing);
        //this.prop(element)(thing);
        return thing;
    }
    /*
    prop(element:HTMLElement):(thing:Thing) => void
        {
        return (thing:Thing) =>
            {
            let elements = this.getElements(element, Parser.propertySelector);
            elements.forEach(element =>
                {
                });
            };
        }
    */
    parseProperties(element, thing) {
        let elements = this.getElements(element, Parser.propertySelector);
        elements.forEach(element => {
        });
        return thing;
    }
    parseProperty(element) {
        let itemprop = this.getAttribute(element, Parser.itemprop);
        let itemtype = this.getAttribute(element, Parser.itemtype);
        /*
        if (itemtype)
            {
            thing.set(itemprop, this.parse(element));
            }
        else
            {
            thing.set(itemprop, this.getContent(element));
            }
        */
    }
}
export { Parser };
