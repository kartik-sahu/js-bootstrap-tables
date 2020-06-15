# js-bootstrap-tables

Bootstrap tables using vanilla javascript with built-in search, serial no., event-firing, colspan, rowspan, counters and much more...

# Optional Requirements

Bootstrap

# CDN

<script src="https://cdn.jsdelivr.net/gh/TaxHeal-in/js-bootstrap-tables@0.2.8/src/html.js"></script>
<script src="https://cdn.jsdelivr.net/gh/TaxHeal-in/js-bootstrap-tables@0.2.8/src/table.js"></script>

# How to use

let headRow = [{ text: `Name` }];

let dataRows = {
checkboxId,
className,
data: [
{text: `Pankaj`},
{text: `Ram`},
{text: `Tarun`}
],
id
};

let newDynamicTable = new DynamicTable({
tableId: `tableData`,
headRow,
dataRows,
head2Row,
footRow,
functionArray,
addFilter: true,
addLimit: true,
addCheckboxes: true,
checkboxClass
});

let newDynamicTableNode = newDynamicTable.createTable();

# Properties

additionalClass

align

className

colspan

filterText

id

placeholder

rowspan

text

type
