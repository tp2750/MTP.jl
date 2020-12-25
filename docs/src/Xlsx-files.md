# XLSX files

Some functions for for working with xlsx-files using the XLSX package.

## Exploring a workbook

The `XLSX.readxlsx` function gives a concise overview of the content of a workbook and a sheet:

```@example 1
using XLSX
wb = XLSX.readxlsx("../../test/plate_test_2.xlsx")
```
```@example 1
wbs1 = wb[1]
```
However, sometimes we want to see the content easily.
For this we have the functions `dump_workbook` and `sheet_as_matrix`.
These functions are different from `readtable`, as they include rows of all missing data.

```@example 1
using XLSX, MTP
wb_dump = MTP.dump_workbook("../../test/plate_test_2.xlsx")
```
```@example 1
wb_dump[1]
```
```@example 1
sheet_as_matrix(wbs1)
```

### Accessor functions

We also have some accessor functions:

* `name(sheet)`: The name of the sheet.
* `size(sheet)`: The size of the sheet (as matrix).
* `dimension(sheet)`: The cell range of the sheet, eg "A1:M25".
* `filepath(sheet)`: The file path used to read the workbook.

```@example 1
name(wbs1)
```
```@example 1
size(wbs1)
```
```@example 1
dimension(wbs1)
```
```@example 1
filepath(wbs1)
```

