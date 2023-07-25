const express = require("express");
const productController = require("../controllers/product");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

//TODO GET SINGLE PRODUCT INCLUDING REVIEWS AND RANDOM PRODUCTS FROM THE SAME CATEGORY AND FROM SAME TAGS
//TESTED✅
router.get("/products/:productId", productController.getProduct);

//TODO ADD A REVIEW
//TESTED✅
router.post("/:productId/review",isAuth, productController.postReview);

//TODO ADD TO CART
//TESTED✅✅
router.post("/:productId/cart", isAuth,productController.addToCart);
//TODO REMOVE FROM CART
//TESTED❌
router.put("/:productId/cart/remove",isAuth, productController.removeFromCart);

//TODO  ORDER
//TESTED❌
router.post("/order",isAuth, productController.makeOrder);

//TODO CANCEL AN ORDER
//TESTED❌
router.put("/:orderId/order/cancel", isAuth,productController.cancelOrder);

//TODO CHECK ORDERS STATUS
//TESTED❌
router.get("/:orderId/order/status",isAuth, productController.checkOrderStatus);

module.exports = router;
