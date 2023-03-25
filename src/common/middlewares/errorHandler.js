const responseMessage = require('../responseMessage');
const { messages } = require('../messages.js');

/**
 * @function errorHandler
 * @description error handler middleware for catching errors ocurred in app controllers
 * @param {string} err - ocurred error in controllers
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @param {function} next - function that sends request to the next middleware
 */
// eslint-disable-next-line no-unused-vars
module.exports = async (err, req, res, next) => {
  const { name, status, message } = err,
    sequelizeErrorDisptcher = {
      SequelizeUniqueConstraintError: messages.UNIQUE_CONSTRAINT_ERROR,
      SequelizeForeignKeyConstraintError:
        messages.FOREIGN_KEY_CONSTRAINT_ERROR,
    },
    sequelizeErrorMessage = name && sequelizeErrorDisptcher[name];

  responseMessage({
    res,
    statusCode: (sequelizeErrorMessage && 400) || status || 500,
    status: "error",
    data: status ? message : sequelizeErrorMessage || messages.SERVER_ERROR,
    errStack: err.stack,
  });
};
