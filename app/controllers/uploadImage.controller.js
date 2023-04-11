const { storage } = require('../config/firebase.config');

const uploadImage = async (req, res, next) => {
    try {
        if (!req.file) {
            res.status(400).json({ message: 'No file uploaded!' });
            return;
        }
        const file = req.file;

        const bucket = storage.bucket();

        const blob = bucket.file(file.originalname);

        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });

        blobStream.on('error', (error) => {
            next(error);
        });

        blobStream.on('finish', () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            res.status(200).json({
                message: "Photo upload successfully!",
                imageUrl: publicUrl
            });
        });

        blobStream.end(file.buffer);
    } catch (error) {
        next(error);
    }
};

module.exports = { uploadImage };
