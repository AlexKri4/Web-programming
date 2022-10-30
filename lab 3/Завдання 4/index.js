function generTable() {
    let row = prompt();
    let column = prompt();
    let table = document.createElement("table");
    // parrent.appendChild(table);
    table.innerHTML = "<tr> <tr/>"
    for (let index = 0; index < column; index++) {
        table.appendChild(tr)
    }
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {

        }
    }
}