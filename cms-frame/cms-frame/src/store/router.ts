import { makeAutoObservable, observable, runInAction } from 'mobx'


class RouterStore {
  routes: Array<any>

  constructor () {
    this.routes = []

    makeAutoObservable(this, {
      routes: observable
    })
  }

  register (routes: any[]) {
    runInAction(() => {
      this.routes = routes
    })
  }
}

const routerStore = new RouterStore();
export default routerStore;