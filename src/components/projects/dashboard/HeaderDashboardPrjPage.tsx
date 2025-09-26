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

type Params = {
  handleDate: Function, 
  amountProjects: TotalAmountProjects[], 
  projects:Options[], 
  projectsTotalCost: DashboardTotalCost[], 
  configMin: ConfigMin[], 
  activeProjects: number,
  numEvaluado: number
}

export default function HeaderDashboardPrjPage({handleDate, amountProjects, 
    projectsTotalCost, configMin, activeProjects, projects, numEvaluado}: Params) {

  let props = {
    variants: {
      exit: {
        opacity: 0,
        transition: {
          duration: 0.1,
          ease: "easeIn",
        }
      },
      enter: {
        opacity: 1,
        transition: {
          duration: 0.15,
          ease: "easeOut",
        }
      },
    },
  }
  
  const refHability = useRef(true);
  const [project, setProject] = useState<string[]>([projects[0].value]);
  // const [rangeDate, setRangeDate] = useState<DateRangePickerValue>({
  //   from: new Date('2024-01-02'),
  //   to: new Date('2024-10-30'),
  // });

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

  // console.log('amount prjs => ', amountProjects);

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
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-3'>
        <div className='w-full border border-slate-300 bg-white rounded-xl p-3 h-full'>
          {amountProjects.length > 0 && (
            <>
              <p className='text-xs  text-slate-700 mt-2 px-2 font-semibold'>PROYECTOS TODOS</p>
              <p className='text-3xl text-black mt-3 px-2 font-bold'>{amountProjects[0].projects}</p>
            </>
          )}
        </div>
        <div className='w-full border border-slate-300 bg-white rounded-xl p-3 h-full'>
          {amountProjects.length > 0 && (
            <>
              <p className='text-xs text-slate-600 mt-2 px-2 font-semibold'>PROYECTOS EN EJECUCION</p>
              <p className='text-3xl text-black mt-3 px-2 font-bold'>{activeProjects}</p>
            </>
          )}
        </div>
        <div className='w-full border border-slate-300 bg-white rounded-xl p-3 h-full'>
          {amountProjects.length > 0 && (
            <>
            <p className='text-xs text-slate-600 mt-2 px-2 font-semibold'>PROYECTOS EN EVALUACION</p>
              <p className='text-3xl text-black mt-3 px-2 font-bold'>{numEvaluado}</p>
            </>
          )}
        </div>
        <div className="w-full border border-slate-300 bg-white rounded-xl p-3 h-full">
          <p className="text-xs  text-slate-600 mt-2 px-2 font-semibold">
            AVANCE GENERAL
          </p>
          <Tooltip closeDelay={0} delay={100} motionProps={props} 
              content={CurrencyFormatter({
                currency: 'USD',
                value: configMin[0].lastmeta.amount
              })} 
              className="text-slate-900 bg-white rounded-md border border-slate-400" placement="top">
            <p className="text-3xl text-black mt-3 px-2 font-bold">
              {MoneyFormatter(configMin[0].lastmeta.amount)}
            </p>
          </Tooltip>
        </div>

      </div>
    </div>
  )
}

function getDate(date: Date){
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()

  if(month < 10){
    return `${year}-0${month}-${day}`;
  }else{
    return `${year}-${month}-${day}`;
  }
}