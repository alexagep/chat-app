const db = require("../../../db/models");
const { Bcrypt } = require("../../common/helper/bcrypt");
const { messages } = require("../../common/messages");
const responseMessage = require("../../common/responseMessage");
const { Auth } = require("../../services/auth");
const mailer = require("../../services/mailer");

chatPage = (req, res, next) => {
  try {
    res.sendFile(__dirname + "/chat.html");
  } catch (error) {
    return next(error);
  }
};

verifyOtpCode = async (req, res, next) => {
  try {
    const { otp } = req.body;

    const user = await db.User.findOne({ where: { otp } });

    if (!user) {
      responseMessage({
        res,
        statusCode: 400,
        data: messages.WRONG_OTP,
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

    const email = user.dataValues.email

    const otp = await mailer.sendMail(email);

    await db.User.update({ otp }, { where: { email } });

    const token = await Auth.generateOtpToken({ ...user.dataValues });


    responseMessage({
      res,
      data: { otpToken: token, message: messages.SENDING_OTP_MESSAGE },
    });
  } catch (error) {
    next(error);
  }
};



module.exports = {
  chatPage,
  verifyOtpCode,
  login,
};
