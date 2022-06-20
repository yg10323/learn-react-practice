const CONSTS_CONFIG = require('./service')
const CONSTS_DEFAULT_CONFIG = require('./config')

class MakeConst {

  constructor (config) {
    this.consts = {}
    this.options = CONSTS_DEFAULT_CONFIG
    this.register(config)
  }

  register (config) {
    Object.keys(config).forEach(namespace => {
      this._build(namespace, config[namespace])
    })
  }

  _build (namespace, config) {
    const { sep } = this.options
    config.forEach(item => {
      const { name, value } = item
      const constName = `${namespace.toUpperCase()}${sep}${name}`
      Object.defineProperty(this.consts, constName, {
        value,
        enumerable: true, // node环境下必需设置可枚举
      })
    })
  }
}


const $consts = new MakeConst(CONSTS_CONFIG)

module.exports = $consts['consts']