'use client'
import Label from "@/components/Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { useState, useEffect } from "react"
import SelectMultipleReact from "@/components/SelectMultipleReact"
import { Options } from "@/interfaces/Common";
import MultiRangeSlider from "multi-range-slider-react";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { GiSettingsKnobs } from "react-icons/gi"
import { getProjectsLV } from "@/app/api/routeProjects"
import { showToastMessageError } from "../Alert"
import { getCatalogsByNameAndCondition } from "@/app/api/routeCatalogs"
import { DateRangePicker, DateRangePickerValue, } from "@tremor/react";
import { es } from "date-fns/locale"

export default function FilteringInvoiceComponent({showForm, FilterData, maxAmount, token }: 
  {showForm:Function, FilterData:Function, maxAmount:number, token:string }){
  
  const [conditions, setConditions] = useState<string[]>([]);
  const [projects, setProjects] = useState<string[]>([]);

  const [optConditions, setOptConditions] = useState<Options[]>([]);
  const [optProjects, setOptProjects] = useState<Options[]>([]);

  const [rangeDate, setRangeDate] = useState<DateRangePickerValue>({
    from: new Date('2024-01-02'),
    to: new Date('2024-10-30'),
  });

  const [minValue, set_minValue] = useState(0);
  const [maxValue, set_maxValue] = useState(maxAmount);

  const handleInput = (e:any) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await getProjectsLV(token);
      if(typeof(res)=='string'){
        showToastMessageError(res);
      }else{
        setOptProjects([{
          label: 'TODOS',
          value: 'all'
        }, ...res]);
        setProjects(['all']);
      }

      const res2 = await getCatalogsByNameAndCondition(token, 'invoices');
      if(typeof(res2)=='string'){
        showToastMessageError(res2);
      }else{
        setOptConditions([{
          label: 'TODOS',
          value: 'all'
        }, ...res2]);
        setConditions(['all']);
      }
    }
    fetch();
  }, []);

  useEffect(() => {
    if(rangeDate.from && rangeDate.to){
      FilterData(conditions, minValue, maxValue, projects, rangeDate.from?.getTime(), rangeDate.to?.getTime());
    }
  }, [ conditions, minValue, maxValue, projects, rangeDate]);

  const handleCondition = (value:string[]) => {
    setConditions(value);
  }

  const handleProjects = (value:string[]) => {
    setProjects(value);
  }

  return(
    <>
      <form className="z-10 top-16 absolute bg-white space-y-5 p-3 right-0 h-screen">
        <div className="flex justify-between">
          <div className="flex mt-2 items-center">
            <GiSettingsKnobs className="w-8 h-8 text-slate-600" />
            <div className="ml-3">
              <p className="text-xl">Filtrar facturas</p>
              <p className="text-gray-500 text-sm">Filtra facturas por diferentes caracteristicas</p>
            </div>
          </div>
          <XMarkIcon className="w-8 h-8 text-slate-500
            hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={() => showForm(false)} />
        </div>
        
        {optProjects.length > 0 && optConditions.length > 0 ? (
          <>
            <div className="">
              <Label htmlFor="status"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Status</p></Label>
              <SelectMultipleReact index={0} opts={optConditions} setValue={handleCondition} />
            </div>
            <div className="">
              <Label htmlFor="project"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proyecto</p></Label>
              <SelectMultipleReact index={0} opts={optProjects} setValue={handleProjects} />
            </div>
            <div className="pt-0">
              <Label htmlFor="amount"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Monto</p></Label>
              <MultiRangeSlider
                min={0}
                max={maxAmount}
                step={5}
                minValue={minValue}
                maxValue={maxValue}
                onInput={(e) => {
                  handleInput(e);
                }}
                style={{border: 'none', boxShadow: 'none', padding: '15px 10px', 
                    backgroundColor: 'white', 'zIndex': '0'}}
                label='false'
                ruler='false'
                barLeftColor='red'
                barInnerColor='blue'
                barRightColor='green'
                thumbLeftColor='lime'
                thumbRightColor='lime'
              />
              <div className="flex justify-between">
                <p>{CurrencyFormatter({
                      currency: "USD",
                      value: minValue
                    })}</p>
                <p>{CurrencyFormatter({
                      currency: "USD",
                      value: maxValue
                    })}</p>
              </div>
            </div>
            <div>
              <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha</p></Label>
              <DateRangePicker 
                className='mt-2'
                placeholder='Seleccione un rango de fechas'
                onValueChange={(e) => {
                  setRangeDate(e);
                }}
                value={rangeDate}
                locale={es}
              />
            </div>
          </>
        ): (
          <p>Cargando..</p>
        )}
      </form>
    </>
  )
}