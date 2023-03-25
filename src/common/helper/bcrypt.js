const { hash, compare, genSaltSync } = require("bcryptjs");

/**
 * representive class of bcrypt package methods
 * @class
 */
class Bcrypt {
  /**
   * @function createHashPass
   * @description creates a hashed password
   * @param {string} password - user password to hash
   * @return {string} hashed password string
   */
  static createHashPass = (password) => {
    return hash(password, genSaltSync(12));
  };

  /**
   * @function compareHashPass
   * @description compares a hashed password with it's original password
   * @param {string} passwordFromUser - password sent in request body
   * @param {string} passwordFromDb - user password in DB
   * @return {boolean} returns true if hashed password is equal to original password
   */
  static compareHashPass = (passwordFromUser, passwordFromDb) => {
    return compare(passwordFromUser, passwordFromDb);
  };
}

module.exports = { Bcrypt };
