const express = require("express");
const categoryController = require("../controllers/category");
const router = express.Router();

//TODO: GET ALL CATEGORIES
//TESTED✅
router.get("/",categoryController.getAllCategories )


//TODO: GET SINGLE CATEGORIES
//TESTED✅
router.get("/:categoryId",categoryController.getSingleCategory )
router.get("/production/:categoryId",categoryController.getSingleCategoryProduction )


module.exports = router;
