const express = require("express");
const categoryController = require("../controllers/category");
const router = express.Router();

//TODO: GET ALL CATEGORIES
router.get("/",categoryController.getAllCategories )


//TODO: GET SINGLE CATEGORIES
router.get("/:id",categoryController.getSingleCategory )


module.exports = router;
