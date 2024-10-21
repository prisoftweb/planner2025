'use client'

import { DateRangePicker } from '@tremor/react';
import { es } from "date-fns/locale"
import { useState } from 'react';
import { DateRangePickerValue, ProgressCircle } from '@tremor/react';
import Label from '@/components/Label';
import { CurrencyFormatter } from '@/app/functions/Globals';
import { TotalAmountProjects, ConfigMin, DashboardTotalCost } from '@/interfaces/DashboardProjects';

export default function HeaderDashboardPage({handleDate, amountProjects, 
    projectsTotalCost, configMin, activeProjects}: 
  {handleDate: Function, amountProjects: TotalAmountProjects[], 
    projectsTotalCost: DashboardTotalCost[], configMin: ConfigMin[], activeProjects: number}) {
  
    // const [project, setProject] = useState<string>(projects[0].value);
  const [rangeDate, setRangeDate] = useState<DateRangePickerValue>({
    from: new Date(),
    to: new Date(),
  });

  // const handleProjects = (value: string) => {
  //   setProject(value);
  //   if(rangeDate?.from && rangeDate.to){
  //     handleDate(rangeDate.from, rangeDate.to, value);
  //   }
  // };

  const progress = ((amountProjects[0].totalAmount / configMin[0].lastmeta.amount) * 100).toFixed(2);

  return (
    <div>
      <div>
        <div className='flex flex-wrap justify-end p-3 gap-x-5 gap-y-3 mt-2'>
          <div>
            <Label htmlFor='date'>Fecha</Label>
            <DateRangePicker 
              className='mt-2'
              placeholder='Seleccione un rango de fechas'
              onValueChange={(e) => {
                setRangeDate(e);
                if(e.from && e.to){
                  handleDate(e.from.toDateString(), e.to.toDateString());
                }
              }}
              value={rangeDate}
              locale={es}
            />
          </div>
        </div>
      </div>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-5 gap-y-3'>
        <div className='w-full bg-cyan-500 text-white border  border-slate-100 shadow-lg shadow-slate-500 p-1 
            h-full'>
          {amountProjects.length > 0 && (
            <>
              <p className='text-lg'>{amountProjects[0].projects}</p>
              <p className='text-xs'>PROYECTOS TODOS</p>
              <p className='text-lg text-right mt-2'>{activeProjects}</p>
              <p className='text-xs text-right'>PROYECTOS ACTIVOS</p>
            </>
          )}
        </div>
        <div className="flex items-center bg-white border  border-slate-100 shadow-lg shadow-slate-500 p-1 
            justify-center gap-x-5">
          <ProgressCircle value={Number(progress)}>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-50">
              {progress}%
            </span>
          </ProgressCircle>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
              {CurrencyFormatter({
                currency: 'MXN',
                value: configMin[0].lastmeta.amount
              })}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              META {configMin[0].lastmeta.year}
            </p>
          </div>
        </div>
        <div className='w-full h-full bg-cyan-300 text-white border  border-slate-100 shadow-lg shadow-slate-500 p-1 
            flex flex-col justify-center items-center'>
          {projectsTotalCost.length > 0 && (
            <>
              <p className=' text-lg sm:text-xl'>{CurrencyFormatter({
                currency: 'MXN',
                value: projectsTotalCost[0].totalCost
              })}</p>
              <p className='text-xs'>COSTO TOTAL</p>
            </>
          )}
        </div>
        <div className='w-full h-full bg-white border  border-slate-100 shadow-lg shadow-slate-500 p-1 
            flex flex-col justify-center items-center'>
          {amountProjects.length > 0 && (
            <>
              {/* <p className='text-xs'>MX 1.2M</p> */}
              <p className='text-xs'>UTILIDAD</p>
              {/* <p className='text-xs'>$1,205,704</p> */}
              <p className='text-xs'>{CurrencyFormatter({
                currency: 'MXN',
                value: amountProjects[0].totalAmount - projectsTotalCost[0].totalCost
              })}</p>
            </>
          )}
        </div>
        <div className='w-full h-full bg-rose-400 text-white border  border-slate-100 shadow-lg shadow-slate-500 p-1 
              flex flex-col justify-center items-center'>
          {amountProjects.length > 0 && (
            <>
              <p className=' text-lg sm:text-xl'>{CurrencyFormatter({
                currency: 'MXN',
                value: amountProjects[0].totalAmount
              })}</p>
              <p className='text-xs'>VENTA TOTAL</p>
            </>
          )}
        </div>
        
        {/* <div className='grid grid-cols-5 gap-x-1 bg-white border 
            border-slate-100 shadow-lg shadow-slate-500 p-1'>
          
          
        </div> */}

        {/* <div className='flex items-center gap-x-4 bg-white border border-slate-100 
            shadow-lg shadow-slate-500 p-5'>
          <div>
            <ProgressCircle value={75} size="md">
              <span className="text-xs font-medium text-slate-700">75%</span>
            </ProgressCircle>
          </div>
          <div>
            <div>
              <p className='text-2xl'>{CurrencyFormatter({
                currency: 'MXN',
                value: costsResumen.length > 0? costsResumen[0].subtotalCost : 0
              })}</p>
              <p className='text-xs'>Costo</p>
            </div>
            <div className='mt-3'>
              <p className='text-2xl'>{CurrencyFormatter({
                currency: 'MXN',
                value: costsResumen.length > 0? costsResumen[0].totalIVA : 0
              })}</p>
              <p className='text-xs'>Iva</p>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-around gap-x-4 bg-white border border-slate-100 
            shadow-lg shadow-slate-500 p-5'>
          <div>
            <p className='text-2xl'>{costsResumen.length > 0? costsResumen[0].quantity: 0}</p>
            <p className='text-xs'>GRANTOTAL</p>
            <p className='text-2xl'>{CurrencyFormatter({
              currency: 'MXN',
              value: costsResumen.length > 0? costsResumen[0].totalCost : 0
            })}</p>
          </div>
          <div>
            <BsBarChartFill className='w-12 h-auto' />
          </div>
        </div> */}

      </div>
    </div>
  )
}
