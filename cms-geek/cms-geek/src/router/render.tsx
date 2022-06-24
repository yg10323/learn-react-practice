import React from 'react';
import { matchPath, Route, Redirect } from 'react-router-dom'


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
          console.log(routeProps, matchExact)

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

export default generatorRoute