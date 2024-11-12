'use client'
//import HeaderForm from "../HeaderForm"
import Label from "../Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { useState, useEffect } from "react"
import SelectMultipleReact from "../SelectMultipleReact"
import { Options } from "@/interfaces/Common";
import Calendar, { DateObject } from "react-multi-date-picker";
import MultiRangeSlider from "multi-range-slider-react";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { GiSettingsKnobs } from "react-icons/gi"
import { getCatalogsByNameAndCondition } from "@/app/api/routeCatalogs"

export default function FilteringPaymentsProvider({showForm, FilterData, maxAmount, minAmount, 
                      token }: 
                    {showForm:Function, FilterData:Function, maxAmount:number, 
                      minAmount:number, token: string}){

  const [conditionsSel, setConditionsSel] = useState<string[]>(['all']);
  const [heightPage, setHeightPage] = useState<number>(900);

  const [conditions, setConditions] = useState<Options[]>([]);  
  const [firstDate, setFirstDate] = useState<Date>(new Date('2024-03-11'));
  const [secondDate, setSecondDate] = useState<Date>(new Date('2024-07-11'));

  // const [isPaid, setIsPaid] = useState<boolean>(false);
  // const [isPaid, setIsPaid] = useState<number>(1);

  const [values, setValues] = useState([
    new DateObject().setDay(4).subtract(1, "month"),
    new DateObject().setDay(4).add(1, "month")
  ])

  useEffect(() => {
    const fetchApis = async () => {
      let optConditions: Options[] = [];
      try {
        //optConditions = await getCatalogsByNameAndCondition(token, 'cost');
        optConditions = await getCatalogsByNameAndCondition(token, 'payments');
        if(typeof(optConditions)==='string') return <h1 className="text-red-500 text-center text-lg">{optConditions}</h1>
      } catch (error) {
        return <h1>Error al consultar catalogos!!</h1>
      }

      setConditions(optConditions);
    }

    fetchApis();
  }, []);

  const [minValue, set_minValue] = useState(minAmount);
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
    setConditionsSel(value);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setHeightPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
    return () => window.removeEventListener('scroll', handleResize);
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
    //console.log('providers sel => ', providersSel);
    FilterData(conditionsSel, minValue, maxValue, 
      firstDate?.getTime(), secondDate?.getTime(), 1);
  }, [ conditionsSel, minValue, maxValue, firstDate, secondDate]);

  useEffect (() => {
    FilterData(conditionsSel, minValue, maxValue,
      new Date('2024-03-11').getTime(), new Date('2024-07-11').getTime(), 1);
  }, []);

  const allArray = [{
    label: 'TODOS',
    value: 'all'
  }];

  if(conditions.length === 0){
    return <></>
  }

  return(
    <>
      <form className="z-10 top-16 w-full max-w-md absolute bg-white space-y-5 p-3 right-0"
        style={{height: `${heightPage}px`}}
      >
        <div className="flex justify-between">
          <div className="flex mt-2 items-center">
            <GiSettingsKnobs className="w-8 h-8 text-slate-600" />
            <div className="ml-3">
              <p className="text-xl">Filtrar gasto</p>
              <p className="text-gray-500 text-sm">Filtra gastos por diferentes caracteristicas</p>
            </div>
          </div>
          <XMarkIcon className="w-8 h-8 text-slate-500
            hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={() => showForm(false)} />
        </div>

        {/* <div className="flex justify-end px-5 items-center">
          <p className="text-gray-500 text-sm after:content-['*'] after:ml-0.5 after:text-red-500">Pagado?</p>
          <div>
            <div className="inline-flex rounded-md shadow-sm mx-2">
            <button type="button" className={`px-3 py-1 text-sm border border-blue-400 rounded-md 
                        ${isPaid === 1? 'bg-blue-500 text-white': ''}`}
                onClick={() => setIsPaid(1)}
              >
                Ambos
              </button>
              <button type="button" className={`px-3 py-1 text-sm border border-green-400 rounded-md 
                        ${isPaid===2? 'bg-green-500 text-white': ''}`}
                onClick={() => setIsPaid(2)}
              >
                Pagado
              </button>
              <button type="button" className={`px-3 py-1 text-sm border border-red-400 rounded-md 
                        ${isPaid===3? 'bg-red-500 text-white': ''}`}
                onClick={() => setIsPaid(3)}
              >
                No Pagado
              </button>
            </div>
          </div>
        </div> */}
        
        <div className="">
          <Label htmlFor="status"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Status</p></Label>
          <SelectMultipleReact index={0} opts={allArray.concat(conditions)} setValue={handleConditions} />
        </div>
        <div className="pt-0">
          <Label htmlFor="amount"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Monto</p></Label>
          <MultiRangeSlider
            min={minAmount}
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