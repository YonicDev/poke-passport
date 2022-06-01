import Head from 'next/head'
import Link from 'next/link'
import classNames from 'classnames';

import { addTrailingZeroes } from "../../util.ts";

import styles from "../../styles/PokemonInfo.module.css";
import passportStyles from "../../styles/Passport.module.css";

const latestGame = "visc";

export default function PokemonPassport({pokemonData, prevPokemon, nextPokemon, pokemonNumber}) {
    let thisPokemon = {...pokemonData};

    const transferability = {
        swsh: {
            base: "Yes",
            armor: "Yes",
            crown: "Yes",
            other: "Yes",
            no: "No"
        },
        arceus: "N/A",
        bdsp: "N/A",
        visc: {
            confirmed: "Yes",
            guaranteed: "Yes",
            possible: "Unknown",
            no: "No",
            unknown: "Unknown"
        }
    }

    const passportPower = Object.keys(pokemonData).reduce((acc, game) => {
        const labels = transferability[game];
        if(game === "arceus" || game === "bdsp")
            return acc;
        return labels[pokemonData[game]?.status] === "Yes" ? acc + 1 : acc;
    }, 0);

    return (<div>
        <center>
            <h1>{pokemonData[latestGame].name}&apos;s Passport</h1>
            <Link href={`/passport`}><a>↑ Back to list</a></Link>
        </center>
        <Head>
            <title>Passport for {thisPokemon[latestGame].name} - PokéPassport</title>
            <meta name="description" content={`Check which games ${thisPokemon.name} can be transfered to.`} />
        </Head>
        <div className={styles.pageContainer}>
            <NavigationLink pokemon={prevPokemon} direction="left" number={pokemonNumber-1} />
            <div className={passportStyles.container}>
                <div className={classNames(styles.iconContainer, passportStyles.default)} style={{backgroundImage: `url("/poke-passport/logo-visc.svg")`, backgroundSize: "90px", backgroundBlendMode: "multiply"}}>
                    <img className={styles.icon} alt={pokemonData.name} src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${thisPokemon[latestGame].id}.png`} />
                </div>
                <h1 className={styles.name}>#{addTrailingZeroes(pokemonNumber, 3)} {thisPokemon[latestGame].name}</h1>
                <div className={passportStyles.label}>Passport Power<sup><abbr title="A rating based on how many games this Pokémon can be transfered to, excluding the games where a Pokémon first originated from.">(?)</abbr></sup>: {passportPower}</div>
                <div className={passportStyles.separator}>Transferability</div>
                <TransferabilityTable pokemon={thisPokemon} index={pokemonNumber} labels={transferability} />
            </div>
            <NavigationLink pokemon={nextPokemon} direction="right" number={pokemonNumber+1} />
        </div>
    </div>)
}

function TransferabilityTable({pokemon, labels, index}) {
    const headings = Object.keys(labels).map(label => {
        const labels = {
            swsh: "SwSh",
            arceus: "L:A",
            bdsp: "BDSP",
            visc: "ScVi"
        }
        const longLabels = {
            swsh: "Sword & Shield",
            arceus: "Legends: Arceus",
            bdsp: "Brilliant Diamond & Shining Pearl",
            visc: "Scarlet & Violet"
        }
        return <div key={label} title={longLabels[label]} className={classNames(passportStyles.gridLabel, passportStyles[label])}>{labels[label]}</div>
    })
    const rows = Object.keys(labels).map(label => {
        const status = {
            Yes: <span><b>✓</b> Yes</span>,
            No: <span><b>✗</b> No</span>,
            Unknown: <span><b>?</b> Unknown</span>,
            "N/A": "N/A"
        }
        if(pokemon[label]) {
            return (<Link key={label} href={`/${label}/${pokemon[latestGame].id}`}>
                <a className={classNames(passportStyles.gridRow,passportStyles[pokemon[label].status],passportStyles[label+"-"+(pokemon[label].status)])}>
                    {status[labels[label][pokemon[label].status]]}
                </a>
            </Link>);
        } else {
            if(label === "swsh") {
                if(index >= 810 && index < 891)
                    return <div key={label} className={classNames(passportStyles.gridRow,passportStyles["swsh-base"])}><span><b>✓</b> Native</span></div>
                else if (index >= 891 && index < 894)
                    return <div key={label} className={classNames(passportStyles.gridRow,passportStyles["swsh-armor"])}><span><b>✓</b> Native</span></div>
                else if (index >= 894 && index < 899)
                    return <div key={label} className={classNames(passportStyles.gridRow,passportStyles["swsh-crown"])}><span><b>✓</b> Native</span></div>
                else
                    return <div key={label} className={classNames(passportStyles.gridRow,passportStyles["not-available"])}>N/A</div>
            } else if(label === "arceus" && index >= 899 && index < 906) {
                return <div key={label} className={classNames(passportStyles.gridRow,passportStyles["confirmed"])}><span><b>✓</b> Native</span></div>
            } else {
                return <div key={label} className={classNames(passportStyles.gridRow,passportStyles["not-available"])}>N/A</div>
            }
        }
        
    });
    return (
        <div className={passportStyles.transferGrid}>
            {headings}
            {rows}
        </div>
    )
}

function NavigationLink({pokemon, number, direction}) {
    const directions = {
        left: "←",
        right: "→",
    };
    const limits = {
        left: "First Pokémon",
        right: "Last Pokémon"
    }
    if(pokemon!=null) {
        let thisPokemon = {...pokemon};
        return (<Link href={`/passport/${pokemon.id}`} passHref>
            <a className={styles.navPokemon}>
                <div>
                    <img alt={thisPokemon.name} className={classNames(styles.navIcon, passportStyles.default)} src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${thisPokemon.id}.png`}/>
                    <div>{directions[direction]} #{number} {thisPokemon.name}</div>
                </div>
            </a>
        </Link>)
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
    const {pokemon} = params;

    const allPokemonData = {
        swsh: (await import ("../../data/swsh.json")).default,
        visc: (await import ("../../data/visc.json")).default,
    }

    const pokemonData = {
        swsh: allPokemonData.swsh.filter(poke => poke.id === pokemon)[0] || null,
        visc: allPokemonData.visc.filter(poke => poke.id === pokemon)[0] || null,
    };
    const pokemonNumber = allPokemonData[latestGame].indexOf(pokemonData[latestGame]) +1;

    const prevPokemon = allPokemonData[latestGame][allPokemonData[latestGame].indexOf(pokemonData[latestGame]) - 1] || null;
    const nextPokemon = allPokemonData[latestGame][allPokemonData[latestGame].indexOf(pokemonData[latestGame]) + 1] || null;
    
    return {
        props: {
            pokemonData,
            prevPokemon,
            nextPokemon,
            pokemonNumber
        }
    }
}

export async function getStaticPaths() {
    // The list has to be updated manually to use the latest Pokémon games released.
    const pokemonList = (await import ("../../data/visc.json")).default;

    const pokemon = pokemonList.map(poke => ({ params: {pokemon: poke.id } }))

    return {
        paths: pokemon,
        fallback: false
    }
}