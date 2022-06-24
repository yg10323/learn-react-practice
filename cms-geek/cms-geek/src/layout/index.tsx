import React, { useState, Suspense } from 'react'
import { Layout, Menu } from 'antd';
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import Header from './Header'
import '@/styles/antd/layout.less'

import HOCMain from './Main'
import { NavLink } from 'react-router-dom'

const { Sider, Content } = Layout;


const Main = (props: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const HandleCollapse = () => {
    setCollapsed(!collapsed)
  }

  const changeRouterPage = (params: any) => {
    <NavLink to={params.key}></NavLink>
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['123']}
          // onClick={changeRouterPage}
          items={[
            {
              key: 'parent',
              icon: <UserOutlined />,
              label: '一级目录',
              children: [
                {
                  key: '/main/page1',
                  icon: <UserOutlined />,
                  label: 'Page1',
                },
                {
                  key: '/main/page2',
                  icon: <UserOutlined />,
                  label: 'Page2',
                },
                {
                  key: '/main/page3',
                  icon: <UserOutlined />,
                  label: 'Page3',
                }
              ]
            },
            {
              key: '/user',
              icon: <VideoCameraOutlined />,
              label: 'User',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header collapsed={collapsed} handleCollapse={HandleCollapse} />

        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <HOCMain>
            {props.children}

          </HOCMain>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Main