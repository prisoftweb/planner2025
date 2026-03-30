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
import { useTableStates } from "@/app/store/tableStates"
import ContainerSideNav from "../ContainerSideNav";
import Filtering from "./FilteringReports";
import Link from "next/link"
import { TbArrowNarrowLeft } from "react-icons/tb";
import SearchInTable from "../SearchInTable";
import {Tooltip} from "@nextui-org/react";
import { propsTooltip } from "@/libs/animations";

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
      <div className="mt-5 hidden md:block w-full">
        <Header title="Informes" placeHolder="Buscar Informe.." >
          <div className="flex gap-x-4 items-center">
            <TooltipFilterIcon handleFilter={handleFilter} />
            {!isHistory && <ButtonNew companies={optCompanies} departments={optDepartments} 
                              projects={optProjects} token={token} condition={condition} user={user._id}
                            />}
          </div>
        </Header>
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
        <div className="flex justify-between items-center gap-x-5 gap-y-3 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-x-3 w-full md:max-w-96">
            <div className="p-1 border border-slate-400 bg-white rounded-md hover:bg-blue-100">
              <Link href={'/'}>
                <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Regresar' 
                    placement="right" className="text-black bg-white rounded-md border border-slate-400">
                  <span>
                    <TbArrowNarrowLeft className="w-10 h-10 text-slate-600" />
                  </span>
                </Tooltip>
              </Link>
            </div>
            <p className="text-xl flex-1 ml-4 font-medium">Informes</p>
            <div className="flex sm:hidden gap-x-4 items-center justify-end">
              <TooltipFilterIcon handleFilter={handleFilter} />
              {!isHistory && <ButtonNew companies={optCompanies} departments={optDepartments} 
                                projects={optProjects} token={token} condition={condition} user={user._id}
                              />}
            </div>
          </div>
          <div className="flex gap-x-3 justify-end w-full">
            <SearchInTable placeH="Buscar Informe.." />
          </div>
          <div className="hidden sm:flex gap-x-4 items-center justify-end">
            <TooltipFilterIcon handleFilter={handleFilter} />
            {!isHistory && <ButtonNew companies={optCompanies} departments={optDepartments} 
                              projects={optProjects} token={token} condition={condition} user={user._id}
                            />}
          </div>
        </div>
        <ListData data={dataTable} token={token} isHistory={isHistory} isFilter={isFilter}
          optCompanies={optCompaniesFilter} optConditions={optConditionsFilter} 
          optProjects={optProjectsFilter} setIsFilter={handleFilter} reports={reports} />
      </div>
    </div>
  )
}

const ListData = ({data, token, isHistory, isFilter, optCompanies, optProjects, optConditions, 
  setIsFilter, reports}: 
  {data: ReportTable[], token:string, isHistory:boolean, optCompanies: Options[], 
  optProjects: Options[], optConditions: Options[], isFilter:boolean, 
  setIsFilter:(value: boolean) => void, reports: ReportParse[]}) => {

  // const total = useMemo(() => {
  //   return data.reduce((accum, item) => accum+=Number(item.Total.replace(/[$, M, X, N,]/g, "")), 0);
  // }, [data]);

  const [dataReports, setDataReports] = useState(data);
  const [maxAmount, setMaxAmount] = useState<number>(reports.reduce((previous, current) => {
      return current.totalok > previous.totalok ? current : previous;
    }).totalok);

  const {search} = useTableStates();

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

  const dateValidation = (rep:ReportParse, startDate:number, endDate:number) => {
    let d = new Date(rep.date).getTime();
    if(d >= startDate && d <= endDate){
      return true;
    }
    return false;
  }

  const amountValidation = (rep:ReportParse, minAmount:number, maxAmount:number, 
                              startDate:number, endDate:number) => {
    if(rep.totalok >= 0){
      if(rep.totalok >= minAmount && rep.totalok <= maxAmount){
        return dateValidation(rep, startDate, endDate);
      }
    }
    return false;
  }

  const projectValidation = (rep:ReportParse, minAmount:number, maxAmount:number, 
                      startDate:number, endDate:number, projects:string[]) => {
    if(projects.includes('all')){
      return amountValidation(rep, minAmount, maxAmount, startDate, endDate);
    }else{
      if(rep.project){
        if(projects.includes(rep.project._id)){
          return amountValidation(rep, minAmount, maxAmount, startDate, endDate);
        }
      }
    }
    return false;
  }

  const companyValidation = (rep:ReportParse, minAmount:number, maxAmount:number, 
              startDate:number, endDate:number, projects:string[], companies:string[]) => {
    if(companies.includes('all')){
      return projectValidation(rep, minAmount, maxAmount, startDate, endDate, projects); 
    }else{
      if(rep.company){
        if(companies.includes(rep.company._id)){
          return projectValidation(rep, minAmount, maxAmount, startDate, endDate, projects);
        }
      }
    }
    return false;
  }

  const conditionValidation = (rep:ReportParse, minAmount:number, maxAmount:number, 
                  startDate:number, endDate:number, projects:string[], 
                  companies:string[], conditions:string[]) => {

    if(conditions.includes('all')){
      return companyValidation(rep, minAmount, maxAmount, startDate, endDate, projects, companies);
    }else{
      if(conditions.includes(rep.lastmove.condition._id)){
        return companyValidation(rep, minAmount, maxAmount, startDate, endDate, projects, companies);
      }
    }
    return false;
  }

  const pettyCashValidation = (rep:ReportParse, minAmount:number, maxAmount:number, 
      startDate:number, endDate:number, projects:string[], 
      companies:string[], conditions:string[], isPettyCash:boolean) => {

    if(isPettyCash === rep.ispettycash){
      return conditionValidation(rep, minAmount, maxAmount, startDate, endDate, projects, companies, conditions);
    }
    return false;
  }

  const filterData = (conditions:string[], minAmount:number, 
    maxAmount:number, companies:string[], projects:string[], 
    startDate:number, endDate:number, isPettyCash:boolean) => {
  
    let filtered: ReportParse[] = [];
    reportsStore.map((report) => {
      if(pettyCashValidation(report, minAmount, maxAmount, startDate, 
          endDate, projects, companies, conditions, isPettyCash)){
        filtered.push(report);
      }
    });
    setDataReports(ReportParseDataToTableData(filtered));
  }

  const filterReports = useMemo(() => {
    if(search.trim() === ''){
      return dataReports;
    }else{
      const d = dataReports.filter(item => item.Report.toLowerCase().includes(search.toLowerCase()) || 
        item.Project.toLowerCase().includes(search.toLowerCase()));
      return d;
    }
  }, [search, dataReports]);

  return(//h-[450px] altura enterior
    <div className="mt-5">
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border] h-[calc(100dvh-230px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {filterReports.map((r) => (
            <CardReport report={r} key={r.id} token={token} delReport={delReport} isHistory={isHistory} />
          ))}

        </nav>
      </div>
      {isFilter && (
        <ContainerSideNav width="w-full max-w-md">
          <Filtering showForm={setIsFilter} optConditions={optConditions} 
                      FilterData={filterData} maxAmount={maxAmount} 
                      optProjects={optProjects} optCompanies={optCompanies} />
        </ContainerSideNav>
      )}
    </div>
  )
}

const CardReport = ({report, token, delReport, isHistory}: 
  {report:ReportTable, token:string, delReport: (id: string) => void, isHistory:boolean}) => {
  
  return(
    <div role="button"
      key={report.id}
      // onClick={() => window.location.replace(`/reports/${report.id}/profile`)}
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
        <div className="w-full"
          onClick={() => window.location.replace(`/reports/${report.id}/profile`)}
        >
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