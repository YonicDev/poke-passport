import Image from 'next/image';
import classNames from 'classnames';
import styles from '../styles/Table.module.css'

export default function Table({pokemonList, game}) {
    const elements = pokemonList.map(pokemon => {
        return (<div className={classNames(styles.tableEntry, styles[pokemon.status], styles[`${game}-${pokemon.status}`])} key={pokemon.id}>
            <Image width="68" height="56" layout="fixed" alt={pokemon.name} src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${pokemon.id}.png`}/>
        </div>)
    });
    return (
        <div className={styles.table} >
            {elements}
        </div>
    )
}