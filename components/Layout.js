import Link from 'next/link';
import Head from 'next/head';

const Footer = () => {
    return (<footer><small>A Pokémon fan project for fans. All wrongs liberated. <a href="https://github.com/YonicDev/poke-passport" target="_blank" rel="noreferrer">Github</a></small></footer>)
};
const Header = () => {
    return (<header className="siteHeader">
        <nav className="headerNav">
            <Link href="/swsh"><a className="swsh">Sword &amp; Shield</a></Link>
            <Link href="/visc"><a className="visc">Scarlet &amp; Violet</a></Link>
        <Link href="/"><a className="navLogo" ><img alt="PokéPassport" src="/poke-logo.svg"/></a></Link>
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