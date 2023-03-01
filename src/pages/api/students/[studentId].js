import connectDb from '../../../data/db';
import Student from '../../../models/Student';
import { promises as fs } from 'fs';
import path from 'path';

const handler = async (req, res) => {
    const { studentId } = req.query;

    switch (req.method) {
        case 'GET':
            try {
                const student = await Student.findById(studentId);
                if (!student) {
                    res.status(404).json({
                        message: `Student with id ${studentId} not found`,
                    });
                } else {
                    res.status(200).json(student);
                }
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
            break;
        case 'PUT':
            res.status(401).json({
                message: "You can't do it, delete and create a new student.",
            });
            break;
        case 'DELETE':
            try {
                const student = await Student.findByIdAndDelete(studentId);

                if (!student) {
                    res.status(404).json({
                        message: `Student with id ${studentId} not found`,
                    });
                }

                const imgPath = path.join(process.cwd(), 'public', student.img);
                const cvPath = path.join(process.cwd(), 'public', student.cv);

                fs.unlink(imgPath);
                fs.unlink(cvPath);

                return res.status(200).json({
                    message: `Student n°${studentId} as been deleted with succes.`,
                });
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
            break;
        default:
            res.status(400).json({ message: 'Invalid request method' });
            break;
    }
};

export default connectDb(handler);
