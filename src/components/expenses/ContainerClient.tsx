'use client'
import TableExpenses from "./TableExpenses"
import ButtonNew from "./ButtonNew"
import { Options } from "@/interfaces/Common"
import { ExpensesTable, Expense } from "@/interfaces/Expenses"
//import { Project } from "@/interfaces/Projects"
import { ReportParse } from "@/interfaces/Reports"
import { useState } from "react"
import { GiSettingsKnobs } from "react-icons/gi"
import { ReportByProject, CostGroupByType } from "@/interfaces/ReportsOfCosts"
import { PDFDownloadLink } from "@react-pdf/renderer";
import { BsFileEarmarkPdf } from "react-icons/bs"; //Archivo PDF
import ReportCostByProjects from "../ReportCostByProjects";
import TableHistoryExpenses from "./TableHistoryExpenses"
import SearchInTable from "../SearchInTable"
import Link from "next/link"
import { TbArrowNarrowLeft } from "react-icons/tb"
import Button from "../Button"
import { showToastMessage, showToastMessageError } from "../Alert"
import { insertConditionInCost } from "@/app/api/routeCost"
//import ReportCostByCostCenterPDF from "../ReportCostByCostCenterPDF";

export default function ContainerClient({data, token, expenses, 
                    optCategoriesFilter, optConditionsFilter, optTypeFilter, 
                    optProjectFilter, optReportsFilter, idLabour, idTicket, 
                    optCategories, optConditions, optCostCenter, optCostCenterDeductible, 
                    optProjects, optProviders, optReports, optResponsibles, 
                    optTypes, reports, user, optVats, optCostCenterFilter, 
                    reportProjects, costsTypes, isHistory=false, idValidado}:
                  {data:ExpensesTable[], token:string, 
                    optCategoriesFilter:Options[], optTypeFilter:Options[], 
                    optConditionsFilter:Options[], expenses:Expense[], 
                    optReportsFilter:Options[], optProjectFilter:Options[], 
                    user:string, optCostCenter:Options[], optCostCenterFilter:Options[],
                    optProviders:Options[], optResponsibles:Options[],
                    optProjects:Options[], optConditions:Options[],
                    optCategories:Options[], optTypes:Options[], 
                    reports:ReportParse[], optReports:Options[], 
                    optCostCenterDeductible:Options[], idLabour:string, 
                    idTicket:string, optVats:Options[], reportProjects: ReportByProject[], 
                    costsTypes: CostGroupByType[], isHistory?:boolean, idValidado: string}){

  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [expensesSelected, setExpensesSelected] = useState<ExpensesTable[]>([]);
  const handleFilter = (value: boolean) => {
    setIsFilter(value);
  }

  const handleExpensesSelected = (value: ExpensesTable[]) => {
    setExpensesSelected(value);
  }

  const changeConditionInCost = async () => {
    //
    if(expensesSelected.length > 0){
      const filter: string[] = [];
      expensesSelected.map((row) => {
        filter.push(row.id);
      })
      const data = {
        condition: {
          glossary: idValidado,
          user
        },
        filter,
      }

      try {
        const res = await insertConditionInCost(token, data);
        if(res===200){
          showToastMessage('Costos actualizados satisfactoriamente!!!');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }else{
          showToastMessageError(res);
        }
      } catch (error) {
        showToastMessageError('Ocurrio un problema al actualizar condicion!!');
      }
    }
  }

  return(
    <div className="p-2 sm:p-3 md-p-5 lg:p-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link href={'/'}>
            <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" />
          </Link>
          <p className="text-xl ml-4 font-medium">Gastos</p>
        </div>
        {/* <ButtonNewProvider id={id} token={token} /> */}
        <div className="flex gap-x-3">
          <SearchInTable placeH={"Buscar gasto.."} />
          <div className="w-72">
            <div className="flex gap-x-4 items-center">
              <GiSettingsKnobs onClick={() => handleFilter(true)}
                className="text-slate-600 w-8 h-8 cursor-pointer hover:text-slate-300"
              />
              {/* <PDFDownloadLink document={<ReportCostByCostCenterPDF />} fileName={`costo por cost center`} > */}
              {!isHistory && (
                <>
                  <PDFDownloadLink document={<ReportCostByProjects reports={reportProjects} costsByTypes={costsTypes} />} 
                      fileName={`InformeObras`} >
                    {({loading, url, error, blob}) => 
                      loading? (
                        <BsFileEarmarkPdf className="w-6 h-6 text-slate-500" />
                      ) : (
                        <BsFileEarmarkPdf className="w-6 h-6 text-blue-500" />
                      ) }
                  </PDFDownloadLink>
                  {expensesSelected.length > 0 && (
                    <Button onClick={changeConditionInCost}>Validar</Button>
                  )}
                  <ButtonNew token={token} user={user} optCostCenter={optCostCenter} 
                              optProviders={optProviders} optResponsibles={optResponsibles}
                              optProjects={optProjects} optVats={optVats}
                              optCategories={optCategories} optConditions={optConditions}
                              optTypes={optTypes} reports={reports}
                              optReports={optReports} idLabour={idLabour} idTicket={idTicket}
                              optCostCenterDeductible={optCostCenterDeductible}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <Header title="Gastos" placeHolder="Buscar gasto.." >
        <div className="flex gap-x-4 items-center">
          <GiSettingsKnobs onClick={() => handleFilter(true)}
            className="text-slate-600 w-8 h-8 cursor-pointer hover:text-slate-300"
          />
          {!isHistory && (
            <>
              <PDFDownloadLink document={<ReportCostByProjects reports={reportProjects} costsByTypes={costsTypes} />} 
                  fileName={`InformeObras`} >
                {({loading, url, error, blob}) => 
                  loading? (
                    <BsFileEarmarkPdf className="w-6 h-6 text-slate-500" />
                  ) : (
                    <BsFileEarmarkPdf className="w-6 h-6 text-blue-500" />
                  ) }
              </PDFDownloadLink>
              <ButtonNew token={token} user={user} optCostCenter={optCostCenter} 
                          optProviders={optProviders} optResponsibles={optResponsibles}
                          optProjects={optProjects} optVats={optVats}
                          optCategories={optCategories} optConditions={optConditions}
                          optTypes={optTypes} reports={reports}
                          optReports={optReports} idLabour={idLabour} idTicket={idTicket}
                          optCostCenterDeductible={optCostCenterDeductible}
              />
            </>
          )}
        </div>
      </Header> */}
      {
        isHistory? (
          <TableHistoryExpenses data={data} token={token} 
            optCategories={optCategoriesFilter} optConditions={optConditionsFilter}
            optTypes={optTypeFilter} expenses={expenses} optProjects={optProjectFilter}
            optReports={optReportsFilter} isFilter={isFilter} setIsFilter={setIsFilter}
            optCostCenterFilter={optCostCenterFilter}
          />
        ): (
          <TableExpenses data={data} token={token} 
            optCategories={optCategoriesFilter} optConditions={optConditionsFilter}
            optTypes={optTypeFilter} expenses={expenses} optProjects={optProjectFilter}
            optReports={optReportsFilter} isFilter={isFilter} setIsFilter={setIsFilter}
            optCostCenterFilter={optCostCenterFilter} idValidado={idValidado} user={user}
            handleExpensesSelected={handleExpensesSelected}
          />
        )
      }
    </div>
  )
}