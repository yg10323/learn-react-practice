import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Layout from '@/views/layout/Layout'
import Login from '@/views/login/Login'
import './styles/index.less'
import './styles/index.css'

export default function App () {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Layout}></Route>
        <Route exact path='/login' component={Login}></Route>
      </Switch>
    </BrowserRouter>
  )
}
