import Head from 'next/head'
import Link from 'next/link'
import { MDXProvider } from '@mdx-js/react';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import styles from '../../../styles/Article.module.css';

export default function GameArticle({ article }) {
    const components = {
        a: props => <a {...props} target="_blank" rel="noreferrer" />,
        Link
    }
    return (
        <div className={styles.articleWrapper}>
            <Head>
                <title>{article.frontmatter.title} - Billdex</title>
                <meta name="description" content={article.frontmatter.description} />
            </Head>
            <center><h1>{article.frontmatter.title}</h1></center>
            <MDXProvider components={components}>
                <MDXRemote {...article} />
            </MDXProvider>
        </div>
    )
}

export async function getStaticProps({params}) {
    const fs = (await import('fs')).default;
    const path = (await import('path')).default;
    const promisify = (await import('util')).promisify;
    const readFile = promisify(fs.readFile);

    const {game, article} = params;
    const filePath = path.join(process.cwd(), 'articles', game, article+'.mdx');
    const rawMarkdown = await readFile(filePath, 'utf8');
    const text = await serialize(rawMarkdown, {parseFrontmatter: true});

    return {
        props: {
            article: text
        }
    }
}

export async function getStaticPaths() {
    const fs = (await import('fs')).default;
    const path = (await import('path')).default;
    const promisify = (await import ('util')).promisify;
    const readdir = promisify(fs.readdir);

    const articleDirsList = await readdir(path.join(process.cwd(), 'articles'));
    const gamesList = await readdir(path.join(process.cwd(), 'data'));
    const validPaths = articleDirsList.filter((dir) => gamesList.includes(dir+".json"));
    const resultingPaths = await Promise.all(validPaths.map(async (dir) => {
        const articles = await readdir(path.join(process.cwd(), 'articles', dir));
        return articles.map((article) => {
            return {
                params: {
                    game: dir,
                    article: article.replace(/\.mdx$/, '')
                }
            }
        })
    }));
    // concatenate all the paths
    const paths = resultingPaths.reduce((acc, curr) => acc.concat(curr), []);
    return {paths, fallback: false};
}