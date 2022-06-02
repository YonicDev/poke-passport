import { useReducer, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'

import { addTrailingZeroes } from "../../util.ts";

import tableStyles from "../../styles/Table.module.css";

const getRegion = () => {
    const query = new URLSearchParams(window.location.search);
    const region = query.get("region");
    return regionRegExp.test(region)? region : "original";
}

const regionRegExp = /(alola|galar|hisui)/;

const imageAliases = {
    hisui: {
        550: "basculin-white-striped"
    }
}

export default function PassportsTable({ pokemonList }) {
    const [selectedRegion, setSelectedRegion] = useReducer(() => getRegion(),"original");
    useEffect(() => {
        setSelectedRegion();
    });

    // Clone pokemonList to avoid mutating the original
    const pokeList = [...pokemonList];
    const pokemonWithForms = pokeList.filter(pokemon => pokemon.forms != null)

    if(selectedRegion !== "original") {
        for(const pokemonId in pokemonWithForms) {
            const pokemon = pokemonWithForms[pokemonId];
            const form = pokemon.forms.find(form => new RegExp(`-(?:${selectedRegion})`).test(form.id));
            if(form != null) {
                const originalPoke = pokemonList.find(poke => poke.id === pokemon.id);
                pokeList[pokemonList.indexOf(originalPoke)] = form;
            }
        }
    }

    const tableCells = pokeList.map(pokemon => { 
        let region = "original", shortenedId = pokemon.id;

        if(regionRegExp) {
            const test = regionRegExp.exec(pokemon.id);
            region = test? test[1] : "original";
            if(region!=="original")
                shortenedId = pokemon.id.replace("-"+region, '');
        }

        const number = pokeList.indexOf(pokemon)+1;

        const hasSubstituteImage = imageAliases[region]!=null && imageAliases[region][number]!=null;

        return <Link key={pokemon.id} href={`/passport/${shortenedId}${region!=="original"?`?region=${region}`:""}`}>
            <a><div className={tableStyles.tableEntry} style={{backgroundColor: "#f5f1dc"}}>
                <span className={tableStyles.tableEntryNumber}>{addTrailingZeroes(number, 3)}</span>
                <img alt={pokemon.name} src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${hasSubstituteImage? imageAliases[region][number] : pokemon.id}.png`}/>
                </div></a>
        </Link>
    });

    return (<div>
        <Head>
            <title>PokéPassport - Explore Pokémon</title>
            <meta name="description" content="Explore all Pokémon's transferability to modern Pokémon games." />
        </Head>
        <center>
                <h1>Explore Pokémon passports</h1>
                <p>Here is the list of all Pokémon from all currently released generations.<br/>
                You may check their individual passports by clicking on their entry.</p>
                <p>You can switch between regional forms by clicking one of the regional emblems below.</p>
                <RegionSelector/>
            </center>
        <div className={tableStyles.table}>
            {tableCells}
        </div>
    </div>)
}

function RegionSelector() {
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
        <nav className={tableStyles.regionNavigator}>
            {regions.map(region => (
                <Link key={region.id} href={`/passport/?region=${region.id}`} passHref>
                    <div className={tableStyles.regionSelector}>
                        <img alt={region.label} src={images[region.id]}/>
                        <a>{region.label}</a>
                    </div>
                </Link>
            ))}
        </nav>
    );
}

export async function getStaticProps() {

    // The list has to be updated manually to use the latest Pokémon games released.
    const pokemonList = (await import ("../../data/visc.json")).default;
    return {
        props: {
            pokemonList
        },
    }
}