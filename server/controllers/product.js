const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const Product = require("../models/product");
const Review = require("../models/review");
const User = require("../models/user");
const Order = require("../models/order");
const mongoose = require("mongoose");
// exports.getProducts = async (req, res, next) => {
//   try {
//     const currentPage = req.query.page || 1;
//     const perPage = 10;
//     const totalItems = await Product.find().countDocuments();

//     const products = await Product.find()
//       .sort({ createdAt: 1 })
//       .skip((currentPage - 1) * perPage)
//       .limit(perPage);
//       res.status(200).json({
//         message: "Fetched products successfully.",
//         products: products,
//         totalItems: totalItems,
//       })
//   } catch (err) {
//     if(!err.statusCode){
//       err.statusCode = 500;
//     }
//     next(err);
// }

// };
// exports.getProductById = async (req, res, next) => {

// }

exports.getProduct = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId).populate({
      path: "reviews",
      populate: {
        path: "user",
      },
    });
    if (!product) {
      const error = new Error("Could not find product.");
      error.statusCode = 404;
      next(error);
    }
    res
      .status(200)
      .json({ message: "Product fetched successfully", product: product });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.postReview = async (req, res, next) => {
  const productId = req.params.productId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    next(error);
  }
  const content = req.body.content;
  const rating = req.body.rating;
  const userId = req.userId;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      const error = new Error("Could not find product.");
      error.statusCode = 404;
      next(error);
    }

    const review = {
      content: content,
      product: productId,
      rating: rating,
      user: userId,
    };

    product.reviews.push(review);
    await product.save();
    await review.save();
    res
      .status(201)
      .json({ message: "Review created successfully!", review: review });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.addToCart = async (req, res, next) => {
  const productId = req.params.productId;
  const userId = req.userId;
  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  if (!product) {
    const error = new Error("Could not find product.");
    error.statusCode = 404;
    next(error);
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("Could not find user.");
      error.statusCode = 404;
      next(error);
    }
    user.cart.push(productId);
    await user.save();
    res.status(201).json({ message: "Product added to cart" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.removeFromCart = async (req, res, next) => {
  const productId = req.params.productId;
  const userId = req.userId;
  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  if (!product) {
    const error = new Error("Could not find product.");
    error.statusCode = 404;
    next(error);
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("Could not find user.");
      error.statusCode = 404;
      next(error);
    }
    user.cart.pull(product);
    res.status(201).json({ message: "Product removed from cart" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.makeOrder = async (req, res, next) => {
  const userId = req.userId;
  let products;
  try {
    const user = await User.findById(userId);
    if (!user || user.cart.length === 0) {
      const error = new Error("Something went wrong , please check your cart");
      error.statusCode = 404;
      next(error);
    }
    products = user.cart;
    console.log(products);
    const sess = await mongoose.startSession();
    sess.startTransaction();
    const order = new Order({
      products: products,
      address: req.body.address,
      madeBy: userId,
      status: "pending",
      totalPrice: 2,
      // products.reduce((acc, prod) => {
      //   return acc + prod.price;
      // }),
    });
    console.log(order);
    await order.save({ session: sess });
    user.cart = [];
    await user.save({ session: sess });
    await sess.commitTransaction();
    res.status(201).json({ message: "Order created successfully" });
  } catch (err) {
    const error = new Error("Something went wrong , please try again later");
    error.statusCode = 404;
    next(error);
  }
};
exports.cancelOrder = async (req, res, next) => {
  const orderId = req.params.orderId;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      const error = new Error("Could not find order");
      error.statusCode = 404;
      next(error);
    }
    order.status = "cancelled";
    await order.save();
    res.status(201).json({ message: "Order cancelled successfully" });
  } catch (err) {
    const error = new Error("Something went wrong , please try again later");
    error.statusCode = 404;
    next(error);
  }
};

exports.checkOrderStatus = async (req, res, next) => {
  const orderId = req.params.orderId;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      const error = new Error("Could not find order");
      error.statusCode = 404;
      next(error);
    }
    res.status(201).json({ message: "Order status", status: order.status });
  } catch (err) {
    const error = new Error("Something went wrong , please try again later");
    error.statusCode = 404;
    next(error);
  }
};
