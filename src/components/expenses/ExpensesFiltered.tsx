'use client'
import Label from "../Label"
import { useState, useEffect } from "react"
import SelectMultipleReact from "../SelectMultipleReact"
import Calendar, { DateObject } from "react-multi-date-picker";
import MultiRangeSlider from "multi-range-slider-react";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { GiSettingsKnobs } from "react-icons/gi"
import { Expense } from "@/interfaces/Expenses"
import Button from "../Button"
import { PDFDownloadLink } from "@react-pdf/renderer";
import { BsFileEarmarkPdf } from "react-icons/bs"; //Archivo PDF
import ReportCostsByFilter from "../ReportCostsByFilter"
import TooltipCloseIcon from "../tooltipIcons/TooltipCloseIcon";

import { useOptionsExpense } from "@/app/store/newExpense"
import { Company } from "@/interfaces/Companies";
import { getCompany } from "@/app/api/routeCompany";
import { showToastMessage, showToastMessageError } from "@/components/Alert";

export default function Filtering({showForm, FilterData, maxAmount, minAmount, 
                      expensesFiltered, isViewReports, company, token }: 
  {showForm:(value: boolean) => void, FilterData:Function, maxAmount:number, minAmount:number, 
    expensesFiltered: Expense[], isViewReports: boolean, company:string, token:string}) {

  const {categories, conditions, costCenterOpt, projects, reportsOptions, types, providers} = useOptionsExpense();

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

  const [isPaid, setIsPaid] = useState<number>(1);

  const [satCompany, setSatCompany]=useState<Company>();

  const [values, setValues] = useState([
    new DateObject().setDay(4).subtract(1, "month"),
    new DateObject().setDay(4).add(1, "month")
  ])

  useEffect(() => {
    const fetch = async () => {
      const [rescomp] = await Promise.all([
        getCompany(token, company),
      ]);
      
      if(typeof(rescomp)==='string'){
        showToastMessageError(rescomp);
      }else{
        setSatCompany(rescomp);
      }
    }

    fetch();
  }, []);

  const handleValues = (dateValues: DateObject[]) => {
    setValues(dateValues);
    if(values.length > 1){
      setFirstDate(new Date(values[0].year, values[0].month.number - 1, values[0].day));
      setSecondDate(new Date(values[1].year, values[1].month.number - 1, values[1].day));
      filterfunction(categoriesSel, typesSel, conditionsSel, minValue, 
        maxValue, new Date(values[0].year, values[0].month.number - 1, values[0].day), 
        new Date(values[1].year, values[1].month.number - 1, values[1].day), projectsSel, reportsSel, 
        costcentersSel, providersSel, isPaid);
    }else{
      if(values.length > 0){
        setFirstDate(new Date(values[0].year, values[0].month.number - 1, values[0].day));
      }
    }
  }

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
    filterfunction(categoriesSel, typesSel, value, minValue, 
      maxValue, firstDate, secondDate, projectsSel, reportsSel, 
      costcentersSel, providersSel, isPaid);
  }

  const handleTypes = (value: string[]) => {
    setTypesSel(value);
    filterfunction(categoriesSel, value, conditionsSel, minValue, 
      maxValue, firstDate, secondDate, projectsSel, reportsSel, 
      costcentersSel, providersSel, isPaid);
  }

  const handleCategories = (value: string[]) => {
    setCategoriesSel(value);
    filterfunction(value, typesSel, conditionsSel, minValue, 
      maxValue, firstDate, secondDate, projectsSel, reportsSel, 
      costcentersSel, providersSel, isPaid);
  }

  const handleReports = (value: string[]) => {
    setReportsSel(value);
    filterfunction(categoriesSel, typesSel, conditionsSel, minValue, 
      maxValue, firstDate, secondDate, projectsSel, value, 
      costcentersSel, providersSel, isPaid);
  }

  const handleProjects = (value: string[]) => {
    setProjectsSel(value);
    filterfunction(categoriesSel, typesSel, conditionsSel, minValue, 
      maxValue, firstDate, secondDate, value, reportsSel, 
      costcentersSel, providersSel, isPaid);
  }

  const handleCostCenters = (value: string[]) => {
    setCostCentersSel(value);
    filterfunction(categoriesSel, typesSel, conditionsSel, minValue, 
      maxValue, firstDate, secondDate, projectsSel, reportsSel, 
      value, providersSel, isPaid);
  }

  const handleProviders = (value: string[]) => {
    setProvidersSel(value);
    filterfunction(categoriesSel, typesSel, conditionsSel, minValue, 
      maxValue, firstDate, secondDate, projectsSel, reportsSel, 
      costcentersSel, value, isPaid);
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
    FilterData(conditionsSel, typesSel, categoriesSel, minValue, maxValue, reportsSel, projectsSel, 
      firstDate?.getTime(), secondDate?.getTime(), costcentersSel, providersSel, isPaid);
  }, [ minValue, maxValue, firstDate, secondDate]);

  const filterfunction = (catSel:string[], typSel:string[], condSel:string[], minVal:number, 
    maxVal:number, dateini:Date, dateend:Date, proSel:string[], repSel:string[], ccSel:string[], 
    provSel:string[], ispay:number ) => {
      FilterData(condSel, typSel, catSel, minVal, maxVal, repSel, proSel, 
        dateini?.getTime(), dateend?.getTime(), ccSel, provSel, ispay);
  }

  const allArray = [{
    label: 'TODOS',
    value: 'all'
  }];

  return(
    <>
      <form className="z-10 w-full max-w-[550px] absolute bg-white space-y-5 px-2 py-2 sm:py-5 sm:px-7 right-0"
        style={{height: `${heightPage}px`}}
      >
        <div className="flex justify-between p-2 rounded-md" style={{backgroundColor:'#F8FAFC', border:'0.5px solid #D3D3D3'}}>
          <div className="flex mt-2 items-center">
            <GiSettingsKnobs className="w-8 h-8 text-slate-600" />
            <div className="ml-3">
              <p className="text-xl">Filtrar gasto</p>
              <p className="text-gray-500 text-sm">Filtra gastos por diferentes caracteristicas</p>
            </div>
          </div>
          <TooltipCloseIcon handleClose={showForm} />
        </div>

        <div className="flex justify-end px-5 items-center">
          <p className="text-gray-500 text-sm after:content-['*'] after:ml-0.5 after:text-red-500">Pagado?</p>
          <div>
            <div className="inline-flex rounded-md shadow-sm mx-2">
            <button type="button" className={`px-3 py-1 text-sm border border-blue-400 rounded-md 
                        ${isPaid === 1? 'bg-blue-500 text-white': ''}`}
                onClick={() => {
                  setIsPaid(1);
                  filterfunction(categoriesSel, typesSel, conditionsSel, minValue, 
                    maxValue, firstDate, secondDate, projectsSel, reportsSel, 
                    costcentersSel, providersSel, 1);
                }}
              >
                Ambos
              </button>
              <button type="button" className={`px-3 py-1 text-sm border border-green-400 rounded-md 
                        ${isPaid===2? 'bg-green-500 text-white': ''}`}
                onClick={() => {
                  setIsPaid(2);
                  filterfunction(categoriesSel, typesSel, conditionsSel, minValue, 
                    maxValue, firstDate, secondDate, projectsSel, reportsSel, 
                    costcentersSel, providersSel, 2);
                }}
              >
                Pagado
              </button>
              <button type="button" className={`px-3 py-1 text-sm border border-red-400 rounded-md 
                        ${isPaid===3? 'bg-red-500 text-white': ''}`}
                onClick={() => {
                  setIsPaid(3);
                  filterfunction(categoriesSel, typesSel, conditionsSel, minValue, 
                    maxValue, firstDate, secondDate, projectsSel, reportsSel, 
                    costcentersSel, providersSel, 3);
                }}
              >
                No Pagado
              </button>
            </div>
          </div>
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
          <Label htmlFor="reports"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Informe</p></Label>
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
                  currency: "USD",
                  value: minValue
                })}</p>
            <p>{CurrencyFormatter({
                  currency: "USD",
                  value: maxValue
                })}</p>
          </div>
        </div>
        <div>
          <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Rango de fechas</p></Label>
          <Calendar
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 focus:border-slate-700 outline-0"
            value={values}
            onChange={handleValues}
            range
            numberOfMonths={2}
            showOtherDays
            portal={false}
            style={{
              width: "100%",
              maxWidth: "100%",
              borderRadius: "5px",
            }}
          />

          <style jsx global>{`
            /* Fuerza al wrapper principal del calendario a comportarse como un grid flexible */
            .rmdp-wrapper {
              display: grid !important;
              grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)) !important;
              gap: 1rem !important;
              width: 100% !important;
              max-width: 100% !important;
            }

            /* Cada calendario (mes) se adapta al ancho del grid */
            .rmdp-calendar {
              width: 100% !important;
              max-width: 100% !important;
            }

            /* Previene scroll lateral en el sidenav */
            .relative.z-50.ml-auto.bg-white.p-5.h-full.overflow-y-auto {
              overflow-x: hidden !important;
            }
          `}</style>
        </div>
        {isViewReports && (
          <div className="p-2 flex justify-center">
            <Button  
              onClick={() => {
                setIsGeneratedReport(true);
              }}
              type="button"
            >Generar Informe</Button>
          </div>
        )}
        {isGeneratedReport && satCompany && isViewReports? (
          <div className="p-2 flex justify-center">
          <PDFDownloadLink document={<ReportCostsByFilter costs={expensesFiltered} satCompany={satCompany} />} 
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
