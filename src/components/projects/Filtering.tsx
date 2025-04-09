'use client'
import Label from "../Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { useState, useEffect } from "react"
import SelectMultipleReact from "../SelectMultipleReact"
import { Options } from "@/interfaces/Common";
import Calendar, { DateObject } from "react-multi-date-picker";
import MultiRangeSlider from "multi-range-slider-react";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { GiSettingsKnobs } from "react-icons/gi"

type Props = {
  showForm:Function, 
  optCategories: Options[],
  optTypes: Options[], 
  optConditions: Options[],
  FilterData:Function, 
  maxAmount:number 
}

export default function Filtering({showForm, optCategories, optTypes, 
  optConditions, FilterData, maxAmount }: Props){
  
  const [types, setTypes] = useState<string[]>([optTypes[0].value]);
  const [categories, setCategories] = useState<string[]>([optCategories[0].value]);
  const [conditions, setConditions] = useState<string[]>([optConditions[0].value]);

  const [firstDate, setFirstDate] = useState<Date>(new Date('2024-03-11'));
  const [secondDate, setSecondDate] = useState<Date>(new Date('2024-07-11'));
  
  const [values, setValues] = useState([
    new DateObject().setDay(4).subtract(1, "month"),
    new DateObject().setDay(4).add(1, "month")
  ]);

  const handleValues = (dateValues: DateObject[]) => {
    setValues(dateValues);
    if(dateValues.length > 1){
      setFirstDate(new Date(dateValues[0].year, dateValues[0].month.number - 1, dateValues[0].day));
      setSecondDate(new Date(dateValues[1].year, dateValues[1].month.number - 1, dateValues[1].day));
      filterfunction(conditions, types, categories, minValue, maxValue, 
        new Date(dateValues[0].year, dateValues[0].month.number - 1, dateValues[0].day), 
        new Date(dateValues[1].year, dateValues[1].month.number - 1, dateValues[1].day));
    }else{
      if(values.length > 0){
        setFirstDate(new Date(values[0].year, values[0].month.number - 1, values[0].day));
      }
    }
  }

  const [minValue, set_minValue] = useState(0);
  const [maxValue, set_maxValue] = useState(maxAmount);

  const handleInput = (e:any) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

  useEffect(() => {
    FilterData(conditions, types, categories, minValue, maxValue, firstDate?.getTime(), secondDate?.getTime());
  }, [ minValue, maxValue]);

  const handleCondition = (value:string[]) => {
    setConditions(value);
    filterfunction(value, types, categories, minValue, 
      maxValue, firstDate, secondDate);
  }

  const handleTypes = (value:string[]) => {
    setTypes(value);
    filterfunction(conditions, value, categories, minValue, 
      maxValue, firstDate, secondDate);
  }

  const handleCategories = (value:string[]) => {
    setCategories(value);
    filterfunction(conditions, types, value, minValue, 
      maxValue, firstDate, secondDate);
  }

  const filterfunction = (condSel:string[], typSel:string[], catSel:string[], minVal:number, 
    maxVal:number, dateini:Date, dateend:Date ) => {
      FilterData(condSel, typSel, catSel, minVal, maxVal, dateini?.getTime(), dateend?.getTime());
  }

  return(
    <>
      <form className="z-10 top-16 fixed bg-white space-y-5 p-3 right-0 h-screen">
        <div className="flex justify-between">
          <div className="flex mt-2 items-center">
            <GiSettingsKnobs className="w-8 h-8 text-slate-600" />
            <div className="ml-3">
              <p className="text-xl">Filtrar proyecto</p>
              <p className="text-gray-500 text-sm">Filtra proyectos por diferentes caracteristicas</p>
            </div>
          </div>
          <XMarkIcon className="w-8 h-8 text-slate-500
            hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={() => showForm(false)} />
        </div>
        
        <div className="">
          <Label htmlFor="status"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Status</p></Label>
          <SelectMultipleReact index={0} opts={optConditions} setValue={handleCondition} />
        </div>
        <div className="">
          <Label htmlFor="type"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tipo</p></Label>
          <SelectMultipleReact index={0} opts={optTypes} setValue={handleTypes} />
        </div>
        <div>
          <Label htmlFor="category"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Categoria</p></Label>
          <SelectMultipleReact index={0} opts={optCategories} setValue={handleCategories} />
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
          <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha</p></Label>
          <Calendar
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
              focus:border-slate-700 outline-0"
            value={values}
            onChange={(e: any) => {
              handleValues(e);
            }}
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