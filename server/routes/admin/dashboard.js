const express = require("express");
const adminController = require("../../controllers/admin");
const isAdmin = require("../../middleware/is-admin");

const fileUpload = require("../../middleware/file-upload");

const router = express();

//TODO ADD A PRODUCT WITH CERTAIN TAG AND A CATEGORY
//TESTED✅
router.post(
  "/addProduct",
  fileUpload.array("images", 4),
  isAdmin,
  adminController.addProduct
);

//TODO EDIT A PRODUCT
//TESTED✅
router.put(
  "/editProduct/:productId",
  fileUpload.array("images", 4),
  isAdmin,
  adminController.editProduct
);

//TODO REMOVE A PRODUCT
//TESTED✅
router.delete(
  "/removeProduct/:productId",
  isAdmin,
  adminController.removeProduct
);




//TODO ADD A CATEGORY
//TESTED✅
router.post("/addCategory", isAdmin, adminController.addCategory);

//TODO REMOVE A CATEGORY
//TESTED✅
router.delete(
  "/removeCategory/:categoryId",
  isAdmin,
  adminController.removeCategory
);
//TODO ADD A TAG
//TESTED✅
router.post("/addTag", isAdmin, adminController.addTag);
//WITH THAT TRANSACTION METHOD
//TODO REMOVE A TAG
//TESTED✅
router.delete("/removeTag/:tagId", isAdmin, adminController.removeTag);


//TODO GET USERS

//TODO DELETE A USER



module.exports = router;
