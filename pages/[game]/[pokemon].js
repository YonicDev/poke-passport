import Image from "next/image";
import Head from 'next/head'
import Link from 'next/link'
import classNames from "classnames";
import { MDXProvider } from "@mdx-js/react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import {addTrailingZeroes} from '../../util.ts';
import styles from "../../styles/PokemonInfo.module.css";

export default function PokemonInfo({game, pokemon, index, notes, prevPokemon, nextPokemon}) {
    const {status} = pokemon;
    const gameTitles = {
        swsh: "Pokémon Sword & Pokémon Shield",
        visc: "Pokémon Scarlet & Pokémon Violet"
    }
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
    const components = {
        a: props => <a {...props} target="_blank" rel="noreferrer" />,
    }

    const emptyHistoryMessage = game === "swsh" ? "PokéPassport does not record the history of Sword & Shield availability." : "No history has been recorded yet for this Pokémon.";

    return (<>
        <center>
            <h1>Info for {gameTitles[game]}</h1>
            <Link href={"/"+game}><a>↑ Back to list</a></Link>
        </center>
        <Head>
            <title>Status of {pokemon.name} in {gameTitles[game]} - PokéPassport</title>
            <meta name="description" content={`Check if ${pokemon.name} can be transfered to ${gameTitles[game]}`} />
        </Head>
        <div className={styles.pageContainer}>
            <NavigationLink game={game} pokemon={prevPokemon} direction="left" number={index-1}/>
            <div className={styles.container}>
                <div className={classNames(styles.iconContainer,styles[status],styles[game+"-"+status],styles[game])}><Image className={styles.icon} alt={pokemon.name} layout="fixed" width="136" height="112" src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${pokemon.id}.png`} /></div>
                <h1 className={styles.name}>#{addTrailingZeroes(index, 3)} {pokemon.name}</h1>
                <div className={classNames(styles.status,styles[status],styles[game+"-"+status])}>{labels[game][status] || "Invalid tag"}</div>
                <div className={styles.date}>Last updated on<br/>{pokemon.lastUpdated}</div>
                <div className={styles.details}>
                    <h3>Notes</h3>
                    <MDXProvider components={components}>
                        <MDXRemote {...notes.main} />
                    </MDXProvider>
                </div>
                <div className={pokemon.history.length > 0 ? styles.history : styles.historyEmpty}>
                    <h3>History</h3>
                    {pokemon.history.length <= 0 ? <small>{emptyHistoryMessage}</small> : <><small>Dates are written in format Year / Month / Day.</small>
                    <table className={styles.historyTable}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pokemon.history.map((entry, i) => {
                                return (
                                    <tr key={i}>
                                        <td><center>{entry.date}</center></td>
                                        <td className={classNames(styles.statusTable, styles[entry.status],styles[game+"-"+entry.status])}>{labels[game][entry.status]}</td>
                                        <td>
                                            <MDXProvider components={components}>
                                                <MDXRemote {...notes.history[i]} />
                                            </MDXProvider>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table></>}
                </div>
            </div>
            <NavigationLink game={game} pokemon={nextPokemon} direction="right" number={index+1}/>
        </div>
        </>
    )
}

function NavigationLink({game, pokemon, number, direction}) {
    const directions = {
        left: "←",
        right: "→",
    };
    const limits = {
        left: "First Pokémon",
        right: "Last Pokémon"
    }
    if(pokemon!=null)
        return (
            <Link href={`/${game}/${pokemon.id}`} passHref>
                <a className={styles.navPokemon}>
                    <div>
                        <Image alt={pokemon.name} className={classNames(styles.navIcon,styles[pokemon.status],styles[game+"-"+pokemon.status])} layout="fixed" width="68" height="56" src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${pokemon.id}.png`}/>
                        <div>{directions[direction]} #{number} {pokemon.name}</div>
                    </div>
                </a>
            </Link>
        )
    else
        return (
            <div className={styles.navPokemon}>
                <Image alt="Unknown" className={classNames(styles.navIcon,styles.unknown)} layout="fixed" width="68" height="56" src="https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/unknown.png"/>
                <div>{directions[direction]} {limits[direction]}</div>
            </div>
        )
}

export async function getStaticProps({params}) {
    const pokemonList = (await import (`../../data/${params.game}.json`)).default;
    const pokemon = pokemonList.find(pokemon => pokemon.id === params.pokemon);
    const ix = pokemonList.indexOf(pokemon);
    const prevPokemon = pokemonList[ix-1] || null;
    const nextPokemon = pokemonList[ix+1] || null;
    const mainNote = await serialize(pokemon.details || "No notes");
    const notes = await Promise.all(pokemon.history.map(async entry => {
        return serialize(entry.details || "No notes");
    }));
    return {
        props: {
            game: params.game,
            pokemon,
            index: pokemonList.indexOf(pokemon) + 1,
            notes: {main: mainNote, history: notes},
            prevPokemon,
            nextPokemon
        }
    }
}

export async function getStaticPaths() {
    const fs = (await import('fs')).default;
    const promisify = (await import ('util')).promisify;
    const readdir = promisify(fs.readdir);
    const readfile = promisify(fs.readFile);

    const files = await readdir(`${process.cwd()}/data`);
    const paths = await Promise.all(files.map(async (file) => {
        const data = JSON.parse(await readfile(`${process.cwd()}/data/${file}`));
        return data.map((pokemon, i) => {
            return {
                params: {
                    game: file.replace('.json', ''),
                    pokemon: pokemon.id
                },
            }
        });
    }));
    const joinedPaths = paths.reduce((acc, cur) => acc.concat(cur), []);
    return {
        paths: joinedPaths,
        fallback: false
    };
}
