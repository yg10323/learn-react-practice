/**
 * PROCESS_ENV AXIOS_BASE_URL API_PORT三者中value的对象成员中的
 * name属性需要一一对应
 */

const config = [
  {
    name: 'API_DEAULT_PREFIX',
    value: '/api'
  },
  // 根据 hostname 判断对应的运行环境, 再根据环境获取对应的 baseURL
  {
    name: 'PROCESS_ENV',
    value: [
      {
        name: 'LOCAL_BASE',
        value: ['localhost']
      }
    ]
  },
  // axios请求时对应的 baseURL
  {
    name: 'AXIOS_BASE_URL',
    value: [
      {
        name: 'LOCAL_BASE',
        value: 'http://localhost'
      }
    ]
  },
  // axios请求时的端口号
  {
    name: 'API_PORT',
    value: [
      {
        name: 'LOCAL_BASE',
        value: 4410
      }
    ]
  }
]

export default config