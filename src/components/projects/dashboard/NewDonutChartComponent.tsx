'use client'
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from "chart.js";
import 'chart.js/auto'; // ADD THIS
Chart.register(ArcElement);
import { useRef } from 'react';
import { DonutChartJS } from '@/interfaces/DashboardProjects';

export default function NewDonutChartComponent({data}: {data: DonutChartJS}) {

  const ref = useRef();

  return <Doughnut ref={ref} data={data} width={3} height={3} />
}

export const RenderChar = (): JSX.Element => {
  const newData = {
    labels: ['data 1', 'data 2', 'data 3'],
    datasets: [
      {
        label: 'Projectos por cliente',
        data: [1, 2, 3],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',          
        ],
        hoverOffset: 4
      }
    ]
  };

  const ref = useRef();

  return <Doughnut ref={ref} data={newData} />
}

// export const ChartLine = (): JSX.Element => {
//   const ref = useRef();

//   const data = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//     datasets: [
//       {
//         label: 'First dataset',
//         data: [33, 53, 85, 41, 44, 65],
//         fill: true,
//         backgroundColor: 'rgba(75,192,192,0.2)',
//         borderColor: 'rgba(75,192,192,1)'
//       },
//       {
//         label: 'Second dataset',
//         data: [33, 25, 35, 51, 54, 76],
//         fill: false,
//         borderColor: '#742774',
//       },
//     ],
//   };

//   return <Line ref={ref} data={data} />
// };