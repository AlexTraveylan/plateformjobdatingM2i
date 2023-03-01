import StudentCard from '@/components/studentCard';
import StudentForm from '@/components/StudentForm';
import { useEffect, useState } from 'react';
import styles from '../../styles/Students.module.css';
import Layout from '../../components/layout';

export default function Students() {
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isForm, setIsForm] = useState(false);

    function refresh() {
        fetchStudents().then(() => setIsLoading(false));
    }

    function toogleIsForm() {
        if (isForm) {
            setIsForm(false);
        } else {
            setIsForm(true);
        }
    }

    async function fetchStudents() {
        setIsLoading(true);
        const response = await fetch('/api/students');
        const data = await response.json();
        setStudents(data);
    }

    useEffect(() => {
        refresh();
    }, []);

    return (
        <Layout home={false}>
            <h1 className={styles.title}>
                Liste des étudiants M2i présent le Jeudi 2 mars 2023
            </h1>
            {isLoading ? (
                <div>Loading ...</div>
            ) : (
                <div className={styles.student_list}>
                    {students.map(({ _id, title, name, firstName, img }) => {
                        return (
                            <div key={_id}>
                                <StudentCard
                                    _id={_id}
                                    title={title}
                                    name={name}
                                    firstName={firstName}
                                    img={img}
                                    refresh={refresh}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
            <div
                className={styles.plus_container}
                onClick={() => toogleIsForm()}
            >
                <svg
                    width="54"
                    height="54"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M12 5.75v12.5"></path>
                    <path d="M18.25 12H5.75"></path>
                </svg>
                <p className={styles.message_add_btn}>Rajoutez vous</p>
            </div>

            {isForm ? (
                <div className={styles.form_container}>
                    <h1 className={styles.title}>
                        Formulaire pour créer un nouvel étudiant
                    </h1>
                    <StudentForm refresh={refresh} setIsForm={setIsForm} />
                </div>
            ) : (
                <></>
            )}
        </Layout>
    );
}
