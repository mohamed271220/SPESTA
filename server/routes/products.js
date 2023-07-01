const express = require("express");
const projectController = require("../controllers/project");
const router = express.Router();

//TODO GET SINGLE PRODUCT INCLUDING REVIEWS AND RANDOM PRODUCTS FROM THE SAME CATEGORY AND FROM SAME TAGS
router.get("/:id", projectController.getProduct);
//TODO ADD A REVIEW
router.post("/:id/review", projectController.postReview);
//TODO ADD TO CART
router.post("/:id/cart", projectController.addToCart);
//TODO REMOVE FROM CART
router.put("/:id/cart/remove", projectController.removeFromCart);

//TODO ADD TO ORDER
router.post("/:id/order", projectController.addToOrder);
//TODO CANCEL AN ORDER
router.put("/:id/order/cancel", projectController.cancelOrder);

//TODO CHECK ORDERS STATUS
router.get("/:id/order/status", projectController.checkOrderStatus);

module.exports = router;
