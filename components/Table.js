import {useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote';
import classNames from 'classnames';
import { addTrailingZeroes } from '../util.ts';
import styles from '../styles/Table.module.css'


export function Table({pokemonList, game, onHighlight}) {
    const elements = pokemonList.map((pokemon, i) => {
        return (<div className={classNames(styles.tableEntry, styles[pokemon.status], styles[`${game}-${pokemon.status}`])} key={pokemon.id} onMouseEnter={() => onHighlight(pokemon, i+1)} onMouseLeave={() => onHighlight(null, -1)}>
            <span className={styles.tableEntryNumber}>{addTrailingZeroes(i+1, 3)}</span>
            <Link href={`/${game}/${pokemon.id}`} passHref><a><Image width="68" height="56" layout="fixed" alt={pokemon.name} src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${pokemon.id}.png`}/></a></Link> 
        </div>)
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

    useEffect(() => {
        const handler = (e) => {
            setPosition(() => {
                let x = e.clientX, y = e.clientY;
                if(x >= (window.innerWidth/3)*2) {
                    x = x - (window.innerWidth/3);
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
    }, []);

    return (highlightedElement.pokemon &&
        <div style={{left: position.x + 8, top: position.y + 8}} className={styles.summaryWindow}>
            <div className={styles.summary}>
                <div className={styles.summaryDex}>#{addTrailingZeroes(index, 3)}</div>
                <div className={styles.summaryName}>{pokemon.name}</div>
                <div className={classNames(styles.summaryStatus,styles[pokemon.status],styles["swsh-"+pokemon.status])}>{statusLabels[pokemon.status]}</div>
            </div>
            <MDXRemote className={styles.summaryNotes} {...notes[highlightedElement.index-1]} />
            <div className={styles.summaryPrompt}>Click to read more</div>
        </div>
    )
}

export function Legend({labels}) {
    const keys = Object.keys(labels).map(label => {
        return (
            <div key={label} className={classNames(styles[label],styles["swsh-"+label])}>
                {labels[label]}
            </div>
        )
    });
    return (
        <div className={styles.legend}>
            {keys}
        </div>
    )
}