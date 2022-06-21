const connection = require('../db')
const logger = require('../utils/logHandle')

class UserService {

  // 判断用户是否存在
  async isUserExists (user_name) {
    try {
      const statement = `SELECT * FROM USER WHERE user_name=?;`
      const [res] = await connection.execute(statement, [user_name])
      return res
    } catch (error) {
      logger.error('UserService_isUserExists：', error)
    }
  }

  // 注册
  async register (user_name, password) {
    try {
      const statement = `INSERT INTO user (user_name, password) VALUES (?, ?);`
      const [res] = await connection.execute(statement, [user_name, password])
      return res
    } catch (error) {
      logger.error('UserService_register：', error)
    }
  }
}

module.exports = new UserService()