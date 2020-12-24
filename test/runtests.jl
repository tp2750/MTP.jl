using MTP
using Test

@testset "MTP.jl" begin
    p1 = Mtp96("Plate 1")
    @test p1.name == "Plate 1"
    @test p1.barcode == ""
    @test p1.well == wellname.(p1.well)
    @test wellname.(["A1", "A12"]) == ["A01", "A12"]    
    p2 = Mtp384("Plate 2")
end
