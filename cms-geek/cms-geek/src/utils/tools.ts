import { $consts } from '@/plugins'


/**
 * 使用localStorage存取token
 * @param method 操作方式：存入/读取
 * @param token 
 */
export const handleToken = (method: string, token?: string) => {
  let res;
  switch (method) {
    case 'setToken':
      res = localStorage.setItem($consts['COMMON/KEY_TOKEN'], token as string);
      break
    case 'getToken':
      res = localStorage.getItem($consts['COMMON/KEY_TOKEN']);
      break;
    default:
      localStorage.clear()
  }
  return res
}


/**
 * 获取当前环境对应的基础请求地址
 * @param prefix 接口的分隔符, 用于接口的版本维护
 * @returns baseURL
 */
export const getBaseUrl = (prefix: string = $consts['CONFIG/API_DEAULT_PREFIX']) => {
  //获取当前运行环境的主机名/地址, 如 localhost, 127.0.0.1
  const { hostname } = window.location
  // PROCESS_ENV中对应当前环境的数组项
  const process_env = $consts['CONFIG/PROCESS_ENV'].find((env: any) => env.value.indexOf(hostname) !== -1) || { name: 'PRODUCTION_ENV' }
  // 根据 PROCESS_ENV 的 name 属性查找 axios 的 baseURL
  const axiosUrl = $consts['CONFIG/AXIOS_BASE_URL'].find((item: any) => item.name === process_env.name).value
  // 获取端口并拼接成完整的baseURL  localhost:3000/api
  const apiPort = $consts['CONFIG/API_PORT'].find((port: any) => port.name === process_env.name).value
  const baseURL = `${axiosUrl}:${apiPort}${prefix}`

  return baseURL
}

/**
 * 获取完整的url路径, localhost:3000/api/user/login
 * @param path 接口的相对路径 /user/login
 */
export const getApiUrl = (path: string) => {
  return `${getBaseUrl()}${path}`
}

/**
 * 根据query参数动态拼接url
 * @param path url相对地址
 * @param params query参数
 */
export const concatQueryUrl = (path: string, params: any) => {
  let url = `${getApiUrl(path)}?`
  const queryArr = [] as any
  for (const [key, value] of Object.entries(params)) {
    queryArr.push(`${key}=${value}`)
  }
  url += queryArr.join('&')
  return url
}