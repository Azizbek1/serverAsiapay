const express = require("express");
const router = express.Router();
const User = require("../../model/User");
const bcrypt = require("bcrypt");
const multer = require('multer');
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");


const { register, login, requireSignin, read, update, adminMiddleware, deleteUser } = require("../../controller/user");

// ====== Multer ======
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'imagesuploads/users');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});
const filefilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg'
    || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({ storage: storage, fileFilter: filefilter });




/* GET users listing. */
router.get("/users", async function (req, res, next) {
  try {
    const users = await User.find();
    res.status(200).send(users)
  } catch (error) {
    res.status(400).send(error.message)
  }
});

router.post("/login", [
  check("email", "Поле не должен быть пустым!").isEmail(),
  check("password", "Пароль должен быть меньше 5 и болше 15").isLength({ min: 5, max: 15 }),
], login);

router.post("/register", [
  check("email", "Поле не должен быть пустым!").isEmail(),
  check("name", "Поле не должен быть пустым!").notEmpty(),
  check("password", "Пароль должен быть меньше 5 и болше 15").isLength({ min: 5, max: 15 }),
], upload.single('file'), register
);

router.get('/user/:id',  read);
router.delete('/user/:id',  deleteUser);
router.put('/user/update',  upload.single('file'), update);
router.put('/admin/update',  upload.single('file'), adminMiddleware, update);



module.exports = router;