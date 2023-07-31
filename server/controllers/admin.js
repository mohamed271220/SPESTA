const { validationResult } = require("express-validator");
const Product = require("../models/product");
const { default: mongoose } = require("mongoose");
const Admin = require("../models/admin");
const Category = require("../models/category");
const Tag = require("../models/tag");
const Order = require("../models/order");
const User = require("../models/user");
//TODO PRODUCT CONTROLLERS

//TODO GET ALL PRODUCTS
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json({ message: "Products fetched", products });
  } catch (err) {
    const error = new Error("Could not fetch products");
    error.statusCode = 500;
    return next(error);
  }
};

exports.addProduct = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const { name, description, price, images, category, tag, sale } = req.body;
  console.log(name, description, price, images, category, tag, sale);
  const addedBy = req.userId;

  const product = new Product({
    name,
    description,
    price,
    addedBy,
    images: images,
    category,
    sale,
    tag,
  });

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();
  //   await product.save({ session: sess });
  //   const admin = await Admin.findById(addedBy);

  //   if (category) {
  //     category.forEach(async (cat) => {
  //       const category = await Category.findById(cat);
  //       category.products.push(product);
  //       await category.save({ session: sess });
  //     });
  //   }
  //   if (tag) {
  //     tag.forEach(async (tagId) => {
  //       const tagItem = await Tag.findById(tagId);
  //       tagItem.products.push(product);
  //       await tagItem.save({ session: sess });
  //     });
  //   }
  //   admin.addedProducts.push(product);
  //   await admin.save({ session: sess });
  //   await sess.commitTransaction();
  // } catch (err) {
  //   const error = new Error("could not add product " + err);
  //   error.statusCode = 500;
  //   return next(error);
  // }
  /*

It’s possible that the issue with your code was that you were committing the transaction twice. When you call sess.commitTransaction(), it commits the transaction and ends it. If you call it again, it will try to commit the transaction again, which could result in duplicate data being added to the database.

The code I provided uses the withTransaction() method to ensure that the transaction is committed only once. It also uses a try-catch-finally block to handle any errors that might occur during the transaction.

I hope this helps! Let me know if you have any other questions.

*/

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await product.save({ session: session });
    const admin = await Admin.findById(addedBy);

    if (category) {
      category.forEach(async (cat) => {
        try {
          const category = await Category.findById(cat).session({
            session: session,
          });
          category.products.push(product);
          await category.save({ session: session });
        } catch (err) {
          console.log(err);
        }
      });
    }

    if (tag) {
      tag.forEach(async (tagId) => {
        const tagItem = await Tag.findById(tagId).session({
          session: session,
        });
        tagItem.products.push(product);
        await tagItem.save({ session: session });
      });
    }

    admin.addedProducts.push(product);
    await admin.save({ session: session });

    await session.commitTransaction();
    res.status(201).json({ message: "Product Added Successfully", product });
  } catch (error) {
    await session.abortTransaction();
    const err = new Error("Something went wrong " + error);
    err.statusCode = 500;
    return next(err);
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
  if (!product) {
    const error = new Error("No Product Found");
    error.statusCode = 404;
    throw error;
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await product.deleteOne({ session: sess });
    const admin = await Admin.findById(product.addedBy);
    admin.addedProducts.pull(product);
    await admin.save({ session: sess });

    product.category.map(async (id) => {
      const category = await Category.findById(id);

      category.products.pull(product._id);

      await category.save({ session: sess });
    });

    product.tag.map(async (id) => {
      const tag = await Tag.findById(id);

      tag.products.pull(product._id);
      await tag.save({ session: sess });
    });

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
  const { name, productIds, description } = req.body;
  console.log(productIds);
  const addedBy = req.userId;
  const category = new Category({
    name,
    image: req.file.path.replace("\\", "/"),
    addedBy,
    products: JSON.parse(productIds),
    description,
  });
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await category.save({ session: sess });
    if (productIds) {
      JSON.parse(productIds).map(async (productId) => {
        const productItem = await Product.findById(productId);
        productItem.category.push(category);
        await productItem.save({ sess });
      });
    }
    const admin = await Admin.findById(addedBy);
    admin.addedCategories.push(category);
    await admin.save({ session: sess });
    sess.commitTransaction();
    res.status(201).json({ message: "Category Added Successfully", category });
  } catch (err) {
    const error = new Error("could not add category" + err);
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
    const products = await Product.find({ category: categoryId });
    products.forEach(async (product) => {
      product.category.pull(category);
      await product.save({ sess });
    });
    sess.commitTransaction();
    res.status(200).json({ message: "Category Deleted Successfully" });
  } catch (err) {
    const error = new Error("Could not delete category");
    error.statusCode = 500;
    return next(error);
  }
};

