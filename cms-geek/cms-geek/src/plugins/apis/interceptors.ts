const reqSuccess = (reqObj: any) => {
  // todo 请求拦截
  return reqObj
}
const reqFailure = (error: any) => { Promise.reject(error) }

const resSuccess = (res: any) => {
  // todo 相应拦截
  return res.data
}
const resFailure = (error: any) => { Promise.reject(error) }


const interceptors = {
  reqSuccess,
  reqFailure,
  resSuccess,
  resFailure
}

export default interceptors