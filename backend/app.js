import express from "express";

const app = express();
app.use(express.json());

// import product routes
import productRoutes from "./routes/products.route.js";
app.use("/api/v1", productRoutes);

export default app;
