const { Router }  = require('express');
const usersRouter = require('./users/users.route.js');
const { message } = require('../common/messages.js');

const router = Router({ mergeParams: true })



router.use('/api/users', usersRouter)


router.use('*', (req, res) => {
  const error = {
    statusCode: 404,
    message: message.NOT_FOUND_ROUTE_ERROR
  }
  res.json(error)
})

// export default router
module.exports = router
