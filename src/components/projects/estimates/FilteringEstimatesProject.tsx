'use client'
import Label from "@/components/Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { useState, useEffect } from "react"
import SelectMultipleReact from "@/components/SelectMultipleReact"
import { Options } from "@/interfaces/Common";
import Calendar, { DateObject } from "react-multi-date-picker";
import MultiRangeSlider from "multi-range-slider-react";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { GiSettingsKnobs } from "react-icons/gi"

export default function FilteringEstimatesProject({showForm, optProjects, 
                      optConditions, FilterData, maxAmount }: 
                    {showForm:Function, optProjects: Options[],
                      optConditions: Options[], FilterData:Function, maxAmount:number  }){
  
  const [conditions, setConditions] = useState<string[]>([optConditions[0].value]);
  const [projects, setProjects] = useState<string[]>([optProjects[0].value]);

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
    FilterData(conditions, minValue, maxValue, firstDate?.getTime(), secondDate?.getTime(), projects);
  }, [ conditions, minValue, maxValue, projects, firstDate, secondDate]);

  useEffect (() => {
    FilterData(conditions, minValue, maxValue, new Date('2024-03-11').getTime(), new Date('2024-07-11').getTime(), projects);
  }, []);

  const handleCondition = (value:string[]) => {
    setConditions(value);
  }

  const handleProjects = (value:string[]) => {
    setProjects(value);
  }

  // const dateValidation = (date:string, startDate:number, endDate:number) => {
  //   let d = new Date(date).getTime();
  //   if(d >= startDate && d <= endDate){
  //     return true;
  //   }
  //   return false;
  // }

  // const amountValidation = (budget:BudgetMin, startDate:number, endDate:number, 
  //       minAmount:number, maxAmount:number) => {
  //   if(budget.amount >= minAmount && budget.amount <= maxAmount){
  //     if(dateValidation(budget.date, startDate, endDate)){
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // const projectsValidation = (budget:BudgetMin, startDate:number, endDate:number, 
  //   minAmount:number, maxAmount:number, projects:string[]) => {
  //   if(projects.includes('all')){
  //     if(amountValidation(budget, startDate, endDate, minAmount, maxAmount))
  //       return true;
  //     return false;
  //   }else{
  //     if(budget.project)
  //       if(projects.includes(budget.project._id))
  //         if(amountValidation(budget, startDate, endDate, minAmount, maxAmount))
  //           return true;
  //     return false;
  //   }
  //   // if(categoriesValidation(budget, startDate, endDate, minAmount, maxAmount, projects))
  //   //   return true;
  //   // return false;
  // }

  // const conditionsValidation = (budget:BudgetMin, startDate:number, endDate:number, 
  //       minAmount:number, maxAmount:number, conditions:string[], projects: string[]) => {
  //   if(conditions.includes('all')){
  //     if(projectsValidation(budget, startDate, endDate, minAmount, maxAmount, projects))
  //       return true;
  //     return false;
  //   }else{
  //     if(conditions.includes(budget.lastmove.condition._id))
  //       if(projectsValidation(budget, startDate, endDate, minAmount, maxAmount, projects))
  //         return true;
  //     return false;
  //   }
  // }

  // const filterData = (conditions:string[], minAmount:number, maxAmount:number, 
  //   startDate:number, endDate:number, projects: string[]) => {
  
  //   let filtered: BudgetMin[] = [];
  //   budgetsStore?.map((budget) => {
  //     if(conditionsValidation(budget, startDate, endDate, minAmount, maxAmount, conditions, projects)){
  //       filtered.push(budget);
  //     }
  //   });

  //   setFilteredBudgets(filtered);
  //   // setDataProjects(ProjectBudgetDataToTableDataMin(filtered));
  // }

  return(
    <>
      <form className="z-10 top-16 fixed bg-white space-y-5 p-3 right-0 h-screen">
        <div className="flex justify-between">
          {/* <HeaderForm img="/img/role.svg" subtitle="Filtra proyectos por diferentes caracteristicas" 
            title="Filtrar proyecto"
          /> */}
          <div className="flex mt-2 items-center">
            {/* <img src={img} alt="logo" className="rounded-full w-14 h-auto" /> */}
            <GiSettingsKnobs className="w-8 h-8 text-slate-600" />
            <div className="ml-3">
              <p className="text-xl">Filtrar estimacion</p>
              <p className="text-gray-500 text-sm">Filtra estimaciones por diferentes caracteristicas</p>
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
          <Label htmlFor="project"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proyecto</p></Label>
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