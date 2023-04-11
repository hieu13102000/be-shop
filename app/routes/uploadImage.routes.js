const { authJwt } = require("../middleware");
const upload = require("../controllers/uploadImage.controller");
const uploadMiddleware = require('../middleware/uploadImage');
var router = require("express").Router();

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    // Api create a new Product   
    router.post("/upload-image", [authJwt.verifyToken, uploadMiddleware], upload.uploadImage);

    app.use('/', router);
};