module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("products", {
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    productName: {
      type: DataTypes.STRING,
    },
    productOldPrice: {
      type: DataTypes.FLOAT
    },
    productPrice: {
      type: DataTypes.FLOAT
    },
    productImage: {
      type: DataTypes.TEXT
    },
    productMadeIn: {
      type: DataTypes.STRING
    },
    productSaleOff: {
      type: DataTypes.INTEGER
    },
    productSex: {
      type: DataTypes.STRING
    },
    productColor: {
      type: DataTypes.STRING
    },
  });
  return Product;
};