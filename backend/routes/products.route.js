import { Router } from "express";
import {
  getAllProducts,
  createProduct,
  updateProducts,
  deleteProducts,
  getProductDetail,
} from "../controllers/products.controller.js";
const router = Router();
//create a new product
router.route("/products/new").post(createProduct);

// get all products
router.route("/products").get(getAllProducts);

// get single products
router.route("/products/:id").get(getProductDetail);

// update product
router.route("/products/:id").put(updateProducts);

//delete product
router.route("/products/:id").delete(deleteProducts);

export default router;
