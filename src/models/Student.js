import mongoose from 'mongoose';

const { Schema } = mongoose;

const StudentSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    cv: {
        type: String,
        required: true,
    },
    technologies: {
        type: [String],
        required: true,
    },
});

const Student =
    mongoose.models.Student || mongoose.model('Student', StudentSchema);

export default Student;
