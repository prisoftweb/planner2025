'use client'
import { DonutChart, Legend } from '@tremor/react';

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`;

export default function DonutChartt({data, colors, categories, category}: 
    {data:any, colors: string[], categories: string[], category: string}) {
  return (
    <>
      <div className="flex items-center justify-center space-x-6">
        <DonutChart
          data={data}
          //category="sales"
          category={category}
          //index="name"
          index='label'
          valueFormatter={valueFormatter}
          colors={colors}
          className="w-40"
        />
        <Legend
          //categories={['New York', 'London', 'Hong Kong', 'San Francisco', 'Singapore']}
          categories={categories}
          //colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia']}
          colors={colors}
          className="max-w-xs"
        />
      </div>
    </>
  );
}
