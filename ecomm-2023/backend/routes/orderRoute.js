const express = require("express");
const { isAuthUser, authorizeRoles } = require("../middleware/auth");
const {
  newOrder,
  getSingleOrder,
  getMyOrder,
  getAllOrder,
  updateOrderStatues,
  deleteOrder,
} = require("../conrollers/orderControllers");

const router = express.Router();
router.route("/order/new").post(isAuthUser, newOrder);

router
  .route("/single-order")
  .post(isAuthUser, authorizeRoles("admin"), getSingleOrder);

router.route("/orders/me").get(isAuthUser, getMyOrder);
router
  .route("/all-orders")
  .get(isAuthUser, authorizeRoles("admin"), getAllOrder);

router
  .route("/update-order/status/:id")
  .put(isAuthUser, authorizeRoles("admin"), updateOrderStatues);

router
  .route("/delete-order/:id")
  .post(isAuthUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
