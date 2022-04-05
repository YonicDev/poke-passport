import Link from 'next/link';

const Footer = () => {
    return (<footer><small>A Pokémon fan project for fans. All wrongs liberated. <a href="https://github.com/YonicDev/billdex" target="_blank" rel="noreferrer">Github</a></small></footer>)
};
const Header = () => {
    return (<header className="siteHeader">
        <Link href="/"><a className="navLogo" >Billdex</a></Link>
        <nav className="headerNav">
            <Link href="/swsh"><a className="swsh">Sword &amp; Shield</a></Link>
            <Link href="/visc"><a className="visc">Scarlet &amp; Violet</a></Link>
        </nav>
        <Link href="/about">About</Link>
    </header>)
}

export default function CommonLayout({ children }) {
    return (<>
        <Header/>
        <main>{children}</main>
        <Footer />
    </>)
};