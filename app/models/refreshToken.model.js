const config = require("../config/auth.config");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
    const RefreshToken = sequelize.define("refreshToken", {
        token: {
            type: DataTypes.STRING,
        },
        expiryDate: {
            type: DataTypes.DATE,
        },
    });

    RefreshToken.createToken = async function (user) {
        let expiredAt = new Date();

        expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

        let _token = uuidv4();

        let refreshToken = await this.create({
            token: _token,
            userId: user.userId,
            expiryDate: expiredAt.getTime(),
        });

        return refreshToken.token;
    };

    RefreshToken.verifyExpiration = (token) => {
        return token.expiryDate.getTime() < new Date().getTime();
    };

    return RefreshToken;
};
