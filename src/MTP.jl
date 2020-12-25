module MTP

import Base.@kwdef
using Printf, XLSX, DataFrames

export Mtp96, Mtp384, wellname, LETTERS, wells

include("xlsx.jl")
include("setupfile.jl")

const LETTERS = collect('A':'Z')


abstract type Mtp end

struct Mtp96 <: Mtp
    name::String
    barcode::String
    geometry::Int
    well::Array{String}
end

struct Mtp384 <: Mtp
    name::String
    barcode::String
    geometry::Int
    well::Array{String}
end


function Mtp96(name::String; barcode="")
    wells = vec(string.(repeat('A':'H',12),lpad.(repeat(1:12, outer=8),2,"0")))
    Mtp96(name, barcode, 96, wells)
end

function Mtp384(name::String; barcode="")
    wells = vec(string.(repeat('A':'P',24),lpad.(repeat(1:24, outer=16),2,"0")))
    Mtp384(name, barcode, 384 , wells)
end

"""
    wells(geometry)
    wells(rows, cols)

    Generate wells based on geometry or rows and colums (A01, A02, ....)
"""
wells(rows, cols) = vec(string.(repeat(LETTERS[1:rows],outer = cols),lpad.(repeat(1:cols, inner=rows),2,"0")))

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


end

