import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const db_adress = process.env.MONGODB_URI;

const connectDb = (handler) => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        return handler(req, res);
    }
    await mongoose
        .connect(db_adress, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('Connexion à MongoDB réussie !'))
        .catch(() => console.log('Connexion à MongoDB échouée !'));
    return handler(req, res);
};

export default connectDb;
