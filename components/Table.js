import {useState, useEffect, useLayoutEffect, useRef} from 'react';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import classNames from 'classnames';
import { addTrailingZeroes } from '../util.ts';
import styles from '../styles/Table.module.css'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function Table({pokemonList, filteredList, game, onHighlight}) {
    let regionRegExp;
    if(game === 'visc') {
        regionRegExp = /-(alola|galar|hisui)/
    }

    const imageAliases = {
        hisui: {
            550: "basculin-white-striped"
        }
    }

    const elements = filteredList.map((pokemon, i) => {
        let region = "original", shortenedId = pokemon.id;

        if(regionRegExp) {
            const test = regionRegExp.exec(pokemon.id);
            region = test? test[1] : "original";
            if(region!=="original")
                shortenedId = pokemon.id.replace("-"+region, '');
        }

        const hasSubtituteImage = imageAliases[region]!=null && imageAliases[region][pokemonList.indexOf(pokemon)+1] != null;
        
        return (<Link key={pokemon.id} href={`/${game}/${shortenedId}${region!=="original"?`?region=${region}`:""}`}><a><div className={classNames(styles.tableEntry, styles[pokemon.status], styles[`${game}-${pokemon.status}`])} onMouseEnter={() => onHighlight(pokemon, pokemonList.indexOf(pokemon)+1)} onMouseLeave={() => onHighlight(null, -1)}>
            <span className={styles.tableEntryNumber}>{addTrailingZeroes(pokemonList.indexOf(pokemon)+1, 3)}</span>
            <img alt={pokemon.name} src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${hasSubtituteImage? imageAliases[region][pokemonList.indexOf(pokemon)+1] : pokemon.id}.png`}/> 
        </div></a></Link>)
    });
    return (
        <div className={styles.table}>
            {elements}
        </div>
    )
}

export function BriefSummary({statusLabels, notes}) {
    const [highlightedElement, setHighlightedElement] = useState({pokemon: null, index: -1});
    const {pokemon, index} = highlightedElement;
    const [position, setPosition] = useState({x: 0, y: 0});
    const ref = useRef(null);
    let region = "original";

    useIsomorphicLayoutEffect(() => {
        const summaryWindow = ref.current;
        const handler = (e) => {
            setPosition((current) => {
                let x = e.clientX, y = e.clientY;
                if(summaryWindow==null) { return current}
                if(x + summaryWindow.clientWidth >= window.innerWidth) {
                    if(x - summaryWindow.clientWidth < 0)
                        x = x - summaryWindow.clientWidth*0.5;
                    else
                        x = x - summaryWindow.clientWidth;
                }
                return {x, y}
            });
        };
        const highlighter = (e) => {
            setHighlightedElement(e.detail);
        }
        window.addEventListener('pointermove', handler);
        window.addEventListener('highlight', highlighter);
        return () => {
            window.removeEventListener('pointermove', handler);
            window.removeEventListener('highlight', highlighter);
        }
    });

    if(highlightedElement.pokemon) {
        const test = /(alola|galar|hisui)/.exec(highlightedElement.pokemon.id)
        if(test)
            region = test[1];
    }

    return (highlightedElement.pokemon &&
        <div ref={ref} style={{left: position.x + 8, top: position.y + 8}} className={styles.summaryWindow}>
            <div className={styles.summary}>
                <div className={styles.summaryDex}>#{addTrailingZeroes(index, 3)}</div>
                <div className={styles.summaryName}>{pokemon.name}</div>
                <div className={classNames(styles.summaryStatus,styles[pokemon.status],styles["swsh-"+pokemon.status])}>{statusLabels[pokemon.status]}</div>
            </div>
            <div className={styles.summaryNotes}>
                <MDXRemote {...(notes[highlightedElement.index-1][region || "original"])} />
            </div>
            <div className={styles.summaryPrompt}>Click to read more</div>
        </div>
    )
}

export function Legend({labels, amounts, toggleFilter, filters}) {
    const keys = Object.keys(labels).map(label => {
        return (
            <div key={label} className={classNames(styles[label],styles["swsh-"+label], filters[label] ? styles.filtered : undefined)} onClick={() => toggleFilter(label)}>
                <span className={styles.amountLabel}>{amounts[label]}</span> {labels[label]}
            </div>
        )
    });
    return (
        <div className={styles.legend}>
            {keys}
        </div>
    )
}