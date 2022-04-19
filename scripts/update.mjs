#!/usr/env/bin node

import fs from 'fs';
import path from 'path';
import minimist from 'minimist';

const [game, id] = process.argv.slice(2);
const {status, details, region, f, force, h, help} = minimist(process.argv.slice(4));
const forceRegion = force || f;

const pokemonList = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", `${game}.json`)));
const pokemon = pokemonList.find(pokemon => pokemon.id === id);

if(h || help) {
    console.log(`
Usage:
    node update.mjs game id [options]

Parameters (required):
    [game]: The game JSON data file to update.
    [id]: The ID of the Pokémon to update.

Options (optional):
    --status [status]
        The new status of the Pokémon.
    --details [details]
        Markdown to update the details of the Pokémon.
    --region [region]
        Select the Pokémon's regional form to update.
    -f, --force
        Force making a new regional form.
    -h, --help
        Show this help.
`);
    process.exit(0);
}

if(game === "swsh" && region) {
    console.error("Pokémon Sword & Shield does not support regional variants.");
    process.exit(1);
}
if(region && !/(alola|galar|hisui)/.test(region) && !forceRegion) {
    console.error(`${region} is not a valid region. To make it a new region, use -f or --force.`);
    process.exit(1);
}
if (!pokemon) {
    console.error(`No Pokémon with id ${id} found.`);
    process.exit(1);
}
if(pokemon.forms==null && region && !forceRegion) {
    console.error(`This Pokémon doesn't have regional forms. To add a new form, use -f or --force.`);
    process.exit(1);
}
if(region && pokemon.forms.length <= 0 && !forceRegion) {
    console.error(`This Pokémon currently doesn't have regional forms. To add a new form, use -f or --force.`);
    process.exit(1);
} else if(region && pokemon.forms.length <= 0 && forceRegion) {
    pokemon.forms = [{
        id: `${pokemon.id}-${region}`,
        status: status || "unknown",
        details: details || "",
        lastUpdated: new Date().toLocaleDateString("ja"),
        history: []
    }]
} else if(region && pokemon.forms.length > 0) {
    const form = pokemon.forms.find(form => {
        const regex = new RegExp(`-${region}`);
        return regex.test(form.id);
    });
    if(form==null && !forceRegion) {
        console.error(`${pokemon.name} doesn't have a regional form from ${region}. To add it, use -f or --force.`);
        process.exit(1);
    } else if(form==null && forceRegion) {
        pokemon.forms.push({
            id: `${pokemon.id}-${region}`,
            status: status || "unknown",
            details: details || "",
            lastUpdated: new Date().toLocaleDateString("ja"),
            history: []
        })
    } else if(form) {
        form.history.unshift({
            date: form.lastUpdated,
            status: form.status,
            details: form.details
        });
        form.status = status? status : form.status;
        form.details = details? details : form.details;
        form.lastUpdated = new Date().toLocaleDateString("ja");
    }
} else if(!region) {
    pokemon.history.unshift({
        date: pokemon.lastUpdated,
        status: pokemon.status,
        details: pokemon.details
    });

    pokemon.lastUpdated = new Date().toLocaleDateString("ja");
    pokemon.status = status? status : pokemon.status;
    pokemon.details = details? details: pokemon.details;
}

fs.writeFileSync(path.join(process.cwd(), "data", `${game}.json`), JSON.stringify(pokemonList, null, 4));
console.log("Updated status info for", pokemon.name);
process.exit();