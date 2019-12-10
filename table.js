define([], function() {

    function createTable(divId, searchId, tableId, headData, dataRows, head2Data, footData) {
        let divElement = document.getElementById(divId);
        divElement.innerHTML = ``;
        _appendSearchElement(divElement, searchId);
        _appendTableElement(divElement, searchId, tableId, headData, dataRows, head2Data, footData);
    }

    function _appendSearchElement(divElement, searchId) {
        let searchElement = document.createElement(`input`);
        searchElement.setAttribute(`type`, `text`);
        searchElement.setAttribute(`class`, `form-control`);
        searchElement.setAttribute(`id`, searchId);
        searchElement.setAttribute(`placeholder`, `Type here to search...`);
        divElement.appendChild(searchElement);
    }

    function _appendTableElement(divElement, searchId, tableId, headData, dataRows, head2Data, footData) {
        let newTable = document.createElement(`table`);
        newTable.setAttribute(`id`, tableId);
        newTable.setAttribute(`class`, `table table-striped table-bordered table-hover table-sm`);
        divElement.appendChild(newTable);
        _addTableDivision(newTable, `thead`, headData, head2Data);
        _addTableBody(searchId, newTable, dataRows);
        if (footData) {
            _addTableDivision(newTable, `tfoot`, footData);
        } else {
            _addTableDivision(newTable, `tfoot`, headData, head2Data);
        }
        document.getElementById(searchId).onkeyup = function() {
            _addTableDataRows(searchId, dataRows);
        };
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

    function _addTableBody(searchId, newTable, dataRows) {
        let divisionName = `tbody`;
        let tableDivision = _appendElement(newTable, divisionName);
        tableDivision.setAttribute(`id`, `tBody`);
        _addTableDataRows(searchId, dataRows);
    }

    function _addTableDataRows(searchId, dataRows) {
        let tableDivision = document.getElementById(`tBody`);
        if (typeof dataRows === `string`) {
            tableDivision.innerHTML = dataRows;
        } else {
            tableDivision.innerHTML = ``;
            let searchTerm = document.getElementById(searchId).value.toLowerCase();
            let tableRow;
            dataRows.forEach(currentRow => {
                if (_filterData(searchTerm, currentRow)) {
                    tableRow = _appendElement(tableDivision, `tr`);
                    _addData(tableRow, currentRow, `td`);
                }
            })
        }
    }

    function _appendElement(parentElement, elementName) {
        let newElement = document.createElement(elementName);
        parentElement.appendChild(newElement);
        return newElement;
    }

    function _filterData(searchTerm, dataArray) {
        let isDisplay = false;
        dataArray.forEach(dataObject => {
            if (typeof dataObject === `string`) {
                if (dataObject.toLowerCase().includes(searchTerm)) {
                    isDisplay = true;
                }
            } else {
                let { id, align, additionalClass, rowspan, colspan, text } = dataObject;
                if (typeof text !== `string` || text.toLowerCase().includes(searchTerm)) {
                    isDisplay = true;
                }
            }
        });
        return isDisplay;
    }

    function _addData(rowElement, dataArray, typeName) {
        let colData;
        dataArray.forEach(dataObject => {
            colData = document.createElement(typeName);
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
