"use client"

import Header from "../Header"
import ButtonNew from "./ButtonNew"
import TableReports from "./TableReports"
import { useState, useEffect } from "react"
import { Options } from "@/interfaces/Common"
import { ReportTable, ReportParse } from "@/interfaces/Reports"
import { GiSettingsKnobs } from "react-icons/gi"
import TableHistoryReports from "./TableHistoryReports"
import { useOptionsReports } from "@/app/store/reportsStore"
import { GlossaryCatalog } from "@/interfaces/Glossary"
import { getDepartmentsLV } from "@/app/api/routeDepartments"
import { getCompaniesLV } from "@/app/api/routeCompany"
import { getCatalogsByName } from "@/app/api/routeCatalogs"
import { getProjectsLV } from "@/app/api/routeProjects"
import { UsrBack } from "@/interfaces/User"
import Navigation from "../navigation/Navigation"
import WithOut from "../WithOut" 
import { showToastMessageError } from "../Alert"
import { GetAllReportsWithLastMoveInDepartmentAndNEConditionMIN, GetAllReportsWithUSERAndNEConditionMIN
 } from "@/app/api/routeReports";
import { ReportParseDataToTableData } from "@/app/functions/ReportsFunctions"

export default function ContainerClient({token, optCompanies, optDepartments, 
                            optProjects, condition, user, data, reports, 
                            optCompaniesFilter, optConditionsFilter, 
                            optProjectsFilter, isHistory=false}: 
                          {token:string, optDepartments:Options[], 
                            optCompanies:Options[], optProjects:Options[], 
                            user:UsrBack, condition:string, data:ReportTable[], 
                            reports: ReportParse[], optConditionsFilter: Options[], 
                            optCompaniesFilter: Options[], optProjectsFilter:Options[], 
                            isHistory?:boolean
                          }){

  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState<ReportTable[]>(data);

  // const {companies, conditions, projects, updateCompanies, updateConditions, updateProjects} = useOptionsReports();
  const {reportsStore, updateReportStore, haveNewReport, updateHaveNewReport} = useOptionsReports();

  useEffect(() => {
    updateReportStore(reports);
  }, []);

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
  //   fetchOptions();
  // }, []);

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
          //return <h1 className="text-lg text-center text-red-500">{reports}</h1>
        }else{
          const d = ReportParseDataToTableData(reports);
          updateReportStore(reports);
          setDataTable(d);
        }
      } catch (error) {
        showToastMessageError('Ocurrio un error al actualizar datos de la tabla!!');
        //return <h1 className="text-lg text-center text-red-500">Ocurrio un error al consultar reportes!!</h1>
      }
    }
    aux();
    updateHaveNewReport(false);
  }

  if( reports.length <= 0 && reportsStore.length <= 0){
    //console.log('entro en el return length 0 => ');
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
          <GiSettingsKnobs onClick={() => handleFilter(true)}
            className="text-slate-600 w-8 h-8 cursor-pointer hover:text-slate-300"
          />
          {!isHistory && <ButtonNew companies={optCompanies} departments={optDepartments} 
                            projects={optProjects} token={token} condition={condition} user={user._id}
                          />}
        </div>
      </Header>
      <div className="mt-5">
        {isHistory? (
          <TableHistoryReports data={data} optConditions={optConditionsFilter} 
          reports={reports} token={token} optCompanies={optCompaniesFilter} 
          optProjects={optProjectsFilter} isFilter={isFilter} setIsFilter={handleFilter} />
        ): (
          <TableReports data={dataTable} optConditions={optConditionsFilter} 
            reports={reportsStore.length>0? reportsStore: reports} token={token} optCompanies={optCompaniesFilter} 
            optProjects={optProjectsFilter} isFilter={isFilter} setIsFilter={handleFilter}
            user={user} />
        )}
      </div>
    </div>
  )
}