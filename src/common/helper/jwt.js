// const pify = require("pify");
const { sign, verify } = require("jsonwebtoken");
const { messages } = require("../messages.js");
const { promisify } = require('util');

const signAsync = promisify(sign);
const verifyAsync = promisify(verify);

/**
 * representive class of bcrypt package methods
 * @class
 */
class JWT {
  /**
   * @function verifyToken
   * @description verifies if received token is valid or not
   * @param {string} token - received user token
   * @return {object} token payload
   */
  static async verifyToken(token) {
    try {
      return await verifyAsync(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      responseMessage({
        res,
        statusCode: 401,
        data: messages.TOKEN_EXPIRED,
      });
    }
  }

  /**
   * @function createToken
   * @description creates a token for logged in user
   * @param {string} id - logged in user id
   * @param {object} Role - logged in user role information object
   * @return {string} created token
   */
  static createToken({ id, role }) {
    return signAsync({ id, role }, process.env.JWT_SECRET_KEY);
  }
}

module.exports = { JWT };
