const express = require("express");
const router = express.Router();
const { isAuthUser } = require("../middleware/auth");
const {
  addtocart,
  getAllAddtoCart,
  removetocart,
} = require("../conrollers/cart");

// const router = express.Router();

// router.route("/cart/new").post(isAuthUser, newOrder);
router.route("/add-cart").post(isAuthUser, addtocart);
router.route("/get-cart-data").post(isAuthUser, getAllAddtoCart);
router.route("/remove-cart-data").post(isAuthUser, removetocart);

module.exports = router;
