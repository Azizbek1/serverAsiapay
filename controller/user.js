const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const fs = require('fs')
const User = require("../model/User");

exports.register = (req, res) => {
    try {
        const file = req.file
        if (file) {
            const { name, password, email } = req.body;
            User.findOne({ email }).exec((err, email) => {
                if (email) {
                    return res.status(400).json({
                        error: "электронная почта занята",
                    });
                }
            });
            const newUser = new User({
                image_path: req.file.path,
                image_name: req.file.originalname, name, password, email
            });
            newUser.save((err, success) => {
                if (err) {
                    return res.status(400).json({
                        error: err,
                    });
                }
                res.status(200).json({
                    message: `успешная регистрация ${success.email}`,
                    user: newUser,
                });
            });
        }
        else {
            try {
                const { name, password, email } = req.body;
                User.findOne({ email }).exec((err, email) => {
                    if (email) {
                        return res.status(400).json({
                            error: "электронная почта занята",
                        });
                    }
                });
                const newUser = new User({ name, password, email });
                newUser.save((err, success) => {
                    if (err) {
                        return res.status(401).json({
                            error: err,
                        });
                    }
                    res.status(200).json({
                        message: `успешная регистрация ${success.name}`,
                        user: newUser,
                    });
                });
            } catch (err) {
                console.log(err)
            }
        }
    } catch (err) {
        console.log(err);
    }

};
exports.login = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: `Некоректный запрос`, errors });
    }
    const { email, password } = req.body;
    User.findOne({ email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: `Пользователь с таким адресом электронной почты не существует. Пожалуйста, зарегистрируйтесь!`,
            });
        }
        // authenticate
        if (!user.authticate(password)) {
            return res.status(400).json({
                error: `пароль не совпадают!`,
            });
        }
        // generate a token and send to client
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });
        const { _id, name, email, role } = user;
        return res.status(200).json({
            token,
            user: { _id, name, email, role },
        });
    });
};


exports.adminMiddleware = (req, res, next) => {
    User.findById({ _id: req.user._id }).exec((err, user) => {
        if (err) {
            return res.status(404).json({
                error: "Ошибка обновления пользователя",
            });
        }
        if (user.role != "admin") {
            return res.status(404).json({
                error: "Админ ресурс. Доступ запрещен",
            });
        }
        req.profile = user;
        next();
    });
};

exports.read = (req, res, next) => {
    const userId = req.params.id
    User.findById(userId).exec((err, user) => {
        if (err || !user) {
            return res.status(404).json({
                error: 'User not found'
            })
        }
        if (user.image_name && user.image_name) {
            user.hashed_password = undefined
            user.salt = undefined
            res.statsus(200).json(user);
        } else {
            user.hashed_password = undefined
            user.salt = undefined
            res.status(200).json(user);
        }
    })
}

exports.update = async (req, res, next) => {
    const { name, password } = req.body
    const file = req.file
    if (file) {
        const UserId = await User.findOne({ _id: req.user._id });
        console.log(UserId);
        fs.unlinkSync(`./${UserId.image_path}`)
        await User.findOneAndUpdate({ _id: req.user._id }, {
            image_path: req.file.path, image_name: req.file.originalname
        })
        await User.findOne({ _id: req.user._id }, (err, user) => {
            if (err || !user) {
                return res.status(404).json({
                    error: 'Пользователь не найден'
                })
            }
            if (!name) {
                return res.status(404).json({
                    error: 'Укажите имя'
                })
            } else {
                user.name = name
            }
            if (password) {
                if (password.length < 6) {
                    return res.status(404).json({
                        error: 'Пароль должен состоять минимум из 6 символов'
                    })
                } else {
                    user.password = password
                }
            }
            user.save((err, updateUSer) => {
                if (err) {
                    return res.status(404).json({
                        error: 'Ошибка обновления пользователя'
                    })
                }
                updateUSer.hashed_password = undefined
                updateUSer.salt = undefined
                res.json({
                    updateUSer
                })
            })
        })
        res.json({ msg: "Updated a Slider" })
    } else {
        User.findOne({ _id: req.user._id }, (err, user) => {
            if (err || !user) {
                return res.status(404).json({
                    error: 'Пользователь не найден'
                })
            }
            if (!name) {
                return res.status(404).json({
                    error: 'Укажите имя'
                })
            } else {
                user.name = name
            }
            if (password) {
                if (password.length < 6) {
                    return res.status(404).json({
                        error: 'Пароль должен состоять минимум из 6 символов'
                    })
                } else {
                    user.password = password
                }
            }
            user.save((err, updateUSer) => {
                if (err) {
                    return res.status(404).json({
                        error: 'Ошибка обновления пользователя'
                    })
                }
                updateUSer.hashed_password = undefined
                updateUSer.salt = undefined
                res.json({
                    updateUSer
                })
            })
        })
    }


}

exports.deleteUser = async (req, res) => {
    const id = req.params.id
    // await User.findOneAndDelete({ _id: id }, function (err, data) {
    //     try {
    //         if (data.image_path && data.image_name) {
    //             if (!err) {
    //                 fs.unlinkSync(`./${data.image_path}`)
    //             } else {
    //                 console.log(err);
    //             }
    //         }
    //         res.send({ message: `Удалено` })
    //     } catch (err) {
    //         res.send({ message: `Ошибка` })
    //     }

    // })
     User.findOneAndDelete({ _id: id })
     .exec()
     .then((counter) => res.json({message: "Удалено"}))
     .catch((err) => next(err));
}
