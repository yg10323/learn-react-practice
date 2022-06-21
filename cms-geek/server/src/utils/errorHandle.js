const $consts = require('../constants')

// 状态码 401 请勿重复设置

// 异常处理方法
const errorHandler = (error, ctx) => {
  let message, code;

  switch (error.message) {
    case $consts['ERROR/ACCOUNT_OR_PASSWORD_IS_EMPTY']:
      code = 400
      message = '用户名或密码为空'
      break;

    case $consts['ERROR/ACCOUNT_ALREADY_EXIST']:
      code = 400
      message = '用户名已存在'
      break;

    case $consts['ERROR/ACCOUNT_DOES_NOT_EXIST']:
      code = 400
      message = '账号不存在'
      break;

    case $consts['ERROR/PASSWORD_IS_WRONG']:
      code = 400
      message = '密码错误'
      break;

    case $consts['ERROR/UNAUTHORIZATION']:
      code = 401
      message = '无效token或缺少缺失'
      break;

    case $consts['ERROR/UNAUTHORIZED_OPERATION']:
      code = 400
      message = '越权操作'
      break;

    default:
      code = 404
      message = 'NOT FOUND'
  }

  // 返回状态码以及提示信息
  ctx.body = {
    code,
    message
  }
}


module.exports = errorHandler