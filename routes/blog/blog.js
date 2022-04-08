const express = require("express");
const {upload} = require('../../helper/uloadImage');
const blogConttroller = require("../../controller/blogController");
const authAdmin = require("../../middleware/adminAuth");
const auth = require("../../middleware/auth");
const router = express.Router();


// blogConttroller
// Title
router.post('/create/title', auth, authAdmin, blogConttroller.CreateTitle)
router.delete('/delete/title/:id',auth, authAdmin, blogConttroller.DeleteTitle)
router.put('/edit/title/:id',auth, authAdmin, blogConttroller.UpdateTitle)
router.get('/list/title', blogConttroller.ListTitle)
// router.get('/list' )


// Card 
router.post('/create/card',auth, authAdmin, upload.single('file'), blogConttroller.CreateCard)
router.delete('/delete/card/:id',auth, authAdmin, blogConttroller.DeleteCard)
router.get('/list/card', blogConttroller.ListCard)
router.put('/update/card/:id',auth, authAdmin, upload.single('file'), blogConttroller.UpdateBlog)






module.exports = router;