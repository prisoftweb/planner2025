'use client'

import { GiShoppingBag } from 'react-icons/gi';
import { BsBarChartFill } from 'react-icons/bs';
import { DatePicker, DateRangePicker } from '@tremor/react';
import { es } from "date-fns/locale"
//import {} from "date-/locale"

export default function StatisticsHeader({handleDate}: {handleDate: Function}) {
  return (
    <div>
      <div className='flex justify-end p-3'>
        <DateRangePicker 
          //onChange={(e) => console.log('change date range =>', e)} 
          onValueChange={(e) => {
            console.log('change date range => ', e);
            if(e.from && e.to){
              handleDate(e.from.toDateString(), e.to.toDateString());
            }
          }}
          locale={es}
        />
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
