// import expressAsyncHandler from "express-async-handler";
import Product from "../models/product.model.js";
import ErrorHandler from "../utils/errorHandler.js";
import asyncHandler from "../middleware/asyncErrorHandler.js";
import ApiFeature from "../utils/apiFeatures.js";
// @des create a new product
// @route localhost/api/v1/products/new
// @access public
const createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
  next();
});

// @des get all products
// @route localhost/api/v1/prdoucts
// @access public
const getAllProducts = asyncHandler(async (req, res, next) => {
  // api features
  let resultPerPage = 5;
  const apiFeatures = new ApiFeature(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const product = await apiFeatures.query;
  res.status(200).json(product);
  next();
});

// @des get single product
// @route localhost/api/v1/products/:id
// @access public
const getProductDetail = asyncHandler(async (req, res, next) => {
  const totalProducts = await Product.countDocuments();

  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler(400, "Product not found"));
  }

  product = await Product.findById(req.params.id);
  res.status(200).json({
    success: true,
    product,
    totalProducts,
  });
  next();
});

// @des update  product
// @route localhost/api/v1/products/:id
// @access public
const updateProducts = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler(400, "Product not found"));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// @des update  product
// @route localhost/api/v1/products/:id
// @access public
const deleteProducts = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler(400, "Product not found"));
  }
  product = await Product.findByIdAndDelete(req.params.id, req.body, {
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

export {
  getAllProducts,
  getProductDetail,
  createProduct,
  updateProducts,
  deleteProducts,
};
