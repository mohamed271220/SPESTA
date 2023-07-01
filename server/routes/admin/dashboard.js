const express = require("express");
const adminController = require("../controllers/admin");
const isAuth = require("../../middleware/is-auth");
const router = express();

//TODO REMOVE A PRODUCT
router.put(
  "/removeProduct/:productId",
  isAuth,
  isAdmin,
  adminController.removeProduct
);
//TODO ADD A PRODUCT WITH CERTAIN TAG AND A CATEGORY
router.post("/addProduct", isAuth, isAdmin, adminController.addProduct);
//TODO ADD A CATEGORY
router.post("/addCategory", isAuth, isAdmin, adminController.addCategory);
//TODO ADD A TAG
router.post("/addTag", isAuth, isAdmin, adminController.addTag);
//WITH THAT TRANSACTION METHOD
//TODO REMOVE A PRODUCT
router.delete(
  "/removeProduct/:productId",
  isAuth,
  isAuth,
  adminController.removeProduct
);
//TODO REMOVE A CATEGORY
router.delete(
  "/removeCategory/:categoryId",
  isAuth,
  isAdmin,
  adminController.removeCategory
);
//TODO REMOVE A TAG
router.delete(
  "/removeTag/:tagId",
  isAuth,
  isAdmin,
  adminController.removeTag
);

module.exports = router;
