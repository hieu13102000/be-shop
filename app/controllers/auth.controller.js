const db = require("../models");
const config = require("../config/auth.config");
const { user: User, role: Role, refreshToken: RefreshToken } = db;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        userName: req.body.username,
        userEmail: req.body.email,
        userPassword: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        roleName: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        res.send({ message: "User was registered successfully!" });
                    });
                });
            } else {
                // user role = 1
                user.setRoles([1]).then(() => {
                    res.send({ message: "User was registered successfully!" });
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            userName: req.body.username
        }
    })
        .then(async (user) => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.userPassword
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    message: "Invalid Password!"
                });
            }

            const token = jwt.sign({ id: user.userId }, config.secret, {
                expiresIn: config.jwtExpiration
            });

            let refreshToken = await RefreshToken.createToken(user);

            let authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push(roles[i].roleName);
                }

                res.status(200).send({
                    userId: user.userId,
                    username: user.userName,
                    email: user.userEmail,
                    roles: authorities,
                    accessToken: token,
                    refreshToken: refreshToken,
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({
            message: "You've been signed out!"
        });
    } catch (err) {
        this.next(err);
    }
};

exports.refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body;

    if (requestToken == null) {
        return res.status(403).json({ message: "Refresh Token is required!" });
    }

    try {
        let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });

        if (!refreshToken) {
            res.status(403).json({ message: "Refresh token is not in database!" });
            return;
        }

        if (RefreshToken.verifyExpiration(refreshToken)) {
            RefreshToken.destroy({ where: { id: refreshToken.id } });

            res.status(403).json({
                message: "Refresh token was expired. Please make a new signin request",
            });
            return;
        }

        const user = await refreshToken.getUser();
        let newAccessToken = jwt.sign({ id: user.userId }, config.secret, {
            expiresIn: config.jwtExpiration,
        });

        return res.status(200).json({
            accessToken: newAccessToken,
        });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};