using DataPlates, XLSX, DataFrames, DataFramesMeta
using Documenter

makedocs(;
    modules=[DataPlates],
    authors="Thomas Poulsen",
    repo="https://github.com/tp2750/DataPlates.jl/blob/{commit}{path}#L{line}",
    sitename="DataPlates.jl",
    format=Documenter.HTML(;
        prettyurls=get(ENV, "CI", "false") == "true",
        canonical="https://tp2750.github.io/DataPlates.jl",
        assets=String[],
    ),
    pages=[
        "Intro" => "index.md", 
        "Setup files" => "setup.md",
        "XLSX files" => "Xlsx-files.md",
        "Content" => "content.md",
        "API" => "api.md",
    ],
)

deploydocs(;
    repo="github.com/tp2750/DataPlates.jl",
)
