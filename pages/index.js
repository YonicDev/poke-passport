import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import SiteLogo from "../public/poke-logo.svg";
import SWSHBanner from "../public/swsh_banner.jpg";
import VISCBanner from "../public/visc_banner.png";

export default function Home() {
  return (
    <div className={styles.main}>
        <Head>
            <title>PokéPassport - The Pokémon Transfer Compatibility Site</title>
            <meta name="description" content="This webpage can help you know if you can transfer your Pokémon to Galar." />
        </Head>
        <Image className={styles.logo} alt="PokéPassport" src="/poke-logo.svg" width="600" height="200"/>
        <center>
            <p>The webpage to check if you can transfer your Pokémon to one of the newer Pokémon games.<br/><Link href="/about">Learn more about PokéPassport here.</Link></p>
            <br/>
            <nav className={styles.homeNavigation}>
                <Link href="/swsh/"><a className={styles.homeLink}><Image alt="Pokémon Sword &amp; Shield" src={SWSHBanner} layout="responsive"/></a></Link>
                <Link href="/visc/"><a className={styles.homeLink}><Image alt="Pokémon Sword &amp; Shield" src={VISCBanner} layout="responsive"/></a></Link>
            </nav>
        </center>
    </div>
  )
}