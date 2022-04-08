const express = require("express");
const {upload} = require('../../helper/uloadImage');
const menuConttroller = require("../../controller/mainController");
const auth = require("../../middleware/auth");
const authAdmin = require("../../middleware/adminAuth");
const router = express.Router();


// MainController
// card 
router.post('/create',auth, authAdmin, upload.single('file'), menuConttroller.CreateCard)
router.get('/delete/:id',auth, authAdmin, menuConttroller.DeleteCard)
router.get('/list', menuConttroller.ListCadr)
router.put('/update/:id',auth, authAdmin, upload.single('file'), menuConttroller.UpdateCard)


module.exports = router;