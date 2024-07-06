"use client"

import Header from "../Header"
import ButtonNew from "./ButtonNew"
import TableReports from "./TableReports"
import { useState } from "react"
import { Options } from "@/interfaces/Common"
import { ReportTable, ReportParse } from "@/interfaces/Reports"
import { GiSettingsKnobs } from "react-icons/gi"
import TableHistoryReports from "./TableHistoryReports"

export default function ContainerClient({token, optCompanies, optDepartments, 
                            optProjects, condition, user, data, reports, 
                            optCompaniesFilter, optConditionsFilter, 
                            optProjectsFilter, isHistory=false}: 
                          {token:string, optDepartments:Options[], 
                            optCompanies:Options[], optProjects:Options[], 
                            user:string, condition:string, data:ReportTable[], 
                            reports: ReportParse[], optConditionsFilter: Options[], 
                            optCompaniesFilter: Options[], optProjectsFilter:Options[], 
                            isHistory?:boolean
                          }){

  const [isFilter, setIsFilter] = useState<boolean>(false);

  const handleFilter = (value:boolean) => {
    setIsFilter(value);
  }

  return(
    <div className="p-2 sm:p-3 md-p-5 lg:p-10">
      <Header title="Informes" placeHolder="Buscar Informe.." >
        <div className="flex gap-x-4 items-center">
          <GiSettingsKnobs onClick={() => handleFilter(true)}
            className="text-slate-600 w-8 h-8 cursor-pointer hover:text-slate-300"
          />
          {!isHistory && <ButtonNew companies={optCompanies} departments={optDepartments} 
                            projects={optProjects} token={token} condition={condition} user={user}
                          />}
        </div>
      </Header>
      <div className="mt-5">
        {isHistory? (
          <TableHistoryReports data={data} optConditions={optConditionsFilter} 
          reports={reports} token={token} optCompanies={optCompaniesFilter} 
          optProjects={optProjectsFilter} isFilter={isFilter} setIsFilter={handleFilter} />
        ): (
          <TableReports data={data} optConditions={optConditionsFilter} 
            reports={reports} token={token} optCompanies={optCompaniesFilter} 
            optProjects={optProjectsFilter} isFilter={isFilter} setIsFilter={handleFilter} />
        )}
      </div>
    </div>
  )
}