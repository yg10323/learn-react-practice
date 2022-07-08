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
      // 在content显示的组件
      {
        path: '/main',
        component: Main,
      },
      {
        path: '/main/page1',
        component: Page1
      },
      {
        path: '/main/page2',
        component: Page2
      },
    ],
    component: Layout
  }
]

export default routes