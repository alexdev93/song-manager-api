/**
 * @function errorHandler
 * @description Generic error handler to send a consistent error response
 * @param {Error} error - The error object
 * @param {Object} request - The request object
 * @param {Object} response - The response object
 * @param {Function} next - The next middleware function
 * @returns {undefined}
 */
/**
 * This error handler is a generic middleware function that sends a consistent
 * error response to the client. It takes the error object, request object, response
 * object, and next middleware function as arguments. If the error object has a
 * statusCode property, it is used as the HTTP status code. Otherwise, a status
 * code of 500 is used. If the error object has a message property, it is used as
 * the error message. Otherwise, a default error message of "Internal Server Error"
 * is used. The error response is an object with a success property set to false
 * and an errorMessage property set to the error message.
 */
function errorHandler(error, request, response, next) {
  const statusCode = error.statusCode || 500;
  const errorMessage = error.message || "Internal Server Error";
  const errorResponse = {
    success: false,
    errorMessage,
  };

  response.status(statusCode).json(errorResponse);
}

module.exports = errorHandler;
