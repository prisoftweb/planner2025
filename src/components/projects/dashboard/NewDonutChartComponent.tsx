'use client'
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart, registerables, ArcElement, defaults, plugins } from "chart.js";
//Chart.register(...registerables);
import 'chart.js/auto'; // ADD THIS
Chart.register(ArcElement);
import { useRef } from 'react';
import { DonutChartJS } from '@/interfaces/DashboardProjects';

// defaults.maintainAspectRatio = false;
// defaults.responsive = true;

// defaults.plugins.title.display = true;
// defaults.plugins.title.align = 'start';
// defaults.plugins.title.color = 'black';

export default function NewDonutChartComponent({data}: {data: DonutChartJS}) {
  // export default function NewDonutChartComponent({data}: {data: any}) {
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

  console.log('new donut');

  // renderChar();

  const ref = useRef();

  // const options = {
  //   plugins: {
  //     legend : {position: "left"}
  //   }
  // }

  return <Doughnut ref={ref} data={data} width={3} height={3} />

  // return (
  //   <>
  //     {/* <Doughnut data={data} /> */}
  //     {/* <RenderChar /> */}
  //   </>
  // )
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

  // if(myChart){
  //   myChart.destroy();
  // }

  // myChart = new Chart('charClient', {type: 'doughnut', data: newData});
  const ref = useRef();

  return <Doughnut ref={ref} data={newData} />
}

export const ChartLine = (): JSX.Element => {
  const ref = useRef();

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'First dataset',
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)'
      },
      {
        label: 'Second dataset',
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: '#742774',
      },
    ],
  };

  return <Line ref={ref} data={data} />
};