define([], function() {

    function createTable(divId, tableId, headData, dataRows, head2Data, footData) {
        let newTable = document.createElement(`table`);
        newTable.setAttribute(`id`, tableId);
        newTable.setAttribute(`class`, `table table-striped table-bordered table-hover table-sm`);
        let divElement = document.getElementById(divId);
        divElement.innerHTML = ``;
        divElement.appendChild(newTable);
        _addTableDivision(newTable, `thead`, headData, head2Data);
        _addTableBody(newTable, dataRows);
        if (footData) {
            _addTableDivision(newTable, `tfoot`, footData);
        } else {
            _addTableDivision(newTable, `tfoot`, headData, head2Data);
        }
    }

    function _addTableDivision(newTable, divisionName, dataArray, dataArray2) {
        let tableDivision = _appendElement(newTable, divisionName);
        let tableRow = _appendElement(tableDivision, `tr`);
        _addData(tableRow, dataArray, `th`);
        if (dataArray2) {
            let tableRow2 = _appendElement(tableDivision, `tr`);
            _addData(tableRow2, dataArray2, `th`);
        }
    }

    function _addTableBody(newTable, dataRows) {
        let tableDivision = `tbody`;
        let tableBody = _appendElement(newTable, tableDivision);
        tableBody.setAttribute(`id`, `tBody`);
        if (typeof dataRows === `string`) {
            tableBody.innerHTML = dataRows;
        } else {
            let tableRow;
            dataRows.forEach(currentRow => {
                tableRow = _appendElement(tableDivision, `tr`);
                _addData(tableRow, currentRow, `td`);
            })
        }
    }

    function _appendElement(parentElement, elementName) {
        let newElement = document.createElement(elementName);
        parentElement.appendChild(newElement);
        return newElement;
    }

    function _addData(rowElement, dataArray, typeName) {
        dataArray.forEach(dataObject => {
            let colData = document.createElement(typeName);
            if (typeof dataObject === `string`) {
                colData.innerHTML = dataObject;
            } else {
                let { id, align, additionalClass, rowspan, colspan, text } = dataObject;
                if (id) {
                    colData.setAttribute(`id`, id);
                }
                if (align) {
                    colData.setAttribute(`class`, `text-${align}`);
                }
                if (additionalClass) {
                    _addToAttribute(colData, `class`, additionalClass);
                }
                if (rowspan) {
                    colData.setAttribute(`rowspan`, rowspan);
                }
                if (colspan) {
                    colData.setAttribute(`colspan`, colspan);
                }
                if (text) {
                    colData.innerHTML = text;
                }
            }
            rowElement.appendChild(colData);
        });
    }

    function _addToAttribute(currentElement, name, newText) {
        let oldValue = currentElement.getAttribute(name);
        let newValue;
        if (oldValue) {
            newValue = `${oldValue} ${newText}`;
        } else {
            newValue = newText;
        }
        return currentElement.setAttribute(name, newValue)
    }

    return {
        createTable
    };

});
