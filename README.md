# js-bootstrap-tables

Bootstrap tables using vanilla javascript with built-in search, serial no., event-firing, colspan, rowspan, counters and much more...

# Optional Requirements

Bootstrap

# CDN

<script src="https://cdn.jsdelivr.net/gh/thehitechpanky/js-bootstrap-tables@master/table.js"></script>

# How to use

let headRow = [{ text: `Name` }];

let dataRows = [
{text: `Pankaj`},
{text: `Ram`},
{text: `Tarun`}
];

createTable({ divId: `tableDiv`, tableId: `tableData`, headRow, dataRows, head2Row, footRow, functionArray });

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