exports.editCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const { name, productIds, description } = req.body;
  const addedBy = req.userId;
  const category = await Category.findById(categoryId);
  try {
    if (!category) {
      const error = new Error("No Category Found");
      error.statusCode = 404;
      throw error;
    }

    category.name = name;
    category.image = req.file.path.replace("\\", "/");
    category.products = JSON.parse(productIds);
    category.description = description;

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await category.save({ session: sess });
    const admin = await Admin.findById(addedBy);
    JSON.parse(productIds).forEach(async (cat) => {
      const product = await Product.findById(cat);
      product.category.push(category);
    });

    admin.addedCategories.push(category);
    await admin.save({ session: sess });
    sess.commitTransaction();

    res
      .status(200)
      .json({ message: "Category Updated Successfully", category });
  } catch (err) {
    const error = new Error("Could not edit category " + err);
    error.statusCode = 500;
    return next(error);
  }
};

//TODO TAGS CATEGORY

exports.addTag = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    next(error);
  }
  const { name } = req.body;
  const productIds = req.body.productIds;
  console.log(productIds);
  const addedBy = req.userId;
  const tag = new Tag({
    name,
    addedBy,
    products: JSON.parse(productIds),
  });
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await tag.save({ session: sess });
    if (productIds) {
      JSON.parse(productIds).map(async (productId) => {
        const productItem = await Product.findById(productId);
        productItem.tag.push(tag);
        await productItem.save({ sess });
      });
    }
    const admin = await Admin.findById(addedBy);
    admin.addedTags.push(tag);
    await admin.save({ session: sess });
    sess.commitTransaction();
    res.status(201).json({ message: "Category Added Successfully", tag });
  } catch (err) {
    const error = new Error("could not add category" + err);
    error.statusCode = 500;
    return next(error);
  }
};
exports.editTag = async (req, res, next) => {
  const tagId = req.params.tagId;
  const { name, productIds } = req.body;
  const addedBy = req.userId;
  const tag = await Tag.findById(tagId);
  if (!tag) {
    const error = new Error("No Tag Found");
    error.statusCode = 404;
    throw error;
  }
  try {
    tag.name = name;
    tag.products = JSON.parse(productIds);

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await tag.save({ session: sess });
    const admin = await Admin.findById(addedBy);
    JSON.parse(productIds).forEach(async (cat) => {
      const product = await Product.findById(cat);
      product.tag.push(tag);
    });
    admin.addedTags.push(tag);
    await admin.save({ session: sess });
    sess.commitTransaction();
    res.status(200).json({ message: "Tag Updated Successfully", tag });
  } catch (err) {
    const error = new Error("Could not update tag " + err);
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
    const products = await Product.find({ tag: tagId });
    products.forEach(async (product) => {
      product.tag.pull(tag);
      await product.save({ session: sess });
    });

    sess.commitTransaction();
    res.status(200).json({ message: "Tag Deleted Successfully" });
  } catch (err) {
    const error = new Error("Could not delete tag");
    error.statusCode = 500;
    return next(error);
  }
};

exports.addProductToTag = async (req, res, next) => {};

//TODO GET ALL USERS
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    console.log(users);
    res.status(200).json({ message: "Users fetched", users });
  } catch (err) {
    const error = new Error("Could not fetch users " + err);
    error.statusCode = 500;
    return next(error);
  }
};

//TODO GET USER BY ID
exports.getUserById = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("No User Found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "User fetched", user });
  } catch (err) {
    const error = new Error("Could not fetch user");
    error.statusCode = 500;
    return next(error);
  }
};

//TODO Delete USER
exports.deleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("No User Found");
      error.statusCode = 404;
      throw error;
    }
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await user.deleteOne({ session: sess });
    sess.commitTransaction();
    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (err) {
    const error = new Error("Could not delete user");
    error.statusCode = 500;
    return next(error);
  }
};

//TODO GET ADMIN BY ID

exports.getAdminById = async (req, res, next) => {
  const adminId = req.params.adminId;
  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      const error = new Error("No Admin Found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "Admin fetched", admin });
  } catch (err) {
    const error = new Error("Could not fetch admin");
    error.statusCode = 500;
    return next(error);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
    // console.log(page, pageSize, sort, search);
    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};
    // console.log(sortFormatted);

    const madeBy = search
      ? {
          $or: [
            // { totalPrice: { $eq: search } },
            { status: { $regex: new RegExp(search, "i") } },
            // { madeBy: { $eq: new mongoose.Types.ObjectId(search) } },
          ],
        }
      : {};
    const transactions = await Order.find(madeBy)
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);
    console.log(transactions);
    const total = await Order.countDocuments({
      name: { $regex: search, $options: "i" },
    });
    // console.log(total);
    res.status(200).json({
      transactions,
      total,
    });
  } catch (err) {
    const error = new Error("Could not fetch orders" + err);
    error.statusCode = 500;
    return next(error);
  }
};

exports.updateOrder = async (req, res, next) => {
  const orderId = req.params.orderId;
  const { status } = req.body;
  try {
    const order = await Order.findById(orderId);
    order.status = status;
    await order.save();
    res.json({ message: "Order Updated Successfully", order });
  } catch (err) {
    const error = new Error("Could not update order");
    error.statusCode = 500;
    return next(error + " real err " + err);
  }
};
