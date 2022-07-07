import React from 'react'
import ReactECharts from 'echarts-for-react';



export default function Chart () {
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {},
    series: [
      {
        type: 'line',
        data: [23, 24, 18, 25, 27, 28, 25]
      }
    ]
  };

  return (
    <div>
      <ReactECharts option={option} />
    </div>
  )
}
