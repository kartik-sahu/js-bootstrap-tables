# js-bootstrap-tables

Bootstrap tables using vanilla javascript with built-in search, serial no., event-firing, colspan, rowspan, counters and much more...

# Optional Requirements

Bootstrap

# CDN

<script src="https://cdn.jsdelivr.net/gh/TaxHeal-in/js-bootstrap-tables@0.1.2/html.js"></script>
<script src="https://cdn.jsdelivr.net/gh/TaxHeal-in/js-bootstrap-tables@0.1.2/table.js"></script>

# How to use

let headRow = [{ text: `Name` }];

let dataRows = [
{text: `Pankaj`},
{text: `Ram`},
{text: `Tarun`}
];

let newDynamicTable = new DynamicTable({ divId: `tableDiv`, tableId: `tableData`, headRow, dataRows, head2Row, footRow, functionArray });

newDynamicTable.createTable();

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
