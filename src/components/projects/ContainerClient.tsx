'use client'
//import Header from "../Header"
import ButtonNew from "./ButtonNew"
import TableProjects from "./TableProjects"
import { useState, useEffect } from "react"
import { Options } from "@/interfaces/Common"
import { ProjectsTable, Project, ProjectMin } from "@/interfaces/Projects"
import { GiSettingsKnobs } from "react-icons/gi"
import { VscListUnordered } from "react-icons/vsc";
import { PiTableThin } from "react-icons/pi";
import Link from "next/link"
import { TbArrowNarrowLeft } from "react-icons/tb"
import SearchInTable from "../SearchInTable"
import { useProjectsStore } from "@/app/store/projectsStore"
import Navigation from "../navigation/Navigation"
import WithOut from "../WithOut"
import { UsrBack } from "@/interfaces/User"
import { showToastMessageError } from "../Alert"
import { ProjectDataToTableDataMin } from "@/app/functions/SaveProject"
import { getProjectsMin } from "@/app/api/routeProjects"

export default function ContainerClient({token, optClients, optCategories, 
                          optTypes, user, optCompanies, data, optCategoriesFilter, 
                          optConditionsFilter, optTypesFilter, projects, condition}: 
                        {token:string, optClients:Options[], user:UsrBack,
                          optCategories:Options[], optTypes:Options[],
                          optCompanies: Options[], data:ProjectsTable[], 
                          projects: ProjectMin[], optCategoriesFilter: Options[], 
                          optTypesFilter: Options[], optConditionsFilter: Options[], 
                          condition: string}){

  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [isTable, setIsTable] = useState<boolean>(true);
  const [dataTable, setDataTable] = useState<ProjectsTable[]>(data);

  const {haveNewProject, projectStore, 
    updateProjectStore, updateHaveNewProject} = useProjectsStore();

  useEffect(() => {
    updateProjectStore(projects);
  }, []);

  const handleFilter = (value:boolean) => {
    setIsFilter(value);
  }

  if( haveNewProject && projects.length <= 0 && projectStore.length <= 0){
    const aux = async () =>{
      let projs: ProjectMin[] = [];
      try {
        projs = await getProjectsMin(token);
        if(typeof(projs)==='string') showToastMessageError(projs);
        else{
          const d = ProjectDataToTableDataMin(projs);
          updateProjectStore(projs);
          setDataTable(d);
        }
      } catch (error) {
        showToastMessageError('Ocurrio un error al actualizar datos de la tabla!!');
      }
    }
    aux();
    updateHaveNewProject(false);
  }

  if(projects.length <= 0 && projectStore.length <= 0){
    return (
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <WithOut img="/img/projects.jpg" subtitle="Proyectos"
            text="Aqui puedes agregar nuevos proyectos
                    para la gestion desde Planner"
            title="Proyectos">
              <ButtonNew token={token} optClients={optClients} 
                      optCategories={optCategories} optTypes={optTypes}
                      user={user._id} optCompanies={optCompanies} 
                      condition={condition}  />
          </WithOut>
        </div>
      </>
    )
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
          <div>
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
                      user={user._id} optCompanies={optCompanies} condition={condition} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <TableProjects data={dataTable} token={token} projects={projectStore.length > 0? projectStore: projects} 
          optCategories={optCategoriesFilter} optTypes={optTypesFilter}
          optConditions={optConditionsFilter} isFilter={isFilter} 
          setIsFilter={handleFilter} isTable={isTable}>            
        </TableProjects>        
      </div>
    </div>
  )
}