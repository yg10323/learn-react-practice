const mysql2 = require('mysql2')
const $consts = require('../constants')
const logger = require('../utils/logHandle')

// // 创建连接池
const connections = mysql2.createPool({
  host: $consts['DB/HOST'],
  port: $consts['DB/PORT'],
  user: $consts['DB/USER'],
  password: $consts['DB/PASSWORD'],
  database: $consts['DB/DATABASE'],
})

// 连接测试
connections.getConnection((err, ctx) => {
  if (err) {
    console.log('数据库连接失败: ', err);
    logger.error('连接数据库出错_' + err);
  } else {
    console.log('数据库已连接, 端口:', $consts['DB/PORT']);
  }
})

module.exports = connections.promise()