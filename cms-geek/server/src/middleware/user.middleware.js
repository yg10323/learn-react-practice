const logger = require('../utils/logHandle')
const $consts = require('../constants')
const UserService = require('../services/user.service')
const { encryption } = require('./common.middleware')


class UserMiddleware {
  // 注册验证
  async verifyRegister (ctx, next) {
    try {
      let { user_name, password } = ctx.request.body
      // 1. 用户信息是否完整
      if (!user_name || !password) {
        const error = new Error($consts['ERROR/ACCOUNT_OR_PASSWORD_IS_EMPTY'])
        return ctx.app.emit('error', error, ctx)
      }
      // 2. 用户是否存在
      const userRes = await UserService.isUserExists(user_name)
      if (userRes.length) {
        const error = new Error($consts['ERROR/ACCOUNT_ALREADY_EXIST']);
        return ctx.app.emit('error', error, ctx);
      }
      // 3. 密码加密
      password = encryption(password);
      ctx.user = { user_name, password };
      await next();
    } catch (error) {
      logger.error('UserMiddleware_verifyRegister： ', error)
    }
  }

  // 登陆验证
  async verifyLogin (ctx, next) {
    try {
      let { user_name, password } = ctx.request.body
      // 1. 用户信息是否完整
      if (!user_name || !password) {
        const error = new Error($consts['ERROR/ACCOUNT_OR_PASSWORD_IS_EMPTY'])
        return ctx.app.emit('error', error, ctx)
      }
      // 2. 用户是否存在
      const res = await UserService.isUserExists(user_name)
      const userRes = res[0]
      if (!userRes) {
        const error = new Error($consts['ERROR/ACCOUNT_DOES_NOT_EXIST']);
        return ctx.app.emit('error', error, ctx);
      }
      // 3.密码是否正确
      password = encryption(password)
      if (password !== userRes.password) {
        const error = new Error($consts['ERROR/PASSWORD_IS_WRONG'])
        return ctx.app.emit('error', error, ctx)
      }
      ctx.user = { id: userRes.id, user_name }
      await next()
    } catch (error) {
      logger.error('SellerMiddleware_verifyLogin：', error)
    }
  }
}


module.exports = new UserMiddleware()