'use client'
import { BarChart } from '@tremor/react';
import { CurrencyFormatter } from '@/app/functions/Globals';

export function BarChartComponent({data, colors, categories}: 
  {data:any, colors: string[], categories: string[]}) {
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
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong px-5 border-b border-slate-300 pb-2">
        GASTOS POR MES
      </h3>

      <BarChart
        className="h-72"
        //data={chartdata}
        data={data}
        index="label"
        //categories={['Running']}
        categories={categories}
        colors={colors}
        //colors={['blue']}
        yAxisWidth={56}
        customTooltip={customTooltip}
      />

      {/* <div className="relative">
        <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong px-5">
          GASTOS POR MES
        </h3>

        <div className="absolute top-[48px] left-0 right-0 h-px bg-slate-300 z-10" />
        <BarChart
          className="h-72"
          //data={chartdata}
          data={data}
          index="label"
          //categories={['Running']}
          categories={categories}
          colors={colors}
          //colors={['blue']}
          yAxisWidth={56}
          customTooltip={customTooltip}
        />
      </div> */}
    </>
  );
}