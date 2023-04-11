const { authJwt, uploadImage, uploadVideo } = require("../middleware");
const file = require("../controllers/upload.controller");

var router = require("express").Router();

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    // Api upload new image   
    router.post("/upload-image", [authJwt.verifyToken, uploadImage], file.upload("images"));
    // Api upload new video  
    router.post("/upload-video", [authJwt.verifyToken, uploadVideo], file.upload("videos"));

    app.use('/', router);
};