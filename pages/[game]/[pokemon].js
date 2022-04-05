import Image from "next/image";
import classNames from "classnames";
import {addTrailingZeroes} from '../../util.ts';
import styles from "../../styles/PokemonInfo.module.css";

export default function PokemonInfo({game, pokemon, index}) {
    const {status} = pokemon;
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
    return (<>
        <div className={styles.container}>
            <div className={styles.iconContainer}><Image className={styles.icon} alt={pokemon.name} layout="fixed" width="136" height="112" src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${pokemon.id}.png`} /></div>
            <h1 className={styles.name}>#{addTrailingZeroes(index, 3)} {pokemon.name}</h1>
            <div className={classNames(styles.status,styles[status],styles[game+"-"+status])}>{labels[game][status] || "Invalid tag"}</div>
            <div className={styles.date}>Last updated on<br/>{pokemon.lastUpdated}</div>
            <div className={styles.details}>
                <h3>Notes</h3>
                <div>{pokemon.details || "No notes"}</div>
            </div>
            <div className={styles.history}>
                <h3>History</h3>
                <small>Dates are written in format Year / Month / Day.</small>
                <table className={pokemon.historyTable}>
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
                                    <td>{entry.date}</td>
                                    <td className={classNames(styles[entry.status],styles[game+"-"+entry.status])}>{labels[game][entry.status]}</td>
                                    <td>{entry.details}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}

export async function getStaticProps({params}) {
    const pokemonList = (await import (`../../data/${params.game}.json`)).default;
    const pokemon = pokemonList.find(pokemon => pokemon.id === params.pokemon);
    return {
        props: {
            game: params.game,
            pokemon,
            index: pokemonList.indexOf(pokemon) + 1
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
