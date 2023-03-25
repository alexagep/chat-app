const { Router } = require("express");

// import generalValidator from '../../common/middlewares/generalValidator'
// import paginationHandler from '../../common/middlewares/paginationHandler'
const controller = require("./users.controller");
// import validator from './users.validator'
// import auth from '../../services/auth'
const { Auth } = require("../../services/auth");
const router = Router({ mergeParams: true });

router.get(
  "/",
  Auth.check,
  Auth.simpleCheckRoles(["superAdmin"]),
  //   generalValidator(validator.index),
  //   paginationHandler,
  controller.index
);

router.get(
  "/:id",
  Auth.check,
  Auth.simpleCheckRoles(["superAdmin"]),
  //   Auth.checkIdInParamsWithReqUserId,
  //   Auth.checkAdminCanNotGetAdmins,
  //   generalValidator(validator.get),
  controller.getUser
);

router.post(
  "/login",
  // generalValidator(validator.login),
  controller.login
);

router.post(
  "/",
  Auth.check,
  Auth.simpleCheckRoles(["superAdmin"]),
  //   Auth.checkRequestRole,
  //   generalValidator(validator.create),
  controller.create
);

router.patch(
  "/password/:id",
  Auth.check,
  Auth.simpleCheckRoles(["superAdmin", "user"]),
  //   Auth.checkIdInParamsWithReqUserId,
  //   generalValidator(validator.updatePassword),
  controller.updatePassword
);

router.patch(
  "/info/:id",
  Auth.check,
  Auth.simpleCheckRoles(["superAdmin", "user"]),
  //   Auth.checkIdInParamsWithReqUserId,
  //   Auth.checkRoleIsAllowed('role'),
  //   generalValidator(validator.update),
  controller.updateUser
);

router.delete(
  "/:id",
  Auth.check,
  Auth.simpleCheckRoles(["superAdmin"]),
  //   generalValidator(validator.remove),
  controller.removeUser
);

module.exports = router;
