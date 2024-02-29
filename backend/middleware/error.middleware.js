import ErrorHandler from "../utils/errorHandler.js";

const errorMiddleware = (err, req, res, next) => {
  // Set a default status code if not already set
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  // Handle specific error types
  if (err.name === "CastError") {
    const message = `Resource not found! Invalid ${err.path}`;
    // err.statusCode = 400; // Set status code explicitly
    // err.message = message;
    // const statusCode = 400;
    err.message = message;
    err.statusCode = 400;
    // err = new ErrorHandler(statusCode, message);
    console.log(err);
  }

  // Check if statusCode is still undefined or not a valid HTTP status code
  //   if (
  //     !err.statusCode ||
  //     typeof err.statusCode !== "number" ||
  //     err.statusCode < 100 ||
  //     err.statusCode >= 600
  //   ) {
  //     err.statusCode = 500; // Default to internal server error
  //   }

  // Send response
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errorMiddleware;
