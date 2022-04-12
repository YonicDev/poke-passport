import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import PokeLogo from '../public/poke-logo.svg'
import SwshBanner from '../public/swsh_banner.jpg'
import ViscBanner from '../public/visc_banner.png'

export default function Home() {
  return (
    <div className={styles.main}>
        <Head>
            <title>PokéPassport - The Pokémon Transfer Compatibility Site</title>
            <meta name="description" content="This webpage can help you know if you can transfer your Pokémon to Galar." />
        </Head>
        <img className={styles.logo} alt="PokéPassport" src={PokeLogo.src} />
        <center>
            <p>The webpage to check if you can transfer your Pokémon to one of the newer Pokémon games.<br/><Link href="/about">Learn more about PokéPassport here.</Link></p>
            <br/>
            <nav className={styles.homeNavigation}>
                <Link href="/swsh/"><a className={styles.homeLink}><img alt="Pokémon Sword &amp; Shield" src={SwshBanner.src} /></a></Link>
                <Link href="/visc/"><a className={styles.homeLink}><img alt="Pokémon Sword &amp; Shield" src={ViscBanner.src} /></a></Link>
            </nav>
        </center>
    </div>
  )
}