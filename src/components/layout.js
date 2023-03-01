import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import Link from 'next/link';

export const siteTitle = 'M2i JobDating';

export default function Layout({ children, home }) {
    function toggleDarkMode() {
        document.querySelector('html').classList.toggle('dark-mode');
    }

    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <title>{siteTitle}</title>
                <meta
                    name="description"
                    content="Learn how to build a personal website using Next.js"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            <header className={styles.header}>
                <Image
                    className={styles.logo_m2i}
                    src="/images/m2iLogo.png"
                    height={50}
                    width={50}
                    alt="logoM2i"
                />
                {!home ? (
                    <div className={styles.backToHome}>
                        <Link href="/">← Retour accueil</Link>
                    </div>
                ) : (
                    <svg
                        className={styles.svg_night}
                        onClick={() => toggleDarkMode()}
                        width="28"
                        height="28"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M18.25 15.75c-1.015.54-2.02.5-3.25.5A7.25 7.25 0 0 1 7.75 9c0-1.23-.04-2.235.5-3.25-2.289 1.219-3.5 3.476-3.5 6.25A7.25 7.25 0 0 0 12 19.25c2.774 0 5.031-1.211 6.25-3.5Z"></path>
                        <path d="M16 4.75C16 6.96 14.96 9 12.75 9 14.96 9 16 11.04 16 13.25 16 11.04 17.04 9 19.25 9 17.04 9 16 6.96 16 4.75Z"></path>
                    </svg>
                )}
            </header>
            <main className={styles.main_container}>{children}</main>
            <footer className={styles.layout_footer}>
                <Image
                    className={styles.logo_m2i}
                    src="/images/m2ilogo2.png"
                    height={50}
                    width={50}
                    alt="logoM2i2"
                />
                <div className={styles.footer_text}>
                    M2i, leader de la formation IT, Digital et Management depuis
                    plus de 30 ans, propose plus de 2 500 cursus disponibles en
                    présentiel partout en France, et à distance ou en
                    e-Learning.
                </div>
            </footer>
        </div>
    );
}
