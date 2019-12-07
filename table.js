define([], function() {

    function createTable(divId, tableId, headData, tableRowsHTML) {
        let newTable = document.createElement(`table`);
        newTable.setAttribute(`id`, tableId);
        newTable.setAttribute(`class`, `table table-striped table-bordered table-hover table-sm`);
        let divElement = document.getElementById(divId);
        divElement.innerHTML = ``;
        divElement.appendChild(newTable);
        _addTableDivision(newTable, `thead`, headData);
        _addTableBody(newTable, tableRowsHTML);
        _addTableDivision(newTable, `tfoot`, headData);
    }

    function _addTableDivision(newTable, divisionName, dataObject) {
        let { headRowArray, rowSpans, colSpans, align, head2 } = dataObject;
        let tableDivision = _appendElement(newTable, divisionName);
        let tableRow = _appendElement(tableDivision, `tr`);
        _addData(tableRow, headRowArray, rowSpans, colSpans, align);
        if (head2) {
            let tableRow2 = _appendElement(tableDivision, `tr`);
            _addData(tableRow2, head2);
        }
    }

    function _addTableBody(newTable, tableRowsHTML) {
        let tableBody = _appendElement(newTable, `tbody`);
        tableBody.innerHTML = tableRowsHTML;
    }

    function _appendElement(parentElement, elementName) {
        let newElement = document.createElement(elementName);
        parentElement.appendChild(newElement);
        return newElement;
    }

    function _addData(rowElement, dataArray, rowSpans, colSpans, align) {
        for (let i = 0; i < dataArray.length; i++) {
            let th = document.createElement('th');
            if (rowSpans && rowSpans[i]) {
                th.setAttribute(`rowspan`, rowSpans[i]);
            }
            if (colSpans && colSpans[i]) {
                th.setAttribute(`colspan`, colSpans[i]);
            }
            if (align && align[i]) {
                th.setAttribute(`class`, _getAlignText(align[i]));
            }
            th.innerHTML = dataArray[i];
            rowElement.appendChild(th);
        }
    }

    function _getAlignText(alignCode) {
        if (alignCode === 1) {
            return `text-center`;
        }
        return ``;
    }

    return {
        createTable
    };

});
