const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/auth");
const fileUpload = require("../middleware/file-upload");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

//TODO Get user data
//TESTED✅
router.get("/user/:id", isAuth, authController.getUser);

//TODO: DELETE ACC

// router.delete("/user", isAuth, authController.deleteUser);

//TODO:: EDIT ACC

// router.put("/user", isAuth, authController.editUser);

//TODO fetch addresses related to a user




//TODO add address

router.post("/user/addAddress", isAuth, authController.addAddress);

//TODO edit address

router.put("/user/editAddress/:addressId", isAuth, authController.editAddress);

//TODO delete address

router.delete(
  "/user/deleteAddress/:addressId",
  isAuth,
  authController.deleteAddress
);


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

module.exports = router;
