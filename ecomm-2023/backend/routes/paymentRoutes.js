const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../conrollers/paymentControllers");
const router = express.Router();
const { isAuthUser } = require("../middleware/auth");

router.route("/payment/process").post(processPayment);

router.route("/stripeapikey").get(isAuthUser, sendStripeApiKey);

module.exports = router;
