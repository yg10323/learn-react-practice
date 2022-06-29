import { Dropdown, Menu, Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import XLSX from 'xlsx'

const ExportToExcel = () => {


  // 导出当前页
  const currentPageExport = () => {

  }

  const handleClick = ({ key }: any) => {
    switch (key) {
      case 'currentPage':
        currentPageExport()
        break
      default:
        break
    }
  }

  const menu = () => {
    return <Menu
      onClick={handleClick}
      items={[
        {
          key: 'currentPage',
          label: '导出当前页'
        }
      ]}
    />
  }
  return (
    <Dropdown overlay={menu}>
      <Button>
        <Space>
          导出
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  )
}


export default ExportToExcel
