class DynamicTable {

    constructor(paramObject) {
        this.paramObject = paramObject;
        this.filterNode = this._getTableNode(`input`, { type: `text`, className: `form-control`, placeholder: `Type here to search...` });
        this.divNode = document.getElementById(paramObject.divId);
    }

    createTable() {
        let { divId, tableId, headData, dataRows, head2Data, footData, functionArray, addFilter, addLimit } = this.paramObject;
        this._clearNode(this.divNode);
        if (addFilter) {
            this.divNode.appendChild(this.filterNode);
        }
        this._addLimitRowNode();
        let tableNode = this._getTableNode(`table`, { id: tableId, className: `table table-striped table-bordered table-hover table-sm` });
        this.divNode.appendChild(tableNode);
        this._addTableDivision(tableNode, `thead`, headData, head2Data);
        let bodyNode = this._getTableNode(`tbody`, { id: `tBody` });
        tableNode.appendChild(bodyNode);
        if (addFilter) {
            this._addTableDataRows({ bodyNode, countNode });
            this.filterNode.onkeyup = function() {
                this._addTableDataRows({ bodyNode, countNode });
            };
            if (addLimit) {
                limitNode.onchange = function() {
                    this._addTableDataRows({ bodyNode, countNode });
                }
            }
        } else {
            this._addTableDataRows({ bodyNode, countNode });
            if (addLimit) {
                limitNode.onchange = function() {
                    this._addTableDataRows({ bodyNode, countNode });
                }
            }
        }
        if (footData) {
            this._addTableDivision(tableNode, `tfoot`, footData);
        } else {
            this._addTableDivision(tableNode, `tfoot`, headData, head2Data);
        }
    }

    _checkboxToggle(divisionName) {
        let { checkboxClass } = this.paramObject;
        let currentNodeId, isChecked;
        if (checkboxClass) {
            document.getElementById(`${checkboxClass}_${divisionName}`).onclick = function() {
                currentNodeId = this.id.split(`_`)[1];
                isChecked = this.checked;
                let checkboxNodes = document.getElementsByClassName(checkboxClass);
                for (let i = 0; i < checkboxNodes.length; i++) {
                    checkboxNodes[i].checked = isChecked;
                }
            }
        }
    }

    _addLimitRowNode() {
        let limitRowNode = this._getTableNode(`div`, { className: `row` });
        this.divNode.appendChild(limitRowNode);
        let limitCol = this._getTableNode(`div`, { className: `col text-right` });
        limitRowNode.appendChild(limitCol);
        let limitNode = this._addLimitNode();
        limitCol.appendChild(limitNode);
        limitCol = this._getTableNode(`div`, { className: `col text-right` });
        limitRowNode.appendChild(limitCol);
        let countNode = this._getTableNode(`div`);
        limitCol.appendChild(countNode);
    }

    _addLimitNode() {
        let { addLimit } = this.paramObject;
        if (addLimit) {
            let formNode = this._getTableNode(`form`, { className: `form-inline` });
            limitCol.appendChild(formNode);
            formNode.insertAdjacentText(`beforeend`, `Show `);
            let selectNode = this._getTableNode(`select`, { className: `form-control` });
            formNode.appendChild(selectNode);
            formNode.insertAdjacentText(`beforeend`, ` entries`);
            this._addLimitOption(selectNode, 50, 50);
            this._addLimitOption(selectNode, 100, 100);
            this._addLimitOption(selectNode, 250, 250);
            this._addLimitOption(selectNode, `all`, `ALL`);
            return selectNode;
        }
        return false;
    }

    _addLimitOption(selectNode, value, text) {
        let limitOption = this._getTableNode(`option`, { value });
        limitOption.insertAdjacentText(`beforeend`, text);
        selectNode.appendChild(limitOption);
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
                this._addToAttribute(newNode, `class`, additionalClass);
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
        let { addCheckboxes, checkboxClass } = this.paramObject;
        let divisionNode = this._getTableNode(divisionName);
        tableNode.appendChild(divisionNode);
        let rowNode = this._getTableNode(`tr`);
        divisionNode.appendChild(rowNode);
        this._addData(rowNode, `S.No.`, dataArray, `th`, divisionName);
        if (dataArray2 && dataArray2.length) {
            rowNode = this._getTableNode(`tr`);
            divisionNode.appendChild(rowNode);
            this._addData(rowNode, `S.No.`, dataArray2, `th`, divisionName);
        }
        this._checkboxToggle(divisionName);
    }

    _addTableDataRows(paramObjectTDR) {
        let { bodyNode, countNode } = paramObjectTDR;
        let { dataRows, functionArray, addFilter } = this.paramObject;
        this._clearNode(bodyNode);
        if (typeof dataRows === `string`) {
            bodyNode.insertAdjacentHTML(`beforeend`, dataRows);
        } else {
            let filterTerm;
            if (addFilter) {
                filterTerm = this.filterNode.value.toLowerCase();
            }
            let serialNumber = 0;
            let limitNumber = 0;
            let rowNode;
            dataRows.forEach(currentRow => {
                if (!addFilter || this._filterData(filterTerm, currentRow)) {
                    serialNumber++;
                    if (!addLimit || limitNode.value === `all` || limitNode.value >= serialNumber) {
                        limitNumber++;
                        rowNode = this._getTableNode(`tr`);
                        bodyNode.appendChild(rowNode);
                        this._addData(rowNode, serialNumber, currentRow, `td`, serialNumber);
                    }
                }
            });
            this._clearNode(countNode);
            countNode.insertAdjacentText(`beforeend`, `Showing 1 to ${limitNumber} of ${serialNumber} entries`);
        }
        if (functionArray) {
            functionArray.forEach(currentObject => {
                let { className, eventName, functionName } = currentObject;
                this._attachFunctionToClassNodes(className, eventName, functionName);
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

    _addData(rowNode, serialNumber, dataArray, typeName, idSuffix) {
        let { addCheckboxes, checkboxClass } = this.paramObject;
        let cellNode;
        dataArray.forEach(dataObject => {
            cellNode = this._getTableNode(typeName, dataObject);
            rowNode.appendChild(cellNode);
        });
        let serialNumberNode = this._getTableNode(typeName, { text: serialNumber });
        rowNode.insertBefore(serialNumberNode, rowNode.firstChild);
        if (addCheckboxes) {
            let checkboxNode = this._getTableNode(`input`, { className: `form-control ${checkboxClass}`, id: `${checkboxClass}_${idSuffix}`, type: `checkbox` });
            let checkboxTDNode = this._getTableNode(typeName, { subNode: checkboxNode });
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