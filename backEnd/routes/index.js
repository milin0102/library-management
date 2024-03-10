const express = require("express");
const circulationRoutes = require("./circulation")
const overdueRoutes = require("./overdues")
const booksRoutes = require("./books")
const router = express.Router();

router.use("/v1/circulation",circulationRoutes);
router.use("/v1/dues",overdueRoutes);
router.use("/v1/books",booksRoutes)

module.exports = router
