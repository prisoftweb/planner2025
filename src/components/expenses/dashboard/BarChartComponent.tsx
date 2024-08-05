'use client'
import { BarChart } from '@tremor/react';
import { CurrencyFormatter } from '@/app/functions/Globals';

// const chartdata = [
//   {
//     date: 'Jan 23',
//     Running: 167,
//   },
//   {
//     date: 'Feb 23',
//     Running: 125,
//   },
//   {
//     date: 'Mar 23',
//     Running: 156,
//   },
//   {
//     date: 'Apr 23',
//     Running: 165,
//   },
//   {
//     date: 'May 23',
//     Running: 153,
//   },
//   {
//     date: 'Jun 23',
//     Running: 124,
//   },
//   {
//     date: 'Jul 23',
//     Running: 164,
//   },
//   {
//     date: 'Aug 23',
//     Running: 123,
//   },
//   {
//     date: 'Sep 23',
//     Running: 132,
//   },
// ];

export function BarChartComponent({data, colors, categories, category}: 
  {data:any, colors: string[], categories: string[], category: string}) {
  type CustomTooltipTypeBar = {
    payload: any;
    active: boolean | undefined;
    label: any;
  };

  const customTooltip = (props: CustomTooltipTypeBar) => {
    const { payload, active } = props;
    if (!active || !payload) return null;
    return (
      <div className="w-56 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown">
        {payload.map((category: any, idx: number) => (
          <div key={idx} className="flex flex-1 space-x-2.5">
            <div
              className={`flex w-1 flex-col bg-${category.color}-500 rounded`}
            />
            <div className="space-y-1">
              <p className="text-tremor-content">{category.dataKey}</p>
              <p className="font-medium text-tremor-content-emphasis">
                {/* {category.value} bpm */}
                {CurrencyFormatter({
                  currency: 'MXN',
                  value: category.value
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  return (
    <>
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        GASTOS POR MES
      </h3>
      <BarChart
        className="mt-4 h-72"
        //data={chartdata}
        data={data}
        index="label"
        //categories={['Running']}
        categories={categories}
        colors={colors}
        //colors={['blue']}
        yAxisWidth={48}
        customTooltip={customTooltip}
      />
    </>
  );
}