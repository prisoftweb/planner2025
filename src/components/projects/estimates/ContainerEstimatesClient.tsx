'use client'
import { useState } from "react"
import { Options } from "@/interfaces/Common"
import { ProjectsTable, IProjectWithEstimateMin } from "@/interfaces/Projects"
import { VscListUnordered } from "react-icons/vsc";
import { TbArrowNarrowLeft } from "react-icons/tb"
import SearchInTable from "@/components/SearchInTable"

import WithOut from "@/components/WithOut"
import { UsrBack } from "@/interfaces/User"
import { Squares2X2Icon } from "@heroicons/react/24/solid"
import TableProjectsToEstimate from "./TableProjectsToEstimated"
import Button from "@/components/Button"
import NewEstimateStepper from "./NewEstimateStepper"
import { getProjectsWithEstimatesMin } from "@/app/api/routeProjects"
import { showToastMessageError } from "@/components/Alert"

type Props = {
  token:string, 
  user:UsrBack, 
  projectsParam: IProjectWithEstimateMin[], 
  optConditionsFilter: Options[], 
  optCategories: Options[], 
  optTypes: Options[], 
  data: ProjectsTable[]
}

export default function ContainerEstimatesClient({token, user, optConditionsFilter, 
  projectsParam, optCategories, optTypes, data }: Props){

  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [isTable, setIsTable] = useState<boolean>(true);
  const [newEstimate, setNewEstimate]=useState<boolean>(false);
  const [projects, setProjects]=useState<IProjectWithEstimateMin[]>(projectsParam);

  const handleFilter = (value:boolean) => {
    setIsFilter(value);
  }

  const updateProjects = async () => {
      const res = await getProjectsWithEstimatesMin(token);
      if(typeof(res)==='string'){
        showToastMessageError(res);
        showToastMessageError('Error al actualizar la tabla!!!');
      }else{
        setProjects(res);
        setIsFilter(false);
      }
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

  const handleNewEstimate = (value:boolean) => {
    setNewEstimate(value);
  }

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
              <Button type="button" onClick={() => setNewEstimate(true)}>Nuevo</Button>
                        {newEstimate && <NewEstimateStepper showForm={handleNewEstimate}
                                          token={token} user={user._id} updateProjects={updateProjects} />}
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