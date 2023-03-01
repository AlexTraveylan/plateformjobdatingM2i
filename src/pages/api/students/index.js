import connectDb from '../../../data/db';
import Student from '../../../models/Student';
import upload from '../../../middlewares/upload';

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const students = await Student.find({});
            res.status(200).json(students);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else if (req.method === 'POST') {
        try {
            upload.any()(req, res, async (err) => {
                // A SUPPR
                console.log(
                    'données recues : ',
                    req.body.title,
                    req.body.name,
                    req.body.firstname,
                    req.body.technologies
                );
                console.log('fichiers ?', req.files.fielname);
                if (err) {
                    console.error(err);
                    res.status(400).json({ error: 'Error uploading file.' });
                } else {
                    const { title, name, firstName, technologies } = req.body;
                    const techArray = JSON.parse(technologies);
                    const img = req.files.find(
                        (file) => file.fieldname === 'img'
                    );
                    const cv = req.files.find(
                        (file) => file.fieldname === 'cv'
                    );

                    // A SUPPR
                    console.log({ title, name, firstName, techArray });
                    const newStudent = new Student({
                        title: title,
                        name: name,
                        firstName: firstName,
                        img: img
                            ? `/documents/${img.filename}`
                            : '/images/profile.jpg',
                        cv: cv
                            ? `/documents/${cv.filename}`
                            : '/documents/cv.pdf',
                        technologies: techArray,
                    });
                    console.log(newStudent);

                    const savedStudent = await newStudent.save();
                    res.status(201).json(savedStudent);
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error.' });
        }
    } else {
        res.status(400).json({ message: 'Invalid request method' });
    }
};

export default connectDb(handler);
