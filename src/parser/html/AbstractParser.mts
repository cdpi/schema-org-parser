
import { Microdata } from "./Microdata.mjs";

// CLASS

abstract class AbstractParser
	{
	constructor()
		{
		}

	getAttribute(element:Element, name:string):string|null
		{
		let attribute = element.attributes.getNamedItem(name);

		return (attribute === null) ? null : attribute.value;
		}

	getContent(element:Element):string
		{
		let content = this.getAttribute(element, Microdata.content);

		return (content !== null) ? content : element.textContent as string;
		}

	getElements(element:Element, cssSelector:string):Array<Element>
		{
		return Array.from(element.querySelectorAll(cssSelector));
		}
	}

// CLASS

export
	{
	AbstractParser
	};
