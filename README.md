# PokéPassport

**PokéPassport** is a webpage containing information about what Pokémon can be transfered to Generation VIII games of Pokémon and onward, built with [Next.js](https://nextjs.org/).

**[The website can be seen here](https://yonicdev.github.io/poke-passport/)**.

## Getting Started

First, you will need the following software:

* Node.js: It doesn't matter if it's LTS or Current version.
* Git: If you're on Windows, you can install GitKraken (or also GitExtensions if you're on Windows), which will also install Git for you.

Next, clone the poké-passport repository. Guides for doing this via GitExtensions and GitKraken are available.

Once succesfully cloned, install all the dependencies and run the development server with these commands from a command line (PowerShell/Windows Terminal in Windows, Terminal in mac OS, and Bash in Linux):

```bash
npm run install # automatically installs all the required dependencies
npm run dev # run the development server
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Once you're ready to test the changes in production, run the following commands:
```bash
npm run build # builds the production-ready website.
npm run start # or npm start. starts the production server.
```

You will be able to access the website via the URL above as long as the server is still running (regardless of development or production)

## Modifying the data

You can easily edit data using a few handy scripts that can be run in a command line.

### Adding a new game

```ps
PS X:folder\to\poke-passport> node .\scripts\setup.mjs [target-game]
```
* `[target-game]` refers to the internal ID of the game(s) that PokéPassport will use.

> **NOTE:** You will have to specify how many Pokémon to include by modifying the script.

### Modifying an entry

```ps
PS X:folder\to\poke-passport> node .\scripts\update.mjs [target-game] [pokemon-id] --status [status] --details [details] --region [regional-form] [--force]
```

* `[target-game]` refers to the internal ID of the game(s) that PokéPassport uses to hold the data. You can figure which one to use by checking the data folder.
* `[pokemon-id]` is the internal ID of the Pokémon you want to edit. This internal ID can be found in the .json files in the data folder.
* `[status]` (optional) allows to change the status of a Pokémon.
* `[details]` (optional) allows to change the notes of a Pokémon. By putting the text with double quotes (`"like so"`), you can use [Markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github) to add text-formatting and links to sources.
* `[region]` (optional) allows to edit information about a regional form of a Pokémon.
* `[--force]` (optional) forces adding a new regional form for the Pokémon if it doesn't exist.

> The older status along with its associated notes will be pushed back in the history section. If you don't want this to happen, you will have to modify the data directly from the .json file.

## More info about contributing

See [CONTRIBUTING.md](https://github.com/YonicDev/poke-passport/blob/main/CONTRIBUTING.md).
