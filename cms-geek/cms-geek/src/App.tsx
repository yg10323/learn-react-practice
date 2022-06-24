import React, { Suspense } from 'react'
import { BrowserRouter, Switch, Route, matchPath, Redirect } from 'react-router-dom'
import Main from '@/layout'
import Login from '@/views/login/Login'
import { commonStore } from './store'
import './styles/index.less'

import routes from '@/router'

const generatorRoute = (routes: any[]) => {
  return routes.map((route: any, index: number) => {
    const { path, exact = true, redirect, children, component: RouterComponent } = route
    return (
      <Route
        key={`${path}-${index}`}
        exact={exact}
        path={path}
        render={(routeProps) => {
          const { match, location } = routeProps
          const matchExact = matchPath(location.pathname, {
            path: match.path,
            exact: true,
            strict: true
          })
          return (
            <RouterComponent {...routeProps}>
              {redirect && matchExact ? <Redirect to={redirect} /> : null}
              {Array.isArray(children) && children.length ? generatorRoute(children) : null}
            </RouterComponent>
          )
        }}
      />

    )
  })
}

export default function App () {
  return (
    <BrowserRouter>
      <Switch>
        {/* 方式二: 高阶组件 ? */}
        {/* 下面这种写法,当没有token时,跳转登陆页面会导致url为 / */}
        {/* <Route exact path='/' render={() => commonStore.isLogin ?
          <Switch>
            <Suspense fallback={<div />}>
              {generatorRoute(routes)}
            </Suspense>
          </Switch>
          : <Login />}></Route> */}
        {/* <Route exact path='/' >{commonStore.isLogin ? <Main /> : <Redirect to='/login' />}</Route> */}
        {/* <Route path='/login' component={Login}></Route> */}
        <Suspense fallback={<div />}>
          {generatorRoute(routes)}
        </Suspense>
      </Switch>
    </BrowserRouter>
  )
}
