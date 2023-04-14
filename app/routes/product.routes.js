const { authJwt } = require("../middleware");
const products = require("../controllers/product.controller.js");
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
  router.post("/create-product", [authJwt.verifyToken, authJwt.isSuperAdminOrAdmin], products.create);

  // Api get list Product
  router.get("/list-product", products.getListProducts);

  // Api get detail Product
  router.get("/detail-product/:id", products.getDetailProduct);

  // Api update a Product with id
  router.put("/update-product/:id", [authJwt.verifyToken, authJwt.isSuperAdminOrAdmin], products.update);

  // Api delete a Product with id
  router.delete("/delete-product/:id", [authJwt.verifyToken, authJwt.isSuperAdminOrAdmin], products.delete);

  // Api delete many products
  router.delete("/delete-products", [authJwt.verifyToken, authJwt.isSuperAdminOrAdmin], products.deleteAll);

  app.use('/', router);
};