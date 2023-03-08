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

  // Create a new Product
  router.post("/", [authJwt.verifyToken, authJwt.isModeratorOrAdmin], products.create);

  // Retrieve all Products
  router.get("/", products.findAll);

  // Retrieve a single Product with id
  router.get("/:id", products.findOne);

  // Update a Product with id
  router.put("/:id", [authJwt.verifyToken, authJwt.isModeratorOrAdmin], products.update);

  // Delete a Product with id
  router.delete("/:id", [authJwt.verifyToken, authJwt.isModeratorOrAdmin], products.delete);

  // Delete all products
  router.delete("/", [authJwt.verifyToken, authJwt.isModeratorOrAdmin], products.deleteAll);

  app.use('/api/products', router);
};