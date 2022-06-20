import CONSTS_CONFIG from './service'
import CONSTS_DEFAULT_CONFIG from './config'


type Config = {
  [propsName: string]: any
}

type Options = {
  sep: string
}

class MakeConst {
  consts: any
  options: Options

  constructor (config: Config) {
    this.consts = {}
    this.options = CONSTS_DEFAULT_CONFIG
    this.register(config)
  }

  register (config: Config) {
    Object.keys(config).forEach((namespace: string) => {
      this._build(namespace, config[namespace])
    })
  }

  _build (namespace: string, config: any[]) {
    const { sep } = this.options
    config.forEach((consts: Config) => {
      const { name, value } = consts
      const constName = `${namespace.toUpperCase()}${sep}${name}`
      Object.defineProperty(this.consts, constName, { value })
    })
  }
}


const $consts = new MakeConst(CONSTS_CONFIG)

export default $consts['consts']


