import User from "../models/user.model.js";
import ErrorHandler from "../utils/errorHandler.js";
import asyncHandler from "./asyncErrorHandler.js";
import jwt from "jsonwebtoken";
const isAuthUser = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token || token === "j%3Anull" || token === "") {
    return next(
      new ErrorHandler(401, "Please login first to access this resource")
    );
  }

  const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  console.log(decodedData);
  req.user = await User.findById(decodedData.id);
  next();
});

export default isAuthUser;
