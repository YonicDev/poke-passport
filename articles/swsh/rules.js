import Head from 'next/head'
import Link from 'next/link'
import classNames from 'classnames';
import styles from '../../styles/Article.module.css';

export default function Rules() {
    return (
        <div className={styles.articleWrapper}>
            <Head>
                <title>Rules for Pokémon Sword &amp; Shield - Billdex</title>
                <meta name="description" content="This page shows the different rules for the tables and the current status of the selected criteria." />
            </Head>
            <center><h1>Rules for <Link href="/swsh"><a>Pokémon Sword &amp; Shield</a></Link></h1></center>
            <p>This table has the latest state of which Pokémon can be transported to the Galar region since their release.</p>
            <h2>Availability</h2>
            <p>Unlike the Sword &amp; Shield table, this table also keeps track of the different regional forms.</p>

            <p>There are five categories in this table. These are:</p>
            <CategoryTable />
            <p><b>NOTE:</b> This table does not carry over the history of transferability from the Google Sheets version of the table.</p>
            <p>With the announcement of <Link href="/visc">Pokémon Scarlet &amp; Violet</Link>, it is very unlikely that this table will receive further updates.</p>
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
                <td className={classNames(styles.status, styles["swsh-base"])}>Since base game</td>
                <td>These Pokémon can be transfered in all versions of the game.</td>
            </tr>
            <tr>
                <td className={classNames(styles.status, styles["swsh-armor"])}>Since Isle of Armor</td>
                <td>These Pokémon can be transfered since version 1.2.0 of the game, the update which introduced the Isle of Armor.</td>
            </tr>
            <tr>
                <td className={classNames(styles.status, styles["swsh-crown"])}>Since Crown Tundra</td>
                <td>These Pokémon can be transfered since version 1.3.0 of the game, the update which introduced the Crown Tundra.</td>
            </tr>
            <tr>
                <td className={classNames(styles.status, styles["swsh-other"])}>Other</td>
                <td>This category includes Mythical Pokémon that are programmed for both in-game and Pokémon HOME events. When they began to be able to be transfered is unknown.</td>
            </tr>
            <tr>
                <td className={classNames(styles.status, styles.no)}>Untransferable</td>
                <td>These Pokémon cannot be transfered in Pokémon Sword &amp; Shield.</td>
            </tr>
        </tbody>
    </table>
);