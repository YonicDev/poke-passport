#!/usr/env/bin node

import fs from 'fs';
import path from 'path';
import Pokedex from 'pokedex-promise-v2';
import ora from 'ora';

const spinner = ora('Fetching Pokemon list...').start();

async function getPokemonList(targetGame) {
    let limit = 10000;
    if (targetGame === 'swsh') {
        limit = 807;
    } else if (targetGame === 'visc') {
        limit = 905;
    }
    const interval = { offset: 0, limit }
    const dex = new Pokedex({timeout: 10*60*1000});
    const {results} = await dex.getPokemonSpeciesList(interval);
    spinner.succeed('Fetching Pokemon list');
    spinner.start('Setting up status info for Pokémon...');
    const species = await Promise.all(results.map(async (pokemon) => {
        try {
            const {name} = (await dex.getPokemonSpeciesByName(pokemon.name)).names.filter(name => name.language.name === 'en')[0]
            spinner.text = `Setting up status info for ${name}...`;
            return {id: pokemon.name, name: name, status: "unknown", details: "", history: []}
        } catch (e) {
            spinner.fail(`Failed to fetch ${pokemon.name}: ${e.message}`);
        }
    }));
    spinner.succeed('Setting up status info for Pokémon');
    return species;
}


const targetGame = process.argv.slice(2)[0];

getPokemonList(targetGame).then(pokemonList => {
    spinner.start('Writing status info to file...');
    fs.writeFileSync(path.join(process.cwd(), "data", `${targetGame}.json`), JSON.stringify(pokemonList, null, 4))
    spinner.succeed('Writing status info to file');
    process.exit();
})