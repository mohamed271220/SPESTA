const express = require("express");
const adminController = require("../../controllers/admin");
const isAdmin = require("../../middleware/is-admin");

const fileUpload = require("../../middleware/file-upload");

const router = express();

//TODO ADD A PRODUCT WITH CERTAIN TAG AND A CATEGORY
router.post(
  "/addProduct",
  fileUpload.array("images", 4),
  isAdmin,
  adminController.addProduct
);

//TODO EDIT A PRODUCT
router.put(
  "/editProduct/:productId",
  fileUpload.array("images", 4),
  isAdmin,
  adminController.editProduct
);

//TODO REMOVE A PRODUCT
router.delete(
  "/removeProduct/:productId",
  isAdmin,
  adminController.removeProduct
);




//TODO ADD A CATEGORY
router.post("/addCategory", isAdmin, adminController.addCategory);

//TODO REMOVE A CATEGORY
router.delete(
  "/removeCategory/:categoryId",
  isAdmin,
  adminController.removeCategory
);
//TODO ADD A TAG
router.post("/addTag", isAdmin, adminController.addTag);
//WITH THAT TRANSACTION METHOD
//TODO REMOVE A TAG
router.delete("/removeTag/:tagId", isAdmin, adminController.removeTag);

module.exports = router;
