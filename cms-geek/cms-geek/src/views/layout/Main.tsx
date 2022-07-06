import { Table } from 'antd';
import { useState } from 'react';
import { ExportToExcel } from '@/components'
import { data, columns } from './data'



const Main = () => {
  const [dataSource, setDataSource] = useState<any>([])
  const rowSelection = {
    onChange: (keys: any[], rows: any[]) => {
      setDataSource(rows)
    }
  };

  return (
    <div>
      <ExportToExcel
        tableID='table-export'
        columns={columns}
        dataSource={dataSource}
      />
      <div id='table-export'>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      </div>
    </div>
  );
};

export default Main;