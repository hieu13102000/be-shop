const db = require("../models");
// import model
const Product = db.products;
const Brand = db.brand;
const Category = db.category;
const Op = db.Sequelize.Op;

const { check, validationResult } = require('express-validator');

// Create and Save a new Product
exports.create = [
  // validate request using express-validator
  check('name').notEmpty().withMessage('Name cannot be empty.'),
  check('price').notEmpty().isNumeric().withMessage('Price must be a number.'),
  check('image').notEmpty().isURL().withMessage('Image must be a valid URL.'),
  check('madeIn').notEmpty().withMessage('Made in cannot be empty.'),
  check('brandId').notEmpty().withMessage('BrandId cannot be empty.'),
  // handle request
  (req, res) => {
    // check validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // create a product
    const product = {
      productName: req.body.name,
      productSaleOff: req.body.saleOff,
      productOldPrice: req.body.price,
      productPrice: (req.body.price * (100 - req.body.saleOff) / 100).toFixed(2),
      productImage: req.body.image,
      productMadeIn: req.body.madeIn,
      brandId: req.body.brandId,
      categoryId: req.body.categoryId,
    };

    // save product in the database
    Product.create(product)
      .then(data => {
        res.status(200).send({
          message: `Created the Product id:${data.productId} successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Product."
        });
      });
  }
];

// get list Products from the database.
exports.getListProducts = (req, res) => {
  const name = req.query.name;
  const brand = req.query.brand;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  // search query by productName or brandName
  const condition = {};
  if (name) {
    condition.productName = { [Op.like]: `%${name}%` };
  }
  if (brand) {
    condition['$brand.brandName$'] = { [Op.eq]: brand };
  }

  Product.findAndCountAll({
    where: condition,
    include: [{
      model: Brand,
      attributes: ['brandName']
    }, {
      model: Category,
      attributes: ['categoryName']
    }],
    limit: limit,
    offset: offset
  })
    .then(data => {
      const currentData = data.rows.map(product => {
        return {
          productId: product.productId,
          productName: product.productName,
          productPrice: product.productPrice,
          productOldPrice: product.productOldPrice,
          productImage: product.productImage,
          productMadeIn: product.productMadeIn,
          productSaleOff: product.productSaleOff,
          brandName: product.brand ? product.brand.brandName : null,
          categoryName: product.category ? product.category.categoryName : null,
        };
      });
      const totalItems = data.count;
      const totalPages = Math.ceil(totalItems / limit);

      res.status(200).send({
        data: currentData,
        currentPage: page,
        limit: limit,
        totalItems: totalItems,
        totalPages: totalPages,
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products."
      });
    });
};

// get detail Product from the database.
exports.getDetailProduct = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id, {
    include: [{ model: Brand }, { model: Category }]
  })
    .then(data => {
      if (data) {
        const currentData = {
          productId: data.productId,
          productName: data.productName,
          productPrice: data.productPrice,
          productOldPrice: data.productOldPrice,
          productSaleOff: data.productSaleOff,
          productImage: data.productImage,
          productMadeIn: data.productMadeIn,
          brand: data.brand ? {
            "brandId": data.brand.brandId,
            "brandName": data.brand.brandName
          } : null,
          category: data.category ? {
            "categoryId": data.category.categoryId,
            "categoryName": data.category.categoryName
          } : null,
        };
        res.status(200).send(currentData);
      } else {
        res.status(404).send({
          message: `Cannot find Product with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Product with id=" + id
      });
    });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const product = {
    productName: req.body.name,
    productImage: req.body.image,
    productMadeIn: req.body.madeIn,
    productSaleOff: req.body.saleOff,
    productOldPrice: req.body.price,
    productPrice: (req.body.price * (100 - req.body.saleOff) / 100).toFixed(2),
    brandId: req.body.brandId,
    categoryId: req.body.categoryId,
  };
  Product.update(product, {
    where: { productId: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "Product was updated successfully."
        });
      } else {
        res.status(400).send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product with id=" + id
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { productId: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "Product was deleted successfully!"
        });
      } else {
        res.status(400).send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id
      });
    });
};

// Delete Products from the database.
exports.deleteAll = (req, res) => {
  const ids = req.body.productIds; // Assuming an array of productIds is sent in the request body
  Product.destroy({
    where: { productId: ids },
  })
    .then(nums => {
      res.status(200).send({ message: `${nums} Products were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Products."
      });
    });
};

