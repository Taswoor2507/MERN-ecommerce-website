class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super(message);
    message = this.message;
    statusCode = this.statusCode;
    Error.captureStackTrace(this, this.constructor);
    console.log(this.constructor);
  }
}

export default ErrorHandler;
