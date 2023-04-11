const { storage } = require('../config/firebase.config');

const upload = (typeFile = "images") => {
    return async (req, res, next) => {
        try {
            if (!req.file) {
                res.status(400).json({ message: `No file ${typeFile} uploaded!` });
                return;
            }
            const file = req.file;

            const bucket = storage.bucket();

            const blob = bucket.file(`${typeFile}/file.originalname`);

            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                },
            });

            blobStream.on('error', (error) => {
                next(error);
            });

            blobStream.on('finish', async () => {
                try {
                    const [publicUrl] = await blob.getSignedUrl({
                        action: 'read',
                        expires: '03-09-2491', // Thời gian hết hạn URL
                    });
                    const newStr = typeFile.charAt(0).toUpperCase() + typeFile.slice(1);
                    res.status(200).json({
                        message: `${newStr} uploaded successfully!`,
                        imageUrl: publicUrl,
                    });
                } catch (error) {
                    next(error);
                }
            });

            blobStream.end(file.buffer);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = { upload };
