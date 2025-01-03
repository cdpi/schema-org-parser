
import { csvCount, csvStatistics, HierarchyBuilder } from "./util.mjs";
import { RELEASE_28_1 } from "./schema-org.mjs";
import { CSVParser } from "./parser/csv/parser.mjs";

//csvStatistics(RELEASE_28_1);
//csvCount(RELEASE_28_1);

function build():void
	{
	let parser = new CSVParser(RELEASE_28_1);

	parser.parse().then(schema =>
		{
		let builder = new HierarchyBuilder(schema);

		let types = builder.build();

		console.log(JSON.stringify(types, null, 2));
		});
	}

build();
