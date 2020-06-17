let newDynamicTable = new DynamicTable({
    tableId: `tableData`,
    headRow,
    dataRows,
    head2Row,
    footRow,
    functionArray,
    addRowCount:true,
    addHeadDataAtBottom:true,
    addFilter: true,
    addLimit: true,
    addCheckboxes: true,
    checkboxClass
});

let newDynamicTableNode = newDynamicTable.createTable();
let divNode = document.getElementById(`tableDiv`);
divNode.appendChild(newDynamicTableNode);