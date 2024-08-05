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
import { Expense } from "@/interfaces/Expenses"
import Button from "../Button"
import { PDFDownloadLink } from "@react-pdf/renderer";
import { BsFileEarmarkPdf } from "react-icons/bs"; //Archivo PDF
import ReportCostsByFilter from "../ReportCostsByFilter"

import { useOptionsExpense } from "@/app/store/newExpense"

export default function Filtering({showForm, FilterData, maxAmount, minAmount, 
                      expensesFiltered, isViewReports, }: 
                    {showForm:Function, FilterData:Function, maxAmount:number, 
                      minAmount:number, expensesFiltered: Expense[], isViewReports: boolean}){

  const {categories, conditions, costCenterOpt, projects, reportsOptions, types, providers, providersSAT} = useOptionsExpense();

  const [typesSel, setTypesSel] = useState<string[]>(['all']);
  const [categoriesSel, setCategoriesSel] = useState<string[]>(['all']);
  const [conditionsSel, setConditionsSel] = useState<string[]>(['all']);
  const [projectsSel, setProjectsSel] = useState<string[]>(['all']);
  const [reportsSel, setReportsSel] = useState<string[]>(['all']);
  const [providersSel, setProvidersSel] = useState<string[]>(['all']);
  const [heightPage, setHeightPage] = useState<number>(900);
  const [costcentersSel, setCostCentersSel] = useState<string[]>(['all']);
  const [isGeneratedReport, setIsGeneratedReport] = useState<boolean>(false);

  const [firstDate, setFirstDate] = useState<Date>(new Date('2024-03-11'));
  const [secondDate, setSecondDate] = useState<Date>(new Date('2024-07-11'));

  const [values, setValues] = useState([
    new DateObject().setDay(4).subtract(1, "month"),
    new DateObject().setDay(4).add(1, "month")
  ])

  // console.log('expenses no filtered => ', expenses);
  // const expenseM = expenses.reduce((previous, current) => {
  //   return current.cost?.subtotal > previous.cost?.subtotal ? current : previous;
  // });
  // const expenseMin = expenses.reduce((previous, current) => {
  //   return current.cost?.subtotal < previous.cost?.subtotal ? current : previous;
  // });
  //setMaxAmount(expenseM.cost?.subtotal);
  //setMinAmount(expenseMin.cost?.subtotal > 0? 0: expenseMin.cost?.subtotal || 0);
  // const minA = expenseM.cost?.subtotal;
  // const maxA = expenseMin.cost?.subtotal > 0? 0: expenseMin.cost?.subtotal || 0;

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

  const handleTypes = (value: string[]) => {
    setTypesSel(value);
  }

  const handleCategories = (value: string[]) => {
    setCategoriesSel(value);
  }

  const handleReports = (value: string[]) => {
    setReportsSel(value);
  }

  const handleProjects = (value: string[]) => {
    setProjectsSel(value);
  }

  const handleCostCenters = (value: string[]) => {
    setCostCentersSel(value);
  }

  const handleProviders = (value: string[]) => {
    setProvidersSel(value);
  }

  //const {costCenter, providers, responsibles, vats} = useOptionsExpense();

  useEffect(() => {

    //console.log('options expense => ', costCenter, providers, responsibles, vats);

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
    console.log('providers sel => ', providersSel);
    FilterData(conditionsSel, typesSel, categoriesSel, minValue, maxValue, reportsSel, projectsSel, 
      firstDate?.getTime(), secondDate?.getTime(), costcentersSel, providersSel);
  }, [ categoriesSel, typesSel, conditionsSel, minValue, maxValue, firstDate, secondDate, 
        projectsSel, reportsSel, costcentersSel, providersSel]);

  useEffect (() => {
    FilterData(conditionsSel, typesSel, categoriesSel, minValue, maxValue, reportsSel, projectsSel, 
      new Date('2024-03-11').getTime(), new Date('2024-07-11').getTime(), costcentersSel, providersSel);
  }, []);

  // useEffect(() => {
  //   FilterData(conditions, types, categories, minValue, maxValue, firstDate?.getTime(), secondDate?.getTime());
  // }, [firstDate, secondDate]);

  const allArray = [{
    label: 'TODOS',
    value: 'all'
  }];

  return(
    <>
      <form className="z-10 top-16 w-full max-w-md absolute bg-white space-y-5 p-3 right-0"
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
          <SelectMultipleReact index={0} opts={allArray.concat(conditions)} setValue={handleConditions} />
        </div>
        <div className="">
          <Label htmlFor="type"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tipo</p></Label>
          <SelectMultipleReact index={0} opts={allArray.concat(types)} setValue={handleTypes} />
        </div>
        <div>
          <Label htmlFor="category"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Categoria</p></Label>
          <SelectMultipleReact index={0} opts={allArray.concat(categories)} setValue={handleCategories} />
        </div>
        <div>
          <Label htmlFor="reports"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Reporte</p></Label>
          <SelectMultipleReact index={0} opts={allArray.concat(reportsOptions)} setValue={handleReports} />
        </div>
        <div>
          <Label htmlFor="projects"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proyectos</p></Label>
          <SelectMultipleReact index={0} opts={allArray.concat(projects)} setValue={handleProjects} />
        </div>
        <div>
          <Label htmlFor="costcenters"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Centro de costos</p></Label>
          <SelectMultipleReact index={0} opts={allArray.concat(costCenterOpt)} setValue={handleCostCenters} />
        </div>
        <div>
          <Label htmlFor="providers"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proveedores</p></Label>
          <SelectMultipleReact index={0} opts={allArray.concat(providers)} setValue={handleProviders} />
        </div>
        {/* <div className="pt-9"> */}
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
        {isViewReports && (
          <div className="p-2 flex justify-center">
            <Button  
              onClick={() => {
                console.log('gastos filtrados => ', expensesFiltered);
                setIsGeneratedReport(true);
              }}
              type="button"
            >Generar Informe</Button>
          </div>
        )}
        {isGeneratedReport && isViewReports? (
          <div className="p-2 flex justify-center">
          <PDFDownloadLink document={<ReportCostsByFilter costs={expensesFiltered} />} 
              fileName={`InformeCostosFiltrados`} onClick={() => setTimeout(() => {
                setIsGeneratedReport(false);
              }, 300)} >
            {({loading, url, error, blob}) => 
              loading? (
                <BsFileEarmarkPdf className="w-6 h-6 text-slate-500" />
              ) : (
                <BsFileEarmarkPdf className="w-6 h-6 text-blue-500" />
              ) }
          </PDFDownloadLink>
        </div>
        ): (
          <></>
        )}
      </form>
    </>
  )
}