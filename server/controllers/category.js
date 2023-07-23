const Category = require("../models/category");

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().populate("products");
    res.status(200).json({ message: "success", data: categories });
  } catch (err) {
    const error = new Error("Fetching categories failed.");
    error.statusCode = 404;
    next(error);
  }
};
exports.getSingleCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  try {
    const category = await Category.findById(categoryId);
    res.status(200).json({ message: "success", data: category });
  } catch (err) {
    const error = new Error("Something went wrong");
    error.statusCode = 404;
    next(error);
  }
};
exports.getSingleCategoryProduction = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  try {
    const category = await Category.findById(categoryId).populate();
    res.status(200).json({ message: "success", data: category });
  } catch (err) {
    const error = new Error("Something went wrong");
    error.statusCode = 404;
    next(error);
  }
};
