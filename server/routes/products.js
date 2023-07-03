const express = require("express");
const productController = require("../controllers/product");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

//TODO GET SINGLE PRODUCT INCLUDING REVIEWS AND RANDOM PRODUCTS FROM THE SAME CATEGORY AND FROM SAME TAGS
router.get("/:productId", productController.getProduct);
//TODO ADD A REVIEW
router.post("/:productId/review",isAuth, productController.postReview);
//TODO ADD TO CART
router.post("/:productId/cart", isAuth,productController.addToCart);
//TODO REMOVE FROM CART
router.put("/:productId/cart/remove",isAuth, productController.removeFromCart);

//TODO ADD TO ORDER
router.post("/order",isAuth, productController.makeOrder);
//TODO CANCEL AN ORDER
router.put("/:orderId/order/cancel", isAuth,productController.cancelOrder);

//TODO CHECK ORDERS STATUS
router.get("/:orderId/order/status",isAuth, productController.checkOrderStatus);

module.exports = router;
