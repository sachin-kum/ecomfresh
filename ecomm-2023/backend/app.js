const express = require("express");
const errorMiddleware = require("./middleware/error");
const cookieParaser = require("cookie-parser");
const app = express();
const cors = require("cors");
const multer = require("module");
app.use(express.json());
const dotenv = require("dotenv").config();

const products = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const upload = require("./middleware/fileupload");
const cart = require("./routes/cartRoutes");
const payment = require("./routes/paymentRoutes");

app.use(
  cors({
    origin: "*",
  })
);
//config

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "/.env" });
}

app.use("/", express.static(__dirname + "/upload"));
// app.use(upload.any());
app.use(cookieParaser());

app.use("/api/v1", cart);
app.use("/api/v1", products);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

//cookei handle

// error hanndle for
app.use(errorMiddleware);
module.exports = app;
