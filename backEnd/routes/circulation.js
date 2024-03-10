const express = require("express");
const circulationController = require("../controllers/circulationController")
const router = express.Router();

router.post("/bookcirculation",circulationController.bookCirculation);

module.exports = router