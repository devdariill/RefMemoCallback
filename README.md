https://watercss.kognise.dev/ // css
https://omdbapi.com/?apikey=4287ad07&s=Avengers // json

pnpm add just-debounce-it -E // onChange timeout

config mono repo

    package.json
        {
            ,"workspaces":["projects/*"]
        }

pnpm-workspaces.yml

    packages:
        -"projects/**"