import Head from 'next/head'
import Table from '../../components/Table'

export default function List({pokemonList}) {
    return (
        <div>
            <Head>
                <title>Pokémon Sword &amp; Shield Transfer Compatibility - Billdex</title>
                <meta name="description" content="This webpage can help you know if you can transfer your Pokémon to Galar." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>Pokémon Scarlet &amp; Violet Transfer Compatibility Table</h1>
            <Table game="visc" pokemonList={pokemonList}/>
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