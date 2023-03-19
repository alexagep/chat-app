const db = require("../../../db/models");
const responseMessage = require("../../common/responseMessage");

async function create(req, res, next) {
  try {
    const { username, password } = req.body;

    const user = await db.User.create({
      username,
      password,
    });

    delete user.dataValues.password;

    console.log(user.dataValues);
    responseMessage({
      res,
      statusCode: 201,
      data: user.dataValues,
    });
  } catch (error) {
    // console.error("Error creating user:", error);
    next(error);
  }
}

module.exports = { create };
