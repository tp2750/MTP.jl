module MTP

import Base.@kwdef
using Printf

export Mtp96, Mtp384, wellname

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



function wellname(w)
    pat = r"(\D)(\d+)"
    m = match(pat, w)
    l = m[1]
    ns = lpad(parse(Int,m[2]),2,"0")
    "$l$ns"
end


end

