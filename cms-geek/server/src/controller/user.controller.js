const logger = require('../utils/logHandle')
const { createToken } = require('../middleware/common.middleware')
const UserService = require('../services/user.service')

class UserController {
  // 注册
  async reigster (ctx, next) {
    try {
      const { user_name, password } = ctx.user;
      const res = await UserService.register(user_name, password)
      ctx.body = {
        code: 200,
        message: '注册成功'
      }
    } catch (error) {
      logger.error('UserController_reigster：', error)
    }
  }
  // 登陆，下发token
  async login (ctx, next) {
    try {
      const { id, user_name } = ctx.user
      const payload = { id, user_name };
      const expire = 60 * 60 * 24;
      const token = createToken(payload, expire);
      if (token) {
        ctx.body = {
          code: 200,
          message: `${user_name}登录成功`,
          userInfo: ctx.user,
          token
        }
      }
    } catch (error) {
      logger.error('UserController_login: ', error)
    }
  }
}

module.exports = new UserController()