using MTP, XLSX, DataFrames
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
        "Home" => "index.md",
        "XLSX files" => "Xlsx-files.md"
    ],
)

deploydocs(;
    repo="github.com/tp2750/MTP.jl",
)
