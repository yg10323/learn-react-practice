import Main from './Main'

/** 根据不同的路由显示不同页面 */
const Layout = (props: any) => {
  return (
    <div>
      <Main>{props.children}</Main>
    </div>
  )
}

export default Layout