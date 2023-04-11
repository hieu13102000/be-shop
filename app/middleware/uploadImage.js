const multer = require('multer');
const path = require('path');

// Tạo middleware upload image
const uploadImage = (req, res, next) => {
    // Khởi tạo Multer
    const upload = multer({
        storage: multer.memoryStorage(),
        // limits: {
        //     fileSize: 5 * 1024 * 1024 // giới hạn dung lượng 5MB
        // },
        fileFilter: (req, file, cb) => {
            // Kiểm tra định dạng file có phải là ảnh hay không
            const filetypes = /jpeg|jpg|png/;
            const extname = filetypes.test(
                path.extname(file.originalname).toLowerCase()
            );
            const mimetype = filetypes.test(file.mimetype);
            if (mimetype && extname) {
                cb(null, true);
            } else {
                res.status(400).json({
                    message: 'Malformed image (jpeg or jpg or png )',
                });
            }
        }
    }).single('fileImage');
    // Gọi middleware upload ảnh
    upload(req, res, (err) => {
        if (err) {
            next(err);
        } else {
            next();
        }
    });
};

module.exports = uploadImage;