'use client'
import Header from "../Header"
import TableExpenses from "./TableExpenses"
import ButtonNew from "./ButtonNew"
import { Options } from "@/interfaces/Common"
import { ExpensesTable, Expense } from "@/interfaces/Expenses"
import { Project } from "@/interfaces/Projects"
import { Report } from "@/interfaces/Reports"
import { useState } from "react"
import { GiSettingsKnobs } from "react-icons/gi"
import { ReportByProject } from "@/interfaces/ReportsOfCosts"
import { PDFDownloadLink } from "@react-pdf/renderer";
import { BsFileEarmarkPdf } from "react-icons/bs"; //Archivo PDF

import ReportCostByProjects from "../ReportCostByProjects";
import ReportCostByCostCenterPDF from "../ReportCostByCostCenterPDF";

export default function ContainerClient({data, token, expenses, 
                    optCategoriesFilter, optConditionsFilter, optTypeFilter, 
                    optProjectFilter, optReportsFilter, idLabour, idTicket, 
                    optCategories, optConditions, optCostCenter, optCostCenterDeductible, 
                    optGlossaries, optProjects, optProviders, optReports, optResponsibles, 
                    optTypes, projects, reports, user, optVats, optCostCenterFilter, reportProjects}:
                  {data:ExpensesTable[], token:string, 
                    optCategoriesFilter:Options[], optTypeFilter:Options[], 
                    optConditionsFilter:Options[], expenses:Expense[], 
                    optReportsFilter:Options[], optProjectFilter:Options[], 
                    user:string, optCostCenter:Options[], optCostCenterFilter:Options[],
                    optProviders:Options[], optResponsibles:Options[],
                    optGlossaries:Options[], optProjects:Options[], 
                    optCategories:Options[], optTypes:Options[], 
                    optConditions:Options[], projects:Project[], 
                    reports:Report[], optReports:Options[], 
                    optCostCenterDeductible:Options[], idLabour:string, 
                    idTicket:string, optVats:Options[], reportProjects: ReportByProject[]}){

  const [isFilter, setIsFilter] = useState<boolean>(false);
  const handleFilter = (value: boolean) => {
    setIsFilter(value);
  }
  return(
    <div className="p-2 sm:p-3 md-p-5 lg:p-10">
      <Header title="Gastos" placeHolder="Buscar gasto.." >
        <div className="flex gap-x-4 items-center">
          <GiSettingsKnobs onClick={() => handleFilter(true)}
            className="text-slate-600 w-8 h-8 cursor-pointer hover:text-slate-300"
          />
          {/* <PDFDownloadLink document={<ReportCostByCostCenterPDF />} fileName={`costo por cost center`} > */}
          <PDFDownloadLink document={<ReportCostByProjects reports={reportProjects} />} fileName={`InformeObras`} >
            {({loading, url, error, blob}) => 
              loading? (
                <BsFileEarmarkPdf className="w-6 h-6 text-slate-500" />
              ) : (
                <BsFileEarmarkPdf className="w-6 h-6 text-blue-500" />
              ) }
          </PDFDownloadLink>
          <ButtonNew token={token} user={user} optCostCenter={optCostCenter} 
                      optProviders={optProviders} optResponsibles={optResponsibles}
                      optGlossaries={optGlossaries} optProjects={optProjects} 
                      optCategories={optCategories} optConditions={optConditions}
                      optTypes={optTypes} projects={projects} reports={reports}
                      optReports={optReports} idLabour={idLabour} idTicket={idTicket}
                      optCostCenterDeductible={optCostCenterDeductible}
                      optVats={optVats}
          />
        </div>
      </Header>
      <TableExpenses data={data} token={token} 
        optCategories={optCategoriesFilter} optConditions={optConditionsFilter}
        optTypes={optTypeFilter} expenses={expenses} optProjects={optProjectFilter}
        optReports={optReportsFilter} isFilter={isFilter} setIsFilter={setIsFilter}
        optCostCenterFilter={optCostCenterFilter}
      />
    </div>
  )
}