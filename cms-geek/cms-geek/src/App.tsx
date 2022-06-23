import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Main from '@/views/layout/Main'
import Login from '@/views/login/Login'
import { commonStore } from './store'
import './styles/index.less'

export default function App () {
  return (
    <BrowserRouter>
      <Switch>
        {/* 方式二: 高阶组件 ? */}
        {/* 下面这种写法,当没有token时,跳转登陆页面会导致url为 / */}
        <Route exact path='/' render={() => commonStore.isLogin ? <Main /> : <Login />}></Route>
        <Route exact path='/login' component={Login}></Route>
      </Switch>
    </BrowserRouter>
  )
}
