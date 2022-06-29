import { Dropdown, Menu, Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import XLSX from 'xlsx'

type Props = {
  fileName?: string,
  columns: any,
  dataSource: any[],
  pagination: any[],
  queryParams?: any,
  rowKey?: string,
  selectedKeys?: number[]
}

const ExportToExcel = (props: Props) => {
  // 导出
  const exportToExcel = (exportData: any[]) => {
    const ws = XLSX.utils.json_to_sheet(exportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'sheet1')
    XLSX.writeFile(wb, `${props.fileName || '表单列表'}.xlsx`)
  }

  // 替换表头为colums中的字段
  const dealTitle = (exportData: any[]) => {
    const titles = props.columns.map((column: any) => column.title)
    const values = exportData.map((data: any) => Object.values(data))
    let formatData = [] as any
    // 如果表格数据为空,默认返回表头数据
    if (values.length) {
      for (const value of values) {
        const tempObj = {} as any
        titles.forEach((title: string, index: number) => {
          tempObj[title] = value[index]
        })
        formatData.push(tempObj)
      }
    } else {
      const tempObj = {} as any
      titles.forEach((title: string) => {
        tempObj[title] = ''
      })
      formatData.push(tempObj)
    }
    return formatData
  }

  // 根据查询条件导出
  const queryExport = () => {
    const { queryParams, dataSource } = props
    // 查询条件不是object或为空object时直接导出当前页
    if (Object.prototype.toString.call(queryParams) !== '[object Object]' || JSON.stringify(queryParams) === '{}') {
      currentPageExport()
      return
    }
    // 条件符合时按条件进行模糊匹配并导出
    let exportData = dataSource.map((data: any) => {
      const matched = [] as any
      for (const [key, value] of Object.entries(queryParams)) {
        if (`${data[key]}`.includes(value as any)) {
          matched.push(true)
        } else {
          matched.push(false)
        }
      }
      const finalMatch = matched.every((match: boolean) => match)
      return finalMatch && data
    }).filter((data: any) => data)

    exportToExcel(exportData)
  }

  // 导出当前页
  const currentPageExport = () => {
    const [page, pageSize] = props.pagination
    const totalCount = props.dataSource.length
    const start = (page - 1) * pageSize
    // 是否是最后一页
    const end = Math.trunc(totalCount / pageSize) + 1 === page ? totalCount : page * pageSize
    let exportData = props.dataSource.slice(start, end)
    exportData = dealTitle(exportData)
    exportToExcel(exportData)
  }

  // 按选择导出
  const selectExport = () => {
    // 先对序号进行排序
    const selectedKeys = props.selectedKeys?.sort((pre: any, next: any) => pre - next) || []
    let exportData = [] as any
    selectedKeys.forEach((key: any) => {
      // 问题 此处 data.name 无法根据 key 动态决定
      // key: 对应Table开启可选择功能时传递的 rowKey参数
      exportData.push(props.dataSource.find((data: any) => data.name === key))
    })
    exportData = dealTitle(exportData)
    exportToExcel(exportData)
  }

  // 处理点击事件
  const handleClick = ({ key }: any) => {
    switch (key) {
      case 'query':
        queryExport()
        break
      case 'currentPage':
        currentPageExport()
        break
      case 'select':
        selectExport()
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
          key: 'query',
          label: '根据条件导出'
        },
        {
          key: 'currentPage',
          label: '导出当前页'
        },
        {
          key: 'select',
          label: '按选择导出',
          disabled: props.selectedKeys?.length ? false : true
        },
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