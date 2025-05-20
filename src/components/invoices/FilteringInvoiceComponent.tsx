'use client'
import Label from "@/components/Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { useState, useEffect } from "react"
import SelectMultipleReact from "@/components/SelectMultipleReact"
import { Options } from "@/interfaces/Common";
// import Calendar, { DateObject } from "react-multi-date-picker";
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

  // const [firstDate, setFirstDate] = useState<Date>(new Date('2024-03-11'));
  // const [secondDate, setSecondDate] = useState<Date>(new Date('2024-07-11'));
  
  // const [values, setValues] = useState([
  //   new DateObject().setDay(4).subtract(1, "month"),
  //   new DateObject().setDay(4).add(1, "month")
  // ])

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

  // useEffect(() => {
  //   if(values.length > 1){
  //     setFirstDate(new Date(values[0].year, values[0].month.number - 1, values[0].day));
  //     setSecondDate(new Date(values[1].year, values[1].month.number - 1, values[1].day));
  //   }else{
  //     if(values.length > 0){
  //       setFirstDate(new Date(values[0].year, values[0].month.number - 1, values[0].day));
  //     }
  //   }
  // }, [values]);

  useEffect(() => {
    if(rangeDate.from && rangeDate.to){
      FilterData(conditions, minValue, maxValue, projects, rangeDate.from?.getTime(), rangeDate.to?.getTime());
    }
  }, [ conditions, minValue, maxValue, projects, rangeDate]);

  // const applyFilter = () => {
  //   FilterData(conditions, minValue, maxValue, firstDate?.getTime(), secondDate?.getTime(), projects);
  // }

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
          {/* <HeaderForm img="/img/role.svg" subtitle="Filtra proyectos por diferentes caracteristicas" 
            title="Filtrar proyecto"
          /> */}
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
                      currency: "MXN",
                      value: minValue
                    })}</p>
                <p>{CurrencyFormatter({
                      currency: "MXN",
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
                  // if(e.from && e.to){
                  //   handleDate(e.from, e.to);
                  // }
                }}
                value={rangeDate}
                locale={es}
              />
              {/* <Calendar
                className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
                  focus:border-slate-700 outline-0"
                value={values}
                onChange={(e: any) => setValues(e)}
                range
                numberOfMonths={2}
                showOtherDays
                style={{'padding': '10px', 'marginTop': '5px', 'borderRadius': '5px', 
                  'height': '35px', 'width': '330px'}}
              />  */}
            </div>
            {/* <div className="flex justify-center">
              <Button type="button" onClick={applyFilter}>Filtrar</Button>
            </div> */}
          </>
        ): (
          <p>Cargando..</p>
        )}
      </form>
    </>
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