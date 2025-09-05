const express = require("express");

const router = express.Router();

const NguyenLieuController = require("../app/controllers/NguyenLieuController");
// coffeeController.index
router.use("/", NguyenLieuController.index);

module.exports = router;
