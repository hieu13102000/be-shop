module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("categorys", {
        categoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        categoryName: {
            type: DataTypes.STRING,
        },
        categoryStatus: {
            type: DataTypes.STRING
        }
    });
    return Category;
};