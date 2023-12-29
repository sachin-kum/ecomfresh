const User = require("../models/userModel");
const ErrorHander = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsync");
const jwt = require("jsonwebtoken");

exports.isAuthUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.headers;

  console.log(req.headers);

  if (!token) {
    return next(
      new ErrorHander(" Please Login to access to these resoucres", 401)
    );
  }

  const decodeData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodeData.id);
  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access these resource`,
          403
        )
      );
    }
    next();
  };
};
