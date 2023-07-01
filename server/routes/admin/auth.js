const express = require("express");
const { body } = require("express-validator");
const adminController = require("../controllers/admin");
const router = express.Router();

//ADMIN SHOULD HAVE A SPECIAL KEY IF NOT RETURN AN ERROR ALSO SPECIAL MIDDLEWARE AFTER THE isAuth middleware
//TODO: ADMIN LOGIN
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters"),
    body("adminKey")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Admin key must be at least 10 characters"),
  ],
  isAuth,
  isAdmin,
  adminController.login
);
//TODO: ADMIN REGISTRATION
router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters"),
  ],
  isAuth,
  isAdmin,
  adminController.register
);


module.exports = router;