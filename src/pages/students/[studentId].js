import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../styles/StudentsId.module.css';
import Layout from '../../components/layout';

export default function studentDetail() {
    const router = useRouter();
    const { studentId } = router.query;

    const [student, setStudent] = useState(null);

    useEffect(() => {
        async function fetchStudentById(_id) {
            const response = await fetch(`/api/students/${_id}`);
            const stud = await response.json();
            setStudent(stud);
        }
        if (studentId) {
            fetchStudentById(studentId);
        }
    }, [studentId]);

    if (!student) {
        return <div>Loading ...</div>;
    } else {
        return (
            <Layout home={false}>
                <Link href="/students">← Retour liste</Link>
                <div className={styles.intro_detail_student}>
                    <h1>{student.title}</h1>
                    <div className={styles.nom_prenom}>
                        <p>Nom : {student.name}</p>
                        <p>Prénom : {student.firstName}</p>
                    </div>
                    <div className={styles.right}>
                        {student.technologies.map((tech) => {
                            return <div key={tech}>{tech}</div>;
                        })}
                    </div>
                </div>
                <div className={styles.detail_student_container}>
                    <div className={styles.left}>
                        <img
                            src={student.img}
                            alt={`photo de ${student.name}`}
                            width={350}
                        />
                        <p>
                            Lien vers le CV :{' '}
                            <Link
                                className={styles.detail_link_cv}
                                href={student.cv}
                            >
                                Ici
                            </Link>
                        </p>
                    </div>
                </div>
            </Layout>
        );
    }
}
