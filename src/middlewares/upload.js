import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(process.cwd(), 'public', 'documents');
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(
            null,
            `${file.fieldname}-${uniqueSuffix}${path.extname(
                file.originalname.replace(/ /g, '_')
            )}`
        );
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (
            ext !== '.pdf' &&
            ext !== '.png' &&
            ext !== '.jpg' &&
            ext !== '.jpeg'
        ) {
            cb(new Error('File type is not supported.'), false);
            return;
        }
        cb(null, true);
    },
});

export default upload;
