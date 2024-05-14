'use client'
import HeaderForm from "../HeaderForm"
import Label from "../Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Button from "../Button"
import {showToastMessage, showToastMessageError} from "../Alert"
import { useState, useEffect } from "react"
import SelectMultipleReact from "../SelectMultipleReact"
//import DatePicker from 'react-datepicker'
import { Options } from "@/interfaces/Common";
import Calendar, { DateObject } from "react-multi-date-picker";
import MultiRangeSlider from "multi-range-slider-react";

export default function Filtering({showForm, optCategories, optTypes, 
                      optConditions, FilterData, filterCondition, 
                      filterType, filterCategory, maxAmount }: 
                    {showForm:Function, optCategories: Options[],
                      optTypes: Options[], optConditions: Options[],
                      FilterData:Function, filterCondition:Function,
                      filterType:Function, filterCategory:Function,
                      maxAmount:number  }){
  
  const [types, setTypes] = useState<string[]>([optTypes[0].value]);
  const [categories, setCategories] = useState<string[]>([optCategories[0].value]);
  const [conditions, setConditions] = useState<string[]>([optConditions[0].value]);

  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

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

  function getFormatDate(day:number, month:number, year:number){
    return year.toString() + '-' + (month.toString().length < 2? 
              '0' + month.toString(): month.toString()) + '-' + 
                (day.toString().length < 2? '0' + day.toString(): day.toString())
  }

  useEffect(() => {
    // console.log('usefect');
    // console.log(values);

    if(values.length > 1){
      setStartDate(getFormatDate(values[0].day, values[0].month.number, values[0].year));
      setEndDate(getFormatDate(values[1].day, values[1].month.number, values[1].year));
    }else{
      if(values.length > 0){
        setStartDate(getFormatDate(values[0].day, values[0].month.number, values[0].year));
      }
    }
    
    //https://www.npmjs.com/package/react-multi-date-picker
    //https://shahabyazdi.github.io/react-multi-date-picker/multiple-months/
    
    //"date": "2024-05-02T00:00:00.000Z"
    //new Date(year, monthIndex, day)
    //console.log('new date ', new Date(2024, 2, 1));
  }, [values]);

  // useEffect(() => {
  //   console.log('start ', startDate);
  //   console.log('end ', endDate);
  // }, [startDate, endDate]);

  const onChangeConditions = (values: string[]) => {
    setConditions(values);
    filterCondition(values);
  }

  const onChangeTypes = (values: string[]) => {
    setTypes(values);
    filterType(values);
  }

  const onChangeCategories = (values: string[]) => {
    setCategories(values);
    filterCategory(values);
  }

  return(
    <>
      <form className="z-50 top-16 fixed bg-white space-y-5 p-3 right-0 h-screen">
        <div className="flex justify-between">
          <HeaderForm img="/img/role.svg" subtitle="Filtra proyectos por diferentes caracteristicas" 
            title="Filtrar proyecto"
          />
          <XMarkIcon className="w-6 h-6 text-slate-500 cursor-pointer" onClick={() => showForm(false)} />
        </div>
        
        <div>
          <Label htmlFor="status"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Status</p></Label>
          <SelectMultipleReact index={0} opts={optConditions} setValue={onChangeConditions} />
        </div>
        <div>
          <Label htmlFor="type"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tipo</p></Label>
          <SelectMultipleReact index={0} opts={optTypes} setValue={onChangeTypes} />
        </div>
        <div>
          <Label htmlFor="category"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Categoria</p></Label>
          <SelectMultipleReact index={0} opts={optCategories} setValue={onChangeCategories} />
        </div>
        <div className="pt-9">
          <MultiRangeSlider
            min={0}
            max={maxAmount}
            step={5}
            minValue={minValue}
            maxValue={maxValue}
            onInput={(e) => {
              handleInput(e);
            }}
            baseClassName='multi-range-slider-black'
            //style={{" border: 'none', boxShadow: 'none', padding: '15px 10px' "}}
            style={{border: 'none', boxShadow: 'none', padding: '15px 10px', backgroundColor: 'white'}}
            label='false'
            ruler='false'
            barLeftColor='red'
            barInnerColor='blue'
            barRightColor='green'
            thumbLeftColor='lime'
            thumbRightColor='lime'
          />
        </div>
        <div>
          <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha</p></Label>
          <Calendar
            value={values}
            //onChange={setValues}
            onChange={(e: any) => setValues(e)}
            range
            numberOfMonths={2}
            showOtherDays
          /> 
        </div>
        {/* <div className="flex justify-center mt-2">
          <Button type="button" 
            onClick={() => 
              {
                FilterData(conditions, types, categories, startDate, endDate); 
                showForm(false)
              }
            }>Guardar</Button>
        </div> */}
      </form>
    </>
  )
}