"use client"

import Header from "../Header"
import ButtonNew from "./ButtonNew"
import TableReports from "./TableReports"
import { useState, useEffect, useMemo } from "react"
import { Options } from "@/interfaces/Common"
import { ReportTable, ReportParse } from "@/interfaces/Reports"
import TableHistoryReports from "./TableHistoryReports"
import { useOptionsReports } from "@/app/store/reportsStore"
import { UsrBack } from "@/interfaces/User"
import Navigation from "../navigation/Navigation"
import WithOut from "../WithOut" 
import { showToastMessageError } from "../Alert"
import { GetAllReportsWithLastMoveInDepartmentAndNEConditionMIN, GetAllReportsWithUSERAndNEConditionMIN
 } from "@/app/api/routeReports";
import { ReportParseDataToTableData } from "@/app/functions/ReportsFunctions"
import TooltipFilterIcon from "../tooltipIcons/TooltipFilterIcon"
import RemoveElement from "../RemoveElement"
import { RemoveReport } from "@/app/api/routeReports"

type Props = {
  token:string, 
  optDepartments:Options[], 
  optCompanies:Options[], 
  optProjects:Options[], 
  user:UsrBack, 
  condition:string, 
  data:ReportTable[], 
  reports: ReportParse[], 
  optConditionsFilter: Options[], 
  optCompaniesFilter: Options[], 
  optProjectsFilter:Options[], 
  isHistory?:boolean,
  optReps: Options[],
}

export default function ContainerClient({token, optCompanies, optDepartments, 
  optProjects, condition, user, data, reports, optCompaniesFilter, 
  optConditionsFilter, optProjectsFilter, isHistory=false, optReps}: Props){

  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState<ReportTable[]>(data);

  const {reportsStore, updateReportStore, haveNewReport, updateHaveNewReport} = useOptionsReports();

  useEffect(() => {
    updateReportStore(reports);
  }, []);

  const handleFilter = (value:boolean) => {
    setIsFilter(value);
  }

  if( haveNewReport && reports.length <= 0 && reportsStore.length <= 0){
    const aux = async () =>{
      let reports: ReportParse[] = [];
      try {
        if(typeof(user.department)=== 'string' || user.department.name.toLowerCase().includes('obras')){
          reports = await GetAllReportsWithUSERAndNEConditionMIN(token, user._id);
        }else{
          reports = await GetAllReportsWithLastMoveInDepartmentAndNEConditionMIN(token, user.department._id);
        }
        if(typeof(reports)==='string'){
          showToastMessageError(reports);
        }else{
          const d = ReportParseDataToTableData(reports);
          updateReportStore(reports);
          setDataTable(d);
        }
      } catch (error) {
        showToastMessageError('Ocurrio un error al actualizar datos de la tabla!!');
      }
    }
    aux();
    updateHaveNewReport(false);
  }

  if( reports.length <= 0 && reportsStore.length <= 0){
    return (
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          {isHistory? (
            <WithOut img="/img/costs/costs.svg" subtitle="Historial de Informes"
              text="El historial de informes actualmente esta vacio!!!"
              title="Historial de Informes">
                <></>
            </WithOut>
          ): (
            <WithOut img="/img/costs/costs.svg" subtitle="Informes"
              text="Agrega informes de caja chica,
                    para el control de costos"
              title="Informes">
                <ButtonNew companies={optCompanies} departments={optDepartments} 
                  projects={optProjects} token={token} condition={condition} user={user._id}
                />
            </WithOut>
          )}
        </div>
      </>
    )
  }

  return(
    <div className="p-2 sm:p-3 md-p-5 lg:p-10">
      <Header title="Informes" placeHolder="Buscar Informe.." >
        <div className="flex gap-x-4 items-center">
          <TooltipFilterIcon handleFilter={handleFilter} />
          {!isHistory && <ButtonNew companies={optCompanies} departments={optDepartments} 
                            projects={optProjects} token={token} condition={condition} user={user._id}
                          />}
        </div>
      </Header>
      <div className="mt-5 hidden md:block w-full">
        {isHistory? (
          <TableHistoryReports data={data} optConditions={optConditionsFilter} 
          reports={reports} token={token} optCompanies={optCompaniesFilter} 
          optProjects={optProjectsFilter} isFilter={isFilter} setIsFilter={handleFilter} />
        ): (
          <TableReports data={dataTable} optConditions={optConditionsFilter} 
            reports={reportsStore.length>0? reportsStore: reports} token={token} optCompanies={optCompaniesFilter} 
            optProjects={optProjectsFilter} isFilter={isFilter} setIsFilter={handleFilter}
            user={user} optReps={optReps} />
        )}
      </div>
      <div className="mt-5 block md:hidden w-full">
        <ListData data={dataTable} token={token} isHistory={isHistory} />
      </div>
    </div>
  )
}

const ListData = ({data, token, isHistory}: {data: ReportTable[], token:string, isHistory:boolean}) => {

  // const total = useMemo(() => {
  //   return data.reduce((accum, item) => accum+=Number(item.Total.replace(/[$, M, X, N,]/g, "")), 0);
  // }, [data]);

  const [dataReports, setDataReports] = useState(data);

  const {haveNewReport, updateHaveNewReport, updateReportStore, reportsStore} = useOptionsReports();

  if(haveNewReport){
    updateHaveNewReport(false);
    window.location.reload();
  }

  const delReport = (id: string) => {
    try {
      const arrReports = dataReports.filter(rep => rep.id !== id);
      setDataReports(arrReports);
    } catch (error) {
      showToastMessageError('Error al quitar informe de la tabla!!');
    }
  }

  return(
    <div>
      {/* <p className="mt-2 text-center">Cantidad: <span className="text-blue-500 font-bold">{data.length}</span> Total gastos: <span className="text-green-600 font-bold">{CurrencyFormatter({
        currency: 'MXN',
        value: total
      })}</span></p> */}
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border] h-[450px]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {dataReports.map((r) => (
            <CardReport report={r} key={r.id} token={token} delReport={delReport} isHistory={isHistory} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardReport = ({report, token, delReport, isHistory}: 
  {report:ReportTable, token:string, delReport: (id: string) => void, isHistory:boolean}) => {
  
  return(
    <div role="button"
      key={report.id}
      onClick={() => window.location.replace(`/reports/${report.id}/profile`)}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center">
          <img alt="responsable" src={ report.Responsible ?? '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
          {!isHistory && <RemoveElement id={report.id} name={report.Report} token={token} 
              remove={RemoveReport} removeElement={delReport} />}
        </div>
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3">
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {report.Report}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {report.Project}
              </p>
            </div>
            <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                {report.Total}
              </p>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {report.Status}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}