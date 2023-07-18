const express = require("express");
const adminController = require("../../controllers/admin");
const productController = require("../../controllers/product");
const isAdmin = require("../../middleware/is-admin");

const fileUpload = require("../../middleware/file-upload");

const router = express();

// TODO GET ALL PRODUCTS
router.get(
  "/products", //isAdmin,
  adminController.getProducts
);
// TODO GET A PRODUCT BY ID
router.get("/products/:productId", productController.getProduct);

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
router.post(
  "/addCategory",
  fileUpload.single("image"),
  isAdmin,
  adminController.addCategory
);

//TODO REMOVE A CATEGORY
//TESTED✅
router.delete(
  "/removeCategory/:categoryId",
  isAdmin,
  adminController.removeCategory
);

//TODO ADD A PRODUCT TO A CATEGORY
router.put(
  "/addProductToCategory/:categoryId",
  isAdmin,
  adminController.addProductToCategory
);

//TODO ADD A TAG
//TESTED✅
router.post("/addTag", isAdmin, adminController.addTag);
//WITH THAT TRANSACTION METHOD
//TODO REMOVE A TAG
//TESTED✅
router.delete("/removeTag/:tagId", isAdmin, adminController.removeTag);
//TODO ADD PRODUCT TO TAG
// you will have the product id on the product page
router.put("/addProductToTag/:tagId", isAdmin, adminController.addProductToTag);

//TODO GET ADMIN DATA
router.get("/admin/:adminId", isAdmin, adminController.getAdminById);

//TODO GET USERS
router.get(
  "/users", // isAdmin,
  adminController.getUsers
);

//TODO GET USER BY ID
router.get("/users/:userId", adminController.getUserById);

//TODO DELETE A USER
router.delete("/deleteUser/:userId", isAdmin, adminController.deleteUser);

//TODO GET ORDERS
router.get(
  "/orders", //isAdmin,
  adminController.getOrders
);

router.put("/orders/:orderId", isAdmin, adminController.updateOrder);
module.exports = router;
