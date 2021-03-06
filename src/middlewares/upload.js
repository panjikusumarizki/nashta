const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads');
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    fileFilter (req, file, cb) {
        if (file.mimetype.includes('excel') ||
            file.mimetype.includes('spreadsheetml')) {
            cb(null, true);
        } else {
            cb('File type must be xls or xlsx');
        }
    }
});

module.exports = upload;