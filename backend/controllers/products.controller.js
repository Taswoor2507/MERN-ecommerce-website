import expressAsyncHandler from "express-async-handler";
import Product from "../models/product.model.js";
// @des create a new product
// @route localhost/api/v1/products/new
// @access public
const createProduct = expressAsyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// @des get all products
// @route localhost/api/v1/prdoucts
// @access public
const getAllProducts = expressAsyncHandler(async (req, res, next) => {
  const product = await Product.find();
  res.status(200).json(product);
});

// @des get single product
// @route localhost/api/v1/products/:id
// @access public
const getProductDetail = expressAsyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  product = await Product.findById(req.params.id);
  res.status(200).json({
    success: true,
    product,
  });
});

// @des update  product
// @route localhost/api/v1/products/:id
// @access public
const updateProducts = expressAsyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
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
const deleteProducts = expressAsyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
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
