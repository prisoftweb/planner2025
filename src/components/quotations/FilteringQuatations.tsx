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
import { getClientsLV } from "@/app/api/routeClients"
import { getCatalogsByNameAndCondition } from "@/app/api/routeCatalogs"
import { showToastMessageError } from "../Alert"

export default function FilteringQuatations({showForm, FilterData, maxAmount, token }: 
  {showForm:Function, FilterData:Function, maxAmount:number, token:string }){
  
  const [clients, setClients] = useState<string[]>([]);
  const [conditions, setConditions] = useState<string[]>([]);
  const [optClients, setOptClients] = useState<Options[]>([]);
  const [optConditions, setOptConditions] = useState<Options[]>([]);

  const [firstDate, setFirstDate] = useState<Date>(new Date('2024-03-11'));
  const [secondDate, setSecondDate] = useState<Date>(new Date('2024-07-11'));
  
  const [values, setValues] = useState([
    new DateObject().setDay(4).subtract(1, "month"),
    new DateObject().setDay(4).add(1, "month")
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getClientsLV(token);
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        // setOptClients(res);
        setOptClients([{
          label: 'TODOS',
          value: 'all'
        }, ...res]);
        setClients([res[0].value]);
      }

      const cons = await getCatalogsByNameAndCondition(token, 'Quotations');
      if(typeof(cons)==='string'){
        showToastMessageError(cons);
      }else{
        // setOptConditions(cons);
        setOptConditions([{
          label: 'TODOS',
          value: 'all'
        }, ...cons]);
        setConditions([cons[0].value]);
      }
    }

    fetchData();
  }, []);

  const handleValues = (dateValues: DateObject[]) => {
    console.log('handle values => ', dateValues);
    console.log('handle values leng => ', dateValues.length);
    setValues(dateValues);
    if(dateValues.length > 1){
      console.log('filter date ');
      setFirstDate(new Date(dateValues[0].year, dateValues[0].month.number - 1, dateValues[0].day));
      setSecondDate(new Date(dateValues[1].year, dateValues[1].month.number - 1, dateValues[1].day));
      filterfunction(conditions, clients, minValue, maxValue, 
        new Date(dateValues[0].year, dateValues[0].month.number - 1, dateValues[0].day), 
        new Date(dateValues[1].year, dateValues[1].month.number - 1, dateValues[1].day));
    }else{
      console.log('else => ');
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
    FilterData(conditions, clients, minValue, maxValue, firstDate?.getTime(), secondDate?.getTime());
  }, [ minValue, maxValue]);

  const handleCondition = (value:string[]) => {
    setConditions(value);
    filterfunction(value, clients, minValue, 
      maxValue, firstDate, secondDate);
  }

  const handleClients = (value:string[]) => {
    setClients(value);
    filterfunction(conditions, value, minValue, 
      maxValue, firstDate, secondDate);
  }

  const filterfunction = (condSel:string[], cliSel:string[], minVal:number, 
    maxVal:number, dateini:Date, dateend:Date ) => {
      FilterData(condSel, cliSel, minVal, maxVal, dateini?.getTime(), dateend?.getTime());
  }

  return(
    <>
      <form className="z-10 top-16 fixed bg-white space-y-5 p-3 right-0 h-screen">
        <div className="flex justify-between">
          <div className="flex mt-2 items-center">
            <GiSettingsKnobs className="w-8 h-8 text-slate-600" />
            <div className="ml-3">
              <p className="text-xl">Filtrar Cotizaciones</p>
              <p className="text-gray-500 text-sm">Filtra cotizaciones por diferentes caracteristicas</p>
            </div>
          </div>
          <XMarkIcon className="w-8 h-8 text-slate-500
            hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={() => showForm(false)} />
        </div>
        
        <div className="">
          <Label htmlFor="status"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Status</p></Label>
          {optConditions.length > 0 && <SelectMultipleReact index={0} opts={optConditions} setValue={handleCondition} />}
        </div>
        <div className="">
          <Label htmlFor="clients"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Cliente</p></Label>
          {optClients.length > 0 && <SelectMultipleReact index={0} opts={optClients} setValue={handleClients} />}
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
            //onChange={setValues}
            // onChange={(e: any) => setValues(e)}
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