import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Article.module.css'

import OldTable from "./table.png"

export default function AboutPage() {
    return (
        <div className={styles.articleWrapper}>
            <Head>
                <title>About - PokéPassport</title>
                <meta name="description" content="PokéPassport is a webpage that serves as a guide for players to know what Pokémon are allowed to be transfered to the modern Pokémon games." />
            </Head>
            <center><h1>What is PokéPassport?</h1></center>
            <p>Back when Pokémon Sword and Pokémon Shield were announced,
            GameFreak stated that not all Pokémon from the previous generations could be transferable to these games. At that time, a table was created for users to keep track
            of which Pokémon GameFreak was planning on including on the game.</p>
            <div style={{width: "75%", margin: "0 auto"}}>
                <Image src={OldTable} alt="Old table" layout="responsive" />
            </div>
            <p>With the latest titles and updates to Pokémon Sword and Shield, the table became outdated: At release date, Sword and Shield could handle transfering roughly <b>40%</b> of
            all 809 Pokémon at the time. By the time the Crown Tundra came out, that percentage grew to a bit over <b>70%</b>.
            </p>
            <p>Originally named Billdex, <b>PokéPassport</b> is the successor to this table,
            which is now community-driven and contains updated information with the latest mainline Pokémon titles. Imagine if every Pokémon species had a passport of their own to enter
            to new regions - that&apos;s how PokéPassport was named.</p>
            <h2>Contributing</h2>
            <p>PokéPassport is an open source project. You can contribute to the project by doing any of the following:</p>
            <ol type="A">
                <li><b>Submit an issue</b> to the Github repository requesting a modification. If it&apos;s in order to update an entry in a table, you <b>must</b> provide legitimate sources.</li>
                <li><b>Contribute to the source code:</b> Fork the Github repository and making your own changes there. Once you&apos;re done with your changes, make a pull request to any of the following kind of branches:
                    <ul>
                        <li><b>content:</b> This kind of branches are used to modify information in the JSON databases located in the data folder.</li>
                        <li><b>feature:</b> This kind of branches are used to modify features in the website.</li>
                        <li><b>bugfix:</b> This kind of branches are used to fix bugs in the website.</li>
                        <li><b>Pull requests from forks that target the <u>master</u> branch will very likely be rejected if you don&apos;t know what you&apos;re doing.</b> Pull requests for masters are only meant to merge the content, feature and bugfix branches together for a next publication.</li>
                    </ul>
                    More information on contributing to the source code is specified in the <a href="https://github.com/YonicDev/poke-passport/blob/master/CONTRIBUTING.md">contributing page</a>.
                </li>
            </ol>
        </div>
    )
}