import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Article.module.css';

export default function Rules() {
    return (
        <div className={styles.articleWrapper}>
            <Head>
                <title>Rules for Pokémon Scarlet &amp; Violet - Billdex</title>
                <meta name="description" content="This page shows the different rules for the tables and the current status of the selected criteria." />
            </Head>
            <center><h1>Rules for Pokémon Scarlet &amp; Violet</h1></center>
            <p>GameFreak has done it again, and will once more limit which Pokémon can be transfered to the new region.</p>

            <p>This page will hold an explanation for how the table works, and show the current state of the criteria taken under consideration to make this list.</p>
            <h2>Availability</h2>
            <p>Unlike the Sword &amp; Shield table, this table also keeps track of the different regional forms.</p>

            <p>There are five categories in this table. These are:</p>
            <table>
                <thead>
                    <th>Category</th>
                    <th>Description</th>
                </thead>
                <tbody>
                    <tr>
                        <td style={{backgroundColor: "lime", fontWeight: "bold", textAlign:"center"}}>Confirmed</td>
                        <td>These Pokémon have been confirmed to appear in the game and therefore transferable.</td>
                    </tr>
                    <tr>
                        <td style={{backgroundColor: "blue", color:"white", fontWeight: "bold", textAlign:"center"}}>Guaranteed</td>
                        <td>During Sword &amp; Shield's development, it was assumed that (in most scenarios) the rest of their evolutionary line would also appear.
                            <br/>However, those games introduced region-exclusive evolutionary branches, putting this category in question. For Scarlet &amp; Violet, this category indicates that the likelihood
                            for a Pokémon in this category is <i>very high</i>, even if the game doesn't launch with support from them right away.</td>
                    </tr>
                    <tr>
                        <td style={{backgroundColor: "yellow", fontWeight: "bold", textAlign:"center"}}>Possible</td>
                        <td>
                            <p>These are Pokémon that may possibly appear. These Pokémon include:</p>
                            <ul>
                                <li>Pokémon that have appeared in-game as objects or other kind of representation, but not as a proper Pokémon.</li>
                                <li>Pokémon that belong to an evolutionary branch that has an evolutionary requirement that do not meet the criteria for being guaranteed (see below).</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td style={{backgroundColor: "#222", color:"white", fontWeight: "bold", textAlign:"center"}}>Untransferable</td>
                        <td>These Pokémon are <b>known</b> to not be able to be transfered to the new region.</td>
                    </tr>
                    <tr>
                        <td style={{backgroundColor: "silver", fontWeight: "bold", textAlign:"center"}}>Unknown</td>
                        <td>We currently don't have enough information to know if these Pokémon can be transfered.</td>
                    </tr>
                </tbody>
            </table>

            <h2>Criteria and assumptions</h2>
            <p>In order to classify all Pokémon in the list, a standard criteria is followed.
            This criteria will be updated as new information is unveiled in this generation.</p>
            <p>Criteria highligted in <b>bold</b> are confirmed facts.</p>
            <ul>
                <li>New Pokémon may be added after the games' launch via updates.</li>
                <li>New Pokémon may be added after the games' launch via future side games.</li>
                <li>Counterpart Pokémon may change or not appear.</li>
                <li>Breeding is possible, but not confirmed.</li>
                <li>Modifications or workarounds of existing evolution mechanics are possible.</li>
                <li>Modifications or workarounds of existing breeding mechanics are possible.</li>
                <li>Mythical Pokémon may be transferable even if not in Dex.</li>
                <li>Some Pokémon may not be able to evolve.</li>
                <li>New cross-generational Pokémon may appear (either breeding or evolution)</li>
            </ul>
            <h3>Evolutions</h3>

            <p>Here is the current state of all evolution mechanics.</p>

            <h3>Breeding</h3>

            <p>Here is the current state of all breeding mechanics.</p>
        </div>
    )
}