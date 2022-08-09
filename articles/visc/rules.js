import Head from 'next/head'
import Link from 'next/link'
import classNames from 'classnames';
import styles from '../../styles/Article.module.css';

const labels = {
    confirmed: "Confirmed",
    assumed: "Assumed",
    possible: "Possible",
    workaround: "Workaround",
    no: "Not applicable",
    unknown: "Unknown"
}

const classes = {
    confirmed: styles.confirmed,
    assumed: styles.guaranteed,
    possible: styles.possible,
    workaround: styles.workaround,
    no: styles.no,
    unknown: styles.unknown
}

const mapRows = (objeto) => (key) => (
    <tr key={key}>
        <td style={{textAlign: "center"}}>{key}</td>
        <td className={classNames(styles.status, classes[objeto[key]])}>{labels[objeto[key]]}</td>
    </tr>
)

export default function Rules() {
    return (
        <div className={styles.articleWrapper}>
            <Head>
                <title>Rules for Pokémon Scarlet &amp; Violet - Billdex</title>
                <meta name="description" content="This page shows the different rules for the tables and the current status of the selected criteria." />
            </Head>
            <center><h1>Rules for <Link href="/visc"><a>Pokémon Scarlet &amp; Violet</a></Link></h1></center>
            <p>GameFreak has done it again, and will once more limit which Pokémon can be transfered to the new region.</p>

            <p>This page will hold an explanation for how the table works, and show the current state of the criteria taken under consideration to make this list.</p>
            <h2>Availability</h2>
            <p>Unlike the Sword &amp; Shield table, this table also keeps track of the different regional forms.</p>

            <p>There are five categories in this table. These are:</p>
            <CategoryTable />

            <h2>Criteria and assumptions</h2>
            <p>In order to classify all Pokémon in the list, a standard criteria is followed.
            This criteria will be updated as new information is unveiled in this generation.</p>
            <p>Criteria highligted in <b>bold</b> are confirmed facts.</p>
            <ul>
                <li>New Pokémon may be added after the games' launch via updates.</li>
                <li>New Pokémon may be added after the games' launch via future side games.</li>
                <li><b>Pokémon with regional forms appear.</b> (Confirmed as of May 8th 2022)</li>
                <li><b>New regional forms of existing Pokémon may be added.</b> (Confirmed as of August 3rd 2022)</li>
                <li>Counterpart Pokémon may change or not appear.</li>
                <li>Breeding is possible.</li>
                <li>Modifications or workarounds of existing evolution mechanics are possible.</li>
                <li>Modifications or workarounds of existing breeding mechanics are possible.</li>
                <li>Mythical Pokémon may be transferable even if not in Dex.</li>
                <li>Some Pokémon may not be able to evolve.</li>
                <li>New cross-generational Pokémon may appear (either breeding or evolution)</li>
            </ul>

            <p>The following criteria are given a label to help classify criteria-sensitive cases.</p>
            <CriteriaTable/>

            <h3>Evolutions</h3>
            <p>Here is the current state of all evolution mechanics.</p>
            <EvolutionTable/>

            <h3>Breeding</h3>
            <p>Here is the current state of all breeding mechanics.</p>
            <BreedingTable/>
        </div>
    )
}

const CategoryTable = () => (
    <table className={styles.articleTable}>
        <thead>
            <tr>
                <th>Category</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className={classNames(styles.status, styles.confirmed)}>Confirmed</td>
                <td>These Pokémon have been confirmed to appear in the game and therefore transferable. They have to appear in the wild, in a battle,
                or any situation which allows the Pokémon to be controlled to be considered confirmed (i.e. contests or any side gameplay).</td>
            </tr>
            <tr>
                <td className={classNames(styles.status, styles.guaranteed)}>Guaranteed</td>
                <td>
                    <p>During Sword &amp; Shield's development, it was assumed that for most confirmed Pokémon the rest of their evolutionary line would also appear.</p>
                    <p>However, those games introduced region-exclusive evolutionary branches, putting this category in question. For Scarlet &amp; Violet, this category indicates that the likelihood
                    for a Pokémon in this category is <i>very high</i>, even if the game doesn't launch with support from them right away.</p>
                    <p>This category also applies to all Pokémon with a regional form from a region have at least one confirmed specimen to appear. For example: If Alolan Meowth is confirmed to appear,
                    then all the remaining Alolan forms are considered guaranteed, but not Galarian Meowth nor any of the Galarian forms.</p>
                </td>
            </tr>
            <tr>
                <td className={classNames(styles.status, styles.possible)}>Possible</td>
                <td>
                    <p>These are Pokémon that may possibly appear. These Pokémon include:</p>
                    <ul>
                        <li>Pokémon that have appeared in-game physically, but not in any of the aforementioned situations that would be considered to be guaranteed.</li>
                        <li>Pokémon that have appeared in-game as objects or other kind of representation, but not as a proper Pokémon.</li>
                        <li>Pokémon that belong to an evolutionary branch that has an evolutionary requirement that do not meet the criteria for being guaranteed (see below).</li>
                        <li>Regional forms that have no confirmed Pokémon to appear.</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td className={classNames(styles.status, styles.no)}>Untransferable</td>
                <td>These Pokémon are <b>known</b> to not be able to be transfered to the new region.</td>
            </tr>
            <tr>
                <td className={classNames(styles.status, styles.unknown)}>Unknown</td>
                <td>We currently don't have enough information to know if these Pokémon can be transfered.</td>
            </tr>
        </tbody>
    </table>
);

