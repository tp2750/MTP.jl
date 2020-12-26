var documenterSearchIndex = {"docs":
[{"location":"intro/#Introduction-to-MTP","page":"Intro","title":"Introduction to MTP","text":"","category":"section"},{"location":"intro/","page":"Intro","title":"Intro","text":"This package is for working with data on micro plates.","category":"page"},{"location":"intro/#Discovering-functions","page":"Intro","title":"Discovering functions","text":"","category":"section"},{"location":"intro/","page":"Intro","title":"Intro","text":"No functions are exported, but just type MTP. and hit \"Tab\" to get a list of methods.","category":"page"},{"location":"intro/#Generating-a-plate","page":"Intro","title":"Generating a plate","text":"","category":"section"},{"location":"intro/","page":"Intro","title":"Intro","text":"Plates are DataFrames. Plates has a geometry which is the number of wells. Currently supported are 96 and 384 well plates.","category":"page"},{"location":"intro/","page":"Intro","title":"Intro","text":"You create a plate by calling MTP.plate(\"Platename\"):","category":"page"},{"location":"intro/","page":"Intro","title":"Intro","text":"julia> MTP.plate(\"P1\")\n96×3 DataFrame\n Row │ platename  geometry  well\n     │ String     Int64     String \n─────┼─────────────────────────────\n   1 │ P1               96  A01\n   2 │ P1               96  B01\n   3 │ P1               96  C01\n   4 │ P1               96  D01\n   5 │ P1               96  E01\n   6 │ P1               96  F01\n   7 │ P1               96  G01\n   8 │ P1               96  H01\n   9 │ P1               96  A02\n  10 │ P1               96  B02\n  11 │ P1               96  C02\n  ⋮  │     ⋮         ⋮        ⋮\n  86 │ P1               96  F11\n  87 │ P1               96  G11\n  88 │ P1               96  H11\n  89 │ P1               96  A12\n  90 │ P1               96  B12\n  91 │ P1               96  C12\n  92 │ P1               96  D12\n  93 │ P1               96  E12\n  94 │ P1               96  F12\n  95 │ P1               96  G12\n  96 │ P1               96  H12\n                    74 rows omitted","category":"page"},{"location":"intro/","page":"Intro","title":"Intro","text":"You can make multiple plates by giving a vector of plate-names, and you can specify the geometry:","category":"page"},{"location":"intro/","page":"Intro","title":"Intro","text":"julia> MTP.plate([\"P1\", \"P2\"], 384)\n768×3 DataFrame\n Row │ platename  geometry  well   \n     │ String     Int64     String \n─────┼─────────────────────────────\n   1 │ P1              384  A01\n   2 │ P1              384  B01\n   3 │ P1              384  C01\n   4 │ P1              384  D01\n   5 │ P1              384  E01\n   6 │ P1              384  F01\n   7 │ P1              384  G01\n   8 │ P1              384  H01\n   9 │ P1              384  I01\n  10 │ P1              384  J01\n  11 │ P1              384  K01\n  ⋮  │     ⋮         ⋮        ⋮\n 758 │ P2              384  F24\n 759 │ P2              384  G24\n 760 │ P2              384  H24\n 761 │ P2              384  I24\n 762 │ P2              384  J24\n 763 │ P2              384  K24\n 764 │ P2              384  L24\n 765 │ P2              384  M24\n 766 │ P2              384  N24\n 767 │ P2              384  O24\n 768 │ P2              384  P24\n                   746 rows omitted","category":"page"},{"location":"intro/#Merging-96-well-plate-on-384-well-plates","page":"Intro","title":"Merging 96 well plate on 384 well plates","text":"","category":"section"},{"location":"intro/","page":"Intro","title":"Intro","text":"Often samples start out in 96 well format, and are merged into 384 well format for assay or storage. To keep track of this, we use so called \"quadrants\" organized in a \"Z\":","category":"page"},{"location":"intro/","page":"Intro","title":"Intro","text":"| Q1 | Q2 | | – | – | | Q3 | Q4 |","category":"page"},{"location":"intro/","page":"Intro","title":"Intro","text":"Below, we show which quadrant each well of a 384 plate belongs to:","category":"page"},{"location":"intro/","page":"Intro","title":"Intro","text":"(Image: )","category":"page"},{"location":"intro/","page":"Intro","title":"Intro","text":"The MTP.merge_info function adds quadarant information and other usefull information to a plate DataFrame:","category":"page"},{"location":"intro/","page":"Intro","title":"Intro","text":"Q (Q1, Q2, Q3, Q4): The quadrant of the well\nwell96: The well on the source 96 well plate\nwell384: The well on the 384 well plate to be explicit\ncol96: The column on the 96 well plate. Useful for sorting\ncol384: The column on the 384 well plate. Useful for sorting\nrow96 (Int): The row on the 96 well plate. Useful for sorting\nrow384 (Int): The row on the 384 well plate. Useful for sorting","category":"page"},{"location":"intro/","page":"Intro","title":"Intro","text":"julia> su2 = MTP.setupfile(\"../../test/plate_test_3.xlsx\");\njulia> s3 = @where(su2, :platename .== \"384\");\njulia> first(s3, 5)\n5×6 DataFrame\n Row │ platename  geometry  well    well_content  sheetname  filename          \n     │ String     Int64     String  Any           String     String            \n─────┼─────────────────────────────────────────────────────────────────────────\n   1 │ 384             384  A01     A1            Ark2       plate_test_3.xlsx\n   2 │ 384             384  B01     B1            Ark2       plate_test_3.xlsx\n   3 │ 384             384  C01     C1            Ark2       plate_test_3.xlsx\n   4 │ 384             384  D01     D1            Ark2       plate_test_3.xlsx\n   5 │ 384             384  E01     E1            Ark2       plate_test_3.xlsx\njulia> s4 = MTP.merge_info(s3);\njulia> first(s4, 5)\n5×13 DataFrame\n Row │ platename  geometry  well    well_content  sheetname  filename           Q       well96  well384  row96  col96  row384  col384 \n     │ String     Int64     String  Any           String     String             String  String  String   Int64  Int64  Int64   Int64  \n─────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────\n   1 │ 384             384  A01     A1            Ark2       plate_test_3.xlsx  Q1      A01     A01          1      1       1       1\n   2 │ 384             384  B01     B1            Ark2       plate_test_3.xlsx  Q3      A01     B01          1      1       2       1\n   3 │ 384             384  C01     C1            Ark2       plate_test_3.xlsx  Q1      B01     C01          2      1       3       1\n   4 │ 384             384  D01     D1            Ark2       plate_test_3.xlsx  Q3      B01     D01          2      1       4       1\n   5 │ 384             384  E01     E1            Ark2       plate_test_3.xlsx  Q1      C01     E01          3      1       5       1","category":"page"},{"location":"intro/#Back-to-plate-format","page":"Intro","title":"Back to plate format","text":"","category":"section"},{"location":"intro/","page":"Intro","title":"Intro","text":"It is convenient to work with plate data in a \"tall\" DataFrame. We saw that it is convenient to enter data about plates in plate format and ingest it using setupfile. Similarly, we need to display the content in plate format to easily overview it.","category":"page"},{"location":"intro/","page":"Intro","title":"Intro","text":"For this we have the MTP.printplate function. It takes 2 arguments: a plate DataFrame and the column to display. The result is again a DataFrame, asprintplate is just a thin wrapper around unstack.","category":"page"},{"location":"intro/","page":"Intro","title":"Intro","text":"Below we show how to get the Q information on the plate:","category":"page"},{"location":"intro/","page":"Intro","title":"Intro","text":"julia> MTP.printplate(s4,:Q)\n16×26 DataFrame\n Row │ platename  row     1        2        3        4        5        6        7        8         ⋯\n     │ String     String  String?  String?  String?  String?  String?  String?  String?  String?   ⋯\n─────┼──────────────────────────────────────────────────────────────────────────────────────────────\n   1 │ 384        A       Q1       Q2       Q1       Q2       Q1       Q2       Q1       Q2        ⋯\n   2 │ 384        B       Q3       Q4       Q3       Q4       Q3       Q4       Q3       Q4\n   3 │ 384        C       Q1       Q2       Q1       Q2       Q1       Q2       Q1       Q2\n   4 │ 384        D       Q3       Q4       Q3       Q4       Q3       Q4       Q3       Q4\n   5 │ 384        E       Q1       Q2       Q1       Q2       Q1       Q2       Q1       Q2        ⋯\n   6 │ 384        F       Q3       Q4       Q3       Q4       Q3       Q4       Q3       Q4\n   7 │ 384        G       Q1       Q2       Q1       Q2       Q1       Q2       Q1       Q2\n   8 │ 384        H       Q3       Q4       Q3       Q4       Q3       Q4       Q3       Q4\n   9 │ 384        I       Q1       Q2       Q1       Q2       Q1       Q2       Q1       Q2        ⋯\n  10 │ 384        J       Q3       Q4       Q3       Q4       Q3       Q4       Q3       Q4\n  11 │ 384        K       Q1       Q2       Q1       Q2       Q1       Q2       Q1       Q2\n  12 │ 384        L       Q3       Q4       Q3       Q4       Q3       Q4       Q3       Q4\n  13 │ 384        M       Q1       Q2       Q1       Q2       Q1       Q2       Q1       Q2        ⋯\n  14 │ 384        N       Q3       Q4       Q3       Q4       Q3       Q4       Q3       Q4\n  15 │ 384        O       Q1       Q2       Q1       Q2       Q1       Q2       Q1       Q2\n  16 │ 384        P       Q3       Q4       Q3       Q4       Q3       Q4       Q3       Q4\n                                                                                  16 columns omitted","category":"page"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = MTP","category":"page"},{"location":"#MTP","page":"Home","title":"MTP","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [MTP]","category":"page"},{"location":"#MTP.LETTERS","page":"Home","title":"MTP.LETTERS","text":"MTP.LETTERS is just the vector [\"A\", \"B\", ..., \"Z\"] as in R\n\n\n\n\n\n","category":"constant"},{"location":"#DataFrames.DataFrame-Tuple{XLSX.Worksheet}","page":"Home","title":"DataFrames.DataFrame","text":"DataFrame(s::XLSX.Worksheet)\nGet a work-sheet as DataFrame\n\n\n\n\n\n","category":"method"},{"location":"#MTP.merge_info-Tuple{DataFrame}","page":"Home","title":"MTP.merge_info","text":"merge_info(df::DataFrame)\nAdd Q, well96, well384, row96, col96, row384, col384 to a plate DataFrame\n\n\n\n\n\n","category":"method"},{"location":"#MTP.plate","page":"Home","title":"MTP.plate","text":"MTP.plate(platename, geometry = 96)\nMTP.plate([plate1, plate2], geometry = 96)\ncreate one or more plates with the given names and geometry.\n\n\n\n\n\n","category":"function"},{"location":"#MTP.printplate","page":"Home","title":"MTP.printplate","text":"printplate(df::DataFrame, dispcol= :well)\nShow data in plate format. The dispcol selects the color to show in the wells.\nEg MTP.printplate(su3, :Q)\n\n\n\n\n\n","category":"function"},{"location":"#MTP.setup-Tuple{DataFrame}","page":"Home","title":"MTP.setup","text":"setup(df::DataFrame)\nGet at setup from a DataFrame\n\n\n\n\n\n","category":"method"},{"location":"#MTP.setupfile-Tuple{String}","page":"Home","title":"MTP.setupfile","text":"setupfile(file::String)\nGet a platesetup for an .xlsx file.\nReads all sheets.\nReturns DataFrame of filename, sheetname, platename, geometry, well, well_content\nPlatename is written in the topleft corner. well_content is in the wells.\nOnly first plate definition on a sheet is read (for now)\n\n\n\n\n\n","category":"method"},{"location":"#MTP.wells-Tuple{Any,Any}","page":"Home","title":"MTP.wells","text":"wells(geometry)\nwells(rows, cols)\n\nGenerate wells based on geometry or rows and colums (A01, A02, ....)\n\n\n\n\n\n","category":"method"},{"location":"Xlsx-files/#XLSX-files","page":"XLSX files","title":"XLSX files","text":"","category":"section"},{"location":"Xlsx-files/","page":"XLSX files","title":"XLSX files","text":"Some functions for for working with xlsx-files using the XLSX package.","category":"page"},{"location":"Xlsx-files/#Exploring-a-workbook","page":"XLSX files","title":"Exploring a workbook","text":"","category":"section"},{"location":"Xlsx-files/","page":"XLSX files","title":"XLSX files","text":"The XLSX.readxlsx function gives a concise overview of the content of a workbook and a sheet:","category":"page"},{"location":"Xlsx-files/","page":"XLSX files","title":"XLSX files","text":"using XLSX\nwb = XLSX.readxlsx(\"../../test/plate_test_2.xlsx\")","category":"page"},{"location":"Xlsx-files/","page":"XLSX files","title":"XLSX files","text":"wbs1 = wb[1]","category":"page"},{"location":"Xlsx-files/","page":"XLSX files","title":"XLSX files","text":"However, sometimes we want to see the content easily. For this we have the functions dump_workbook and sheet_as_matrix. These functions are different from readtable, as they include rows of all missing data.","category":"page"},{"location":"Xlsx-files/","page":"XLSX files","title":"XLSX files","text":"using XLSX, MTP\nwb_dump = MTP.dump_workbook(\"../../test/plate_test_2.xlsx\")","category":"page"},{"location":"Xlsx-files/","page":"XLSX files","title":"XLSX files","text":"wb_dump[1]","category":"page"},{"location":"Xlsx-files/","page":"XLSX files","title":"XLSX files","text":"MTP.sheet_as_matrix(wbs1)","category":"page"},{"location":"Xlsx-files/#Accessor-functions","page":"XLSX files","title":"Accessor functions","text":"","category":"section"},{"location":"Xlsx-files/","page":"XLSX files","title":"XLSX files","text":"We also have some accessor functions:","category":"page"},{"location":"Xlsx-files/","page":"XLSX files","title":"XLSX files","text":"MTP.name(sheet): The name of the sheet.\nMTP.size(sheet): The size of the sheet (as matrix).\nMTP.dimension(sheet): The cell range of the sheet, eg \"A1:M25\".\nMTP.filepath(sheet): The file path used to read the workbook.","category":"page"},{"location":"Xlsx-files/","page":"XLSX files","title":"XLSX files","text":"MTP.name(wbs1)","category":"page"},{"location":"Xlsx-files/","page":"XLSX files","title":"XLSX files","text":"MTP.size(wbs1)","category":"page"},{"location":"Xlsx-files/","page":"XLSX files","title":"XLSX files","text":"MTP.dimension(wbs1)","category":"page"},{"location":"Xlsx-files/","page":"XLSX files","title":"XLSX files","text":"MTP.filepath(wbs1)","category":"page"},{"location":"Xlsx-files/#Easy-DataFrames","page":"XLSX files","title":"Easy DataFrames","text":"","category":"section"},{"location":"Xlsx-files/","page":"XLSX files","title":"XLSX files","text":"You can quickly get a worksheet as a Dataframe using the overloaded DataFrame function:","category":"page"},{"location":"Xlsx-files/","page":"XLSX files","title":"XLSX files","text":"using XLSX, MTP, DataFrames\nwb2 = XLSX.readxlsx(\"../../test/plate_test.xlsx\")\nwb2s1 = wb2[1]\nMTP.DataFrame(wb2s1)","category":"page"},{"location":"setup/#Setup-files","page":"Setup files","title":"Setup files","text":"","category":"section"},{"location":"setup/","page":"Setup files","title":"Setup files","text":"Whn working with plates, we need to easily describe to content of the plates. This can often contain may parameters.","category":"page"},{"location":"setup/","page":"Setup files","title":"Setup files","text":"Using the setupfile function, we can describe the setup in convenient plate-format. There can be one such plate in each sheet in the workbook. In this way, we can describe many parameters in a single workbook.","category":"page"},{"location":"setup/#Example","page":"Setup files","title":"Example","text":"","category":"section"},{"location":"setup/","page":"Setup files","title":"Setup files","text":"The notebook plate_test_3.xlsx contains 2 sheets: one with a 96-well base ssetup and one with a 384 well based setup.","category":"page"},{"location":"setup/","page":"Setup files","title":"Setup files","text":"(Image: ) (Image: )","category":"page"},{"location":"setup/","page":"Setup files","title":"Setup files","text":"We can read this in to a dataframe like this:","category":"page"},{"location":"setup/","page":"Setup files","title":"Setup files","text":"julia> MTP.setupfile(\"plate_test_3.xlsx\")\n480×6 DataFrame\n Row │ platename  geometry  well    well_content  sheetname  filename          \n     │ String     Int64     String  Any           String     String            \n─────┼─────────────────────────────────────────────────────────────────────────\n   1 │ Wnames           96  A01     A1            Sheet1     plate_test_3.xlsx\n   2 │ Wnames           96  B01     B1            Sheet1     plate_test_3.xlsx\n   3 │ Wnames           96  C01     C1            Sheet1     plate_test_3.xlsx\n   4 │ Wnames           96  D01     D1            Sheet1     plate_test_3.xlsx\n   5 │ Wnames           96  E01     E1            Sheet1     plate_test_3.xlsx\n   6 │ Wnames           96  F01     F1            Sheet1     plate_test_3.xlsx\n   7 │ Wnames           96  G01     G1            Sheet1     plate_test_3.xlsx\n   8 │ Wnames           96  H01     H1            Sheet1     plate_test_3.xlsx\n   9 │ Wnames           96  A02     A2            Sheet1     plate_test_3.xlsx\n  10 │ Wnames           96  B02     B2            Sheet1     plate_test_3.xlsx\n  11 │ Wnames           96  C02     C2            Sheet1     plate_test_3.xlsx\n  ⋮  │     ⋮         ⋮        ⋮          ⋮            ⋮              ⋮\n 470 │ 384             384  F24     F24           Ark2       plate_test_3.xlsx\n 471 │ 384             384  G24     G24           Ark2       plate_test_3.xlsx\n 472 │ 384             384  H24     H24           Ark2       plate_test_3.xlsx\n 473 │ 384             384  I24     I24           Ark2       plate_test_3.xlsx\n 474 │ 384             384  J24     J24           Ark2       plate_test_3.xlsx\n 475 │ 384             384  K24     K24           Ark2       plate_test_3.xlsx\n 476 │ 384             384  L24     L24           Ark2       plate_test_3.xlsx\n 477 │ 384             384  M24     M24           Ark2       plate_test_3.xlsx\n 478 │ 384             384  N24     N24           Ark2       plate_test_3.xlsx\n 479 │ 384             384  O24     O24           Ark2       plate_test_3.xlsx\n 480 │ 384             384  P24     P24           Ark2       plate_test_3.xlsx\n                                                               458 rows omitted","category":"page"}]
}
