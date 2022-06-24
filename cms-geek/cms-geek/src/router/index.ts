import React from 'react';

const Main = React.lazy(() => import('@/layout'))


const Page1 = React.lazy(() => import('@/views/custom/Page1'))
const Page2 = React.lazy(() => import('@/views/custom/Page2'))
const Page3 = React.lazy(() => import('@/views/custom/Page3'))
const User = React.lazy(() => import('@/views/custom/User'))


const routes = [

  {
    path: '/',
    exact: true,
    component: Main,
    children: [
      {
        path: "/main/page1",
        component: Page1
      },
      {
        path: "/main/page2",
        component: Page2
      },
      {
        path: "/main/page3",
        component: Page3
      }
    ]
  },
  {
    path: '/user',
    exact: true,
    component: User
  }
]


export default routes