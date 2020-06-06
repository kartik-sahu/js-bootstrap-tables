let newDynamicTable = new DynamicTable({
    divId: `tableDiv`,
    tableId: `tableData`,
    headRow,
    dataRows,
    head2Row,
    footRow,
    functionArray,
    addFilter: true,
    addLimit: true,
    addCheckboxes: true,
    checkboxClass
});

newDynamicTable.createTable();