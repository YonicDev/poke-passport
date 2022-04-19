import { useState, useReducer, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { serialize } from 'next-mdx-remote/serialize'
import {Table, BriefSummary, Legend} from '../../components/Table'
import styles from "../../styles/Table.module.css"

const regionRegExp = {
    visc: /(alola|galar|hisui)/
};

const getRegion = (game) => {
    if(game==="swsh") return "original";
    const query = new URLSearchParams(window.location.search);
    const region = query.get("region");
    return regionRegExp[game]?.test(region)? region : "original";
}

export default function List({pokemonList, game, notes}) {
    const [selectedRegion, setSelectedRegion] = useReducer(() => getRegion(game),"original");
    useEffect(() => {
        setSelectedRegion();
    });
    const labels = {
        swsh: {
            base: 'Since launch',
            armor: 'Since Isle of Armor',
            crown: 'Since Crown Tundra',
            other: 'Other',
            no: 'Untransferable'
        },
        visc: {
            confirmed: 'Confirmed',
            guaranteed: 'Guaranteed',
            possible: 'Possible',
            no: 'Untransferable',
            unknown: 'Unknown'
        }
    }
    const titles = {
        swsh: "Pokémon Sword & Shield Transferability Table",
        visc: "Pokémon Scarlet & Violet Transferability Table"
    };
    const descriptions = {
        swsh: "This webpage can help you know if you can transfer your Pokémon to Galar.",
        visc: "This webpage can help you know if you can transfer your Pokémon to the new region."
    };
    const headsups = {
        swsh: <p>This is a comprehensive list of all the Pokémon that can be transfered to Pokémon Sword and Pokémon Shield. <br/><b>Note that you don&apos;t need the Expansion Pass</b> to transfer Pokémon that were introduced after launch.</p>,
        visc: <p>This is a list of all the Pokémon that can be transfered to Pokémon Scarlet and Pokémon Violet, according to current information.</p>
    }

    // Clone pokemonList to avoid mutating the original
    const pokeList = [...pokemonList];
    const pokemonWithForms = pokeList.filter(pokemon => pokemon.forms != null)

    if(selectedRegion !== "origin") {
        for(const pokemonId in pokemonWithForms) {
            const pokemon = pokemonWithForms[pokemonId];
            const form = pokemon.forms.find(form => new RegExp(`-(?:${selectedRegion})`).test(form.id));
            if(form != null) {
                const originalPoke = pokemonList.find(poke => poke.id === pokemon.id);
                pokeList[pokemonList.indexOf(originalPoke)] = form;
            }
        }
    }

    const filterTemplate = {};
    for(let label in labels[game]) {
        filterTemplate[label] = false;
    }
    const [filters, setFilters] = useState(filterTemplate);
    const pokemonFilteredList = pokeList.filter(pokemon => {
        return !filters[pokemon.status];
    });

    const amounts = {}
    for(const label in labels[game]) {
        amounts[label] = pokeList.filter(p => p.status === label).length;
    }

    // Because rerendering the Table is very expensive, we aren't using states
    // other than states that modify the Pokémon list.
    // Instead, we broadcast events to selectively update the children components' state,
    // ensuring we rerender the Table only when absolutely necessary.
    const setHighlightedPokemon = (pokemon, index) => {
        dispatchEvent(new CustomEvent('highlight', {detail: {pokemon, index}}));
    }

    const toggleFilter = (label) => {
        const newFilters = {...filters};
        newFilters[label] = !filters[label];
        setFilters(newFilters);
    }

    return (
        <div>
            <Head>
                <title>{titles[game] + " - PokéPassport"}</title>
                <meta name="description" content={descriptions[game]} />
            </Head>
            <BriefSummary statusLabels={labels[game]} notes={notes} />
            <center>
                <h1>{titles[game]}</h1>
                {headsups[game]}
                <nav className={styles.navigator}>
                    <Link href={`/${game}/article/rules`}><a>Rules</a></Link>
                    <Link href={`/${game}/article/stats`}><a>Statistics</a></Link>
                    <Link href="/"><a>Back to index</a></Link>
                </nav>
                {game !== "swsh" && <>
                    <p>You can also display information about the regional forms of each Pokémon.</p>
                    <RegionSelector game={game} />
                </>}
                <p>Showing <b>{pokemonFilteredList.length}</b> Pokémon. Press any of the labels below to filter.</p>
                <Legend labels={labels[game]} amounts={amounts} filters={filters} toggleFilter={toggleFilter}/>
            </center>
            <Table game={game} pokemonList={pokeList} filteredList={pokemonFilteredList} onHighlight={setHighlightedPokemon}/>
        </div>
    )
}

function RegionSelector({game}) {
    const regions = [
        {id: "original", label: "Original regions"},
        {id: "alola", label: "Alola"},
        {id: "galar", label: "Galar"},
        {id: "hisui", label: "Hisui"},
    ];
    const images = {
        original: "/poke-passport/logo-visc.svg",
        alola: "/poke-passport/logo-alola.svg",
        galar: "/poke-passport/logo-swsh.svg",
        hisui: "/poke-passport/logo-arceus.svg"
    }
    return (
        <nav className={styles.regionNavigator}>
            {regions.map(region => (
                <Link key={region.id} href={`/${game}/?region=${region.id}`} passHref>
                    <div className={styles.regionSelector}>
                        <img alt={region.label} src={images[region.id]}/>
                        <a>{region.label}</a>
                    </div>
                </Link>
            ))}
        </nav>
    );
}

export async function getStaticPaths() {
    const fs = (await import('fs')).default;
    const promisify = (await import ('util')).promisify;
    const readdir = promisify(fs.readdir);

    const files = await readdir(`${process.cwd()}/data`);
    return {
        paths: files.map(file => ({params: {game: file.replace('.json', '')}})),
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const pokemonList = (await import (`../../data/${params.game}.json`)).default;
    const notes = await Promise.all(pokemonList.map(async pokemon => {
        const allNotes = { original: await serialize(pokemon.details || "No notes") };
        for(const form of pokemon.forms || []) {
            allNotes[/(alola|galar|hisui)/.exec(form.id)[1]] = await serialize(form.details || "No notes");
        }
        return allNotes;
    }));
    return {
        props: {
            pokemonList,
            game: params.game,
            notes
        }
    }
}