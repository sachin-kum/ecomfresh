const Order = require("../models/orderModel");
const ErrorHander = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsync");
const Product = require("../models/productModel");

//creaete a new order
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    texPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    texPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// get Single Order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const { id } = req.body;
  const order = await Order.findById({ _id: id }).populate(
    "user",
    "name email"
  );
  console.log("order=>", order);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});
//get single order

exports.getMyOrder = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  if (!orders) {
    return next(new ErrorHander(" Order Not Found", 404));
  }
  res.status(200).json({ success: true, orders });
});

//get all orders--admin

exports.getAllOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.find();

  if (!order) {
    return next(new ErrorHander(" Order Not Found", 404));
  }

  let totalAmount = 0;
  order.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({ success: true, order, totalAmount });
});

//update order status-->admin

exports.updateOrderStatues = catchAsyncError(async (req, res, next) => {
  const orderId = req.params.id; // Corrected from req.parms.id

  const order = await Order.findById(orderId);
  if (!order) {
    return next(new ErrorHander(" Order Not Found", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHander("You have already delivered this order", 400));
  }

  order.orderItems.forEach(async (odr) => {
    await updateStock(odr.product, odr.quantity);
  });

  order.orderStatus = req.body.status;
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({ success: true });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

//delete order--admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const { id } = req.body;
  const order = await Order.findByIdAndDelete({ _id: id });

  if (!order) {
    return next(new ErrorHander(" Order Not Found", 404));
  }

  // await order.remove();
  res.status(200).json({ success: true });
});
