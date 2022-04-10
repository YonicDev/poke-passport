import Link from 'next/link';
import Image from 'next/image'
import Head from 'next/head';

const Footer = () => {
    return (<footer><small>A Pokémon fan project for fans. All wrongs liberated. <a href="https://github.com/YonicDev/poke-passport" target="_blank" rel="noreferrer">Github</a></small></footer>)
};
const Header = () => {
    return (<header className="siteHeader">
        <Link href="/"><a className="navLogo" ><Image alt="PokéPassport" width="300" height="50" layout="fixed" src="/poke-logo.svg"/></a></Link>
        <nav className="headerNav">
            <Link href="/swsh"><a className="swsh">Sword &amp; Shield</a></Link>
            <Link href="/visc"><a className="visc">Scarlet &amp; Violet</a></Link>
        </nav>
        <nav className='sideNav'>
            <Link href="/about">About</Link>
            <a style={{cursor: "pointer"}}>Settings</a>
        </nav>
    </header>)
}

export default function CommonLayout({ children }) {
    return (<>
        <Head>
            <link rel="icon" href="/favicon.svg" />
        </Head>
        <Header/>
        <main>{children}</main>
        <Footer />
    </>)
};