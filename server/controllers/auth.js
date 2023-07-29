const User = require("../models/user");
const Address = require("../models/address");
const { validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId, "-password").populate(
      "orders cart address"
    );
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({
      message: "User fetched",
      user: user,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return next(err);
  }
};

// SIGNUP
exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new Error("Signup failed");
    error.statusCode = 500;
    return next(error);
  }
  if (existingUser) {
    const error = new Error("User exists already");
    error.statusCode = 422;
    return next(error);
  }
  let hashedPassword;
  hashedPassword = await bcrypt.hash(password, 12);
  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    image: req.file.path.replace("\\", "/") || "",
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new Error("Signup failed");
    error.statusCode = 500;
    return next(error);
  }
  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUser.id.toString(),
        email: createdUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new Error("Signup failed");
    error.statusCode = 500;
    return next(error);
  }
  res.status(201).json({
    message: "User created",
    userId: createdUser.id,
    email: createdUser.email,
    image: createdUser.image,
    token: token,
  });
};

// USER LOGIN
exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email + " " + password);
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
    // console.log(existingUser);
  } catch (err) {
    const error = new Error("Login failed");
    error.statusCode = 500;
    return next(error);
  }
  if (!existingUser) {
    const error = new Error(
      "User not found please make sure your credentials are right"
    );
    error.statusCode = 404;
    return next(error);
  }
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new Error("Login failed");
    error.statusCode = 500;
    return next(error);
  }

  if (!isValidPassword) {
    const error = new Error("Invalid Password");
    error.statusCode = 401;
    return next(error);
  }

  let accessToken;
  try {
    accessToken = jwt.sign(
      { userId: existingUser.id.toString(), email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send authorization roles and access token to user
    res.json({
      message: "User logged in",
      token: accessToken,
      userId: existingUser.id,
      cart: existingUser.cart,
      orders: existingUser.orders,
      email: existingUser.email,
      name: existingUser.name,
      image: existingUser.image,
    });
  } catch (err) {
    const error = new Error("Login failed");
    error.statusCode = 500;
    return next(error);
  }
};



exports.addAddress = async (req, res, next) => {
  const userId = req.userId;
  const { street, city, description } = req.body;
  try {
    const user = await User.findById(userId);
    const address = new Address({
      userId,
      street,
      city,
      description,
    });
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await address.save({ session: sess });
    user.address.push(address);
    await user.save({ session: sess });
    sess.commitTransaction();
    res.status(201).json({
      message: "Address added successfully",
    });
  } catch (err) {
    const error = new Error("could not add address " + err);
    error.statusCode = 500;
    return next(error);
  }
};
exports.editAddress = async (req, res, next) => {
  const { street, city, description } = req.body;
  const addressId = req.params.addressId;
  try {
    const address = await Address.findById(addressId);
    if (!address) {
      const error = new Error("Address not found");
      error.statusCode = 404;
      return next(error);
    }
    address.street = street;
    address.city = city;
    address.description = description;
    await address.save();
    res.status(201).json({
      message: "Address edited successfully",
    });
  } catch (err) {
    const error = new Error("Address not found");
    error.statusCode = 404;
    return next(error);
  }
};
exports.deleteAddress = async (req, res, next) => {
  const addressId = req.params.addressId;
  console.log(addressId);
  const userId = req.userId;
  try {
    const address = await Address.findById(addressId);
console.log(address);

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await address.deleteOne({ session: sess });
    const user = await User.findById(userId);
    user.address.pull(addressId);
    await user.save({ session: sess });
    sess.commitTransaction();
    res.status(201).json({
      message: "Address deleted successfully",
    });
  } catch (err) {
    const error = new Error("Address not found "+err);
    error.statusCode = 404;
    return next(error);
  }
};
