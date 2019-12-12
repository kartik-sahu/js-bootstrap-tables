define([], function() {

    function createTable(paramObject) {
        let { divId, tableId, headData, dataRows, head2Data, footData, functionArray } = paramObject;
        let divNode = document.getElementById(divId);
        _clearNode(divNode);
        let filterNode = _getNode(`input`, { type: `text`, className: `form-control`, placeholder: `Type here to filter...` });
        divNode.appendChild(filterNode);
        let tableNode = _getNode(`table`, { id: tableId, className: `table table-striped table-bordered table-hover table-sm` });
        divNode.appendChild(tableNode);

        _addTableDivision(tableNode, `thead`, headData, head2Data);

        let bodyNode = _getNode(`tbody`, { id: `tBody` });
        tableNode.appendChild(bodyNode);
        _addTableDataRows(filterNode, bodyNode, dataRows, functionArray);
        filterNode.onkeyup = function() {
            _addTableDataRows(filterNode, bodyNode, dataRows, functionArray);
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
            let { className, id, placeholder, type } = paramObject;
            if (className) {
                newNode.setAttribute(`class`, className);
            }
            if (id) {
                newNode.setAttribute(`id`, id);
            }
            if (placeholder) {
                newNode.setAttribute(`placeholder`, placeholder);
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
        _addData(rowNode, dataArray, `th`);
        if (dataArray2) {
            rowNode = _getNode(`tr`);
            divisionNode.appendChild(rowNode);
            _addData(rowNode, dataArray2, `th`);
        }
    }

    function _addTableDataRows(filterNode, bodyNode, dataRows, functionArray) {
        _clearNode(bodyNode);
        if (typeof dataRows === `string`) {
            bodyNode.insertAdjacentHTML(`beforeend`, dataRows);
        } else {
            let filterTerm = filterNode.value.toLowerCase();
            let rowNode;
            dataRows.forEach(currentRow => {
                if (_filterData(filterTerm, currentRow)) {
                    rowNode = _getNode(`tr`);
                    bodyNode.appendChild(rowNode);
                    _addData(rowNode, currentRow, `td`);
                }
            })
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

    function _addData(rowNode, dataArray, typeName) {
        let colNode;
        dataArray.forEach(dataObject => {
            colNode = document.createElement(typeName);
            if (typeof dataObject === `string`) {
                colNode.insertAdjacentHTML(`beforeend`, dataObject);
            } else {
                let { id, align, additionalClass, rowspan, colspan, text } = dataObject;
                if (id) {
                    colNode.setAttribute(`id`, id);
                }
                if (align) {
                    colNode.setAttribute(`class`, `text-${align}`);
                }
                if (additionalClass) {
                    _addToAttribute(colNode, `class`, additionalClass);
                }
                if (rowspan) {
                    colNode.setAttribute(`rowspan`, rowspan);
                }
                if (colspan) {
                    colNode.setAttribute(`colspan`, colspan);
                }
                if (text) {
                    colNode.insertAdjacentHTML(`beforeend`, text);
                }
            }
            rowNode.appendChild(colNode);
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
