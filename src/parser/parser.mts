
/*
function render(thing:Thing):string
	{
	const cell = (text:string) => `<td>${text}</td>`;

	const row = (cells:Array<string>) => `<tr>${cells.map(cell).join("")}</tr>`;

	const table = (rows:Array<Array<string>>) => `<table border="1">${rows.map(row).join("")}</table>`;

	let values = new Array();

	thing.forEach((value, key) =>
		{
		if (value instanceof Thing)
			{
			values.push(new Array(key, render(value)));
			}
		else
			{
			values.push(new Array(key, value as string));
			}
		});

	return table(values);
	}

// Render

export
	{
	render
	};
*/
