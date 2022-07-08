import Header from './Header'
import Sider from './Sider'

const Main = (props: any) => {
  return (
    <div>
      <div><Header /></div>
      <div><Sider /></div>
      <div>{props.children}</div>
    </div>
  )
}

export default Main