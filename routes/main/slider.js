const express = require("express");
const {upload} = require('../../helper/uloadImage');
const menuConttroller = require("../../controller/mainController")
const router = express.Router();
const authAdmin = require('../../middleware/adminAuth')
const auth = require('../../middleware/auth')

// MainController
// Slider 
router.post('/create', auth, authAdmin,  upload.single('file'), menuConttroller.CreateSlider)
router.get('/list',  menuConttroller.ListSlider)
router.delete('/delete/:id', auth, authAdmin, menuConttroller.DeleteSlider)
router.put('/update/:id', auth, authAdmin, upload.single('file'), menuConttroller.UpdateSlider)
// Get - list




module.exports = router;