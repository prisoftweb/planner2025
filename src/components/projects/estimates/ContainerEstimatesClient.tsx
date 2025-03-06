'use client'
// import ButtonNewBudgetProject from "./ButtonNewBudgetProject"
// import TableBudgetProjects from "./TableBudgetProjects"
import { useState, useEffect } from "react"
import { Options } from "@/interfaces/Common"
import { ProjectMin, ProjectsTable } from "@/interfaces/Projects"
import { GiSettingsKnobs } from "react-icons/gi"
import { VscListUnordered } from "react-icons/vsc";
import Link from "next/link"
import { TbArrowNarrowLeft } from "react-icons/tb"
import SearchInTable from "@/components/SearchInTable"

import WithOut from "@/components/WithOut"
import { UsrBack } from "@/interfaces/User"
import { Squares2X2Icon } from "@heroicons/react/24/solid"
import TableProjectsToEstimate from "./TableProjectsToEstimated"

export default function ContainerEstimatesClient({token, user, optConditionsFilter, 
                          projects, optCategories, optTypes, data }: 
                        {token:string, user:UsrBack, projects: ProjectMin[], optConditionsFilter: Options[], 
                          optCategories: Options[], optTypes: Options[], data: ProjectsTable[]}){

  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [isTable, setIsTable] = useState<boolean>(true);

  const handleFilter = (value:boolean) => {
    setIsFilter(value);
  }

  if(!projects || projects.length <= 0){
    return (
      <>
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <WithOut img="/img/estimates/estimates.svg" subtitle="Proyectos para estimar"
            text="Aqui se mostraran los proyectos a los que se les puede realizar o consultar una estimacion"
            title="Proyectos para estimar">
              <></>
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
          <div className="p-1 border border-slate-400 bg-white rounded-md cursor-pointer"
            onClick={() => window.location.replace('/')}
          >
            <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" />
          </div>
          <p className="text-xl ml-4 font-medium w-56">Proyectos para estimar</p>
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
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <TableProjectsToEstimate token={token} 
          optConditions={optConditionsFilter} isFilter={isFilter} 
          setIsFilter={handleFilter} isTable={isTable} projects={projects} 
          data={data} optCategories={optCategories} optTypes={optTypes}
        />
      </div>
    </div>
  )
}