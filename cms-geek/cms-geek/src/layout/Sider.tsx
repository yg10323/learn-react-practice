import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Sider () {

  const history = useHistory()
  const handleClick = (path: string) => {
    history.push(path)
  }

  return (
    <div>
      Sider
      <button onClick={() => handleClick('/user/page1')} >page1</button>
      <button onClick={() => handleClick('/user/page2')} >page2</button>
    </div>
  )
}
