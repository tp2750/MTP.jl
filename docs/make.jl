using MicroPlates, XLSX, DataFrames, DataFramesMeta
using Documenter

makedocs(;
    modules=[MicroPlates],
    authors="Thomas Poulsen",
    repo="https://github.com/tp2750/MicroPlates.jl/blob/{commit}{path}#L{line}",
    sitename="MicroPlates.jl",
    format=Documenter.HTML(;
        prettyurls=get(ENV, "CI", "false") == "true",
        canonical="https://tp2750.github.io/MicroPlates.jl",
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
    repo="github.com/tp2750/MicroPlates.jl",
)
