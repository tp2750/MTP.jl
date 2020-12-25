using XLSX, DataFrames

function setupfile(file::String;filepath="filepath", sheetname = "sheetname", platename = "platename", geometry="geometry",well="well", well_content= "well_content")
    wb = XLSX.readxlsx(file)
    sheetnames = XLSX.sheetnames(wb)
    
end

"""
    setup(df::DataFrame)
    Get at setup from a DataFrame
"""
function setup(df::DataFrame)
    content = vec(Matrix(df[:,Not(1)])) ## col-wise contetnt
    geometry = length(content)
    @assert geometry ∈ [96, 384]
    DataFrame(well = wells(geometry), well_content = content)
end


