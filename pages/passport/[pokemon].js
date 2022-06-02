import { useReducer, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import classNames from 'classnames';

import { addTrailingZeroes } from "../../util.ts";

import styles from "../../styles/PokemonInfo.module.css";
import passportStyles from "../../styles/Passport.module.css";

const latestGame = "visc";

const regionRegExp = /(alola|galar|hisui)/;

export default function PokemonPassport({pokemonData, prevPokemon, nextPokemon, pokemonNumber}) {
    const [selectedRegion, setSelectedRegion] = useReducer(() => {
        const query = new URLSearchParams(window.location.search);
        const region = query.get("region");
        return regionRegExp.test(region)? region : "original";
    }, "original");

    useEffect(() => {
        setSelectedRegion();
    });

    const isOriginal = selectedRegion == null || selectedRegion === "original";

    let thisPokemon = !isOriginal && pokemonData[latestGame].forms!=null ? pokemonData[latestGame].forms.find(variant => {
        const regexp = new RegExp(`-${selectedRegion}$`);
        return regexp.test(variant.id);
    })  : pokemonData;

    if(thisPokemon==null) { thisPokemon = pokemonData; }

    const formNames = {
        "original": "Original",
        "alola": "Alolan",
        "galar": "Galarian",
        "hisui": "Hisuian",
    }
    const regionShortForm = {
        galar: {id: "swsh", size:"80px"},
        alola: {id: "alola", size:"90px"},
        original: {id: "visc", size:"90px"},
        hisui: {id: "arceus", size:"90px"}
    }

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

    const forms = pokemonData[latestGame].forms?.map(form => {
        const formName = regionRegExp.exec(form.id)[1] // No need for validation. The regexp should always match.
        if(formName===selectedRegion) return;
        return (<div className={classNames(styles.formLink,passportStyles.default)} key={form.id}>
            <Link href={`/passport/${pokemonData[latestGame].id}?region=${formName}`}><a title={`${formNames[formName]} form`}><img alt={form.id} src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${form.id}.png`}/></a></Link>
        </div>)
    })

    if(forms!=null && !isOriginal) {
        forms.unshift(<div className={classNames(styles.formLink,passportStyles.default)} key={pokemonData[latestGame].id}>
            <Link href={`/passport/${pokemonData[latestGame].id}`}><a title="Original form"><img alt={pokemonData[latestGame].id} src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${pokemonData[latestGame].id}.png`}/></a></Link>
        </div>)
    }

    return (<div>
        <center>
            <h1>{pokemonData[latestGame].name}&apos;s Passport</h1>
            <Link href={`/passport${!isOriginal?`?region=${selectedRegion}`:""}`}><a>↑ Back to list</a></Link>
        </center>
        <Head>
            <title>Passport for {pokemonData[latestGame].name} - PokéPassport</title>
            <meta name="description" content={`Check which games ${pokemonData[latestGame].name} can be transfered to.`} />
        </Head>
        <div className={styles.pageContainer}>
            <NavigationLink pokemon={prevPokemon} direction="left" number={pokemonNumber-1} preferredForm={selectedRegion}/>
            <div className={passportStyles.container}>
                <div className={classNames(styles.iconContainer, passportStyles.default)} style={{backgroundImage: `url("/poke-passport/logo-${regionShortForm[selectedRegion]?.id || regionShortForm.original.id}.svg")`, backgroundSize: regionShortForm[selectedRegion]?.size || regionShortForm.original.size, backgroundBlendMode: "multiply"}}>
                    <img className={styles.icon} alt={pokemonData.name} src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${isOriginal? pokemonData[latestGame].id : thisPokemon.id}.png`} />
                </div>
                <h1 className={styles.name}>#{addTrailingZeroes(pokemonNumber, 3)} {pokemonData[latestGame].name}</h1>
                <div className={styles.forms}>{forms}</div>
                <div className={passportStyles.label}>Passport Power<sup><abbr title="A rating based on how many games this Pokémon can be transfered to, excluding the games where a Pokémon first originated from.">(?)</abbr></sup>: {passportPower}</div>
                <div className={passportStyles.separator}>Transferability</div>
                <TransferabilityTable pokemon={pokemonData} index={pokemonNumber} labels={transferability} />
            </div>
            <NavigationLink pokemon={nextPokemon} direction="right" number={pokemonNumber+1} preferredForm={selectedRegion}/>
        </div>
    </div>)
}

function TransferabilityTable({pokemon, labels, index}) {
    const [region, setSelectedRegion] = useReducer(() => {
        const query = new URLSearchParams(window.location.search);
        const region = query.get("region");
        return regionRegExp.test(region)? region : "original";
    }, "original");

    useEffect(() => {
        setSelectedRegion();
    });

    const isOriginal = region == null || region === "original";

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
            Native: <span><b>✓</b> Native</span>,
            "N/A": <span>No info</span>
        }
        const regionRegExp = new RegExp(`-${region}$`);
        if(pokemon[label]) {
            const defaultLabel = (<Link key={label} href={`/${label}/${pokemon[latestGame].id}${isOriginal?"":`?region=${region}`}`}>
                <a className={classNames(passportStyles.gridRow,passportStyles[pokemon[label].status],passportStyles[label+"-"+(pokemon[label].status)])}>
                    {status[labels[label][pokemon[label].status]]}
                </a>
            </Link>)
            if(label === "swsh") {
                if(region === "original") {
                    return defaultLabel;
                } else {
                    if(pokemon[latestGame].forms?.find(variant => regionRegExp.test(variant.id))) {
                        if(region === "galar") {
                            // Galarian Slowpoke was introduced in 1.1.0, and is classified as "Other" in this listing.
                            if (index === 79)
                                return <div key={label} className={classNames(passportStyles.gridRow,passportStyles["swsh-other"])}>{status.Native}</div>
                            // Galarian Slowbro was introduced in Isle of Armor.
                            if (index === 80)
                                return <div key={label} className={classNames(passportStyles.gridRow,passportStyles["swsh-armor"])}>{status.Native}</div>
                            // Galarian Articuno, Zapdos, Moltres and Slowking were introduced in Crown Tundra.
                            else if((index >= 144 && index < 147) || index === 199)
                                return <div key={label} className={classNames(passportStyles.gridRow,passportStyles["swsh-crown"])}>{status.Native}</div>
                            else
                                return <div key={label} className={classNames(passportStyles.gridRow,passportStyles["swsh-base"])}>{status.Native}</div>
                        } else if(region === "alola") {
                            if(pokemon.status === "no")
                                return <div key={label} className={classNames(passportStyles.gridRow,passportStyles["no"])}>{status.No}</div> 
                            else
                                return <div key={label} className={classNames(passportStyles.gridRow,passportStyles["swsh-crown"])}>{status.Yes}</div>
                        } else {
                            return <div key={label} className={classNames(passportStyles.gridRow,passportStyles["not-available"])}>{status["N/A"]}</div>;
                        }
                    } else {
                        return defaultLabel;
                    }
                }
            } else if(label === "visc") {
                return defaultLabel;
            }
        } else {
            if(label === "swsh") {
                if(index >= 810 && index < 891)
                    return <div key={label} className={classNames(passportStyles.gridRow,passportStyles["swsh-base"])}>{status.Native}</div>
                else if (index >= 891 && index < 894)
                    return <div key={label} className={classNames(passportStyles.gridRow,passportStyles["swsh-armor"])}>{status.Native}</div>
                else if (index >= 894 && index < 899)
                    return <div key={label} className={classNames(passportStyles.gridRow,passportStyles["swsh-crown"])}>{status.Native}</div>
                else
                    return <div key={label} className={classNames(passportStyles.gridRow,passportStyles["not-available"])}>{status["N/A"]}</div>
            } else if(label === "arceus" && index >= 899 && index < 906) {
                return <div key={label} className={classNames(passportStyles.gridRow,passportStyles["confirmed"])}>{status.Native}</div>
            } else {
                return <div key={label} className={classNames(passportStyles.gridRow,passportStyles["not-available"])}>{status["N/A"]}</div>
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

function NavigationLink({pokemon, number, direction, preferredForm}) {
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
        return (<Link href={`/passport/${pokemon.id}${form!=="original"?`?region=${form}`:""}`} passHref>
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