const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: "images/",
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + "_" + file.originalname)
    }
})

const uploder = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const suportedImage = /jpg|png/;
        const extension = path.extname(file.originalname)

        if (suportedImage.test(extension)) {
            cb(null, true);
        } else {
            cb(new Error('Must bd png or jpg image'))

        }
    },
    limit: {
        fileSize: 5000000,
    }

})
module.exports = uploder