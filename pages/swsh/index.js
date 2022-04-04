import Head from 'next/head'
import classNames from 'classnames';
import Table from '../../components/Table'
import tableStyles from '../../styles/Table.module.css'

function Legend({labels}) {
    const keys = labels.map(label => {
        return (
            <div key={label.type} className={classNames(tableStyles[label.type],tableStyles["swsh-"+label.type])}>
                {label.label}
            </div>
        )
    });
    return (
        <div className={tableStyles.legend}>
            {keys}
        </div>
    )
}

export default function List({pokemonList}) {
    const labels = [
        { type: 'base', label: 'Base game'},
        { type: 'armor', label: 'Since Isle of Armor'},
        { type: 'crown', label: 'Since Crown Tundra'},
        { type: 'other', label: 'Other'},
        { type: 'no', label: 'Untransferable'},
    ]

    return (
        <div>
            <Head>
                <title>Pokémon Sword &amp; Shield Transfer Compatibility - Billdex</title>
                <meta name="description" content="This webpage can help you know if you can transfer your Pokémon to Galar." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>Pokémon Sword &amp; Shield Transfer Compatibility Table</h1>
            <Legend labels={labels} />
            <Table game="swsh" pokemonList={pokemonList}/>
        </div>
    )
}

export async function getStaticProps() {
    const pokemonList = (await import ('../../public/data/swsh.json')).default;
    return {
        props: {
            pokemonList
        },
        revalidate: 30
    }
}