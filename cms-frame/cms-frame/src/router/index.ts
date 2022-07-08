import React from "react";

const Layout = React.lazy(() => import('src/layout'))
const Login = React.lazy(() => import('src/modules/login'))
const Main = React.lazy(() => import('src/modules/main'))

const Page2 = React.lazy(() => import('src/modules/custom/Page2'))
const Page1 = React.lazy(() => import('src/modules/custom/Page1'))

const routes = [
  {
    path: '/',
    exact: false,
    redirect: '/main',
    children: [
      {
        path: '/login',
        component: Login
      },
      {
        path: '/main',
        component: Main,
        children: [
          {
            path: '/page1',
            component: Page1
          },
          {
            path: '/page2',
            component: Page2
          },
        ]
      }
    ],
    component: Layout
  }
]

export default routes