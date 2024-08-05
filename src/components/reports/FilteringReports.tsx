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

import { useOptionsReports } from "@/app/store/reportsStore";
import { getCompaniesLV } from "@/app/api/routeCompany";
import { getProjectsLV } from "@/app/api/routeProjects";
import { getCatalogsByName } from "@/app/api/routeCatalogs";
import { getDepartmentsLV } from "@/app/api/routeDepartments";
import { GlossaryCatalog } from "@/interfaces/Glossary";

export default function Filtering({showForm, optCompanies, 
                      optConditions, FilterData, maxAmount, optProjects }: 
                    {showForm:Function, optCompanies: Options[],
                      optConditions: Options[], optProjects:Options[],
                      FilterData:Function, maxAmount:number  }){
  
  const [companies, setCompanies] = useState<string[]>([optCompanies[0].value]);
  const [conditions, setConditions] = useState<string[]>([optConditions[0].value]);
  const [projects, setProjects] = useState<string[]>([optProjects[0].value]);
  const [isPettyCash, setIsPettyCash] = useState<boolean>(false);
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

  // const {companies, conditions, projects, updateCompanies, updateConditions, updateProjects} = useOptionsReports();

  // useEffect(() => {
  //   const fetchOptions = async () => {
  //     let optComp: Options[] = [];
  //     try {
  //       optComp = await getCompaniesLV(token);
  //     } catch (error) {
  //       return <h1 className="text-center text-lg text-red">Error al consultar las compañias</h1>
  //     }

  //     let optDepts: Options[] = [];
  //     try {
  //       optDepts = await getDepartmentsLV(token);
  //     } catch (error) {
  //       return <h1 className="text-center text-lg text-red">Error al consultar los departamentos</h1>
  //     }

  //     let optProjs:Options[];
  //     try {
  //       optProjs = await getProjectsLV(token);
  //       if(typeof(optProjs)==='string'){
  //         return <h1 className="text-center text-lg text-red-500">{optProjs}</h1>
  //       }    
  //     } catch (error) {
  //       return <h1 className="text-center text-lg text-red-500">Error al consultar los proyectos!!</h1>
  //     }

  //     let catalogs: GlossaryCatalog[];
  //     try {
  //       catalogs = await getCatalogsByName(token, 'reports');
  //       if(typeof(catalogs)==='string') return <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
  //     } catch (error) {
  //       return <h1>Error al consultar catalogos!!</h1>
  //     }

  //     //const condition = catalogs[0].condition[0].glossary._id;

  //     const optConds:Options[] = [];
  //     catalogs[0].condition.map((cond) => {
  //       let c = {
  //         label: cond.glossary.name,
  //         value: cond.glossary._id
  //       }
  //       optConds.push(c);
  //     });

  //     updateCompanies(optComp);
  //     updateConditions(optConds);
  //     updateProjects(optProjs);

  //   };

  //   if(projects.length <= 0 || companies.length <= 0 || conditions.length <= 0){
  //     fetchOptions();
  //   }
  // }, []);

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
    FilterData(conditions, minValue, maxValue, companies, projects, firstDate?.getTime(), secondDate?.getTime(), isPettyCash);
  }, [ companies, projects, conditions, minValue, maxValue, isPettyCash]);

  // useEffect (() => {
  //   FilterData(conditions, types, categories, minValue, maxValue, new Date('2024-03-11').getTime(), new Date('2024-07-11').getTime());
  // }, []);

  const handleCondition = (value:string[]) => {
    setConditions(value);
  }

  const handleProjects = (value:string[]) => {
    setProjects(value);
  }

  const handleCompanies = (value:string[]) => {
    setCompanies(value);
  }

  return(
    <>
      <form className="z-10 top-16 fixed bg-white space-y-5 p-3 right-0 h-screen">
        <div className="flex justify-between">
          {/* <HeaderForm img="/img/role.svg" subtitle="Filtra proyectos por diferentes caracteristicas" 
            title="Filtrar informe"
          /> */}
          <div className="flex mt-2 items-center">
            {/* <img src={img} alt="logo" className="rounded-full w-14 h-auto" /> */}
            <GiSettingsKnobs className="w-8 h-8 text-slate-600" />
            <div className="ml-3">
              <p className="text-xl">Filtrar informe</p>
              <p className="text-gray-500 text-sm">Filtra informes de gastos por diferentes caracteristicas</p>
            </div>
          </div>
          <XMarkIcon className="w-8 h-8 text-slate-500
            hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={() => showForm(false)} />
        </div>
        <div className="flex justify-end px-5">
          <div className="inline-flex items-center">
            {/* <p className="mr-3">Linea de credito</p> */}
            <Label>Es Fondo fijo? </Label>
            <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
              <input checked={isPettyCash} 
                //onClick={() => setSuppliercredit(!suppliercredit)} id="switch-3" type="checkbox"
                onChange={() => setIsPettyCash(!isPettyCash)} id="switch-3" type="checkbox"
                className="absolute w-8 h-4 transition-colors duration-300 rounded-full 
                  appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-green-500 
                  peer-checked:border-green-500 peer-checked:before:bg-green-500
                  border border-slate-300" />
              <label htmlFor="switch-3"
                className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-green-500 peer-checked:before:bg-green-500">
                <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                  data-ripple-dark="true"></div>
              </label>
            </div>
          </div>
        </div>
        <div className="">
          <Label htmlFor="status"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Status</p></Label>
          <SelectMultipleReact index={0} opts={optConditions} setValue={handleCondition} />
        </div>
        <div>
          <Label htmlFor="company"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Compañia</p></Label>
          <SelectMultipleReact index={0} opts={optCompanies} setValue={handleCompanies} />
        </div>
        <div className="">
          <Label htmlFor="project"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proyectos</p></Label>
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