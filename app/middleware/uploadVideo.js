const multer = require('multer');
const path = require('path');

const uploadVideo = (req, res, next) => {
    // Khởi tạo Multer
    const upload = multer({
        storage: multer.memoryStorage(),
        fileFilter: (req, file, cb) => {
            // Kiểm tra định dạng file có phải là video hay không
            const filetypes = /mp4|mov|avi/;
            const extname = filetypes.test(
                path.extname(file.originalname).toLowerCase()
            );
            const mimetype = filetypes.test(file.mimetype);
            if (mimetype && extname) {
                cb(null, true);
            } else {
                res.status(400).json({
                    message: 'Malformed video (mp4 or mov or avi )',
                });
            }
        }
    }).single('fileVideo');
    // Gọi middleware upload video
    upload(req, res, (err) => {
        if (err) {
            res.status(400).json({
                message: 'Incorrect input parameter',
            });
        } else {
            next();
        }
    });
};

module.exports = uploadVideo;
