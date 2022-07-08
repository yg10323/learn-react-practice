import Header from './Header'
import Sider from './Sider'
import { useMemo } from 'react'
import { useLocation, matchPath } from 'react-router-dom'
const Main = (props: any) => {
  const location = useLocation()

  const matchLogin = useMemo<any>(() => {
    return matchPath(location.pathname, {
      path: '/login',
      exact: true,
      strict: true
    })
  }, [location.pathname])
  return (
    <div>
      {
        matchLogin ? null : (
          <div>
            <div><Header /></div>
            <div><Sider /></div>
          </div>
        )
      }

      <div>{props.children}</div>
    </div>
  )
}

export default Main