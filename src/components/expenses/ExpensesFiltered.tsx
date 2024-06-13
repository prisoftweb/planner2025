'use client'
import HeaderForm from "../HeaderForm"
import Label from "../Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { useState, useEffect } from "react"
import SelectMultipleReact from "../SelectMultipleReact"
import { Options } from "@/interfaces/Common";
import Calendar, { DateObject } from "react-multi-date-picker";
import MultiRangeSlider from "multi-range-slider-react";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { GiSettingsKnobs } from "react-icons/gi"

export default function Filtering({showForm, optCategories, optTypes, 
                      optConditions, FilterData, maxAmount, 
                      optProjects, optReports }: 
                    {showForm:Function, optCategories: Options[],
                      optTypes: Options[], optConditions: Options[],
                      FilterData:Function, maxAmount:number, 
                      optProjects:Options[], optReports:Options[]}){
  
  const [types, setTypes] = useState<string[]>([optTypes[0].value]);
  const [categories, setCategories] = useState<string[]>([optCategories[0].value]);
  const [conditions, setConditions] = useState<string[]>([optConditions[0].value]);
  const [projects, setProjects] = useState<string[]>([optProjects[0].value]);
  const [reports, setReports] = useState<string[]>([optReports[0].value]);
  const [heightPage, setHeightPage] = useState<number>(900);

  const [firstDate, setFirstDate] = useState<Date>(new Date('2024-03-11'));
  const [secondDate, setSecondDate] = useState<Date>(new Date('2024-07-11'));
  
  const [values, setValues] = useState([
    new DateObject().setDay(4).subtract(1, "month"),
    new DateObject().setDay(4).add(1, "month")
  ])

  const [minValue, set_minValue] = useState(0);
  const [maxValue, set_maxValue] = useState(maxAmount);

  const handleInput = (e:any) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

  const handleResize = () => {
    setHeightPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
  }

  const handleConditions = (value: string[]) => {
    setConditions(value);
  }

  const handleTypes = (value: string[]) => {
    setTypes(value);
  }

  const handleCategories = (value: string[]) => {
    setCategories(value);
  }

  const handleReports = (value: string[]) => {
    setReports(value);
  }

  const handleProjects = (value: string[]) => {
    setProjects(value);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setHeightPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
  }, []);

  useEffect(() => {
    if(values.length > 1){
      setFirstDate(new Date(values[0].year, values[0].month.number - 1, values[0].day));
      setSecondDate(new Date(values[1].year, values[1].month.number - 1, values[1].day));
    }else{
      if(values.length > 0){
        setFirstDate(new Date(values[0].year, values[0].month.number - 1, values[0].day));
      }
    }
  }, [values]);

  useEffect(() => {
    FilterData(conditions, types, categories, minValue, maxValue, reports, projects, firstDate?.getTime(), secondDate?.getTime());
  }, [ categories, types, conditions, minValue, maxValue, firstDate, secondDate, projects, reports]);

  useEffect (() => {
    FilterData(conditions, types, categories, minValue, maxValue, reports, projects, new Date('2024-03-11').getTime(), new Date('2024-07-11').getTime());
  }, []);

  // useEffect(() => {
  //   FilterData(conditions, types, categories, minValue, maxValue, firstDate?.getTime(), secondDate?.getTime());
  // }, [firstDate, secondDate]);

  return(
    <>
      <form className="z-10 top-16 absolute bg-white space-y-5 p-3 right-0"
        style={{height: `${heightPage}px`}}
      >
        <div className="flex justify-between">
          {/* <HeaderForm img="/img/role.svg" subtitle="Filtra gastos por diferentes caracteristicas" 
            title="Filtrar gasto"
          /> */}
          <div className="flex mt-2 items-center">
            {/* <img src={img} alt="logo" className="rounded-full w-14 h-auto" /> */}
            <GiSettingsKnobs className="w-8 h-8 text-slate-600" />
            <div className="ml-3">
              <p className="text-xl">Filtrar gasto</p>
              <p className="text-gray-500 text-sm">Filtra gastos por diferentes caracteristicas</p>
            </div>
          </div>
          <XMarkIcon className="w-8 h-8 text-slate-500
            hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={() => showForm(false)} />
        </div>
        
        <div className="">
          <Label htmlFor="status"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Status</p></Label>
          <SelectMultipleReact index={0} opts={optConditions} setValue={handleConditions} />
        </div>
        <div className="">
          <Label htmlFor="type"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tipo</p></Label>
          <SelectMultipleReact index={0} opts={optTypes} setValue={handleTypes} />
        </div>
        <div>
          <Label htmlFor="category"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Categoria</p></Label>
          <SelectMultipleReact index={0} opts={optCategories} setValue={handleCategories} />
        </div>
        <div>
          <Label htmlFor="reports"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Reporte</p></Label>
          <SelectMultipleReact index={0} opts={optReports} setValue={handleReports} />
        </div>
        <div>
          <Label htmlFor="projects"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proyectos</p></Label>
          <SelectMultipleReact index={0} opts={optProjects} setValue={handleProjects} />
        </div>
        {/* <div className="pt-9"> */}
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
            //baseClassName='multi-range-slider-black'
            //style={{" border: 'none', boxShadow: 'none', padding: '15px 10px' "}}
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
          <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Rango de fechas</p></Label>
          <Calendar
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
              focus:border-slate-700 outline-0"
            value={values}
            //onChange={setValues}
            onChange={(e: any) => setValues(e)}
            range
            numberOfMonths={2}
            showOtherDays
            style={{'padding': '10px', 'marginTop': '5px', 'borderRadius': '5px', 
              'height': '35px', 'width': '330px'}}
          /> 
        </div>
      </form>
    </>
  )
}