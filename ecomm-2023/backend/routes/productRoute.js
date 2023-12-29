const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProducts,
  getProductsDetails,
  getProductsDetailsParameter,
  searchProduct,
  search,
  creteReviewAndUpdate,
  getProductsReviews,
  deleteProductReview,
  searchProductByName,
} = require("../conrollers/productControllers");
const { isAuthUser, authorizeRoles } = require("../middleware/auth");
const { addtocart, getAllAddtoCart } = require("../conrollers/cart");
const router = express.Router();

router.route("/products").post(getAllProducts);

router
  .route("/products/new")
  .post(isAuthUser, authorizeRoles("admin"), createProduct);
router.route("/products/:id").post(getProductsDetails);
router.route("/products").post(getProductsDetailsParameter);
router.route("/search-product").post(searchProduct);
router.route("/search-product-all").post(searchProductByName);

router.route("/search-productid").post(search);

router
  .route("/products/:id")
  .put(isAuthUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthUser, authorizeRoles("admin"), deleteProducts);
router.route("/review").put(isAuthUser, creteReviewAndUpdate);

router.route("/get-reviews").get(getProductsReviews);

router.route("/delete-review").delete(isAuthUser, deleteProductReview);
// router.route("/add-cart").post(addtocart);
// router.route("/get-cart-data").post(getAllAddtoCart);

module.exports = router;
