define([], function() {

    function createTable(divId, filterId, tableId, headData, dataRows, head2Data, footData) {
        let divElement = document.getElementById(divId);
        divElement.innerHTML = ``;
        _appendfilterElement(divElement, filterId);
        _appendTableElement(divElement, filterId, tableId, headData, dataRows, head2Data, footData);
    }

    function _appendfilterElement(divElement, filterId) {
        let filterElement = document.createElement(`input`);
        filterElement.setAttribute(`type`, `text`);
        filterElement.setAttribute(`class`, `form-control`);
        filterElement.setAttribute(`id`, filterId);
        filterElement.setAttribute(`placeholder`, `Type here to filter...`);
        divElement.appendChild(filterElement);
    }

    function _appendTableElement(divElement, filterId, tableId, headData, dataRows, head2Data, footData) {
        let newTable = document.createElement(`table`);
        newTable.setAttribute(`id`, tableId);
        newTable.setAttribute(`class`, `table table-striped table-bordered table-hover table-sm`);
        divElement.appendChild(newTable);
        _addTableDivision(newTable, `thead`, headData, head2Data);
        _addTableBody(filterId, newTable, dataRows);
        if (footData) {
            _addTableDivision(newTable, `tfoot`, footData);
        } else {
            _addTableDivision(newTable, `tfoot`, headData, head2Data);
        }
        document.getElementById(filterId).onkeyup = function() {
            _addTableDataRows(filterId, dataRows);
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

    function _addTableBody(filterId, newTable, dataRows) {
        let divisionName = `tbody`;
        let tableDivision = _appendElement(newTable, divisionName);
        tableDivision.setAttribute(`id`, `tBody`);
        _addTableDataRows(filterId, dataRows);
    }

    function _addTableDataRows(filterId, dataRows) {
        let tableDivision = document.getElementById(`tBody`);
        if (typeof dataRows === `string`) {
            tableDivision.innerHTML = dataRows;
        } else {
            tableDivision.innerHTML = ``;
            let filterTerm = document.getElementById(filterId).value.toLowerCase();
            let tableRow;
            dataRows.forEach(currentRow => {
                if (_filterData(filterTerm, currentRow)) {
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

    function _filterData(filterTerm, dataArray) {
        let isDisplay = false;
        let isFilter = false;
        dataArray.forEach(dataObject => {
            if (typeof dataObject === `string`) {
                if (dataObject.toLowerCase().includes(filterTerm)) {
                    isDisplay = true;
                }
            } else {
                let { filterText } = dataObject;
                if (filterText) {
                    isFilter = true;
                    if (filterText.toLowerCase().includes(filterTerm)) {
                        isDisplay = true;
                    }
                }
            }
        });
        if (isFilter) {
            return isDisplay;
        }
        return true;
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
