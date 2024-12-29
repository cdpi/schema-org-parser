// Render
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
// Render
export { render };
