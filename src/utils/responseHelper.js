/**
 * @function sendResponse
 * @description Helper function to send a response from the Express API
 * @param {Response} res - Express response object
 * @param {Number} statusCode - HTTP status code
 * @param {Object} data - Object containing data to be sent in the response
 * @param {String} message - Optional message to be sent in the response
 */
function sendResponse(res, statusCode, payload) {
  res
    .status(statusCode)
    .json(payload);
}


module.exports = sendResponse;
