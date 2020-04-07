function createTable(paramObject) {
    let { divId, tableId, headData, dataRows, head2Data, footData, functionArray, addFilter } = paramObject;
    let divNode = document.getElementById(divId);
    _clearNode(divNode);
    let filterNode;
    if (addFilter) {
        filterNode = _getNode(`input`, { type: `text`, className: `form-control`, placeholder: `Type here to search...` });
        divNode.appendChild(filterNode);
    }
    let limitRow = _getNode(`div`, { className: `row` });
    divNode.appendChild(limitRow);
    let limitCol = _getNode(`div`, { className: `col` });
    limitRow.appendChild(limitCol);
    let limitNode = _addLimitNode(paramObject, limitCol);
    limitCol = _getNode(`div`, { className: `col text-right` });
    limitRow.appendChild(limitCol);
    let countNode = _getNode(`div`);
    limitCol.appendChild(countNode);
    let tableNode = _getNode(`table`, { id: tableId, className: `table table-striped table-bordered table-hover table-sm` });
    divNode.appendChild(tableNode);
    _addTableDivision(tableNode, `thead`, headData, head2Data);
    let bodyNode = _getNode(`tbody`, { id: `tBody` });
    tableNode.appendChild(bodyNode);
    if (addFilter) {
        _addTableDataRows({ paramObject, filterNode, limitNode, bodyNode, countNode });
        filterNode.onkeyup = function() {
            _addTableDataRows({ paramObject, filterNode, limitNode, bodyNode, countNode });
        };
        if (limitNode) {
            limitNode.onchange = function() {
                _addTableDataRows({ paramObject, filterNode, limitNode, bodyNode, countNode });
            }
        }
    } else {
        _addTableDataRows({ paramObject, limitNode, bodyNode, countNode });
        if (limitNode) {
            limitNode.onchange = function() {
                _addTableDataRows({ paramObject, limitNode, bodyNode, countNode });
            }
        }
    }
    if (footData) {
        _addTableDivision(tableNode, `tfoot`, footData);
    } else {
        _addTableDivision(tableNode, `tfoot`, headData, head2Data);
    }
}

function _addLimitNode(paramObject, divNode) {
    let { addLimit } = paramObject;
    if (addLimit) {
        let formNode = _getNode(`form`, { className: `form-inline` });
        divNode.appendChild(formNode);
        formNode.insertAdjacentText(`beforeend`, `Show `);
        let limitNode = _getNode(`select`, { className: `form-control` });
        formNode.appendChild(limitNode);
        formNode.insertAdjacentText(`beforeend`, ` entries`);
        _addLimitOption(limitNode, 50, 50);
        _addLimitOption(limitNode, 100, 100);
        _addLimitOption(limitNode, 250, 250);
        _addLimitOption(limitNode, `all`, `ALL`);
        return limitNode;
    }
    return false;
}

function _addLimitOption(limitNode, value, text) {
    let limitOption = _getNode(`option`, { value });
    limitOption.insertAdjacentText(`beforeend`, text);
    limitNode.appendChild(limitOption);
}

function _clearNode(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function _getNode(nodeType, paramObject) {
    let newNode = document.createElement(nodeType);
    if (paramObject) {
        let { additionalClass, align, className, colspan, id, placeholder, rowspan, text, type, value } = paramObject;
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
        if (value) {
            newNode.setAttribute(`value`, value);
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
    if (dataArray2 && dataArray2.length) {
        rowNode = _getNode(`tr`);
        divisionNode.appendChild(rowNode);
        _addData(rowNode, `S.No.`, dataArray2, `th`);
    }
}

function _addTableDataRows(paramObjectTDR) {
    let { filterNode, limitNode, bodyNode, countNode, paramObject } = paramObjectTDR;
    let { dataRows, functionArray } = paramObject;
    _clearNode(bodyNode);
    if (typeof dataRows === `string`) {
        bodyNode.insertAdjacentHTML(`beforeend`, dataRows);
    } else {
        let filterTerm;
        if (filterNode) {
            filterTerm = filterNode.value.toLowerCase();
        }
        let serialNumber = 0;
        let limitNumber = 0;
        let rowNode;
        dataRows.forEach(currentRow => {
            if (!filterNode || _filterData(filterTerm, currentRow)) {
                serialNumber++;
                if (!limitNode || limitNode.value === `all` || limitNode.value >= serialNumber) {
                    limitNumber++;
                    rowNode = _getNode(`tr`);
                    bodyNode.appendChild(rowNode);
                    _addData(rowNode, serialNumber, currentRow, `td`);
                }
            }
        });
        _clearNode(countNode);
        countNode.insertAdjacentText(`beforeend`, `Showing 1 to ${limitNumber} of ${serialNumber} entries`);
    }
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