const db = require("../../../db/models");
const { messages } = require("../../common/messages");
const responseMessage = require("../../common/responseMessage");
const { Bcrypt } = require("../../common/helper/bcrypt");
const { Auth } = require("../../services/auth");

create = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await db.User.create({
      username,
      password,
    });

    delete user.dataValues.password;

    responseMessage({
      res,
      statusCode: 201,
      data: user.dataValues,
    });
  } catch (error) {
    // console.error("Error creating user:", error);
    return next(error);
  }
};

removeUser = async (req, res, next) => {
  try {
    const user = await db.User.findOne({ ...req.params });

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
    return next(error);
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
    return next(error);
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
    return next(error);
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
    return next(error);
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

    const compared = await Bcrypt.compareHashPass(currentPassword, password);

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
    return next(error);
  }
};

login = async (req, res, next) => {
  try {
    const { password, username } = req.body;

    const user = await db.User.findOne({ where: { username } });

    if (!user) {
      responseMessage({
        res,
        statusCode: 400,
        data: messages.USER_NOT_FOUND,
      });
    }

    const storedPass = user.dataValues.password;

    const compared = await Bcrypt.compareHashPass(password, storedPass);

    if (!compared) {
      responseMessage({
        res,
        statusCode: 400,
        data: messages.INVALID_LOGIN,
      });
    }

    const token = await Auth.generateToken({ ...user.dataValues });

    responseMessage({
      res,
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  removeUser,
  getUser,
  index,
  updateUser,
  updatePassword,
  login,
};
