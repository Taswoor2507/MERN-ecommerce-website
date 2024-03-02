import express from "express";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
// error middleware

// import product routes
import productRoutes from "./routes/products.route.js";
import userRoutes from "./routes/user.route.js";
app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);
app.use(errorMiddleware);

export default app;
