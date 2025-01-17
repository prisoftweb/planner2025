'use client'
//import Header from "../Header"
// import ButtonNew from "./ButtonNew"
import ButtonNewBudgetProject from "./ButtonNewBudgetProject"
import TableBudgetProjects from "./TableBudgetProjects"
import { useState, useEffect } from "react"
import { Options } from "@/interfaces/Common"
import { ProjectsBudgetTable, ProjectMin } from "@/interfaces/Projects"
import { GiSettingsKnobs } from "react-icons/gi"
import { VscListUnordered } from "react-icons/vsc";
import { PiTableThin } from "react-icons/pi";
import Link from "next/link"
import { TbArrowNarrowLeft } from "react-icons/tb"
import SearchInTable from "@/components/SearchInTable"
import { useProjectsStore } from "@/app/store/projectsStore"

import WithOut from "@/components/WithOut"
import { UsrBack } from "@/interfaces/User"
import { showToastMessageError } from "@/components/Alert"
import { ProjectBudgetDataToTableDataMin } from "@/app/functions/SaveProject"
import { getProjectsMin } from "@/app/api/routeProjects"
import { CostoCenterLV } from "@/interfaces/CostCenter"
import { BudgetMin } from "@/interfaces/Budget"
import { useBudgetStore } from "@/app/store/budgetProject"
import { Squares2X2Icon } from "@heroicons/react/24/solid"

export default function ContainerBudgetClient({token, user, optConditionsFilter, 
                          projects, budgets, optProjectsFilter }: 
                        {token:string, user:UsrBack, projects: ProjectMin[], optConditionsFilter: Options[], 
                          budgets:BudgetMin[], optProjectsFilter:Options[]}){

  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [isTable, setIsTable] = useState<boolean>(true);
  //const [dataTable, setDataTable] = useState<ProjectsBudgetTable[]>(data);

  // const {haveNewProject, projectStore, 
  //   updateProjectStore, updateHaveNewProject} = useProjectsStore();
  const {budgetsStore, updateBudgetsStore} = useBudgetStore();

  useEffect(() => {
    updateBudgetsStore(budgets);
  }, []);

  const handleFilter = (value:boolean) => {
    setIsFilter(value);
  }

  if(!budgetsStore || budgetsStore.length <= 0){
    return (
      <>
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <WithOut img="/img/projects.jpg" subtitle="Presupuestos"
            text="Agregar un presupuesto a
                    un proyecto determinado"
            title="Presupuestos">
              <ButtonNewBudgetProject projects={projects} token="" user={user._id} />
          </WithOut>
        </div>
      </>
    )
  }

  //const dataTable: ProjectsBudgetTable[] = ProjectBudgetDataToTableDataMin(budgetsStore);

  return(
    <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
      <div className="flex justify-between items-center gap-x-3 gap-y-3 md:flex-nowrap flex-wrap">
        <div className="flex items-center">
          <TbArrowNarrowLeft className="w-9 h-9 text-slate-600"
              onClick={() => window.location.replace('/')} />
          <p className="text-xl ml-4 font-medium">Presupuestos</p>
        </div>
        <div className="flex gap-x-3 w-full gap-y-3 justify-end flex-wrap-reverse sm:flex-nowrap">
          <div className="flex gap-x-3 gap-y-3 justify-end">
            <div className="flex gap-x-3 items-center">
              <p>Vista: </p>
              <Squares2X2Icon onClick={() => setIsTable(true)} 
                className="text-slate-600 w-8 h-8 cursor-pointer hover:slate-slate-300"
              />
              <VscListUnordered className="text-slate-600 w-8 h-8 cursor-pointer hover:text-red-300" 
                onClick={() => setIsTable(false)}
              />
            </div>
            <SearchInTable placeH="Buscar presupuesto.." />
          </div>
          <div className="">
            <div className="flex gap-x-3 items-center">
              <GiSettingsKnobs onClick={() => handleFilter(true)}
                className="text-slate-600 w-8 h-8 cursor-pointer hover:text-slate-300"
              />
              <ButtonNewBudgetProject projects={projects} token="" user={user._id} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <TableBudgetProjects token={token} 
          budgets={ budgetsStore} optProjects={optProjectsFilter}
          optConditions={optConditionsFilter} isFilter={isFilter} 
          setIsFilter={handleFilter} isTable={isTable}
        />
      </div>
    </div>
  )
}