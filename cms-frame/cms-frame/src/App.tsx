import { useEffect, useState, Suspense } from 'react'
import { Router, Switch, Route, Redirect, matchPath } from 'react-router-dom'
import { createHashHistory } from 'history'
import { autorun } from 'mobx'
import defaultRoutes from 'src/router'
import { routerStore } from 'src/store'

import 'src/styles/index.less'

const App = () => {
  const generatorRoutes = (routes: any[]) => {
    return routes.map((route: any, index: number) => {
      const { exact = true, path, redirect, children, component: RouterComponent } = route
      return (
        <Route
          key={`${path}-${index}`}
          exact={exact}
          path={path}
          render={(renderProps: any) => {
            const { match, location } = renderProps
            const matchExact = matchPath(location.pathname, {
              path: match.path,
              exact: true,
              strict: true
            })
            return (
              <RouterComponent {...renderProps}>
                {redirect && matchExact ? <Redirect to={redirect} /> : null}
                {Array.isArray(children) && children.length ? generatorRoutes(children) : null}
              </RouterComponent>
            )
          }}
        />
      )
    })
  }

  const [routes, setRoutes] = useState<any>([])
  useEffect(() => autorun(() => {
    setRoutes(routerStore.routes)
  }), [])

  useEffect(() => {
    routerStore.register(defaultRoutes)
  }, [])

  const history = createHashHistory()

  return (
    <Router history={history}>
      <Switch>
        <Suspense fallback={<div />}>
          {generatorRoutes(routes)}
        </Suspense>
      </Switch>
    </Router>
  )
}

export default App