'use client'

import { es } from "date-fns/locale"
import { useState, useRef } from 'react';
import { DateRangePicker, DateRangePickerValue, ProgressCircle } from '@tremor/react';
import Label from '@/components/Label';
import { CurrencyFormatter } from '@/app/functions/Globals';
import { TotalAmountProjects, ConfigMin, DashboardTotalCost } from '@/interfaces/DashboardProjects';
import { Options } from '@/interfaces/Common';
import SelectMultipleReact from '@/components/SelectMultipleReact';
import { MoneyFormatter } from '@/app/functions/Globals';
import {Tooltip} from "@nextui-org/react";
import { propsTooltip } from "@/libs/animations";
import { getDate } from "@/libs/dates";

type Params = {
  handleDate: Function, 
  amountProjects: TotalAmountProjects[], 
  projects:Options[], 
  projectsTotalCost: DashboardTotalCost[], 
  configMin: ConfigMin[], 
  activeProjects: number
}

export default function HeaderDashboardPage({handleDate, amountProjects, 
    projectsTotalCost, configMin, activeProjects, projects}: Params) {
 
  const refHability = useRef(true);
  const [project, setProject] = useState<string[]>([projects[0].value]);
  
  const [rangeDate, setRangeDate] = useState<DateRangePickerValue>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  const handleProjects = (value: string[]) => {
    setProject(value);
    if(rangeDate?.from && rangeDate.to){
      handleDate(getDate(rangeDate.from), getDate(rangeDate.to), value);
    }
  };

  let progress;
  if(amountProjects.length > 0){
    progress = (((amountProjects[0]?.totalAmount || 0) / configMin[0].lastmeta.amount) * 100).toFixed(2);
  }else{
    progress = ((0 / configMin[0].lastmeta.amount) * 100).toFixed(2);
  }

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
                  refHability.current = false;
                  handleDate(getDate(e.from), getDate(e.to), project);
                }
              }}
              value={rangeDate}
              locale={es}
            />
          </div>
          <div className='sm:w-56 w-96'>
            <Label htmlFor='project'>Omitir proyecto</Label>
            <SelectMultipleReact opts={projects} setValue={handleProjects} index={0} disabledSelect={refHability.current} />
          </div>
        </div>
      </div>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-3'>
        {/* <div className='w-full text-white border  border-slate-100 shadow-lg shadow-slate-500 p-1 h-full'
            style={{backgroundColor: '#8EA7FF'}}> */}
        <div className='w-full border border-slate-300 bg-white rounded-xl p-1 h-full'>
          {amountProjects.length > 0 && (
            <>
              <p className='text-lg'>{amountProjects[0].projects}</p>
              <p className='text-xs'>PROYECTOS TODOS</p>
              <p className='text-lg text-right mt-2'>{activeProjects}</p>
              <p className='text-xs text-right'>PROYECTOS ACTIVOS</p>
            </>
          )}
        </div>
        <div className="flex items-center bg-white border  border-slate-300 rounded-xl  p-1 
            justify-center gap-x-5">
        {/* <div className='w-full border border-slate-300 bg-white rounded-xl p-1 h-full'> */}
          <ProgressCircle value={Number(progress)}>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-50">
              {progress}%
            </span>
          </ProgressCircle>
          <div>
            <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                content={CurrencyFormatter({
                  currency: 'USD',
                  value: configMin[0].lastmeta.amount
                })} 
                className="text-slate-900 bg-white rounded-md border border-slate-400" placement="top">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                {MoneyFormatter(configMin[0].lastmeta.amount)}
              </p>
            </Tooltip>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              META {configMin[0].lastmeta.year}
            </p>
          </div>
        </div>
        {/* <div className='w-full h-full border  border-slate-100 shadow-lg shadow-slate-500 p-1 
            flex flex-col justify-center items-center' style={{backgroundColor: '#86DDFS'}}> */}
        <div className='w-full h-full border  border-slate-300 p-1 
            flex flex-col justify-center items-center rounded-xl' >
          {projectsTotalCost.length > 0 && (
            <>
              <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                  content={CurrencyFormatter({
                    currency: 'USD',
                    value: projectsTotalCost[0].subtotalCost
                  })} 
                  className="text-slate-900 bg-white rounded-md border border-slate-400" placement="top">
                <p className='text-slate-700 text-sm'>
                  {MoneyFormatter(projectsTotalCost[0].subtotalCost)}
                </p>
              </Tooltip>
              <p className='text-xs'>COSTO TOTAL</p>
              <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                  content={CurrencyFormatter({
                    currency: 'USD',
                    value: projectsTotalCost[0].subtotalCost + projectsTotalCost[0].totalIVA
                  })} 
                  className="text-slate-900 bg-white rounded-md border border-slate-400" placement="top">
                <p className='text-slate-700 text-sm'>
                  {MoneyFormatter(projectsTotalCost[0].subtotalCost + projectsTotalCost[0].totalIVA)}
                </p>
              </Tooltip>
            </>
          )}
        </div>
        {/* <div className='w-full h-full bg-white border  border-slate-100 shadow-lg shadow-slate-500 p-1 
            flex flex-col justify-center items-center'> */}
        <div className='w-full h-full bg-white border  border-slate-300  p-1 
            flex flex-col justify-center items-center rounded-xl'>
          {amountProjects.length > 0 && (
            <>
              <p className='text-xs'>UTILIDAD</p>
              <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                  content={CurrencyFormatter({
                    currency: 'USD',
                    value: amountProjects[0].totalAmount - projectsTotalCost[0].totalCost
                  })} 
                  className="text-slate-900 bg-white rounded-md border border-slate-400" placement="top">
                <p className='text-xs'>
                  {MoneyFormatter(amountProjects[0].totalAmount - projectsTotalCost[0].totalCost)}
                </p>
              </Tooltip>
            </>
          )}
        </div>
        {/* <div className='w-full h-full text-white border  border-slate-100 shadow-lg shadow-slate-500 p-1 
              flex flex-col justify-center items-center' style={{backgroundColor: '#FF9C89'}}> */}
        <div className='w-full h-full border  border-slate-300  p-1 
              flex flex-col justify-center items-center rounded-xl' >
          {amountProjects.length > 0 && (
            <>
              <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                  content={CurrencyFormatter({
                    currency: 'USD',
                    value: amountProjects[0].totalAmount
                  })} 
                  className="text-slate-900 bg-white rounded-md border border-slate-400" placement="top">
                <p className=' text-lg sm:text-xl text-slate-900'>
                  {MoneyFormatter(amountProjects[0].totalAmount)}
                </p>
              </Tooltip>
              <p className='text-xs text-slate-900'>VENTA TOTAL</p>
              <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} 
                  content={CurrencyFormatter({
                    currency: 'USD',
                    value: amountProjects[0].totalAmountTotal
                  })} 
                  className="text-slate-900 bg-white rounded-md border border-slate-400" placement="top">
                <p className=' text-lg sm:text-sm text-slate-900'>
                  {MoneyFormatter(amountProjects[0].totalAmountTotal)}
                </p>
              </Tooltip>
            </>
          )}
        </div>

      </div>
    </div>
  )
}