const CriteriaTable = () => (
    <table className={styles.articleTable}>
        <thead>
            <th>Label</th>
            <th>Meaning</th>
        </thead>
        <tbody>
            <tr>
                <td className={classNames(styles.status, styles.confirmed)}>Confirmed</td>
                <td>This criteria is known to be applicable according to gameplay or official information.</td>
            </tr>
            <tr>
                <td className={classNames(styles.status, styles.guaranteed)}>Assumed</td>
                <td>According to the Pokémon that have been confirmed, it is assumed that this criteria will be applicable.</td>
            </tr>
            <tr>
                <td className={classNames(styles.status, styles.possible)}>Possible</td>
                <td>In theory, this criteria should be applicable. This label is also used when related Pokémon that use this criteria are Guaranteed, and/or a depending criteria is Assumed.</td>
            </tr>
            <tr>
                <td className={classNames(styles.status, styles.workaround)}>Replaced</td>
                <td>A workaround exists for this criteria, which may affect how Pokémon can be classified.</td>
            </tr>
            <tr>
                <td className={classNames(styles.status, styles.no)}>Not applicable</td>
                <td>This criteria is known to be applicable according to gameplay or official information, but it doesn't mean that workarounds exist.</td>
            </tr>
            <tr>
                <td className={classNames(styles.status, styles.unknown)}>Unknown</td>
                <td>More information is needed to deliberate the status of this rule.</td>
            </tr>
        </tbody>
    </table>
);

const EvolutionTable = () => {

    const criteria = {
        "Leveling up with a specific move": "assumed",
        "Leveling up in a specific location": "possible",
        "Leveling up with a specific Pokémon": "unknown",
        "Leveling up under a certain weather": "unknown",
        "Trading": "assumed",
        "Trading with a specific item": "assumed",
        "Trading with a specific Pokémon": "unknown",
        "High friendship": "possible",
        "Dependance of time of day": "assumed",
        "Pokémon-specific evolution": "assumed",
        "Dependance of regional form": "assumed",
        "New evolution mechanics": "possible"
    }

    const evolutionaryItems = {
        "Fire Stone": "assumed",
        "Water Stone": "assumed",
        "Thunder Stone": "assumed",
        "Leaf Stone": "possible",
        "Moon Stone": "unknown",
        "Sun Stone": "assumed",
        "Shiny Stone": "possible",
        "Dusk Stone": "assumed",
        "Dawn Stone": "possible",
        "Ice Stone": "possible",
        "King's Rock": "assumed",
        "Metal Coat": "assumed",
        "Dragon Scale": "unknown",
        "Up-Grade": "unknown",
        "Deep Sea Scale": "unknown",
        "Deep Sea Tooth": "unknown",
        "Dubious Disc": "unknown",
        "Electirizer": "unknown",
        "Magmarizer": "unknown",
        "Protector": "unknown",
        "Reaper Cloth": "unknown",
        "Razor Claw": "unknown",
        "Razor Fang": "unknown",
        "Oval Stone": "unknown",
        "Prism Scale": "unknown",
        "Sachet": "unknown",
        "Whipped dream": "unknown",
        "Sweets": "unknown",
        "Chipped & Cracked Pots": "unknown",
        "Sweet & Tart Apples": "unknown",
        "Galarica Cuff": "possible",
        "Galarica Crown": "possible",
        "Black Augurite": "possible",
        "Peat Block": "unknown",
        "New evolutionary items": "possible"
    }

    return (
        <table className={styles.articleTable}>
            <thead>
                <tr>
                    <th>Criteria</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(criteria).map(mapRows(criteria))}
            </tbody>
            <thead>
                <tr>
                    <th>Evolutionary item</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(evolutionaryItems).map(mapRows(evolutionaryItems))}
            </tbody>
        </table>
    )
};

const BreedingTable = () => {
    const criteria = {
        "Breeding": "assumed",
        "Nidoran♂ and Volbeat can have both female and male offspring": "assumed",
        "100% male Pokémon can have male offspring": "possible",
        "Genderless Pokémon can have offspring": "assumed",
        "Regional form is the same as breeding region": "unknown",
        "If a parent holds an Everstone, the offspring may have the same regional form as the parent": "unknown",
        "Sea Incense": "possible",
        "Rose Incense": "unknown",
        "Pure Incense": "unknown",
        "Rock Incense": "unknown",
        "Odd Incense": "unknown",
        "Luck Incense": "possible",
        "Wave Incense": "unknown",
        "Full Incense": "unknown",
        "New incenses or breeding mechanics": "possible"
    }

    return (
        <table className={styles.articleTable}>
            <thead>
                <tr>
                    <th>Criteria</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(criteria).map(mapRows(criteria))}
            </tbody>
        </table>
    )
}