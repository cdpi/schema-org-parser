
import { Type, Property } from "./parser/csv/types.mjs";
import { TypeParser, PropertyParser, Schema, CSVParser } from "./parser/csv/parser.mjs";
import { RELEASE_28_1 } from "./schema-org.mjs";

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

function csvStatistics(release:string):void
	{
	new TypeParser().csvStatistics(RELEASE_28_1).then(typesStatistics =>
		{
		console.log("CSV TYPES");
		console.log(typesStatistics);
		});

	new PropertyParser().csvStatistics(RELEASE_28_1).then(propertiesStatistics =>
		{
		console.log("CSV PROPERTIES");
		console.log(propertiesStatistics);
		});
	}

function csvCount(release:string):void
	{
	let parser = new CSVParser(release);

	parser.parse().then(schema =>
		{
		console.log(`${schema.types.size} types`);
		console.log(`${schema.enumerations.size} énumerations`);
		console.log(`${schema.properties.size} propriétés`);
		});
	}

export
	{
	HierarchyBuilder,
	csvStatistics,
	csvCount
	};
