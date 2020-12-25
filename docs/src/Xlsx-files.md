# XLSX files

Some functions for for working with xlsx-files using the XLSX package.

## Exploring a workbook

The XLSX package gives a consise overview of the content of a workbook and a sheet:

```@example
using XLSX
wb = XLSX.readxlsx("../../test/wb1.xlsx")
wbs1 = wb[1]
```
However, sometimes you want to see the content easily.
For the we have the functions `dump_workbook` and `sheet_as_matrix`:

```@example
using XLSX, MTP
wb_dump = MTP.dump_workbook("../../test/plate_test_2.xlsx")
wb_dump[1]
sheet_as_matrix(wbs1)
```

We also have some accessor functions:

* `name(sheet)`: The name of the sheet.
* `size(sheet)`: The size of the sheet (as matrix).
* `dimension(sheet)`: The cell range of the seet, eg "A1:M23".
* `filepath(sheet)`: The file path used to read the workbook.

```@example
name(wbs1)
size(wbs1)
dimension(wbs1)
filepath(wbs1)
```

