'use client'
import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables, ArcElement, defaults } from "chart.js";
//Chart.register(...registerables);
Chart.register(ArcElement);
import { DonutChartJS } from '@/interfaces/DashboardProjects';

// defaults.maintainAspectRatio = false;
// defaults.responsive = true;

// defaults.plugins.title.display = true;
// defaults.plugins.title.align = 'start';
// defaults.plugins.title.color = 'black';

export default function NewDonutChartComponent({data}: {data: DonutChartJS}) {
  // const dataP = {
  //   labels: [
  //     'Red',
  //     'Blue',
  //     'Yellow'
  //   ],
  //   datasets: [{
  //     label: 'My First Dataset',
  //     data: [300, 50, 100],
  //     backgroundColor: [
  //       'rgb(255, 99, 132)',
  //       'rgb(54, 162, 235)',
  //       'rgb(255, 205, 86)'
  //     ],
  //     hoverOffset: 4
  //   }]
  // };

  // const dataJ = [{
  //   "label": "title 1",
  //   "value": 1
  // }, 
  // {
  //   "label": "title 2",
  //   "value": 2
  // },
  // {
  //   "label": "title 3",
  //   "value": 3
  // }];

  // const dataP = {
  //   labels: dataJ.map((d) => d.label),
  //   datasets: [
  //     {
  //       label: "count", 
  //       data: dataJ.map((d) => d.value),
  //       backgroundColor: [
  //         'rgb(255, 99, 132)',
  //         'rgb(54, 162, 235)',
  //         'rgb(255, 205, 86)',
  //       ],
  //       borderColor: [
  //         'rgb(255, 99, 132)',
  //         'rgb(54, 162, 235)',
  //         'rgb(255, 205, 86)',
  //       ],
  //       borderRadious: 5
  //     },
  //   ],
  // }

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

  return (
    <>
      <Doughnut data={data} />
      {/* <Doughnut data={newData} options={{
        plugins: {
          title: {
            text: "titulo"
          }
        }
      }} /> */}
    </>
  )
}
