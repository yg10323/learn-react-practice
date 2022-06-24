import React from 'react'
import Header from './Header'
import Sider from './Sider'
import Main from './Main'

export default function Index () {
  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="sider">
        <Sider />
      </div>
      <div className="main">
        <Main />
      </div>
    </div>
  )
}
