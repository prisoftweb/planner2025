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
import { DateRangePickerValue, ProgressCircle } from '@tremor/react';
import Label from '@/components/Label';
import { CostsGroupByResumen, CostsGroupResumenByType } from '@/interfaces/DashboardsCosts';
import { CurrencyFormatter, MoneyFormatter } from '@/app/functions/Globals';
import {Tooltip} from "@nextui-org/react";

export default function StatisticsHeader({handleDate, projects, costsResumen, costsResumenType}: 
    {handleDate: Function, projects:Options[], costsResumen:CostsGroupByResumen[], 
      costsResumenType:CostsGroupResumenByType[]}) {

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

  const [project, setProject] = useState<string>(projects[0].value);
  const [rangeDate, setRangeDate] = useState<DateRangePickerValue>({
    from: new Date(),
    to: new Date(),
  });

  //console.log('header proyects => ', projects);
  //console.log('header cost resumen => ', costsResumen);
  const handleProjects = (value: string) => {
    setProject(value);
    if(rangeDate?.from && rangeDate.to){
      //console.log('handle proyect => ');
      //handleDate(rangeDate.from, rangeDate.to, project);
      handleDate(rangeDate.from, rangeDate.to, value);
    }
  };
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
                //console.log('change date range => ', e);
                setRangeDate(e);
                if(e.from && e.to){
                  //setRangeDate(e);
                  handleDate(e.from.toDateString(), e.to.toDateString(), project);
                }
              }}
              value={rangeDate}
              locale={es}
            />
          </div>
          <div className='sm:w-56 w-96'>
            <Label htmlFor='project'>Proyecto</Label>
            <SelectReact index={0} opts={projects} setValue={handleProjects} />
            {/* <SelectMultipleReact opts={projects} setValue={() => {}} index={0} /> */}
          </div>
        </div>
      </div>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-3'>
        <div className='grid grid-cols-3 gap-x-1 bg-white border 
            border-slate-100 shadow-lg shadow-slate-500 p-1'>
          <div className='w-full h-full flex flex-col justify-center items-center'>
            <GiShoppingBag className='w-12 h-auto' />
            {/* <p className='text-xs'>NO DEDUCIBLES</p>
            <p className='text-3xl'>$4,137</p> */}
            {costsResumenType.length > 0 && (
              <>
                <p className='text-xs'>{costsResumenType[0].tipo}</p>
                <p className=' text-lg sm:text-xl'>
                  {/* {CurrencyFormatter({
                    currency: 'MXN',
                    value: costsResumenType[0].subtotalCost
                  })} */}
                  {MoneyFormatter(costsResumenType[0].subtotalCost)}
                </p>
              </>
            )}
          </div>
          <div className='w-full h-full flex flex-col justify-center'>
            {/* <p className='text-xs'>PROVEEDORES</p>
            <p className='text-3xl'>$90,083</p> */}
            {costsResumenType.length > 1 && (
              <>
                <p className='text-xs'>{costsResumenType[1].tipo}</p>
                <p className='text-lg sm:text-xl'>
                  {/* {CurrencyFormatter({
                    currency: 'MXN',
                    value: costsResumenType[1].subtotalCost
                  })} */}
                  {MoneyFormatter(costsResumenType[1].subtotalCost)}
                </p>
              </>
            )}
          </div>
          <div>
            {/* <p className='text-xs'>MANO DE OBRA</p>
            <p className='text-3xl'>$345,234</p> */}
            {costsResumenType.length > 2 && (
              <>
                <p className='text-xs'>{costsResumenType[2].tipo}</p>
                <p className='text-lg sm:text-xl'>
                  {/* {CurrencyFormatter({
                    currency: 'MXN',
                    value: costsResumenType[2].subtotalCost
                  })} */}
                  {MoneyFormatter(costsResumenType[2].subtotalCost)}
                </p>
              </>
            )}
          </div>
        </div>

        <div className='flex items-center gap-x-4 bg-white border border-slate-100 
            shadow-lg shadow-slate-500 p-5'>
          <div>
            <ProgressCircle value={75} size="md">
              <span className="text-xs font-medium text-slate-700">75%</span>
            </ProgressCircle>
          </div>
          <div>
            <div>
              {/* <p className='text-2xl'>$1,370,972.00</p> */}
              <p className='text-2xl'>
                {/* {CurrencyFormatter({
                  currency: 'MXN',
                  value: costsResumen.length > 0? costsResumen[0].subtotalCost : 0
                })} */}
                {MoneyFormatter(costsResumen.length > 0? costsResumen[0].subtotalCost : 0)}
              </p>
              <p className='text-xs'>Costo</p>
            </div>
            <div className='mt-3'>
              {/* <p className='text-2xl'>$135,934.00</p> */}
              <p className='text-2xl'>
                {/* {CurrencyFormatter({
                  currency: 'MXN',
                  value: costsResumen.length > 0? costsResumen[0].totalIVA : 0
                })} */}
                {MoneyFormatter(costsResumen.length > 0? costsResumen[0].totalIVA : 0)}
              </p>
              <p className='text-xs'>Iva</p>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-around gap-x-4 bg-white border border-slate-100 
            shadow-lg shadow-slate-500 p-5'>
          <div>
            {/* <p className='text-3xl'>316</p> */}
            <p className='text-2xl'>{costsResumen.length > 0? costsResumen[0].quantity: 0}</p>
            <p className='text-xs'>GRANTOTAL</p>
            {/* <p>$2,709,333</p> */}
            <p className='text-2xl'>
              {/* {CurrencyFormatter({
                currency: 'MXN',
                value: costsResumen.length > 0? costsResumen[0].totalCost : 0
              })} */}
              {MoneyFormatter(costsResumen.length > 0? costsResumen[0].totalCost : 0)}
            </p>
          </div>
          <div>
            <BsBarChartFill className='w-12 h-auto' />
          </div>
        </div>

      </div>
    </div>
  )
}
