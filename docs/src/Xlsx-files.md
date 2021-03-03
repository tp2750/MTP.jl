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
using XLSX, MicroPlates
wb_dump = MicroPlates.dump_workbook("../../test/plate_test_2.xlsx")
```
```@example 1
wb_dump[1]
```
```@example 1
MicroPlates.sheet_as_matrix(wbs1)
```

### Accessor functions

We also have some accessor functions:

* `MicroPlates.name(sheet)`: The name of the sheet.
* `MicroPlates.size(sheet)`: The size of the sheet (as matrix).
* `MicroPlates.dimension(sheet)`: The cell range of the sheet, eg "A1:M25".
* `MicroPlates.filepath(sheet)`: The file path used to read the workbook.

```@example 1
MicroPlates.name(wbs1)
```
```@example 1
MicroPlates.size(wbs1)
```
```@example 1
MicroPlates.dimension(wbs1)
```
```@example 1
MicroPlates.filepath(wbs1)
```

## Easy DataFrames

You can quickly get a worksheet as a Dataframe using the overloaded `DataFrame` function:

```@example 2
using XLSX, MicroPlates, DataFrames
wb2 = XLSX.readxlsx("../../test/plate_test.xlsx")
wb2s1 = wb2[1]
MicroPlates.DataFrame(wb2s1)
```

