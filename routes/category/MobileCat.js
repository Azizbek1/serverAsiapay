const express = require("express");
const mobileCatController = require("../../controller/mobileCatController");
const router = express.Router();


router.post('/add/sum', mobileCatController.paymetAdd)
router.post('/add/mobile', mobileCatController.mobileCat)
router.post('/add/number', mobileCatController.numberAdd)



module.exports = router;