const Admin = require("../models/admin");
const { validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.adminSignup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  console.log(req.body);
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const adminKey = req.body.adminKey;

  if (adminKey !== process.env.ADMIN_KEY) {
    const error = new Error("Invalid Admin Key");
    error.statusCode = 422;
    return next(error);
  }

  let existingUser;
  try {
    existingUser = await Admin.findOne({ email: email });
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
  const createdUser = new Admin({
    name,
    email,
    adminKey,
    password: hashedPassword,
    image: req.file.path.replace("\\", "/"),
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
        userId: createdUser._id.toString(),
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
    userId: createdUser._id,
    email: createdUser.email,
    image: createdUser.image,
    name: createdUser.name,
    token: token,
  });
};

exports.adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await Admin.findOne({ email: email });
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
    const error = new Error(" Invalid Password");
    error.statusCode = 401;
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser._id.toString(), email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new Error(err + " Login failed");
    error.statusCode = 500;
    return next(error);
  }

  res.status(200).json({
    message: "User logged in",
    image: existingUser.image,
    userId: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
    token: token,
  });
};

exports.editAdmin = async (req, res, next) => {
  const adminId = req.params.adminId;
  const name = req.body.name;
  const email = req.body.email;
  console.log(name, email);

  let existingUser;
  try {
    existingUser = await Admin.findById(adminId);
    if (!existingUser) {
      const error = new Error("Admin not found");
      error.statusCode = 404;
      return next(error);
    }
    existingUser.name = name;
    existingUser.email = email;
    await existingUser.save();
    res.status(200).json({
      message: "Admin updated",
    adminId: existingUser._id,
    });
  } catch (err) {
    const error = new Error("something went wrong " + err);
    error.statusCode = 404;
    return next(error);
  }
};
