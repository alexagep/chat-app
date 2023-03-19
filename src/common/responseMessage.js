/**
 * @function responseMessage
 * @description gets environment variable's value
 * @param {object} res - express response object
 * @param {number} statusCode - user response status code
 * @param {string} status - response status (success or error)
 * @param {object | string} data - server's processing result
 * @param {string} errStack - err object stack
 */
module.exports = ({
  res,
  statusCode = 200,
  status = "success",
  data,
}) => {
  console.log(statusCode);
  res.status(statusCode).json({
    data: {
      status,
      message: data,
    },
  });
};
