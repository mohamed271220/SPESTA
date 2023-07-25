const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/auth");
const fileUpload = require("../middleware/file-upload");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

//TODO Get user data

router.get("/user/:id", isAuth, authController.getUser);

//TODO: USERS lOGIN
//TESTED✅
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
  ],
  authController.login
);

//TODO: USERS REGISTER
//TESTED✅
router.post(
  "/signup",
  fileUpload.single("image"),

  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").trim().isLength({ min: 5 }),
  ],
  authController.signup
);
//TODO: DELETE ACC
//TODO:: EDIT ACC

module.exports = router;
