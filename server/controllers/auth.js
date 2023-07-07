const User = require("../models/user");

const { validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

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
    // image: req.file.path.replace("\\", "/")||"",
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

    token: token,
  });
};


// USER LOGIN
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
console.log(email + " " +password);
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
    console.log(existingUser);
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
      { userId: existingUser._id.toString(), email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );



    // Send authorization roles and access token to user
    res.json({
      message: "User logged in",
      accessToken,
      userId: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
    });
  } catch (err) {
    const error = new Error("Login failed");
    error.statusCode = 500;
    return next(error);
  }
};

