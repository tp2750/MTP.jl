using DataPlates, XLSX, DataFrames, DataFramesMeta
using Test

@testset "xlsx.jl" begin
    wb = XLSX.readxlsx("plate_test_2.xlsx")
    s1 = wb[1]
    m1 = DataPlates.sheet_as_matrix(s1)
    @test size(m1) == (25,13)
    d1 = DataPlates.dump_workbook("plate_test_2.xlsx")
    @test length(d1) == 1
end
@testset "platesetupfile.jl" begin
    wb = XLSX.readxlsx("plate_test.xlsx")
    sh1 = wb[1]
    df1 = DataPlates.DataFrame(sh1)
    se1 = DataPlates.platesetup(df1)
    @test se1[3,"well_content"] == "C1"
    su2 = DataPlates.platesetupfile("plate_test_3.xlsx")
    @test nrow(su2) == 96 + 384
    @test su2.well == DataPlates.wellname.(su2.well_content)
    su3 = DataPlates.merge_info(su2)
    @test su3.well96 == DataPlates.well96.(su3.well, su3.geometry)
    su4 = @where(su3, :platename .== "384");
    su4p = DataPlates.printplate(su4, :Q);
    @test su4p[6,6] == "Q4"
    su_err = DataPlates.platesetupfile("plate_test_err.xlsx")
    @test typeof(su_err) == Nothing
end
@testset "plates" begin
    p1 = DataPlates.plate(["P1", "P2"])
    @test nrow(p1) == 2*96
    @test DataPlates.Q.(["A01", "A02", "B01", "B02"]) == ["Q1", "Q2", "Q3", "Q4"]    
end
