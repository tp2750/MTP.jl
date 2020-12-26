module MTP

using Printf, XLSX, DataFrames, DataFramesMeta

include("xlsx.jl")
include("setupfile.jl")

export LETTERS, plate

"""
    MTP.LETTERS is just the vector ["A", "B", ..., "Z"] as in R
"""
const LETTERS = string.(collect('A':'Z'))



"""
    MTP.plate(platename, geometry = 96)
    MTP.plate([plate1, plate2], geometry = 96)
    create one or more plates with the given names and geometry.
"""
function plate(platename::String, geometry = 96)
    DataFrame(platename = platename, geometry = geometry, well = wells(geometry))
end

function plate(names::Array{String}, geometry = 96)
    vcat([plate(x, geometry) for x in names]...)
end

"""
    wells(geometry)
    wells(rows, cols)

    Generate wells based on geometry or rows and colums (A01, A02, ....)
"""
wells(rows, cols) = vec(string.(repeat(MTP.LETTERS[1:rows],outer = cols),lpad.(repeat(1:cols, inner=rows),2,"0")))

function wells(g)
    rows = Int(sqrt(g/1.5))
    cols = Int(1.5*rows)
    wells(rows,cols)
end
       
function wellname(w)
    pat = r"(\D)(\d+)"
    m = match(pat, w)
    l = m[1]
    ns = lpad(parse(Int,m[2]),2,"0")
    "$l$ns"
end

function n_row(w)
    pat = r"(\D)(\d+)"
    m = match(pat, w)
    findfirst(MTP.LETTERS .== m[1])
end

function n_col(w)
    pat = r"(\D)(\d+)"
    m = match(pat, w)
    parse(Int, m[2])
end

n_rc(w) = (n_row(w), n_col(w))
n_row(::Missing) = missing
n_col(::Missing) = missing

function Q(w::String, geometry = 384, type = "Z")
    @assert type ∈ ["Z"] ## only Q1Q2\nQ3Q4 for now
    @assert geometry ∈ [96, 384]
    if geometry == 96
        return("Q0")
    end
    r = n_row(w)
    c = n_col(w)
    q = mod(c-1,2) + mod(r-1,2)*2 +1
    "Q$q"
end

function well96(w::String, geometry=384)
    @assert geometry ∈ [96, 384]
    if geometry == 96
        return(w)
    end
    (r,c) = MTP.n_rc(w)
    r2 = floor(Int, (r-1)/2) +1 
    c2 = floor(Int, (c-1)/2) +1
    LETTERS[r2]*lpad(c2,2,"0")
end

function well384(w::String, geometry=384)
    @assert geometry ∈ [96, 384]
    if geometry == 96
        return(missing)
    end
    w
end

"""
    merge_info(df::DataFrame)
    Add Q, well96, well384, row96, col96, row384, col384 to a plate DataFrame
"""
function merge_info(df::DataFrame)
    res = @transform(df, Q = MTP.Q.(:well, :geometry), well96 = MTP.well96.(:well, :geometry), well384 = MTP.well384.(:well, :geometry))
    @transform(res, row96 = n_row.(:well96), col96 = n_col.(:well96), row384 = n_row.(:well384), col384 = n_col.(:well384))
end

"""
    printplate(df::DataFrame, dispcol= :well)
    Show data in plate format. The dispcol selects the color to show in the wells.
    Eg MTP.printplate(su3, :Q)
"""
function printplate(df::DataFrame, dispcol= :well)
    df2 = @transform(df, row = LETTERS[n_row.(:well)], col = n_col.(:well))
    unstack(df2, [:platename, :row] , :col, dispcol)
end

end

