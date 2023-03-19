const { Router } = require("express");

// import generalValidator from '../../common/middlewares/generalValidator'
// import paginationHandler from '../../common/middlewares/paginationHandler'
const controller = require("./users.controller");
// import validator from './users.validator'
// import auth from '../../services/auth'
const router = Router({ mergeParams: true });

router.get(
  '/',
//   auth.check,
//   auth.simpleCheckRoles( [ 'superAdmin', 'admin'  ] ),
//   generalValidator(validator.index),
//   paginationHandler,
  controller.index
)

router.get(
  '/:id',
//   auth.check,
//   auth.simpleCheckRoles( [ 'superAdmin', 'admin'  , 'user' ] ),
//   auth.checkIdInParamsWithReqUserId,
//   auth.checkAdminCanNotGetAdmins,
//   generalValidator(validator.get),
  controller.getUser
)

// router.post(
//   '/login',
//   generalValidator(validator.login),
//   controller.login
// )

router.post(
  "/",
  //   auth.check,
  //   auth.simpleCheckRoles( [ 'superAdmin', 'admin'  ] ),
  //   auth.checkRequestRole,
  //   generalValidator(validator.create),
  controller.create
);

router.patch(
  '/password/:id',
//   auth.check,
//   auth.simpleCheckRoles( [ 'superAdmin', 'admin' , 'user' ] ),
//   auth.checkIdInParamsWithReqUserId,
//   generalValidator(validator.updatePassword),
  controller.updatePassword
)

router.patch(
  '/info/:id',
//   auth.check,
//   auth.simpleCheckRoles( [ 'superAdmin', 'admin' , 'user' ] ),
//   auth.checkIdInParamsWithReqUserId,
//   auth.checkRoleIsAllowed('role'),
//   generalValidator(validator.update),
  controller.updateUser
)

router.delete(
  "/:id",
  //   auth.check,
  //   auth.simpleCheckRoles( [ 'superAdmin', 'admin'  ] ),
  //   generalValidator(validator.remove),
  controller.removeUser
);

module.exports = router;
