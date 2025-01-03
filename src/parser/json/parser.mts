
import { Thing } from "../../schema-org.mjs";

class Parser
	{
	constructor()
		{
		}

	parse(text:string):void
		{
		let json = JSON.parse(text);
		}

	async parseFromString(text:string):Promise<Array<Thing>>
		{
		let json = JSON.parse(text);
		return [];
		}
	}
