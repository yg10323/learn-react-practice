import { Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Header: AntdHeader } = Layout;

type Props = {
  collapsed: boolean,
  handleCollapse: Function
}

const Header = (props: Props) => {
  const { collapsed, handleCollapse } = props;
  return (
    <AntdHeader className="site-layout-background" style={{ padding: 0 }}>
      <div className='collapse' onClick={() => handleCollapse()}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <div className='logout'>
        登出
      </div>
    </AntdHeader>
  )
}

export default Header