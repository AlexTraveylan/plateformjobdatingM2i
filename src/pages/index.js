import Link from 'next/link';
import Layout from '../components/layout';
import styles from '../styles/Home.module.css';

export default function Home() {
    return (
        <Layout home>
            <div className={styles.home_container}>
                <h1>JOB DATING</h1>
                <h2>DEVELOPPEUR</h2>
                <h2>C# .NET</h2>
                <div className={styles.btn_go_to_students}>
                    <Link href="/students">Liste des étudiants</Link>
                </div>
            </div>
        </Layout>
    );
}
