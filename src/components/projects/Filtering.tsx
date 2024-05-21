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
import { CurrencyFormatter } from "@/app/functions/Globals";

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

  // const [startDate, setStartDate] = useState<string>('');
  // const [endDate, setEndDate] = useState<string>('');

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

  // function getFormatDate(day:number, month:number, year:number){
  //   return year.toString() + '-' + (month.toString().length < 2? 
  //             '0' + month.toString(): month.toString()) + '-' + 
  //               (day.toString().length < 2? '0' + day.toString(): day.toString())
  // }

  useEffect(() => {
    if(values.length > 1){
      // setStartDate(getFormatDate(values[0].day, values[0].month.number, values[0].year));
      // setEndDate(getFormatDate(values[1].day, values[1].month.number, values[1].year));
      setFirstDate(new Date(values[0].year, values[0].month.number - 1, values[0].day));
      setSecondDate(new Date(values[1].year, values[1].month.number - 1, values[1].day));
    }else{
      if(values.length > 0){
        setFirstDate(new Date(values[0].year, values[0].month.number - 1, values[0].day));
        //setStartDate(getFormatDate(values[0].day, values[0].month.number, values[0].year));
      }
    }
    
    //https://www.npmjs.com/package/react-multi-date-picker
    //https://shahabyazdi.github.io/react-multi-date-picker/multiple-months/
    
    //"date": "2024-05-02T00:00:00.000Z"
    //new Date(year, monthIndex, day)
    //console.log('new date ', new Date(2024, 2, 1));
  }, [values]);

  useEffect(() => {
    FilterData(conditions, types, categories, minValue, maxValue, firstDate?.getTime(), secondDate?.getTime());
  }, [ categories, types, conditions, minValue, maxValue]);

  useEffect (() => {
    FilterData(conditions, types, categories, minValue, maxValue, new Date('2024-03-11').getTime(), new Date('2024-07-11').getTime());
  }, []);

  useEffect(() => {
    FilterData(conditions, types, categories, minValue, maxValue, firstDate?.getTime(), secondDate?.getTime());
  }, [firstDate, secondDate]);

  return(
    <>
      <form className="z-50 top-16 fixed bg-white space-y-5 p-3 right-0 h-screen">
        <div className="flex justify-between">
          <HeaderForm img="/img/role.svg" subtitle="Filtra proyectos por diferentes caracteristicas" 
            title="Filtrar proyecto"
          />
          <XMarkIcon className="w-6 h-6 text-slate-500 cursor-pointer" onClick={() => showForm(false)} />
        </div>
        
        <div className="">
          <Label htmlFor="status"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Status</p></Label>
          <SelectMultipleReact index={0} opts={optConditions} setValue={setConditions} />
        </div>
        <div className="">
          <Label htmlFor="type"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tipo</p></Label>
          <SelectMultipleReact index={0} opts={optTypes} setValue={setTypes} />
        </div>
        <div>
          <Label htmlFor="category"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Categoria</p></Label>
          <SelectMultipleReact index={0} opts={optCategories} setValue={setCategories} />
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
          <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha</p></Label>
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