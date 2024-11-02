'use client'

import { DateRangePicker } from '@tremor/react';
import { es } from "date-fns/locale"
import { useState } from 'react';
import { DateRangePickerValue, ProgressCircle } from '@tremor/react';
import Label from '@/components/Label';
import { CurrencyFormatter } from '@/app/functions/Globals';
import { TotalAmountProjects, ConfigMin, DashboardTotalCost } from '@/interfaces/DashboardProjects';
import SelectReact from '@/components/SelectReact';
import { Options } from '@/interfaces/Common';
// import MultiSelectReact from '@/components/MultiSelectReact';
import SelectMultipleReact from '@/components/SelectMultipleReact';

export default function HeaderDashboardPage({handleDate, amountProjects, 
    projectsTotalCost, configMin, activeProjects, projects}: 
  {handleDate: Function, amountProjects: TotalAmountProjects[], projects:Options[], 
    projectsTotalCost: DashboardTotalCost[], configMin: ConfigMin[], activeProjects: number}) {
  
  const [project, setProject] = useState<string[]>([projects[0].value]);
  const [rangeDate, setRangeDate] = useState<DateRangePickerValue>({
    from: new Date(),
    to: new Date(),
  });

  const handleProjects = (value: string[]) => {
    // const aux: string[] = [];
    // value.map((v) => {
    //   aux.push(v.value);
    // });
    //console.log('value => ', value);
    //console.log('aux handle pro => ', value);
    setProject(value);
    if(rangeDate?.from && rangeDate.to){
      handleDate(rangeDate.from, rangeDate.to, value);
    }
  };

  const progress = ((amountProjects[0].totalAmount / configMin[0].lastmeta.amount) * 100).toFixed(2);

  console.log('proyects => => ', project);
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
                  handleDate(e.from.toDateString(), e.to.toDateString(), project);
                }
              }}
              value={rangeDate}
              locale={es}
            />
          </div>
          <div className='sm:w-56 w-96'>
            <Label htmlFor='project'>Proyecto</Label>
            {/* <SelectReact index={0} opts={projects} setValue={handleProjects} /> */}
            <SelectMultipleReact opts={projects} setValue={handleProjects} index={0} />
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

      </div>
    </div>
  )
}
