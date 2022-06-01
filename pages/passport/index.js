import Head from 'next/head'
import Link from 'next/link'
import classNames from 'classnames';

import { addTrailingZeroes } from "../../util.ts";

import tableStyles from "../../styles/Table.module.css";

export default function PassportsTable({ pokemonList }) {

    const tableCells = pokemonList.map(pokemon => { 
        const shortenedId = pokemon.id;
        return <Link key={pokemon.id} href={`/passport/${shortenedId}`}>
            <a><div className={tableStyles.tableEntry} style={{backgroundColor: "#f5f1dc"}}>
                <span className={tableStyles.tableEntryNumber}>{addTrailingZeroes(pokemonList.indexOf(pokemon)+1, 3)}</span>
                <img alt={pokemon.name} src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${pokemon.id}.png`}/>
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
                <p>Currently, regional forms are not shown in each Pokémon&apos;s passport.</p>
            </center>
        <div className={tableStyles.table}>
            {tableCells}
        </div>
    </div>)
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