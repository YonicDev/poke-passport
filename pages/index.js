import Head from 'next/head'
import Link from 'next/link'
import classNames from 'classnames'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
    <Head>
        <title>Billdex - The Pokémon Transfer Compatibility Site</title>
        <meta name="description" content="This webpage can help you know if you can transfer your Pokémon to Galar." />
        <link rel="icon" href="/favicon.ico" />
    </Head>
        <h1>Welcome to Billdex!</h1>
        <b>Now including Pokémon Scarlet &amp; Violet!</b>
        <ul>
            <li><Link href="/about">About Billdex</Link></li>
            <li><Link href="/swsh/">Generation 8: Pokémon Sword &amp; Pokémon Shield</Link>.</li>
            <li><Link href="/visc/">Generation 9: Pokémon Scarlet &amp; Pokémon Violet</Link>.</li>
        </ul>
    </div>
  )
}
