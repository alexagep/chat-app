const db = require("../../../db/models");
const { messages } = require("../../common/messages");
const responseMessage = require("../../common/responseMessage");
const { hash, compare, genSaltSync } = require("bcryptjs");

create = async (req, res, next) => {
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
    return next(error);;
  }
};

removeUser = async (req, res, next) => {
  try {
    const user = await db.User.findOne({ ...req.params });

    console.log(user);
    if (
      !user
      //   ||
      //   (req.user.role === "admin" && user.dataValues.role === "superAdmin") ||
      //   (req.user.role === "admin" && user.dataValues.id !== req.user.id)
    ) {
      responseMessage({
        res,
        statusCode: 400,
        data: messages.USER_NOT_FOUND,
      });
    }

    const deletedDocument = await db.User.destroy({
      where: { ...req.params },
    });

    responseMessage({
      res,
      data: deletedDocument,
    });
  } catch (error) {
    return next(error);;
  }
};

getUser = async (req, res, next) => {
  try {
    let id = req.params.id;

    const user = await db.User.findOne({ where: { id } });
    responseMessage({
      res,
      data: user,
    });
  } catch (error) {
    return next(error);;
  }
};

index = async (req, res, next) => {
  try {
    // let { startTimeStamp, endTimeStamp, limit, offs } = req.query,
    //   role = req.user.role === "superAdmin" ? null : "user",
    //   clause = utility.filterQueryBuilder({
    //     startTimeStamp,
    //     endTimeStamp,
    //   }),
    //   documents = await db.User.findAllUsersApiKey(
    //     clause,
    //     role,
    //     limit,
    //     offs
    //   );

    const users = await db.User.findAll();

    responseMessage({
      res,
      data: users,
    });
  } catch (error) {
    return next(error);;
  }
};

updateUser = async (req, res, next) => {
  try {
    const user = await db.User.findOne({ ...req.params });

    if (
      !user
      //   ||
      //   (req.user.role !== "superAdmin" &&
      //     user.dataValues.role === "admin" &&
      //     user.dataValues.id !== req.user.id)
    ) {
      responseMessage({
        res,
        statusCode: 400,
        data: messages.USER_NOT_FOUND,
      });
    }

    const updatedDocument = await db.User.update(
      {
        ...req.body,
      },
      {
        where: {
          ...req.params,
        },
      }
    );
    responseMessage({
      res,
      data: updatedDocument,
    });
  } catch (error) {
    return next(error);;
  }
};

updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    if (confirmNewPassword !== newPassword) {
      responseMessage({
        res,
        statusCode: 400,
        data: messages.INCORRECT_CONFIRM_PASSWORD,
      });
    }

    const user = await db.User.findOne({ where: { ...req.params } });

    console.log(user.dataValues);
    if (
      !user
      //   ||
      //   (req.user.role !== "superAdmin" &&
      //     user.dataValues.role === "admin" &&
      //     user.dataValues.id !== req.user.id)
    ) {
      responseMessage({
        res,
        statusCode: 400,
        data: messages.USER_NOT_FOUND,
      });
    }

    const { password } = user.dataValues;

    const compared = await compare(currentPassword, password);
    console.log(compared);
    if (!compared) {
      responseMessage({
        res,
        statusCode: 400,
        data: messages.INVALID_LOGIN,
      });
    }

    const updatedDocument = await db.User.update(
      { password: newPassword },
      {
        where: {
          ...req.params,
        },
      }
    );

    responseMessage({
      res,
      data: updatedDocument,
    });
  } catch (error) {
    return next(error);;
  }
};

module.exports = {
  create,
  removeUser,
  getUser,
  index,
  updateUser,
  updatePassword,
};
