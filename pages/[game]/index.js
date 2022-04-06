import Head from 'next/head'
import Link from 'next/link'
import { serialize } from 'next-mdx-remote/serialize'
import {Table, BriefSummary, Legend} from '../../components/Table'
import styles from "../../styles/Table.module.css"

export default function List({pokemonList, game, notes}) {
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

    // Because rerendering the Table is very expensive, we aren't using states
    // other than states that modify the Pokémon list.
    // Instead, we broadcast events to selectively update the children components' state,
    // ensuring we rerender the Table only when absolutely necessary.
    const setHighlightedPokemon = (pokemon, index) => {
        dispatchEvent(new CustomEvent('highlight', {detail: {pokemon, index}}));
    }

    return (
        <div>
            <Head>
                <title>{titles[game] + " - PokéPassport"}</title>
                <meta name="description" content={descriptions[game]} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <center>
                <h1>{titles[game]}</h1>
                {headsups[game]}
                <nav className={styles.navigator}>
                    <Link href={`/${game}/article/rules`}><a>Rules</a></Link>
                    <Link href={`/${game}/article/stats`}><a>Statistics</a></Link>
                    <Link href="/"><a>Back to index</a></Link>
                </nav>
            </center>
            <Legend labels={labels[game]} />
            <BriefSummary statusLabels={labels[game]} notes={notes}/>
            <Table game={game} pokemonList={pokemonList} onHighlight={setHighlightedPokemon}/>
        </div>
    )
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
    const notes = await Promise.all(pokemonList.map(async pokemon => serialize(pokemon.details || "No notes")));
    return {
        props: {
            pokemonList,
            game: params.game,
            notes
        }
    }
}