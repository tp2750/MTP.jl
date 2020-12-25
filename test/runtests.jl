using MTP, XLSX
using Test

@testset "MTP.jl" begin
    p1 = Mtp96("Plate 1")
    @test p1.name == "Plate 1"
    @test p1.barcode == ""
    @test p1.well == wellname.(p1.well)
    @test wellname.(["A1", "A12"]) == ["A01", "A12"]    
    p2 = Mtp384("Plate 2")
end
@testset "XLSX" begin
    wb = XLSX.readxlsx("plate_test_2.xlsx")
    s1 = wb[1]
    m1 = MTP.sheet_as_matrix(s1)
    @test size(m1) == (25,13)
end
