define([], function() {

    function createTable(divId, tableId, headData, tableRowsHTML, head2Data, footData) {
        let newTable = document.createElement(`table`);
        newTable.setAttribute(`id`, tableId);
        newTable.setAttribute(`class`, `table table-striped table-bordered table-hover table-sm`);
        let divElement = document.getElementById(divId);
        divElement.innerHTML = ``;
        divElement.appendChild(newTable);
        _addTableDivision(newTable, `thead`, headData, head2Data);
        _addTableBody(newTable, tableRowsHTML);
        if (footData) {
            _addTableDivision(newTable, `tfoot`, footData);
        } else {
            _addTableDivision(newTable, `tfoot`, headData, head2Data);
        }
    }

    function _addTableDivision(newTable, divisionName, dataArray, dataArray2) {
        let tableDivision = _appendElement(newTable, divisionName);
        let tableRow = _appendElement(tableDivision, `tr`);
        _addData(tableRow, dataArray);
        if (dataArray2) {
            let tableRow2 = _appendElement(tableDivision, `tr`);
            _addData(tableRow2, dataArray2);
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

    function _addData(rowElement, dataArray) {
        dataArray.forEach(dataObject => {
            let th = document.createElement('th');
            if (typeof dataObject === `string`) {
                th.innerHTML = dataObject;
            } else {
                let { id, align, additionalClass, rowspan, colspan, text } = dataObject;
                if (id) {
                    th.setAttribute(`id`, id);
                }
                if (align) {
                    th.setAttribute(`class`, `text-${align}`);
                }
                if (additionalClass) {
                    _addToAttribute(th, `class`, additionalClass);
                }
                if (rowspan) {
                    th.setAttribute(`rowspan`, rowspan);
                }
                if (colspan) {
                    th.setAttribute(`colspan`, colspan);
                }
                if (text) {
                    th.innerHTML = text;
                }
            }
            rowElement.appendChild(th);
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
