module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      name: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.FLOAT
      },
      image: {
        type: Sequelize.STRING
      },
      madeIn: {
        type: Sequelize.STRING
      },
      brand: {
        type: Sequelize.STRING
      }
    });
    return Product;
  };