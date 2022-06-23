import { makeAutoObservable } from 'mobx'
import { message } from 'antd'
import { handleToken } from '@/utils/tools'
import { $api } from '@/plugins'

class CommonStore {
  token: string

  constructor () {
    this.token = handleToken('getToken') || ''

    makeAutoObservable(this)
  }

  get isLogin () {
    return !!handleToken('getToken')
  }

  login (user_name: string, password: string) {
    return $api['user/login']({
      user_name,
      password
    }).then((res: any) => {
      if (res.status) {
        this.token = res.token
        handleToken('setToken', res.token)
        message.success(res.message)
      } else {
        message.error(res.message)
      }
      return res.status
    })
  }

}


const commonStore = new CommonStore()

export default commonStore