function errorHandler(err, req, res, next) {
  console.error(err.stack); // Log the error stack to the console for debugging

  // Send a generic error response
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Include stack trace in development
  });
}

module.exports = errorHandler;
