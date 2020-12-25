using MTP, XLSX, DataFrames
using Test

@testset "MTP.jl" begin
    p1 = Mtp96("Plate 1")
    @test p1.name == "Plate 1"
    @test p1.barcode == ""
    @test p1.well == wellname.(p1.well)
    @test wellname.(["A1", "A12"]) == ["A01", "A12"]    
    p2 = Mtp384("Plate 2")
    @test wells(96)[1:8] == ["A01", "B01", "C01", "D01", "E01", "F01", "G01", "H01"]
end
@testset "xlsx.jl" begin
    wb = XLSX.readxlsx("plate_test_2.xlsx")
    s1 = wb[1]
    m1 = MTP.sheet_as_matrix(s1)
    @test size(m1) == (25,13)
    d1 = MTP.dump_workbook("plate_test_2.xlsx")
    @test length(d1) == 1
end
@testset "setupfile.jl" begin
    wb = XLSX.readxlsx("plate_test.xlsx")
    sh1 = wb[1]
    df1 = DataFrame(sh1)
    se1 = MTP.setup(df1)
    @test se1[3,2] == "C1"
end
    
