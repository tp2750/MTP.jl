using XLSX, DataFrames, DataFramesMeta

"""
    setupfile(file::String)
    Get a platesetup for an .xlsx file.
    Reads all sheets.
    Returns DataFrame of filename, sheetname, platename, geometry, well, well_content
    Platename is written in the topleft corner. well_content is in the wells.
    Only first plate definition on a sheet is read (for now)
"""
function setupfile(file::String)
    wb = XLSX.readxlsx(file)
    sheetnames = XLSX.sheetnames(wb)
    setup = DataFrame[]
    ## Loop over sheets: read each setup
    for sheet in sheetnames
        sh = wb[sheet]
        df = MTP.DataFrame(sh)
        su = @transform(MTP.setup(df), sheetname = sheet)
        push!(setup, su)
    end
    res = vcat(setup...)
    res = @transform(res, filename = basename(file))
end

"""
    setup(df::DataFrame)
    Get at setup from a DataFrame
"""
function setup(df::DataFrame)
    content = vec(Matrix(df[:,Not(1)])) ## col-wise contetnt
    geometry = length(content)
    if !(geometry ∈ [96, 384])
        @error "Dataframe has $geometry wells. Does not look like a plate:"
        print(df)
    end
    @assert geometry ∈ [96, 384]
    MTP.DataFrame(platename = names(df)[1], geometry = geometry, well = wells(geometry), well_content = content)
end


