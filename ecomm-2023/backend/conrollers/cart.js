const cartmodel = require("../models/cartmodel");
const productModel = require("../models/productModel");

exports.addtocart = async (req, res) => {
  try {
    const { productid, quantity, userid } = req.body;
    const find_data = await cartmodel
      .findOne({ productid, userid })
      .populate({ path: "productid" });
    console.log("find_data", find_data);

    const findproduct = await productModel.findOne({ _id: productid });
    if (find_data) {
      await cartmodel.findByIdAndUpdate(
        { _id: find_data._id },
        {
          $set: {
            quantity: quantity,
            totalamount: quantity * findproduct.price,
          },
        }
      );
      const data = await cartmodel.findOne({ _id: find_data._id });
      return res.status(200).json({ msg: "Product Quantity increase", data });
    }

    const createcart = await cartmodel.create({
      productid,
      quantity,
      userid,
      totalamount: quantity * findproduct.price,
    });
    return res.send({ msg: "Add to cart sucessfully", createcart });
  } catch (error) {
    res.send({ msg: error.message });
  }
};

exports.removetocart = async (req, res) => {
  try {
    const { id } = req.body;
    const find_data = await cartmodel.findById({ _id: id });

    if (find_data) {
      const deleted_cart = await cartmodel.deleteOne({ _id: id });
      if (deleted_cart) {
        res.status(200).send({
          status: true,
          msg: "cart data  deleted",
        });
      } else {
        res.status(400).json({ msg: "invalid id  " });
      }
    } else {
      res.status(400).json({ msg: "No cart data found  " });
    }
  } catch (error) {
    res.send({ msg: error.message });
  }
};

exports.getAllAddtoCart = async (req, res) => {
  try {
    const { userid } = req.body;
    const findAllData = await cartmodel.find({ userid: userid }).populate({
      path: "productid",
      select: " name  description Stock price images Stock",
    });
    if (findAllData) {
      const totale = findAllData.map((it) => {
        return it.totalamount;
      });

      let sum = 0;
      for (let i = 0; i < totale.length; i++) {
        sum += totale[i];
      }

      res.status(200).json({
        data: findAllData,
        status: true,
        totalAllCartAmount: sum,
        totalItem: findAllData.length,
      });
    } else
      return res.status(401).json({ msg: "Product Not Found", sucess: false });
  } catch (error) {
    console.log(error);
  }
};
