
import { CSVParser } from "./parser/csv/parser.mjs";
import { HierarchyBuilder } from "./HierarchyBuilder.mjs";

function csv():void
	{
	let parser = new CSVParser();

	parser.parse().then(schema =>
		{
		console.log(`${schema.properties.size} propriétés`);
		console.log(`${schema.types.size} types`);
		console.log(`${schema.enumerations.size} énumerations`);

		/*
		schema.enumerations.forEach(enumeration =>
			{
			console.log(enumeration.label);
			enumeration.enumerationMembers.forEach(enumerationMember =>
				{
				console.log(" - " + enumerationMember.label);
				});
			});
		*/
		});
	}

function build():void
	{
	let parser = new CSVParser();

	parser.parse().then(schema =>
		{
		let builder = new HierarchyBuilder(schema);

		let types = builder.build();

		/*
		PoliceStation
			Thing
			Place
			CivicStructure
			Organization
			LocalBusiness
			EmergencyService
		*/
		//console.log(types["https://schema.org/PoliceStation"]);

		console.log(JSON.stringify(types, null, 2));
		});
	}

build();
