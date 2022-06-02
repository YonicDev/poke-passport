import { useReducer, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import classNames from "classnames";
import { MDXProvider } from "@mdx-js/react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import {addTrailingZeroes} from '../../util.ts';
import styles from "../../styles/PokemonInfo.module.css";

const regionRegExp = {
    visc: /(alola|galar|hisui)/
};

const getRegion = (game) => {
    if(game==="swsh") return "original";
    const query = new URLSearchParams(window.location.search);
    const region = query.get("region");
    return regionRegExp[game]?.test(region)? region : "original";
}

export default function PokemonInfo({game, pokemon, index, notes, prevPokemon, nextPokemon}) {
    const [selectedRegion, setSelectedRegion] = useReducer(() => getRegion(game),"original");
    useEffect(() => {
        setSelectedRegion();
    });
    const isOriginal = selectedRegion==null || selectedRegion=="original";
    const thisPokemon = !isOriginal && pokemon.forms!=null ? pokemon.forms.find(variant => {
        const regexp = new RegExp(`-${selectedRegion}$`);
        return regexp.test(variant.id);
    }) : pokemon;
    
    const {status} = thisPokemon;
    const gameTitles = {
        swsh: "Pokémon Sword & Pokémon Shield",
        visc: "Pokémon Scarlet & Pokémon Violet"
    }
    const regionShortForm = {
        galar: {id: "swsh", size:"80px"},
        alola: {id: "alola", size:"90px"},
        original: {id: "visc", size:"90px"},
        hisui: {id: "arceus", size:"90px"}
    }
    const iconContainerStyles = {
        swsh: {
            backgroundImage: `url("/poke-passport/logo-visc.svg"), url("/poke-passport/bg-swsh.svg")`,
            backgroundBlendMode: "overlay, hard-light",
            backgroundSize: `${regionShortForm[selectedRegion]?.size || regionShortForm.original.size}, 150px`
        },
        visc: {
            backgroundImage: `url("/poke-passport/logo-${regionShortForm[selectedRegion]?.id || regionShortForm.original.id}.svg"), url("/poke-passport/bg-visc.svg")`,
            backgroundBlendMode: "overlay, multiply",
            backgroundSize: `${regionShortForm[selectedRegion]?.size || regionShortForm.original.size}, 150px`
        }
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
    const formNames = {
        alola: "Alolan",
        galar: "Galarian",
        hisui: "Hisuian"
    }
    const forms = pokemon.forms?.map(form => {
        const formName = regionRegExp[game].exec(form.id)[1] // No need for validation. The regexp should always match.
        if(formName===selectedRegion) return;
        return (<div className={classNames(styles.formLink,styles[form.status],styles[`${game}-${form.status}`])} key={form.id}>
            <Link href={`/${game}/${pokemon.id}?region=${formName}`}><a title={`${formNames[formName]} form`}><img alt={form.id} src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${form.id}.png`}/></a></Link>
        </div>)
    });

    if(forms!=null && !isOriginal) {
        forms.unshift(<div className={classNames(styles.formLink,styles[pokemon.status],styles[`${game}-${pokemon.status}`])} key={pokemon.id}>
            <Link href={`/${game}/${pokemon.id}`}><a title="Original form"><img alt={pokemon.id} src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${pokemon.id}.png`}/></a></Link>
        </div>)
    }

    const emptyHistoryMessage = game === "swsh" ? "PokéPassport does not record the history of Sword & Shield availability." : "No history has been recorded yet for this Pokémon.";

    const allDetails = selectedRegion!=null && selectedRegion!=="original" && notes[selectedRegion]!=null ? notes[selectedRegion] : notes.original;

    return (<>
        <center>
            <h1>Info for {gameTitles[game]}</h1>
            <Link href={`/${game}${!isOriginal?`?region=${selectedRegion}`:""}`}><a>↑ Back to list</a></Link>
        </center>
        <Head>
            <title>Status of {thisPokemon.name} in {gameTitles[game]} - PokéPassport</title>
            <meta name="description" content={`Check if ${thisPokemon.name} can be transfered to ${gameTitles[game]}`} />
        </Head>
        <div className={styles.pageContainer}>
            <NavigationLink game={game} pokemon={prevPokemon} direction="left" number={index-1} preferredForm={selectedRegion}/>
            <div className={styles.container}>
                <Link href={`/passport/${pokemon.id}${!isOriginal?`?region=${selectedRegion}`:""}`}>
                    <a title="Check this Pokémon's passport." className={classNames(styles.iconContainer,styles[status],styles[game+"-"+status])} style={iconContainerStyles[game]}>
                        <img className={styles.icon} alt={pokemon.name} src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${thisPokemon.id}.png`} />
                    </a>
                </Link>
                <h1 className={styles.name}>#{addTrailingZeroes(index, 3)} {thisPokemon.name}</h1>
                <div className={styles.forms}>{forms}</div>
                <div className={classNames(styles.status,styles[status],styles[game+"-"+status])}>{labels[game][status] || "Invalid tag"}</div>
                <div className={styles.date}>Last updated on<br/>{thisPokemon.lastUpdated}</div>
                <div className={styles.details}>
                    <h3>Notes</h3>
                    <MDXProvider components={components}>
                        <MDXRemote {...allDetails.main} />
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
                            {thisPokemon.history.map((entry, i) => {
                                return (
                                    <tr key={i}>
                                        <td><center>{entry.date}</center></td>
                                        <td className={classNames(styles.statusTable, styles[entry.status],styles[game+"-"+entry.status])}>{labels[game][entry.status]}</td>
                                        <td>
                                            <MDXProvider components={components}>
                                                <MDXRemote {...allDetails.history[i]} />
                                            </MDXProvider>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table></>}
                </div>
            </div>
            <NavigationLink game={game} pokemon={nextPokemon} direction="right" number={index+1} preferredForm={selectedRegion}/>
        </div>
        </>
    )
}

function NavigationLink({game, pokemon, number, direction, preferredForm}) {
    const directions = {
        left: "←",
        right: "→",
    };
    const limits = {
        left: "First Pokémon",
        right: "Last Pokémon"
    }
    const isOriginal = preferredForm==null || preferredForm==="original";
    if(pokemon!=null) {
        let thisPokemon = {...pokemon};
        let form = "original";
        if(!isOriginal && pokemon.forms?.length > 0) {
            thisPokemon = pokemon.forms.find(form => {
                const formTest = new RegExp(`-(?:${preferredForm})`); 
                return formTest.test(form.id);
            });
            if(thisPokemon)
                form = preferredForm;
            else
                // Since we're not reassigning thisPokemon, we don't have to clone here.
                thisPokemon = pokemon;
        }
        return (
            <Link href={`/${game}/${pokemon.id}${form!=="original"?`?region=${form}`:""}`} passHref>
                <a className={styles.navPokemon}>
                    <div>
                        <img alt={thisPokemon.name} className={classNames(styles.navIcon,styles[thisPokemon.status],styles[game+"-"+thisPokemon.status])} src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${thisPokemon.id}.png`}/>
                        <div>{directions[direction]} #{number} {thisPokemon.name}</div>
                    </div>
                </a>
            </Link>
        )
    } else {
        return (
            <div className={styles.navPokemon}>
                <img alt="Unknown" className={classNames(styles.navIcon,styles.unknown)} style={{width:"68px", height:"56px"}} src="https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/unknown.png"/>
                <div>{directions[direction]} {limits[direction]}</div>
            </div>
        )
    }
}

