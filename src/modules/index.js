const { Router }  = require('express');
const usersRouter = require('./users/users.route.js');
const chatRouter = require('./chat/chat.route.js');

const { messages } = require('../common/messages.js');

const router = Router({ mergeParams: true })



router.use('/api/users', usersRouter)

router.use('/api/chat', chatRouter)


router.use('*', (req, res) => {
  const error = {
    statusCode: 404,
    message: messages.NOT_FOUND_ROUTE_ERROR
  }
  res.json(error)
})

module.exports = router
