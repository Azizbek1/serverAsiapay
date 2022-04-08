const express = require("express");
const vakanceController = require("../../controller/vakanceController");
const authAdmin = require("../../middleware/adminAuth");
const auth = require("../../middleware/auth");
const router = express.Router();

// Vakance
router.post('/create', auth, authAdmin, vakanceController.vakanceAdd);
router.put('/update/:id', auth, authAdmin,vakanceController.vakanceUpdate)
router.get('/delete/:id',auth, authAdmin, vakanceController.vakanceDelete);
router.get('/list', vakanceController.vakanceList);

module.exports = router;


