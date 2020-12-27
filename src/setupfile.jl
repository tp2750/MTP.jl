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
        @info "setupfile processing sheet: '$sheet'"
        sh = wb[sheet]
        try
            df = MTP.DataFrame(sh)
            su1 = MTP.setup(df)
            typeof(su1) == Nothing && continue 
            su = @transform(su1, sheetname = sheet)
            push!(setup, su)
        catch e
            @error "setupfile caught error:"
            println(e)
            continue
        end
    end
    if length(setup) == 0
        @error "setupfile found no valid plate setup sheets in $file"
        return(nothing)
    end
    res = vcat(setup...)
    res = @transform(res, filename = basename(file))
end

"""
    setup(df::DataFrame)
    Get at setup from a DataFrame
"""
function setup(df::DataFrame)
    content = vec(Matrix(df[:,Not(1)])) ## col-wise content
    geometry = length(content)
    if !(geometry ∈ [96, 384]) ## assert plate geometry
        @error "Dataframe has $geometry wells. Does not look like a plate:"
        println(df)
        return(nothing)
    end
    if !(df[1:8,1] == ["A", "B", "C", "D", "E", "F", "G", "H"])
        @error "Row names are not plate rows (A, B, C, ...)"
        println(df)
        return(nothing)
    end
    if !(names(df)[2:13] == ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"])
        @error "Column headers are not plate columns (1, 2, 3, ...):"
        println(df)
        return(nothing)
    end
    MTP.DataFrame(platename = names(df)[1], geometry = geometry, well = wells(geometry), well_content = content)
end


