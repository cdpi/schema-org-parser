
const RELEASE_28_1 = "28.1";

type Property = string | Thing | Array<Property>;

class Thing extends Map<string, Property>
	{
	render():string
		{
		const isString = (value:any) => (typeof value === "string");
		const isThing = (value:any) => (value instanceof Thing);
		const isArray = (value:any) => (Array.isArray(value));

		const stringProperty = (name:string, property:string) => `<span class="name">${name}</span><span class="property">${property}</span>`;
		const arrayProperty = (name:string, property:Array<string|Thing>) => ``;

		let properties = new Array<string>();

		for (let [name, property] of this)
			{
			if (isString(property))
				{
				properties.push(stringProperty(name, property));
				}

			if (isThing(property))
				{
				properties.push(property.render());
				}
			}

		return properties.join("\n");
		}
	}

//type Thing2 = Record<string, Property>;
//let t = {} as Thing2;
//t.sdsd = "sd";

/*
let t = {} as Thing;

t.set("sdsd", "df");

t.set("sdsd", new Array<string>("sdsdsd", "sdsd"));

let p = {} as Thing;

t.set("sdsd", p);

t.set("sdsd", new Array<Thing>(p, p));
*/

/*
static async propertiesToJSON():Promise<string>
	{
	let parser = new PropertyParser();

	let csv = await parser.downloadProperties(RELEASE_28_1);

	let properties = parser.parseProperties(csv);

	let values = Array.from(properties.values());

	return JSON.stringify(values, null, 2);
	}
*/

export
	{
	RELEASE_28_1,
	Property,
	Thing
	};
