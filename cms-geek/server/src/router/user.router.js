const Router = require('koa-router')
const {
  verifyRegister,
  verifyLogin
} = require('../middleware/user.middleware')
const {
  reigster,
  login
} = require('../controller/user.controller')
const userRouter = new Router({ prefix: '/api/user' })

userRouter.post('/register', verifyRegister, reigster)
userRouter.post('/login', verifyLogin, login)

module.exports = userRouter
