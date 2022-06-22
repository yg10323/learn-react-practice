import axios from './axios'
import APIS from './service'
import { getBaseUrl } from '@/utils/tools'
import { API_CONFIG } from './config'
import { isEmpty, assign, pick } from 'lodash'

type Options = {
  sep: string,
  prefix: string,
  debug: boolean
}

type Config = {
  [propsName: string]: any
}

type ConfigItem = {
  name: string,
  method: string,
  path: string,
  params: any,
  axiosOptions: any,
  desc: string
}

type OuterOptions = {
  fullData?: boolean,
  pickParams?: boolean,
  [propsName: string]: any
}

const assert = (condition: boolean | string, msg: string): void => {
  if (!condition) {
    throw new Error(`[ApiError] ${msg}`)
  }
}

class MakeApi {
  api: Config
  options: Options

  constructor (config: Config) {
    this.api = {}
    this.options = API_CONFIG
    this.register(config)
  }

  register (config: Config) {
    Object.keys(config).forEach((namespace: string) => {
      this.__build(namespace, config[namespace])
    })
  }

  __build (namespace: string, config: any[]) {
    const { sep, prefix, debug } = this.options
    config.forEach((item: ConfigItem) => {
      const { name, method, path, params, axiosOptions } = item
      const apiName = `${namespace}${sep}${name}`
      const apiUrl = path

      // api配置项容错判断, 发布时设置 debug为 false
      debug && assert(name, `${apiUrl}的name项不能为空`)
      debug && assert(apiUrl.indexOf(sep) === 0, `${name}的${apiUrl}必须以${sep}开头`)

      Object.defineProperty(this.api, apiName, {
        /**
         * $api['user/register'](outerParam, outerOptions)
         * @param {Object} outerParam axios请求时携带的参数(param/data)
         * @param {Object} outerOptions axios请求时的配置选项, 与url、method等同级, 
         * 会与axiosInstance中的配置合并, 在response.config中可看到这些配置项
         */
        value: (
          outerParams: any,
          num: number = 12,
          outerOptions: OuterOptions = {
            fullData: false, // 控制是否返回全部数据, false 只返回 Data 里面的数据
            pickParams: true  // 是否开启完全参数匹配, true 过滤 outerParam 在 params中不存在的属性
          }
        ) => {
          const _params = isEmpty(outerParams) ? params : assign({}, params, outerParams)
          // axiosOptions 配置项的默认值优先传递
          const _outerOptions = assign({}, outerOptions, axiosOptions)
          // 经过pick处理, 就能以 params 中定义的属性为准, 避免传递不需要的参数给后端
          const _finalParams = outerOptions.pickParams ? pick(_params, Object.keys(params)) : _params
          // 动态 url 处理
          const url = _replaceUrlParams(apiUrl, _params)
          // 获取当前环境对应的 baseURL
          const baseURL = getBaseUrl(prefix)
          return axios(_normalize({
            baseURL,
            url,
            method,
            ..._outerOptions
          }, _finalParams))
        }
      })
    })
  }
}


/**
 * 动态url中的参数替换
 * 例如: path: /user/:id, outerParam: { id: 1 }, 则最终: path: /user/1
 * @param url 
 * @param data 
 * @returns 
 */
const _replaceUrlParams = (url: string, data: any) => {
  return url.replace(/:[\w\d]/ig, (reg, key) => {
    return data[key]
  })
}


/**
 * 决定axios请求携带的参数是 data(POST), 还是 params(GET)
 * @param options axios配置项, 最终会被合并到axiosInstance的配置项中
 * @param data 请求携带的参数: data(POST), params(GET)
 * @returns 
 */
const _normalize = (options: any, data: any) => {
  const method = options.method.toUpperCase()
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    options.data = data
  } else {
    options.params = data
  }

  return options
}

const $api = new MakeApi(APIS)

export default $api['api']