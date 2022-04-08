const express = require("express");
const menuConttroller = require("../../controller/mainController");
const authAdmin = require("../../middleware/adminAuth");
const auth = require("../../middleware/auth");
const router = express.Router();


// MainController
// Menu
router.post('/create',auth, authAdmin, menuConttroller.CreateMenu)
router.get('/delete/:id',auth, authAdmin, menuConttroller.DeleteMenu)
router.get('/list', menuConttroller.ListMenu)
router.put('/edit/:id',auth, authAdmin, menuConttroller.UpdateMenu)






module.exports = router;