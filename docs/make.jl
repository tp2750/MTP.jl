using MTP, XLSX, DataFrames, DataFramesMeta
using Documenter

makedocs(;
    modules=[MTP],
    authors="Thomas Poulsen",
    repo="https://github.com/tp2750/MTP.jl/blob/{commit}{path}#L{line}",
    sitename="MTP.jl",
    format=Documenter.HTML(;
        prettyurls=get(ENV, "CI", "false") == "true",
        canonical="https://tp2750.github.io/MTP.jl",
        assets=String[],
    ),
    pages=[
        "Intro" => "intro.md", 
        "Setup files" => "setup.md",
        "XLSX files" => "Xlsx-files.md",
        "Index" => "index.md",
    ],
)

deploydocs(;
    repo="github.com/tp2750/MTP.jl",
)
