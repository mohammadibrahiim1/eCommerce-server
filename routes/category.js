const express = require("express");
const mongoose = require("mongoose");
const { createCategory } = require("../controllers/categoryController");

const router = express.Router();

router.post("/categories", createCategory);

module.exports = router;
