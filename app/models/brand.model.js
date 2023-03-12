module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define("brands", {
        barandId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        brandName: {
            type: DataTypes.STRING
        }
    });
    return Brand;
};