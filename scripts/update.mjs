#!/usr/env/bin node

import fs from 'fs';
import path from 'path';
import minimist from 'minimist';

const [game, id, status] = process.argv.slice(2);
const {details} = minimist(process.argv.slice(4));

const pokemonList = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", `${game}.json`)));
const pokemon = pokemonList.find(pokemon => pokemon.id === id);
if (!pokemon) {
    console.error(`No Pokémon with id ${id} found.`);
    process.exit(1);
}

pokemon.history.unshift({
    date: pokemon.lastUpdated,
    status: pokemon.status,
    details: pokemon.details
});

pokemon.lastUpdated = new Date().toLocaleDateString("ja");
pokemon.status = status;
if(details)
    pokemon.details = details;
fs.writeFileSync(path.join(process.cwd(), "data", `${game}.json`), JSON.stringify(pokemonList, null, 4));
console.log("Updated status info for", pokemon.name);
process.exit();