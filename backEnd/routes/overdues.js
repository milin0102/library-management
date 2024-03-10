const express = require("express");
const overdueController = require("../controllers/overdueController")
const router = express.Router();

router.post("/getdues",overdueController.overDues);

module.exports = router