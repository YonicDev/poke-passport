import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Article.module.css';

export default function Rules() {
    const title = "Rules for Pokémon Sword & Shield"
    return (
        <div className={styles.articleWrapper}>
            <Head>
                <title>{title + " - Billdex"}</title>
                <meta name="description" content="This page shows the different rules for the tables and the current status of the selected criteria for the Galar region." />
            </Head>
            <center><h1>{title}</h1></center>
            
        </div>
    )
}