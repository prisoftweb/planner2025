'use client'

import { GiShoppingBag } from 'react-icons/gi';
import { BsBarChartFill } from 'react-icons/bs';
import { DateRangePicker } from '@tremor/react';
import { es } from "date-fns/locale"
//import MultiSelectReact from '@/components/MultiSelectReact';
//import SelectMultipleReact from '@/components/SelectMultipleReact';
import SelectReact from '@/components/SelectReact';
import { Options } from '@/interfaces/Common';
import { useState } from 'react';
import { DateRangePickerValue } from '@tremor/react';
import Label from '@/components/Label';

export default function StatisticsHeader({handleDate, projects}: {handleDate: Function, projects:Options[]}) {
  const [project, setProject] = useState<string>(projects[0].value);
  const [rangeDate, setRangeDate] = useState<DateRangePickerValue>();

  //console.log('header proyects => ', projects);
  const handleProjects = (value: string) => {
    setProject(value);
    if(rangeDate?.from && rangeDate.to){
      handleDate(rangeDate.from, rangeDate.to, project);
    }
  };
  return (
    <div>
      <div>
        <div className='flex justify-end p-3 gap-x-5 mt-2'>
          <div>
            <Label htmlFor='date'>Fecha</Label>
            <DateRangePicker 
              className='mt-2'
              placeholder='Seleccione un rango de fechas'
              onValueChange={(e) => {
                console.log('change date range => ', e);
                if(e.from && e.to){
                  setRangeDate(e);
                  handleDate(e.from.toDateString(), e.to.toDateString(), project);
                }
              }}
              locale={es}
            />
          </div>
          <div className='w-56'>
            <Label htmlFor='project'>Proyecto</Label>
            <SelectReact index={0} opts={projects} setValue={handleProjects} />
            {/* <SelectMultipleReact opts={projects} setValue={() => {}} index={0} /> */}
          </div>
        </div>
      </div>
      <div className='w-full grid grid-cols-3 gap-x-7'>
        <div className='flex items-center gap-x-2 bg-white border 
            border-slate-100 shadow-lg shadow-slate-500 p-5'>
          <div>
            <GiShoppingBag className='w-12 h-auto' />
          </div>
          <div>
            <p className='text-lg'>12 gastos hoy</p>
          </div>
        </div>

        <div className='flex items-center gap-x-2 bg-white border border-slate-100 
            shadow-lg shadow-slate-500 p-5'>
          <div>
            <GiShoppingBag className='w-12 h-auto' />
          </div>
          <div>
            <p className='text-2xl'>137</p>
            <p>Gastos ingresados</p>
          </div>
        </div>

        <div className='flex items-center gap-x-2 bg-white border border-slate-100 
            shadow-lg shadow-slate-500 p-5'>
          <div>
            <p className='text-2xl'>316</p>
            <p>$2,709,333 ULTIMO MES</p>
          </div>
          <div>
            <BsBarChartFill className='w-12 h-auto' />
          </div>
        </div>

      </div>
    </div>
  )
}
