'use client'
import TableProjects from "./TableProjects"
import { useState } from "react"
import { Options } from "@/interfaces/Common"
import { ProjectsTable, ProjectMin } from "@/interfaces/Projects"
import { GiSettingsKnobs } from "react-icons/gi"
import { VscListUnordered } from "react-icons/vsc";
import { PiTableThin } from "react-icons/pi";
import Link from "next/link"
import { TbArrowNarrowLeft } from "react-icons/tb"
import SearchInTable from "../SearchInTable"
import WithOut from "../WithOut"

export default function ContainerHistoryClient({token, data, optCategoriesFilter, 
                          optConditionsFilter, optTypesFilter, projects}: 
                        {token:string, data:ProjectsTable[], 
                          projects: ProjectMin[], optCategoriesFilter: Options[], 
                          optTypesFilter: Options[], optConditionsFilter: Options[]}){

  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [isTable, setIsTable] = useState<boolean>(true);
  const [dataTable, setDataTable] = useState<ProjectsTable[]>(data);

  const handleFilter = (value:boolean) => {
    setIsFilter(value);
  }

  if(projects.length <= 0){
    return (
      <>
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <WithOut img="/img/projects.jpg" subtitle="Historial de proyectos"
            text="Aqui puedes consultar los proyectos"
            title="Historial de proyectos">
              <></>
          </WithOut>
        </div>
      </>
    )
  }

  return(
    <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
      <div className="flex gap-y-3 gap-x-5 justify-between items-center flex-wrap md:flex-nowrap">
        <div className="flex items-center">
          <Link href={'/'}>
            <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" />
          </Link>
          <p className="text-xl w-56 ml-4 font-medium">Historial de proyectos</p>
        </div>
        <div className="flex w-full gap-x-3 gap-y-3 flex-wrap-reverse sm:flex-nowrap justify-end">
          <SearchInTable placeH="Buscar proyecto.." />
          <div className="">
            <div className="flex gap-x-3 items-center">
              <VscListUnordered className="text-slate-600 w-8 h-8 cursor-pointer hover:text-red-300" 
                onClick={() => setIsTable(true)}
              />
              <PiTableThin onClick={() => setIsTable(false)} 
                className="text-slate-600 w-8 h-8 cursor-pointer hover:slate-slate-300"
              />
              <GiSettingsKnobs onClick={() => handleFilter(true)}
                className="text-slate-600 w-8 h-8 cursor-pointer hover:text-slate-300"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <TableProjects data={dataTable} token={token} projects={projects} 
          optCategories={optCategoriesFilter} optTypes={optTypesFilter}
          optConditions={optConditionsFilter} isFilter={isFilter} 
          setIsFilter={handleFilter} isTable={isTable} isHistory={true}
        />
      </div>
    </div>
  )
}