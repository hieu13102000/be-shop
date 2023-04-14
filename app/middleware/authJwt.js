const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
    }

    return res.sendStatus(401).send({ message: "Unauthorized!" });
}

verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    // remove the "Bearer " prefix from the token (if present)
    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return catchError(err, res);
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        const roles = await user.getRoles();

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].roleName === "admin") {
                return next();
            }
        }

        return res.status(403).send({
            message: "Require Admin Role!",
        });
    } catch (error) {
        return res.status(500).send({
            message: "Unable to validate User role!",
        });
    }
};

isSuperAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        const roles = await user.getRoles();

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].roleName === "superAdmin") {
                return next();
            }
        }

        return res.status(403).send({
            message: "Require SuperAdmin Role!",
        });
    } catch (error) {
        return res.status(500).send({
            message: "Unable to validate SuperAdmin role!",
        });
    }
};

isSuperAdminOrAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        const roles = await user.getRoles();

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].roleName === "superAdmin") {
                return next();
            }

            if (roles[i].roleName === "admin") {
                return next();
            }
        }

        return res.status(403).send({
            message: "Require superAdmin or Admin Role!",
        });
    } catch (error) {
        return res.status(500).send({
            message: "Unable to validate superAdmin or Admin role!",
        });
    }
};

const authJwt = {
    verifyToken,
    isAdmin,
    isSuperAdmin,
    isSuperAdminOrAdmin,
};
module.exports = authJwt;