const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.resolve("uploads"));
    },

    filename: (req, file, callback) => {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1; 
        const year = date.getFullYear();

        const formattedDate = `${month}-${day}-${year}`;
        callback(null, `${formattedDate}_${file.originalname}`);
    },
});

module.exports = storage;
