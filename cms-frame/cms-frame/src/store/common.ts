import storage from 'localforage'
import { makeAutoObservable, toJS } from 'mobx'
import { $api, $consts } from 'src/plugins'

class CommonStore {

  constructor () {
    makeAutoObservable(this)
  }
}

const commonStore = new CommonStore()

export default commonStore