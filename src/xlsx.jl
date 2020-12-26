# export sheet_as_matrix, name,dimension, filepath, DataFrame

function sheet_as_matrix(s::XLSX.Worksheet) 
    name = s.name
    dims = XLSX.get_dimension(s)
    file = s.package.filepath
    XLSX.readdata(file, "$(name)!$dims")
end

function dump_workbook(file::String)
    sheets = Matrix{Any}[]
    wb = XLSX.readxlsx(file)
    for s in wb.workbook.sheets
        push!(sheets, sheet_as_matrix(s))
    end
    names = name.(wb.workbook.sheets)
    NamedTuple{Tuple(Symbol.(names))}(sheets)
end

name(s::XLSX.Worksheet) = s.name
dimension(s::XLSX.Worksheet) = s.dimension ## This is get_dimension
filepath(s::XLSX.Worksheet) = s.package.filepath

Base.size(s::XLSX.Worksheet) = size(dimension(s)) ## Type pirate

import DataFrames.DataFrame 
"""
    DataFrame(s::XLSX.Worksheet)
    Get a work-sheet as DataFrame
"""
DataFrames.DataFrame(s::XLSX.Worksheet) = DataFrame(XLSX.readtable(s.package.filepath, s.name)...)
