const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  productid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  totalamount: Number,
});

const cartmodel = new mongoose.model("cart", schema);
module.exports = cartmodel;
