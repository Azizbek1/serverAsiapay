const express = require("express");
const contactController = require("../../controller/contactController");
const { upload } = require("../../helper/uloadImage");
const authAdmin = require("../../middleware/adminAuth");
const auth = require("../../middleware/auth");
const router = express.Router();
 
// Contact
router.post('/create',auth, authAdmin, upload.single('file'), contactController.contactAdd)
router.get('/delete/:id',auth, authAdmin, contactController.contactDelete)
router.put('/update/:id',auth, authAdmin, upload.single('file'), contactController.contactUpdate)
router.get('/list', contactController.contactList)

module.exports = router;


