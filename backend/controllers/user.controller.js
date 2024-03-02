import ErrorHandler from "../utils/errorHandler.js";
import asyncHandler from "../middleware/asyncErrorHandler.js";
import User from "../models/user.model.js";
import saveJWTtocookies from "../utils/saveJWTtoken.js";

// register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: { public_id: "this is dummy id", url: "dummy url" },
  });

  saveJWTtocookies(user, 200, res);
});

//login user
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler(400, "Enter email and password first"));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler(401, "Invalid  email or passwor!"));
  }
  const isPasswordMatched = user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler(401, "Invalid email and password"));
  }

  saveJWTtocookies(user, 200, res);
});

// logout user

const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export { registerUser, loginUser, logoutUser };
