const express = require("express");
const { body } = require("express-validator");
const adminController = require("../../controllers/adminAuth");
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
      .withMessage("Password must be at least 5 characters")
  ],

  adminController.adminLogin
);
//TODO: ADMIN REGISTRATION
router.post(
  "/signup",
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

  adminController.adminSignup
);

module.exports = router;
