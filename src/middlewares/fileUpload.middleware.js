import multer from "multer";

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/files');
    },
    filename: (req, file, cb) => {
        const name = Date.now() + file.originalname;
        cb(null, name);
    },
})

// Creating multer instance
export const upload = multer({
    storage: storageConfig,
})