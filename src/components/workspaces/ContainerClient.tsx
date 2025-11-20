
'use client'
// import TableExpenses from "./TableExpenses"
// import ButtonNew from "./ButtonNew"
import { Options } from "@/interfaces/Common"
import { ExpensesTable, Expense } from "@/interfaces/Expenses"
import { ReportParse } from "@/interfaces/Reports"
import { useState, useEffect } from "react"
import { GiSettingsKnobs } from "react-icons/gi"
import SearchInTable from "../SearchInTable"
import Link from "next/link"
import { TbArrowNarrowLeft } from "react-icons/tb"
import Button from "../Button"
import { showToastMessage, showToastMessageError } from "../Alert"
import { insertConditionInCost } from "@/app/api/routeCost"

import { useOptionsExpense, useNewExpense } from "@/app/store/newExpense"

import { getCostoCentersLV } from "@/app/api/routeCostCenter";
import { CostoCenterLV, } from "@/interfaces/CostCenter";
import { getProvidersLV, getProvidersSATLV } from "@/app/api/routeProviders";
import { getUsersLV } from "@/app/api/routeUser";
import { getAllProjectsWithConditionLV, getProjectsLV } from "@/app/api/routeProjects";
import { getCatalogsByNameAndCategory, getCatalogsByNameAndCondition, getCatalogsByNameAndType } from "@/app/api/routeCatalogs";
import { GetVatsLV } from "@/app/api/routeCost"
import { GetAllReportsWithLastMoveInDepartmentAndNEConditionMIN, GetAllReportsWithUSERAndNEConditionMIN
 } from "@/app/api/routeReports";
import { UsrBack } from "@/interfaces/User"
import WithOut from "../WithOut"

import { getAllCostsByConditionAndUser } from "@/app/api/routeCost"
import { ExpenseDataToTableData } from "@/app/functions/CostsFunctions"
import {Tooltip} from "@nextui-org/react";
import TooltipFilterIcon from "../tooltipIcons/TooltipFilterIcon"
import { propsTooltip } from "@/libs/animations"

export default function ContainerClient({data, token, expenses, user }:
  {data:ExpensesTable[], token:string, expenses:Expense[], user:UsrBack }){

  const { categories, conditions, costCenterOpt, projects, providers, responsibles, types, 
    updateCategories, updateConditions, updateCostC, updateProjects, updateProviders,
    updateReportsOptions, updateResponsibles, updateTypes, updateVats, updateProvidersSAT, 
    updateReports} = useOptionsExpense();

  const [tableData, setTableData] = useState<ExpensesTable[]>(data);

  const {expensesTable, updateExpensesTable, updateResponsible, refresh, updateRefresh} = useNewExpense();

  if(expensesTable.length <= 0 && expenses.length > 0){
    updateExpensesTable(expenses);
  }

  const [isFilter, setIsFilter] = useState<boolean>(false);
  
  const handleFilter = (value: boolean) => {
    setIsFilter(value);
  }

  if( expenses.length <= 0 && expensesTable.length <= 0){
    const view = <WithOut img="/img/costs/gastos.svg" subtitle="Gastos"
              text="Agrega el costo de mano de obra,
                    caja chica o proveedor desde esta
                    seccion a un determinado proyecto"
              title="Gastos">
                {/* <ButtonNew token={token} user={user} /> */}
                <></>
            </WithOut>;
    return (
      <>
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          {view}
        </div>
      </>
    )
  }

  const viewTable = <></>;
  // const viewTable = <TableExpenses token={token}
  //       expenses={expensesTable.length > 0? expensesTable: expenses} isFilter={isFilter} setIsFilter={handleFilter}
  //        user={user._id} 
  //       data={tableData} 
      // />
  
  return(
    <div className="p-2 sm:p-3 md-p-5 lg:p-10">
      <div className="flex justify-between flex-wrap sm:flex-nowrap gap-x-5 gap-y-2 items-center">
        <div className="flex items-center w-full max-w-96">
          <Link href={'/'}>
            <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Regresar' 
                placement="right" className="text-black bg-white rounded-md border border-slate-400">
              <span>
                <div className="p-1 border border-slate-400 bg-white rounded-md hover:bg-blue-100">
                  <TbArrowNarrowLeft className="w-10 h-10 text-slate-600" />
                </div>
              </span>
            </Tooltip>
          </Link>
          <p className="text-xl ml-4 font-medium">Espacios de trabajo</p>
        </div>
        <div className={`flex gap-x-3 gap-y-3 flex-wrap-reverse sm:flex-nowrap w-full justify-end`}>
          <SearchInTable placeH={"Buscar espacio.."} />
          <div className={'w-72'}>
            <div className="flex gap-x-4 justify-end items-center">
              {categories.length > 0 && 
                conditions.length > 0 && costCenterOpt.length > 0 && 
                projects.length > 0 && providers.length > 0 && responsibles.length > 0 && 
                types.length > 0 && (
                  <TooltipFilterIcon handleFilter={handleFilter} />
              )}  
              <>
                {/* <ButtonNew token={token} user={user} /> */}
              </>
            </div>
          </div>
        </div>
      </div>
      {viewTable}
    </div>
  )
}