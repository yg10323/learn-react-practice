import React from 'react'

import { Switch, Route } from 'react-router-dom'

import Page1 from '@/views/custom/Page1'
import Page2 from '@/views/custom/Page2'

export default function Main () {
  return (
    <div>
      <Switch>
        <Route path={"/user/page1"} component={Page1}></Route>
        <Route path={"/user/page2"} component={Page2}></Route>
      </Switch>
    </div>
  )
} 
