import dynamic from 'next/dynamic';

export default function GameArticle({ article, game }) {
    const Article = dynamic(() => import(`../../../articles/${game}/${article}.js`), { ssr: false });

    return <Article />
}

export async function getStaticProps({params}) {
    const {article, game} = params;
    return {
        props: {
            article,
            game
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
                    article: article.replace(/\.js$/, '')
                }
            }
        })
    }));
    // concatenate all the paths
    const paths = resultingPaths.reduce((acc, curr) => acc.concat(curr), []);
    return {paths, fallback: false};
}