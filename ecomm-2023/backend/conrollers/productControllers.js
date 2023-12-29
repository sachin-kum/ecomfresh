const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsync");
const ApiFeatures = require("../utils/apifeatures");

// create single product--admin route

exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// get all products
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const { page, limit, search, from, end, ratings } = req.body;

  const skip = (page - 1) * limit;
  let filter = {};
  if (search && !from && !end && !ratings) {
    console.log("suraj", ratings);
    filter = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        // { price: { $gte: from, $lte: end } },
        // { ratings: rating },
      ],
    };
  }
  if (search && from && end) {
    console.log("ghfhg", search);
    filter = {
      $and: [
        { name: { $regex: search, $options: "i" } },
        // { category: { $regex: search, $options: "i" } },
        { price: { $gte: from, $lte: end } },
      ],
    };
  }

  if (search && ratings) {
    let rat1;
    let rat2;

    if (ratings >= 1 && ratings < 2) {
      rat1 = 1;
      rat2 = 1.99;
    }
    if (ratings >= 2 && ratings < 3) {
      rat1 = 2;
      rat2 = 2.99;
    }
    if (ratings >= 3 && ratings < 4) {
      rat1 = 3;
      rat2 = 3.99;
    }
    if (ratings >= 4 && ratings < 5) {
      rat1 = 4;
      rat2 = 4.99;
    }
    if (ratings == 5) {
      rat1 = 5;
      rat2 = 5;
    }
    filter = {
      $and: [
        { name: { $regex: search, $options: "i" } },
        { ratings: { $gte: rat1, $lte: rat2 } },
      ],
    };
  }
  console.log(filter, end, from);
  const products = await Product.find(filter).skip(skip).limit(limit);

  const totalProducts = await Product.countDocuments(filter);

  if (products.length > 0) {
    res.status(200).json({
      msg: "Data is found",
      products: products,

      totalPages: Math.ceil(totalProducts / limit), // Calculate total pages
      currentPage: page, // Current page
      totalProducts: totalProducts,
    });
  } else {
    res.status(200).json({
      msg: "No data found",
    });
  }
});

//search all by  in name

exports.searchProductByName = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;
  if (name) {
    const products = await Product.find({
      $or: [{ name: { $regex: name, $options: "i" } }],
      $or: [{ category: { $regex: name, $options: "i" } }],
    });
    console.log("fh", products);
    if (!products.length) {
      return next(new ErrorHander("No data found", 404));
    }
    res.status(200).json({ msg: "found ", success: true, products });
  }
});

///search product

exports.searchProduct = async (req, res) => {
  try {
    const { name, cate, from, end, rating, page, page_size } = req.body;

    let filter = {};
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }
    if (cate) {
      filter.category = { $regex: cate, $options: "i" };
    }
    if (from && end) {
      filter.price = { $gte: from, $lte: end };
    }
    if (rating) {
      filter.ratings = rating;
    }
    const skip = (page - 1) * page_size;
    const products = await Product.find(filter).skip(skip).limit(page_size);

    const totalProducts = await Product.countDocuments(filter);

    if (products.length) {
      res.status(200).json({
        msg: "products found susessfully",
        data: products,
        totalPages: Math.ceil(totalProducts / page_size), // Calculate total pages
        currentPage: page, // Current page
        totalProducts: totalProducts,
      });
    } else {
      res.status(400).json({ status: false, msg: "No Data Found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "server errorssss  ", error });
  }
};

// exports.search = catchAsyncError(async (req, res, next) => {
//   const { key } = req.query;
//
//   let product = await Product.find({
//     $or: [
//       {
//         name: { $regex: key, $options: "i" },
//         category: { $regex: key, $options: "i" },
//       },
//     ],
//   });
//   if (product.length) {
//     res.status(200).json({ msg: product, success: true });
//   } else {
//     return next(new ErrorHander("product not found", 404));
//   }
// });

//search product by qury

exports.search = catchAsyncError(async (req, res, next) => {
  const { key } = req.query;

  const productsByName = await Product.find({
    name: { $regex: key, $options: "i" },
  });

  const productsByCategory = await Product.find({
    category: { $regex: key, $options: "i" },
  });

  const combinedProducts = [...productsByName, ...productsByCategory];

  if (combinedProducts.length > 0) {
    res.status(200).json({ msg: combinedProducts, success: true });
  } else {
    return next(new HttpError.NotFound("Products not found"));
  }
});
// update one product --admin route

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      msg: "Product not found",
    });
  }

  product = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    {
      new: true,
      runValdators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({ msg: "found ", success: true, product });
});

// get single product

exports.getProductsDetails = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      msg: "Product not found",
    });
  }
  res
    .status(200)
    .json({ msg: "Porduct found succcessfully ", success: true, product });
});

// get single product by id parameter
exports.getProductsDetailsParameter = catchAsyncError(
  async (req, res, next) => {
    let { pid } = req.body;
    const product = await Product.findById({ _id: pid });
    if (product) {
      res.status(200).json({ data: product });
    } else if (!product) {
      return next(new ErrorHander(" product not found", 404));
    }
  }
);

// delete one product --admin route

exports.deleteProducts = catchAsyncError(async (req, res, next) => {
  let product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new ErrorHander("product not found", 404));
  }

  res.status(200).json({ msg: "Porduct Delete sucessfully ", success: true });
});

//create new review and update

exports.creteReviewAndUpdate = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  console.log(req.user);
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById({ _id: productId });

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;
  product.ratings = product.reviews.forEach((rev) => {
    avg = avg + rev.rating;
  });
  product.ratings = avg / product.reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({ success: true });
});

//get all reviews
exports.getProductsReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHander("product not found", 404));
  }

  res.status(200).json({ success: true, data: product.reviews });
});

//delete reviews

exports.deleteProductReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHander("product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;
  reviews.forEach((rev) => {
    avg = avg + rev.rating;
  });
  const rating = avg / reviews.length;
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      rating,
      numOfReviews,
    },
    {
      new: true,
      runValdators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({ success: true, msg: "deleted sucessfully" });
});
