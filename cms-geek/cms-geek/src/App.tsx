import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Main from '@/layout'
import Login from '@/views/login/Login'
import { commonStore } from './store'
import './styles/index.less'

export default function App () {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' render={() => commonStore.isLogin ? <Main /> : <Login />}></Route>
        <Route exact path='/login' component={Login}></Route>
      </Switch>
    </BrowserRouter>
  )
}
