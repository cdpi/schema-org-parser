
import { Property, Schema, Type } from "./SchemaOrg.mjs";

class HierarchyBuilder
	{
	readonly types:Map<string, Type>;
	readonly properties:Map<string, Property>;
	//enumerations:Map<string, Enumeration>;

	constructor(schema:Schema)
		{
		this.types = schema.types;
		this.properties = schema.properties;
		}

	getParents(id:string):Array<string>
		{
		const types = this.types;

		let parents:Set<string> = new Set();

		function findParents(id:string):void
			{
			let type = types.get(id);

			if (!type)
				{
				return;
				}

			if (!type.subTypeOf)
				{
				return;
				}

			type.subTypeOf.forEach(subType =>
				{
				findParents(subType);

				let subTypeType = types.get(subType);

				if (subTypeType)
					{
					parents.add(subTypeType.label);
					}
				});
			}

		findParents(id);

		return Array.from(parents);
		}

	build():any
		{
		const types = this.types;

		let hierarchy:any = {};

		types.forEach(type =>
			{
			hierarchy[type.label] = this.getParents(type.id);
			});

		return hierarchy;
		}
	}

export
	{
	HierarchyBuilder
	};
