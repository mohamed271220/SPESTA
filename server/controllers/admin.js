const { validationResult } = require("express-validator");
const Product = require("../models/product");
const { default: mongoose } = require("mongoose");
const Admin = require("../models/admin");
const Category = require("../models/category");
const Tag = require("../models/tag");

//TODO PRODUCT CONTROLLERS
exports.addProduct = async (req, res, next) => {
  //     name
  // description
  // price
  // images
  // category
  // tag
  // addedBy
  const errors = validationResult(req);

  // if (!req.files) {
  //   const error = new Error("No Product images provided");
  //   error.statusCode = 422;
  //   throw error;
  // }
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const { name, description, price, images, category, tag } = req.body;
  const addedBy = req.userId;

  const product = new Product({
    name,
    description,
    price,
    addedBy,
    images:[],
    category,
    tag,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await product.save({ session: sess });
    const admin = await Admin.findById(addedBy);
    category.forEach(async (cat) => {
      const category = await Category.findById(cat);
      category.products.push(product);
    });
    tag.forEach(async (tagId) => {
      const tagItem = await Tag.findById(tagId);
      tagItem.products.push(product);
    });
    admin.addedProducts.push(product);
    await admin.save({ session: sess });
    await sess.commitTransaction();
    res.status(201).json({ message: "Product Added Successfully", product });
  } catch (err) {
    const error = new Error("could not add product "+err);
    error.statusCode = 500;
    return next(error);
  }
};

exports.editProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const errors = validationResult(req);
  // if (!req.files) {
  //   const error = new Error("No Product images provided");
  //   error.statusCode = 422;
  //   throw error;
  // }
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const { name, description, price, images, category, tag } = req.body;
  const addedBy = req.userId;

  //   const product = new Product({
  //     name,
  //     description,
  //     price,
  //     images,
  //     category,
  //     tag,
  //   });

  try {
    const product = await Product.findById(productId);
    if (!product) {
      const error = new Error("No Product Found");
      error.statusCode = 404;
      throw error;
    }
    // if(product.addedBy.toString() !== addedBy){
    //     const error = new Error("Not Authorized");
    //     error.statusCode = 403;
    //     throw error;
    // }
    product.name = name;
    product.description = description;
    product.price = price;
    product.images = images;
    product.category = category;
    product.tag = tag;

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await product.save({ session: sess });
    const admin = await Admin.findById(addedBy);
    category.forEach(async (cat) => {
      const category = await Category.findById(cat);
      category.products.push(product);
    });
    tag.forEach(async (tag) => {
      const tagItem = await Tag.findById(tag);
      tagItem.products.push(product);
    });
    admin.addedProducts.push(product);
    await admin.save({ session: sess });
    sess.commitTransaction();
    // await product.save();
    res.status(201).json({ message: "Edited product Successfully", product });
  } catch (err) {
    const error = new Error("Something went wrong");
    error.statusCode = 500;
    return next(error);
  }
};
exports.removeProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const product = await Product.findById(productId);
  try {
    if (!product) {
      const error = new Error("No Product Found");
      error.statusCode = 404;
      throw error;
    }
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await product.deleteOne({ session: sess });
    const admin = await Admin.findById(product.addedBy);
    admin.addedProducts.pull(product);
    await admin.save({ session: sess });
    sess.commitTransaction();
    res.status(200).json({ message: "Product Deleted Successfully" });
  } catch (err) {
    const error = new Error("Could not delete product");
    error.statusCode = 500;
    return next(error);
  }
};

//TODO CATEGORY CONTROLLERS
exports.addCategory = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    next(error);
  }
  const { name, image } = req.body;
  const addedBy = req.userId;
  const category = new Category({
    name,
    image,
    addedBy,
  });
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await category.save({ session: sess });
    const admin = await Admin.findById(addedBy);
    admin.addedCategories.push(category);
    await admin.save({ session: sess });
    sess.commitTransaction();
    res.status(201).json({ message: "Category Added Successfully", category });
  } catch (err) {
    const error = new Error("could not add category");
    error.statusCode = 500;
    return next(error);
  }
};

exports.removeCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const category = await Category.findById(categoryId);
  try {
    if (!category) {
      const error = new Error("No Category Found");
      error.statusCode = 404;
      throw error;
    }
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await category.deleteOne({ session: sess });
    const admin = await Admin.findById(category.addedBy);
    admin.addedCategories.pull(category);
    await admin.save({ session: sess });
    sess.commitTransaction();
    res.status(200).json({ message: "Category Deleted Successfully" });
  } catch (err) {
    const error = new Error("Could not delete category");
    error.statusCode = 500;
    return next(error);
  }
};

exports.addTag = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    next(error);
  }
  const { name } = req.body;
  const addedBy = req.userId;
  const tag = new Tag({
    name,
    addedBy,
  });
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await tag.save({ session: sess });
    const admin = await Admin.findById(addedBy);
    admin.addedTags.push(tag);
    await admin.save({ session: sess });
    sess.commitTransaction();
    res.status(201).json({ message: "Tag Added Successfully", tag });
  } catch (err) {
    const error = new Error("could not add tag");
    error.statusCode = 500;
    return next(error);
  }
};

exports.removeTag = async (req, res, next) => {
  const tagId = req.params.tagId;
  const tag = await Tag.findById(tagId);
  try {
    if (!tag) {
      const error = new Error("No Tag Found");
      error.statusCode = 404;
      throw error;
    }
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await tag.deleteOne({ session: sess });
    const admin = await Admin.findById(tag.addedBy);
    admin.addedTags.pull(tag);
    await admin.save({ session: sess });
    sess.commitTransaction();
    res.status(200).json({ message: "Tag Deleted Successfully" });
  } catch (err) {
    const error = new Error("Could not delete tag");
    error.statusCode = 500;
    return next(error);
  }
};
