'use client'
//import Header from "../Header"
import ButtonNew from "./ButtonNew"
import TableProjects from "./TableProjects"
import { useState } from "react"
import { Options } from "@/interfaces/Common"
import { ProjectsTable, Project, ProjectMin } from "@/interfaces/Projects"
import { GiSettingsKnobs } from "react-icons/gi"
import { VscListUnordered } from "react-icons/vsc";
import { PiTableThin } from "react-icons/pi";
import Link from "next/link"
import { TbArrowNarrowLeft } from "react-icons/tb"
import SearchInTable from "../SearchInTable"

export default function ContainerClient({token, optClients, optCategories, 
                          optTypes, user, optCompanies, data, optCategoriesFilter, 
                          optConditionsFilter, optTypesFilter, projects, condition}: 
                        {token:string, optClients:Options[], user:string,
                          optCategories:Options[], optTypes:Options[],
                          optCompanies: Options[], data:ProjectsTable[], 
                          projects: ProjectMin[], optCategoriesFilter: Options[], 
                          optTypesFilter: Options[], optConditionsFilter: Options[], 
                          condition: string}){

  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [isTable, setIsTable] = useState<boolean>(true);

  const handleFilter = (value:boolean) => {
    setIsFilter(value);
  }

  const handleTable = (value:boolean) => {
    setIsTable(value);
  }

  return(
    <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link href={'/'}>
            <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" />
          </Link>
          <p className="text-xl ml-4 font-medium">Proyectos</p>
        </div>
        <div className="flex gap-x-3">
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
              <ButtonNew token={token} optClients={optClients} 
                      optCategories={optCategories} optTypes={optTypes}
                      user={user} optCompanies={optCompanies} condition={condition} />
            </div>
          </div>
        </div>
      </div>
      {/* <Header title="Proyectos" placeHolder="Buscar proyecto.." >
        <div className="flex gap-x-4 items-center">
          <VscListUnordered className="text-slate-600 w-8 h-8 cursor-pointer hover:text-red-300" 
            onClick={() => setIsTable(true)}
          />
          <PiTableThin onClick={() => setIsTable(false)} 
            className="text-slate-600 w-8 h-8 cursor-pointer hover:slate-slate-300"
          />
          <GiSettingsKnobs onClick={() => handleFilter(true)}
            className="text-slate-600 w-8 h-8 cursor-pointer hover:text-slate-300"
          />
          <ButtonNew token={token} optClients={optClients} 
                  optCategories={optCategories} optTypes={optTypes}
                  user={user} optCompanies={optCompanies} />
        </div>
      </Header> */}
      <div className="mt-5">
        <TableProjects data={data} token={token} projects={projects} 
          optCategories={optCategoriesFilter} optTypes={optTypesFilter}
          optConditions={optConditionsFilter} isFilter={isFilter} 
          setIsFilter={handleFilter} isTable={isTable}
        />
      </div>
    </div>
  )
}