export async function getStaticProps({params}) {
    const {game} = params;
    const pokemonList = (await import (`../../data/${game}.json`)).default;
    const pokemon = pokemonList.find(pokemon => pokemon.id === params.pokemon);
    const ix = pokemonList.indexOf(pokemon);
    const prevPokemon = pokemonList[ix-1] || null;
    const nextPokemon = pokemonList[ix+1] || null;
    const notes = { 
        original: {
            main: await serialize(pokemon.details || "No notes"),
            history: await Promise.all(pokemon.history.map(async entry => serialize(entry.details || "No notes")))
        }
    };
    for(const form of pokemon.forms || []) {
        notes[/(alola|galar|hisui)/.exec(form.id)[1]] = {
            main: await serialize(form.details || "No notes"),
            history: await Promise.all(form.history.map(async entry => serialize(entry.details || "No notes")))
        }
    }

    return {
        props: {
            game,
            pokemon,
            index: pokemonList.indexOf(pokemon) + 1,
            notes,
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

    const files = (await readdir(`${process.cwd()}/data`)).filter(file => file.endsWith(".json"));
    const paths = await Promise.all(files.map(async (file) => {
        const data = JSON.parse(await readfile(`${process.cwd()}/data/${file}`));
        return data.map((pokemon) => {
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
