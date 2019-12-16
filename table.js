define([], function() {

    function createTable(paramObject) {
        let { divId, tableId, headData, dataRows, head2Data, footData, functionArray } = paramObject;
        let divNode = document.getElementById(divId);
        _clearNode(divNode);
        let filterNode = _getNode(`input`, { type: `text`, className: `form-control`, placeholder: `Type here to filter...` });
        divNode.appendChild(filterNode);
        let tableNode = _getNode(`table`, { id: tableId, className: `table table-striped table-bordered table-hover table-sm` });
        divNode.appendChild(tableNode);
        let countNode = _getNode(`div`);
        divNode.appendChild(countNode);

        _addTableDivision(tableNode, `thead`, headData, head2Data);

        let bodyNode = _getNode(`tbody`, { id: `tBody` });
        tableNode.appendChild(bodyNode);
        _addTableDataRows(filterNode, bodyNode, countNode, dataRows, functionArray);
        filterNode.onkeyup = function() {
            _addTableDataRows(filterNode, bodyNode, countNode, dataRows, functionArray);
        };

        if (footData) {
            _addTableDivision(tableNode, `tfoot`, footData);
        } else {
            _addTableDivision(tableNode, `tfoot`, headData, head2Data);
        }

    }

    function _clearNode(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    function _getNode(nodeType, paramObject) {
        let newNode = document.createElement(nodeType);
        if (paramObject) {
            let { additionalClass, align, className, colspan, id, placeholder, rowspan, text, type } = paramObject;
            if (align) {
                newNode.setAttribute(`class`, `text-${align}`);
            }
            if (className) {
                newNode.setAttribute(`class`, className);
            }
            if (additionalClass) {
                _addToAttribute(newNode, `class`, additionalClass);
            }
            if (colspan) {
                newNode.setAttribute(`colspan`, colspan);
            }
            if (id) {
                newNode.setAttribute(`id`, id);
            }
            if (placeholder) {
                newNode.setAttribute(`placeholder`, placeholder);
            }
            if (rowspan) {
                newNode.setAttribute(`rowspan`, rowspan);
            }
            if (text) {
                newNode.insertAdjacentHTML(`beforeend`, text);
            }
            if (type) {
                newNode.setAttribute(`type`, type);
            }
        }
        return newNode;
    }

    function _addTableDivision(tableNode, divisionName, dataArray, dataArray2) {
        let divisionNode = _getNode(divisionName);
        tableNode.appendChild(divisionNode);
        let rowNode = _getNode(`tr`);
        divisionNode.appendChild(rowNode);
        _addData(rowNode, `S.No.`, dataArray, `th`);
        if (dataArray2) {
            rowNode = _getNode(`tr`);
            divisionNode.appendChild(rowNode);
            _addData(rowNode, `S.No.`, dataArray2, `th`);
        }
    }

    function _addTableDataRows(filterNode, bodyNode, countNode, dataRows, functionArray) {
        _clearNode(bodyNode);
        let filterTerm = filterNode.value.toLowerCase();
        let serialNumber = 0;
        let rowNode;
        dataRows.forEach(currentRow => {
            if (_filterData(filterTerm, currentRow)) {
                serialNumber++;
                rowNode = _getNode(`tr`);
                bodyNode.appendChild(rowNode);
                _addData(rowNode, serialNumber, currentRow, `td`);
            }
        })
        _clearNode(countNode);
        countNode.insertAdjacentText(`beforeend`, `Showing 1 to ${serialNumber} of ${serialNumber} entries`);
        if (functionArray) {
            functionArray.forEach(currentObject => {
                let { className, eventName, functionName } = currentObject;
                _attachFunctionToClassNodes(className, eventName, functionName);
            });
        }
    }

    function _attachFunctionToClassNodes(className, eventName, functionName) {
        let classNodes = document.getElementsByClassName(className);
        Array.from(classNodes).forEach(element => {
            element.removeEventListener(eventName, functionName);
            element.addEventListener(eventName, functionName);
        });
    }

    function _filterData(filterTerm, dataArray) {
        let isDisplay = false;
        let isFilter = false;
        dataArray.forEach(dataObject => {
            let { filterText } = dataObject;
            if (filterText) {
                isFilter = true;
                if (filterText.toLowerCase().includes(filterTerm)) {
                    isDisplay = true;
                }
            }
        });
        if (isFilter) {
            return isDisplay;
        }
        return true;
    }

    function _addData(rowNode, serialNumber, dataArray, typeName) {
        let cellNode;
        dataArray.forEach(dataObject => {
            cellNode = _getNode(typeName, dataObject);
            rowNode.appendChild(cellNode);
        });
        let serialNumberNode = _getNode(typeName, { text: serialNumber });
        rowNode.insertBefore(serialNumberNode, rowNode.firstChild);
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
