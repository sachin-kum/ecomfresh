const ErrorHander = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //wrong mongodb id err handler

  if (err.name === "CastError") {
    const message = `Resources not found . Invalid :${err.path}`;
    err = new ErrorHander(message, 400);
  }

  //mongodb duplicate error handling
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Enterd`;
    err = new ErrorHander(message, 404);
  }

  //error handling for api
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    statusCode: err.statusCode,
  });
};
