'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { DonutChartJS } from '@/interfaces/DashboardProjects';
import { MoneyFormatter } from '@/app/functions/Globals';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

// export default function VerticalBarChart({labels, datasets}: {labels: string[], datasets:any[]}) {
export default function VerticalBarChart({labels, datasets}: {labels: string[], datasets:DonutChartJS}) {

  // const data = {
  //   labels,
  //   datasets
  // }

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context:any) {
            const index = context.dataIndex;
            const label = context.label || '';
            const value = context.raw;
            const description = labels[index] || 'Sin descripción';

            // Cada string es una línea en el tooltip
            return [
              `${label}: ${description}%`,       // Línea 1
              `${MoneyFormatter(value)}`            // Línea 2
            ];
          },
        },
      },
    },
  };

  return (
    <div>
      <Bar options={options} data={datasets} />
    </div>
  )
}
