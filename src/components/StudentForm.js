import { useState } from 'react';
import styles from './StudentForm.module.css';
import 'formdata-polyfill';

export default function StudentForm({ refresh, setIsForm }) {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [firstName, setFirstName] = useState('');
    const [img, setImg] = useState(null);
    const [cv, setCv] = useState(null);
    const [technologies, setTechnologies] = useState(['']);

    // fonction pour gérer la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('title', title);
        formData.append('firstName', firstName);
        formData.append('img', img);
        formData.append('cv', cv);
        formData.append('technologies', JSON.stringify(technologies));

        // A SUPPR
        console.log(formData);

        try {
            const response = await fetch('/api/students', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setName('');
                setTitle('');
                setFirstName('');
                setImg(null);
                setCv(null);
                setTechnologies(['']);
                refresh();
                setIsForm(false);
                event.target.reset();
            } else {
                console.error('Erreur lors de la création du student');
            }
        } catch (error) {
            console.error('Erreur lors de la création du student', error);
        }
    };

    const handleTechnologiesChange = (e, index) => {
        const newTechnologies = [...technologies];
        newTechnologies[index] = e.target.value;
        setTechnologies(newTechnologies);
    };

    const handleAddTechnologies = () => {
        setTechnologies([...technologies, '']);
    };

    return (
        <form className={styles.form_container} onSubmit={handleSubmit}>
            <div className={styles.form_field}>
                <label htmlFor="title" className={styles.label_form}>
                    Titre :
                </label>
                <input
                    className={styles.input_text}
                    type="text"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex : Développeur C# full stack"
                    required
                />
            </div>

            <div className={styles.form_field}>
                <label htmlFor="name" className={styles.label_form}>
                    Nom :
                </label>
                <input
                    className={styles.input_text}
                    type="text"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex : DOH"
                    required
                />
            </div>

            <div className={styles.form_field}>
                <label htmlFor="firstname" className={styles.label_form}>
                    Prénom :
                </label>
                <input
                    className={styles.input_text}
                    type="text"
                    name="firstname"
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Ex : John"
                    required
                />
            </div>

            <div className={styles.form_field}>
                <label htmlFor="img" className={styles.label_form}>
                    Image :
                </label>
                <input
                    className={styles.input_file}
                    type="file"
                    name="img"
                    onChange={(e) => setImg(e.target.files[0])}
                    accept="image/*"
                    required
                />
            </div>

            <div className={styles.form_field}>
                <label htmlFor="cv" className={styles.label_form}>
                    CV :
                </label>
                <input
                    className={styles.input_file}
                    type="file"
                    name="cv"
                    onChange={(e) => setCv(e.target.files[0])}
                    accept=".pdf"
                    required
                />
            </div>

            <div className={styles.form_field}>
                <label htmlFor="technologies" className={styles.label_form}>
                    Technologies:
                </label>
                {technologies.map((technology, index) => (
                    <div key={index}>
                        <input
                            className={styles.input_text_techno}
                            type="text"
                            name="technologies"
                            value={technology}
                            placeholder="Ex : C#"
                            onChange={(e) => handleTechnologiesChange(e, index)}
                        />
                    </div>
                ))}
                <div className={styles.btn_ajout_techno}>
                    <svg
                        className={styles.plus_svg}
                        onClick={handleAddTechnologies}
                        width="30"
                        height="30"
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
                    </svg>{' '}
                    <span>{'← Ajouter une techno'}</span>
                </div>
            </div>

            <div className={styles.btn_container}>
                <button className={styles.btn_submit} type="submit">
                    Envoyer
                </button>
            </div>
        </form>
    );
}
