import { Router } from "express";
import { getAllProducts } from "../controllers/products.controller.js";
const router = Router();

router.route("/products").get(getAllProducts);

export default router;
