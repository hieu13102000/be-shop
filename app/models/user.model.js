module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userName: {
            type: DataTypes.STRING
        },
        userEmail: {
            type: DataTypes.STRING
        },
        userPassword: {
            type: DataTypes.STRING
        }
    });

    return User;
};