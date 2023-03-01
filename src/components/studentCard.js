import Link from 'next/link';
import styles from './studentCard.module.css';

export default function StudentCard({
    _id,
    title,
    name,
    firstName,
    img,
    refresh,
}) {
    async function deleteStudentById(studentId) {
        const isConfirm = confirm(
            'Êtes-vous sûr de vouloir supprimer ce profil ?'
        );
        if (isConfirm) {
            try {
                await fetch(`api/students/${studentId}`, { method: 'DELETE' });
                refresh();
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        } else {
            console.log('Suppression annulée');
        }
    }

    return (
        <div className={styles.student_card_container}>
            <p>{title}</p>
            <p>
                {name.toUpperCase()} {firstName}
            </p>
            <Link href={`/students/${_id}`}>
                <img src={img} alt={`image de ${name}`} width={144} />
            </Link>
            <div className={styles.btn_supp_container}>
                <svg
                    onClick={() => deleteStudentById(_id)}
                    className={styles.svg_trash}
                    width="35"
                    height="35"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="m6.75 7.75.841 9.673a2 2 0 0 0 1.993 1.827h4.832a2 2 0 0 0 1.993-1.827l.841-9.673"></path>
                    <path d="M9.75 7.5v-.75a2 2 0 0 1 2-2h.5a2 2 0 0 1 2 2v.75"></path>
                    <path d="M5 7.75h14"></path>
                </svg>
                <span className={styles.span_supp}>Supprimer</span>
            </div>
        </div>
    );
}
