class DynamicTable {

    constructor(paramObject) {
        this.paramObject = paramObject;
        this.divNode = this._getNode("div");
        this._clearNode(this.divNode);
        this.filterNode = this._getNode(`input`, { type: `text`, className: `form-control`, placeholder: `Type here to search...` });
        this.limitNode = this._getLimitNode();
        this.countNode = this._getNode(`div`);
        this.bodyNode = this._getNode(`tbody`, { id: `tBody` });
    }

    createTable() {
        let { tableId, headData, head2Data, footData, addFilter } = this.paramObject;
        if (addFilter) {
            this.divNode.appendChild(this.filterNode);
        }
        this._addLimitRowNode();
        let tableNode = this._getNode(`table`, { id: tableId, className: `table table-striped table-bordered table-hover table-sm` });
        this.divNode.appendChild(tableNode);
        this._addTableDivision(tableNode, `thead`, headData, head2Data);
        tableNode.appendChild(this.bodyNode);
        this._appendTableData();
        if (footData) {
            this._addTableDivision(tableNode, `tfoot`, footData);
        } else {
            this._addTableDivision(tableNode, `tfoot`, headData, head2Data);
        }
        return this.divNode;
    }

    _appendTableData() {
        let { addFilter, addLimit } = this.paramObject;
        this._addTableDataRows();
        if (addFilter) {
            this.filterNode.onkeyup = () => {
                this._addTableDataRows();
            }
        }
        if (addLimit) {
            this.limitNode.onchange = () => {
                this._addTableDataRows();
            }
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
        let rowNode = this._getNode(`div`, { className: `row` });
        this.divNode.appendChild(rowNode);
        this._addLimitFormNode(rowNode);
        let colNode = this._getNode(`div`, { className: `col text-right` });
        rowNode.appendChild(colNode);
        colNode.appendChild(this.countNode);
        return rowNode;
    }

    _addLimitFormNode(rowNode) {
        let { addLimit } = this.paramObject;
        let colNode = this._getNode(`div`, { className: `col text-right` });
        rowNode.appendChild(colNode);
        if (addLimit) {
            let formNode = this._getNode(`form`, { className: `form-inline` });
            colNode.appendChild(formNode);
            let textNode = document.createTextNode(`Show `);
            formNode.appendChild(textNode);
            formNode.appendChild(this.limitNode);
            textNode = document.createTextNode(` entries`);
            formNode.appendChild(textNode);
        }
    }

    _getLimitNode() {
        let selectNode = this._getNode(`select`, { className: `form-control` });
        this._addLimitOption(selectNode, 50, 50);
        this._addLimitOption(selectNode, 100, 100);
        this._addLimitOption(selectNode, 250, 250);
        this._addLimitOption(selectNode, `all`, `ALL`);
        return selectNode;
    }

    _addLimitOption(selectNode, value, text) {
        let optionNode = this._getNode(`option`, { value });
        selectNode.appendChild(optionNode);
        let textNode = document.createTextNode(text);
        optionNode.appendChild(textNode);
    }

    _clearNode(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    _getNode(nodeType, nodeParamObject) {
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
        let divisionNode = this._getNode(divisionName);
        tableNode.appendChild(divisionNode);
        let trNode = this._getNode(`tr`);
        divisionNode.appendChild(trNode);
        this._addData(trNode, `S.No.`, dataArray, `th`, divisionName);
        if (dataArray2 && dataArray2.length) {
            trNode = this._getNode(`tr`);
            divisionNode.appendChild(trNode);
            this._addData(trNode, `S.No.`, dataArray2, `th`, divisionName);
        }
        this._checkboxToggle(divisionName);
    }

    _addTableDataRows() {
        let { dataRows, functionArray } = this.paramObject;
        this._clearNode(this.bodyNode);
        if (typeof dataRows === `string`) {
            this.bodyNode.insertAdjacentHTML(`beforeend`, dataRows);
        } else {
            this._addTableDataRowsFromObject();
        }
        if (functionArray) {
            functionArray.forEach(currentObject => {
                let { className, eventName, functionName } = currentObject;
                this._attachFunctionToClassNodes(className, eventName, functionName);
            });
        }
    }

    _addTableDataRowsFromObject() {
        let { dataRows, addFilter, addLimit } = this.paramObject;
        let filterTerm;
        if (addFilter) {
            filterTerm = this.filterNode.value.toLowerCase();
        }
        let serialNumber = 0;
        let limitNumber = 0;
        let rowNode;
        dataRows.forEach(currentRow => {
            let { className, data, id } = currentRow;
            if (!addFilter || this._filterData(filterTerm, currentRow.data)) {
                serialNumber++;
                if (!addLimit || this.limitNode.value === `all` || this.limitNode.value >= serialNumber) {
                    limitNumber++;
                    rowNode = this._getNode(`tr`, { className, id });
                    this.bodyNode.appendChild(rowNode);
                    this._addData(rowNode, serialNumber, currentRow.data, `td`, currentRow);
                }
            }
        });
        this._clearNode(this.countNode);
        let textNode = document.createTextNode(`Showing 1 to ${limitNumber} of ${serialNumber} entries`);
        this.countNode.appendChild(textNode);
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

    _addData(rowNode, serialNumber, dataArray, typeName, trAttributes) {
        let { addCheckboxes, checkboxClass } = this.paramObject;
        if (addCheckboxes) {
            let id;
            if (typeName === `td` && trAttributes.checkboxId) {
                id = trAttributes.checkboxId;
            } else if (typeName === `th`) {
                id = `${checkboxClass}_${trAttributes}`;
            }
            let checkboxNode = this._getNode(`input`, { className: `form-control ${checkboxClass}`, id, type: `checkbox` });
            let checkboxTDNode = this._getNode(typeName, { subNode: checkboxNode });
            rowNode.appendChild(checkboxTDNode);
        }
        let serialNumberNode = this._getNode(typeName, { text: serialNumber });
        rowNode.appendChild(serialNumberNode);
        let cellNode;
        dataArray.forEach(dataObject => {
            cellNode = this._getNode(typeName, dataObject);
            rowNode.appendChild(cellNode);
        });
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