/**
 * ExportToExcel
 * @returns 
 */
// import { Table } from 'antd';
// import { useState } from 'react';
// import { ExportToExcel } from '@/components'
// import { data, columns } from './data'


// const Main = () => {
//   const [dataSource, setDataSource] = useState<any>([])
//   const rowSelection = {
//     onChange: (keys: any[], rows: any[]) => {
//       setDataSource(rows)
//     }
//   };

//   return (
//     <div>
//       <ExportToExcel
//         tableID='table-export'
//         columns={columns}
//         dataSource={dataSource}
//       />
//       <div id='table-export'>
//         <Table
//           rowSelection={rowSelection}
//           columns={columns}
//           dataSource={data}
//         />
//       </div>
//     </div>
//   );
// };

/**
 * //TODO echarts 
 * @returns 
 */
// import { Chart } from '@/components'

// const Main = () => {
//   return (
//     <div>
//       <Chart />
//     </div>
//   )
// }


/**
 * EasyModal
 * @returns 
 */
// import { useContext } from 'react';
// import { EasyModal, ModalContext } from '@/components'
// import { Button } from 'antd'

// const Test = () => {
//   const modalContext = useContext(ModalContext)

//   const handleClose = () => {
//     modalContext && modalContext.close()
//   }

//   return (
//     <Button onClick={handleClose}>取消</Button>
//   )
// }

// const Main = () => {

//   return (
//     <div>
//       <EasyModal>
//         你好呀
//         <Test />
//       </EasyModal>
//     </div>
//   )
// }


const Main = () => {
  return (
    <div>
      Main
    </div>
  )
}

export default Main;