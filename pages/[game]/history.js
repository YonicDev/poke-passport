import Head  from "next/head";
import Link from "next/link"
import { MDXProvider } from "@mdx-js/react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from 'next-mdx-remote/serialize'
import classNames from "classnames";
import { addTrailingZeroes } from "../../util.ts";

import styles from "../../styles/History.module.css";

export default function GameHistory({pokemonList, history, game, gameName}) {
    return (
        <>
        <Head>
            <title>{gameName} transferability history - PokéPassport</title>
            <meta name="description" content={`In this page you can check the full history of changes of the ${gameName} Transfer Table`} />
        </Head>
        <center>
            <h2>Table history for {gameName}</h2>
            {game === "swsh" ? <Unsupported game={game} gameName={gameName}/> : 
                <>
                    <p>This table orders the changes to the Transfer Table the most recent to oldest. The date is displayed in a YYYY/MM/DD format.</p>
                    <Navigation game={game} />
                </>
            }
        </center>
        {game && game !== "swsh" && <div className={styles.articleWrapper}>
            <History history={history} game={game} pokemonList={pokemonList}/>
        </div>}
        </>
    )
}

function Unsupported({game, gameName}) {
    return (<>
        <p>PokéPassport does not record the changes history for {gameName}</p>
        <Navigation game={game} />
        </>
    )
}

function Navigation({game}) {
    return (
        <nav className={styles.navigation}>
            <Link href={`/${game}`}><a>Back to the table</a></Link>
            <Link href="/"><a>Back to index</a></Link>
        </nav>
    )
}

function History({history, game, pokemonList}) {
    return (
        <table className={styles.historyTable}>
            <thead>
                <tr>
                    <th className={styles.fieldDate}>Date</th>
                    <th className={styles.fieldPokemon}>Pokémon</th>
                    <th className={styles.fieldForm}>Region</th>
                    <th className={styles.fieldStatus}>Status</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                {history.map((entry, index) => {
                    const pokemon = pokemonList.find(poke => poke.id === entry.pokemon);
                    const dexNumber = pokemonList.indexOf(pokemon) + 1;
                    return <HistoryEntry key={index} form={entry.form || "original"} game={game} pokemonInfo={pokemon} dexNumber={dexNumber} {...entry} />
                })}
            </tbody>
        </table>
    )
}

function HistoryEntry(entry) {
    const {date, pokemonInfo: pokemon, region: form, dexNumber, status, details, game} = entry
    const statusLabels = {
        confirmed: "Confirmed",
        guaranteed: "Guaranteed",
        possible: "Possible",
        no: "Untransferable",
        unknown: "Unknown"
    }
    const forms = {
        original: {
            tag: "Original",
            icon: "/poke-passport/logo-visc.svg"
        },
        alola: {
            tag: "Alola",
            icon: "/poke-passport/logo-alola.svg"
        },
        galar: {
            tag: "Galar",
            icon: "/poke-passport/logo-swsh.svg"
        },
        hisui: {
            tag: "Hisui",
            icon: "/poke-passport/logo-arceus.svg"
        }
    }
    const components = {
        a: props => <a {...props} target="_blank" rel="noreferrer" />
    }
    return (
        <tr>
            <td className={styles.fieldDate}>{date}</td>
            <td className={classNames(styles.fieldPokemon, styles[status], styles[form])}>
                <Link href={`/${game}/${pokemon.id}${form&&form!="original"?`?region=${form}`:""}`}>
                    <a title={pokemon.name} style={{position: "relative"}}><span className={styles.dexNumber}>{addTrailingZeroes(dexNumber, 3)}</span><img alt={pokemon.name} src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${pokemon.id}${form&&form!="original"?`-${form}`:""}.png`}/></a>
                </Link>
            </td>
            <td className={styles.fieldForm}>
                <div className={styles.formWrapper}>
                    <img className={styles.icon} alt={forms[form].tag} src={forms[form].icon}/>
                    <span>{form? forms[form].tag || "INVALID" : "Original"}</span>
                </div>
            </td>
            <td className={styles.fieldStatus}>{status? statusLabels[status] || "INVALID TAG" : "No status"}</td>
            <td><MDXProvider components={components}><MDXRemote {...details} /></MDXProvider></td>
        </tr>
    )
}

export async function getStaticPaths() {
    const fs = (await import('fs')).default;
    const promisify = (await import ('util')).promisify;
    const readdir = promisify(fs.readdir);

    const files = (await readdir(`${process.cwd()}/data`)).filter(f => f.endsWith(".json"));
    return {
        paths: files.map(file => ({params: {game: file.replace('.json', '')}})),
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const { game } = params;
    if(game === "swsh") return { props: {game, gameName: "Sword & Shield", history: []} }
    const history = (await import (`../../data/history/${game}.json`)).default;
    const pokemonList = (await import (`../../data/${game}.json`)).default;
    const gameTitles = {
        swsh: "Pokémon Sword & Shield",
        visc: "Pokémon Scarlet & Violet"
    }
    
    const processedHistory = await Promise.all(history.map(async (entry) => {
        return {
            ...entry,
            details: await serialize(entry.details || "No notes")
        };
    }));

    return {
        props: {
            game,
            gameName: gameTitles[game],
            pokemonList,
            history: processedHistory
        }
    }
}