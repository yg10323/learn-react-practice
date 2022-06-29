import React, { useState } from 'react'
import ExportToExcel from '@/components/common/ExportToExcel'
import { Table } from 'antd'
import { dataSource, columns } from './data'

const Main = () => {
  // 页码
  const [pagination, setPagination] = useState<any>([1, 10])
  const paginationProps = {
    current: pagination[0],
    onChange: (page: number, pageSize: number) => setPagination([page, pageSize])
  }

  // 选择的序号
  const [selectRowKeys, setSelectRowKeys] = useState<any>([])

  const rowSelectionProps = {
    selectRowKeys,
    onChange: (keys: any[]) => setSelectRowKeys(keys)
  }

  return (
    <div>
      Main
      <ExportToExcel
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
        selectedKeys={selectRowKeys}
        queryParams={{ name: 1, age: 2 }}
      />

      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={paginationProps}
        rowSelection={rowSelectionProps}
        rowKey={(record: any) => record.name}
      />
    </div>
  )
}

export default Main