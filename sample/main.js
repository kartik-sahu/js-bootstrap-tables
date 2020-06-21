let headData = [{
    text: "Name"
}];
let dataRows = [];
for (i = 0; i < 300; i++) {
    let currentRow = [{
        text: "Hello World"
    }];
    dataRows.push({
        data: currentRow
    });
}
let newDynamicTable = new DynamicTable({
    tableId: `tableData`,
    headData,
    dataRows,
    head2Row,
    footRow,
    functionArray,
    addRowCount: true,
    addHeadDataAtBottom: true,
    addFilter: true,
    addLimit: true,
    addCheckboxes: true,
    checkboxClass
});
let newDynamicTableNode = newDynamicTable.createTable();
let divNode = document.getElementById(`tableDiv`);
divNode.appendChild(newDynamicTableNode);