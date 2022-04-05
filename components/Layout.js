const Footer = () => {
    return (<footer><a href="https://github.com/YonicDev/billdex" target="_blank" rel="noreferrer">Github</a></footer>)
};

export default function CommonLayout({ children }) {
    return (<>
        <main>{children}</main>
        <Footer />
    </>)
};