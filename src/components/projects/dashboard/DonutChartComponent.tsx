'use client'
import { CurrencyFormatter } from '@/app/functions/Globals';
import { DonutChart, Legend } from '@tremor/react';

// const valueFormatter = (number: number) =>
//   `$ ${Intl.NumberFormat('us').format(number).toString()}`;
const valueFormatter = (number: number) =>
  `${Intl.NumberFormat('us').format(number).toString()} %`;

export default function DonutChartComponent({data, colors, categories, category, size='w-96 h-96', flexWrap='md:flex-wrap'}: 
    {data:any, colors: string[], categories: string[], category: string, size?: string, flexWrap?: string}) {
  
  type CustomTooltipTypeDonut = {
    payload: any;
    active: boolean | undefined;
    label: any;
  };

  // const customTooltip = (props: CustomTooltipTypeDonut) => {
  //   const { payload, active } = props;
  //   if (!active || !payload) return null;
  //   const categoryPayload = payload?.[0];
  //   if (!categoryPayload) return null;
  //   return (
  //     // <div className='bg-tremor-background'></div>
  //     <div className="w-72 rounded-tremor-default border border-tremor-border p-2 
  //         text-tremor-default shadow-tremor-dropdown bg-slate-600 z-50">
  //       <div className="flex flex-1 space-x-2.5 bg-slate-600 z-50">
  //         <div
  //           className={`flex w-1.5 flex-col bg-${categoryPayload?.color}-500 rounded`}
  //         />
  //         <div className="w-full text-white">
  //           <div className="flex items-center justify-between space-x-8">
  //             <p className="whitespace-nowrap text-right ">
  //             {/* text-tremor-content */}
  //               {categoryPayload.name}
  //             </p>
  //             <p className="whitespace-nowrap text-right font-medium ">
  //             {/* text-tremor-content-emphasis */}
  //               {/* {categoryPayload.value} */}
  //               {CurrencyFormatter({
  //                 currency: 'MXN',
  //                 value: categoryPayload.value
  //               })}
  //             </p>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  const customTooltip = (props: CustomTooltipTypeDonut) => {
    const { payload, active } = props;
    if (!active || !payload) return null;
    const categoryPayload = payload?.[0];
    if (!categoryPayload) return null;
    return (
      // <div className='bg-tremor-background'></div>
      <div className="w-72 rounded-tremor-default border border-tremor-border p-2 
          text-tremor-default shadow-tremor-dropdown bg-slate-600 z-50">
        <div className="flex flex-1 space-x-2.5 bg-slate-600 z-50">
          <div
            className={`flex w-1.5 flex-col bg-${categoryPayload?.color}-500 rounded`}
          />
          <div className="w-full text-white">
            <div className="flex items-center justify-between space-x-8">
              <p className="whitespace-nowrap text-right ">
              {/* text-tremor-content */}
                {categoryPayload.name}
              </p>
              <p className="whitespace-nowrap text-right font-medium ">
              {/* text-tremor-content-emphasis */}
                {categoryPayload.value}%
                {/* {CurrencyFormatter({
                  currency: 'MXN',
                  value: categoryPayload.value
                })} */}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <>
      <div className={`flex items-center justify-center space-x-6 ${flexWrap}`}>
        <DonutChart
          data={data}
          category={category}
          index='label'
          valueFormatter={valueFormatter}
          colors={colors}
          className={size}
          customTooltip={customTooltip}
        />
        <Legend
          categories={categories}
          colors={colors}
          className="max-w-xs z-0"
        />
      </div>
    </>
  );
}
