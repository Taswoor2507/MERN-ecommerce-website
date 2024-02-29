import express from "express";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();
app.use(express.json());
// error middleware

// import product routes
import productRoutes from "./routes/products.route.js";
app.use("/api/v1", productRoutes);
app.use(errorMiddleware);

export default app;
