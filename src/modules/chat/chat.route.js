const { Router } = require("express");

// import generalValidator from '../../common/middlewares/generalValidator'
const controller = require("./chat.controller");
// import validator from './users.validator'
const { Auth } = require("../../services/auth");
const router = Router({ mergeParams: true });

router.get(
  "/",
  Auth.check,
  Auth.checkOtpToken,
  Auth.simpleCheckRoles(["superAdmin", "user"]),
  //   generalValidator(validator.index),
  controller.chatPage
);


router.post(
  "/otp",
  Auth.checkOtpToken,
  //   Auth.checkRequestRole,
  //   generalValidator(validator.create),
  controller.verifyOtpCode,
);

router.post(
  "/login",
  // generalValidator(validator.login),
  controller.login
);


module.exports = router;
