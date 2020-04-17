class DynamicTable {

    constructor(paramObject) {
        this.paramObject = paramObject;
    }

    createTable() {
        let { divId, tableId, headData, dataRows, head2Data, footData, functionArray, addFilter, addCheckboxes } = this.paramObject;
        let divNode = document.getElementById(divId);
        _clearNode(divNode);
        let filterNode;
        if (addFilter) {
            filterNode = _getTableNode(`input`, { type: `text`, className: `form-control`, placeholder: `Type here to search...` });
            divNode.appendChild(filterNode);
        }
        let limitRow = _getTableNode(`div`, { className: `row` });
        divNode.appendChild(limitRow);
        let limitCol = _getTableNode(`div`, { className: `col` });
        limitRow.appendChild(limitCol);
        let limitNode = _addLimitNode(limitCol);
        limitCol = _getTableNode(`div`, { className: `col text-right` });
        limitRow.appendChild(limitCol);
        let countNode = _getTableNode(`div`);
        limitCol.appendChild(countNode);
        let tableNode = _getTableNode(`table`, { id: tableId, className: `table table-striped table-bordered table-hover table-sm` });
        divNode.appendChild(tableNode);
        _addTableDivision(tableNode, `thead`, headData, head2Data);
        let bodyNode = _getTableNode(`tbody`, { id: `tBody` });
        tableNode.appendChild(bodyNode);
        if (addFilter) {
            _addTableDataRows({ filterNode, limitNode, bodyNode, countNode });
            filterNode.onkeyup = function() {
                _addTableDataRows({ filterNode, limitNode, bodyNode, countNode });
            };
            if (limitNode) {
                limitNode.onchange = function() {
                    _addTableDataRows({ filterNode, limitNode, bodyNode, countNode });
                }
            }
        } else {
            _addTableDataRows({ limitNode, bodyNode, countNode });
            if (limitNode) {
                limitNode.onchange = function() {
                    _addTableDataRows({ limitNode, bodyNode, countNode });
                }
            }
        }
        if (footData) {
            _addTableDivision(tableNode, `tfoot`, footData);
        } else {
            _addTableDivision(tableNode, `tfoot`, headData, head2Data);
        }
    }

    _addLimitNode(divNode) {
        let { addLimit } = this.paramObject;
        if (addLimit) {
            let formNode = _getTableNode(`form`, { className: `form-inline` });
            divNode.appendChild(formNode);
            formNode.insertAdjacentText(`beforeend`, `Show `);
            let limitNode = _getTableNode(`select`, { className: `form-control` });
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

    _addLimitOption(limitNode, value, text) {
        let limitOption = _getTableNode(`option`, { value });
        limitOption.insertAdjacentText(`beforeend`, text);
        limitNode.appendChild(limitOption);
    }

    _clearNode(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    _getTableNode(nodeType, nodeParamObject) {
        let newNode = document.createElement(nodeType);
        if (nodeParamObject) {
            let { additionalClass, align, className, colspan, id, placeholder, rowspan, subNode, text, textUrl, type, value } = nodeParamObject;
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
            if (subNode) {
                newNode.appendChild(subNode);
            }
            if (text && textUrl) {
                let aNode = document.createElement(`a`);
                newNode.appendChild(aNode);
                aNode.setAttribute(`href`, textUrl);
                aNode.insertAdjacentHTML(`beforeend`, text);
            } else if (text) {
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

    _addTableDivision(tableNode, divisionName, dataArray, dataArray2) {
        let divisionNode = _getTableNode(divisionName);
        tableNode.appendChild(divisionNode);
        let rowNode = _getTableNode(`tr`);
        divisionNode.appendChild(rowNode);
        _addData(rowNode, `S.No.`, dataArray, `th`);
        if (dataArray2 && dataArray2.length) {
            rowNode = _getTableNode(`tr`);
            divisionNode.appendChild(rowNode);
            _addData(rowNode, `S.No.`, dataArray2, `th`);
        }
    }

    _addTableDataRows(paramObjectTDR) {
        let { filterNode, limitNode, bodyNode, countNode } = paramObjectTDR;
        let { dataRows, functionArray } = this.paramObject;
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
                        rowNode = _getTableNode(`tr`);
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

    _attachFunctionToClassNodes(className, eventName, functionName) {
        let classNodes = document.getElementsByClassName(className);
        Array.from(classNodes).forEach(element => {
            element.removeEventListener(eventName, functionName);
            element.addEventListener(eventName, functionName);
        });
    }

    _filterData(filterTerm, dataArray) {
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

    _addData(rowNode, serialNumber, dataArray, typeName) {
        let { addCheckboxes } = this.paramObject;
        let cellNode;
        dataArray.forEach(dataObject => {
            cellNode = _getTableNode(typeName, dataObject);
            rowNode.appendChild(cellNode);
        });
        let serialNumberNode = _getTableNode(typeName, { text: serialNumber });
        rowNode.insertBefore(serialNumberNode, rowNode.firstChild);
        if (addCheckboxes && typeName === `td`) {
            let checkboxNode = _getTableNode(`input`, { className: `form-control`, id: ``, type: `checkbox` });
            let checkboxTDNode = _getTableNode(typeName, { subNode: checkboxNode });
            rowNode.insertBefore(checkboxTDNode, rowNode.firstChild);
        }
    }

    _addToAttribute(currentElement, name, newText) {
        let oldValue = currentElement.getAttribute(name);
        let newValue;
        if (oldValue) {
            newValue = `${oldValue} ${newText}`;
        } else {
            newValue = newText;
        }
        return currentElement.setAttribute(name, newValue)
    }

}