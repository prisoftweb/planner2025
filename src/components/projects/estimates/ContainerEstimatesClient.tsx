'use client'
import { useState } from "react"
import { Options } from "@/interfaces/Common"
import { ProjectsTable, IProjectWithEstimateMin } from "@/interfaces/Projects"
import { VscListUnordered } from "react-icons/vsc";
import { TbArrowNarrowLeft } from "react-icons/tb"
import SearchInTable from "@/components/SearchInTable"
import {PlusCircleIcon} from "@heroicons/react/24/solid";

import WithOut from "@/components/WithOut"
import { UsrBack } from "@/interfaces/User"
import { Squares2X2Icon } from "@heroicons/react/24/solid"
import TableProjectsToEstimate from "./TableProjectsToEstimated"
import Button from "@/components/Button"
import NewEstimateStepper from "./NewEstimateStepper"
import { getProjectsWithEstimatesMin, getProjectsWithOutEstimateMin, getProjectsForEstimatedByUser } from "@/app/api/routeProjects"
import { showToastMessageError } from "@/components/Alert"
import TooltipContainerIcon from "@/components/tooltipIcons/TooltipContainerIcon";
import ContainerSideNav from "@/components/ContainerSideNav";
import { IPermissionsAndComponents } from "@/interfaces/Roles"

type Props = {
  token:string, 
  user:UsrBack, 
  projectsParam: IProjectWithEstimateMin[], 
  optConditionsFilter: Options[], 
  optCategories: Options[], 
  optTypes: Options[], 
  data: ProjectsTable[],
  rol:string,
  company:string,
  permissions:IPermissionsAndComponents
}

export default function ContainerEstimatesClient({token, user, optConditionsFilter, 
  projectsParam, optCategories, optTypes, data, rol, company, permissions }: Props){

  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [isTable, setIsTable] = useState<boolean>(true);
  const [newEstimate, setNewEstimate]=useState<boolean>(false);
  const [projects, setProjects]=useState<IProjectWithEstimateMin[]>(projectsParam);

  const handleFilter = (value:boolean) => {
    setIsFilter(value);
  }

  const updateProjects = async () => {
      const res = rol.toLowerCase().includes('residente') ? await getProjectsForEstimatedByUser(token, user._id) : await getProjectsWithOutEstimateMin(token);
      if(typeof(res)==='string'){
        showToastMessageError(res);
        showToastMessageError('Error al actualizar la tabla!!!');
      }else{
        setProjects(res);
        setIsFilter(false);
      }
    }

  const handleNewEstimate = (value:boolean) => {
    setNewEstimate(value);
  }

  if(!projects || projects.length <= 0){
    return (
      <>
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <WithOut img="/img/estimates/estimates.svg" subtitle="Proyectos para estimar"
            text="Aqui se mostraran los proyectos a los que se les puede realizar o consultar una estimacion"
            title="Proyectos para estimar">
              <>
                {permissions.permission.create && (
                  <Button type="button" onClick={() => setNewEstimate(true)}>Nuevo</Button>
                )}
              </>
          </WithOut>
          {newEstimate && permissions.permission.create && (
              <ContainerSideNav width="w-full sm:max-w-4xl">
                <NewEstimateStepper showForm={handleNewEstimate} rol={rol} company={company}
                              token={token} user={user._id} updateProjects={updateProjects} />
              </ContainerSideNav>
            )}
        </div>
      </>
    )
  }

  return(
    <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
      <div className="flex justify-between items-center gap-x-3 gap-y-3 md:flex-nowrap flex-wrap">
        <div className="flex w-full items-center">
          <TooltipContainerIcon label="Regresar">
            <div className="p-1 border border-slate-400 bg-white rounded-md cursor-pointer hover:bg-blue-100"
              onClick={() => window.location.replace('/')}
            >
              <TbArrowNarrowLeft className="w-10 h-10 text-slate-600" />
            </div>
          </TooltipContainerIcon>
          <p className="text-xl ml-4 font-medium w-56">Proyectos para estimar</p>
          {/* <div className="flex-1 flex justify-end sm:hidden">
            <Button type="button" onClick={() => setNewEstimate(true)}>Nuevo</Button>
          </div> */}
          {permissions.permission.create && (
            <div className="flex flex-1 flex-col items-end sm:hidden pr-4">
              <PlusCircleIcon onClick={() => setNewEstimate(true)} className={`w-6 h-6 text-slate-700 cursor-pointer`} />
              <span className="text-xs">Nuevo</span>
            </div>
          )}
        </div>
        <div className="flex gap-x-3 w-full gap-y-3 justify-end flex-wrap-reverse sm:flex-nowrap">
          <div className="flex flex-grow sm:flex-grow-0 gap-x-3 gap-y-3 justify-end">
            <div className="hidden md:flex gap-x-3 items-center">
              <p>Vista: </p>
              <TooltipContainerIcon label="Tabla">
                <Squares2X2Icon onClick={() => setIsTable(true)} 
                  className="text-slate-600 w-10 h-10 cursor-pointer hover:bg-blue-100"
                />
              </TooltipContainerIcon>
              <TooltipContainerIcon label="Tarjeta">
                <VscListUnordered className="text-slate-600 w-10 h-10 cursor-pointer hover:bg-blue-100" 
                  onClick={() => setIsTable(false)}
                />
              </TooltipContainerIcon>
            </div>
            {permissions.permission.searchfull && (
              <SearchInTable placeH="Buscar presupuesto.." />
            )}
          </div>
          <div className="">
            <div className="hidden sm:flex gap-x-3 items-center">
              {permissions.permission.create && (
                <Button type="button" onClick={() => setNewEstimate(true)}>Nuevo</Button>
              )}
            </div>
            {permissions.permission.create && (
              <ContainerSideNav width="w-full sm:max-w-4xl" open={newEstimate}>
                <NewEstimateStepper showForm={handleNewEstimate} rol={rol}
                    token={token} user={user._id} updateProjects={updateProjects} company={company} />
              </ContainerSideNav>
            )}
          </div>
        </div>
      </div>
      <div className="mt-5">
        {permissions.permission.readfull && (
          <TableProjectsToEstimate token={token} 
            optConditions={optConditionsFilter} isFilter={isFilter} 
            setIsFilter={handleFilter} isTable={isTable} projects={projects} 
            data={data} optCategories={optCategories} optTypes={optTypes} permissions={permissions}
          />
        )}
      </div>
    </div>
  )
}