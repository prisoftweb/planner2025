'use client'
import TableProjects from "./TableProjects"
import { useState, useEffect } from "react"
import { Options } from "@/interfaces/Common"
import { ProjectsTable, ProjectMin } from "@/interfaces/Projects"
// import { GiSettingsKnobs } from "react-icons/gi"
import { VscListUnordered } from "react-icons/vsc";
import { PiTableThin } from "react-icons/pi";
import Link from "next/link"
import { TbArrowNarrowLeft } from "react-icons/tb"
import SearchInTable from "../SearchInTable"
import WithOut from "../WithOut"
import { UsrBack } from "@/interfaces/User"
import TooltipContainerIcon from "../tooltipIcons/TooltipContainerIcon"
import TooltipFilterIcon from "../tooltipIcons/TooltipFilterIcon"

type Props = {
  token:string, 
  data:ProjectsTable[], 
  projects: ProjectMin[], 
  optCategoriesFilter: Options[], 
  optTypesFilter: Options[], 
  optConditionsFilter: Options[]
  user:UsrBack
}

export default function ContainerHistoryClient({token, data, optCategoriesFilter, 
  optConditionsFilter, optTypesFilter, projects, user}: Props){

  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [isTable, setIsTable] = useState<boolean>(true);
  // const [dataTable, setDataTable] = useState<ProjectsTable[]>(data);
  const [widthPage, setWidthPage]=useState<number>(500);

  const handleFilter = (value:boolean) => {
    setIsFilter(value);
  }

  const handleResize = () => {
    const w = Math.max(
      document.body.scrollWidth, document.documentElement.scrollWidth,
      document.body.offsetWidth, document.documentElement.offsetWidth,
      document.body.clientWidth, document.documentElement.clientWidth
    )
    setWidthPage(w);
    if(w <= 500) setIsTable(false);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    const w = Math.max(
      document.body.scrollWidth, document.documentElement.scrollWidth,
      document.body.offsetWidth, document.documentElement.offsetWidth,
      document.body.clientWidth, document.documentElement.clientWidth
    );
    setWidthPage(w);
    if(w <= 500) setIsTable(false);
    return () => window.removeEventListener('scroll', handleResize);
  }, []);

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
        
        <div className="w-full flex items-center">
          <Link href={'/'}>
            <TooltipContainerIcon label="Regresar">
              <div className="p-1 border border-slate-400 bg-white rounded-md hover:bg-blue-100">
                <TbArrowNarrowLeft className="w-10 h-10 text-slate-600" />
              </div>
            </TooltipContainerIcon>
          </Link>
          <p className="text-xl w-56 ml-4 font-medium">Historial de proyectos</p>
          <div className="flex-1 flex justify-end md:hidden">
            <TooltipFilterIcon handleFilter={handleFilter} />
          </div>
        </div>
        
        <div className="flex w-full gap-x-3 gap-y-3 flex-wrap-reverse sm:flex-nowrap justify-end">
          <SearchInTable placeH="Buscar proyecto.." />
          <div className="">
            {/* <div className="flex gap-x-3 items-center">
              {widthPage >= 500 && (
                <>
                  <TooltipContainerIcon label="Tabla">
                    <VscListUnordered className="text-slate-600 w-10 h-10 cursor-pointer hover:bg-blue-100" 
                      onClick={() => setIsTable(true)}
                    />
                  </TooltipContainerIcon>
                  <TooltipContainerIcon label="Tarjeta">
                    <PiTableThin onClick={() => setIsTable(false)} 
                      className="text-slate-600 w-10 h-10 cursor-pointer hover:bg-blue-100"
                    />
                  </TooltipContainerIcon>
                </>
              )}
              <TooltipFilterIcon handleFilter={handleFilter} />
            </div> */}
            <div className="hidden md:flex gap-x-3 items-center">
              <div className="hidden xl:flex gap-x-3 items-center">
                <TooltipContainerIcon label="Tabla">
                  <VscListUnordered className="text-slate-600 w-10 h-10 cursor-pointer hover:bg-blue-100" 
                    onClick={() => setIsTable(true)}
                  />
                </TooltipContainerIcon>
                <TooltipContainerIcon label="Tarjeta">
                  <PiTableThin onClick={() => setIsTable(false)} 
                    className="text-slate-600 w-10 h-10 cursor-pointer hover:bg-blue-100"
                  />
                </TooltipContainerIcon>
              </div>
              <TooltipFilterIcon handleFilter={handleFilter} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <TableProjects data={data} token={token} projects={projects} 
          optCategories={optCategoriesFilter} optTypes={optTypesFilter}
          optConditions={optConditionsFilter} isFilter={isFilter} 
          setIsFilter={handleFilter} isTable={isTable} isHistory={true} user={user}
        />
      </div>
    </div>
  )
}