'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { ProjectsTable, IProjectWithEstimateMin } from "@/interfaces/Projects";
import { useState, useEffect } from "react";
import { Options } from "@/interfaces/Common";
import Filtering from "../Filtering";
import { ProjectEstimateDataToTableDataMin } from "@/app/functions/SaveProject";
import { MoneyFormatter } from "@/app/functions/Globals";
import { CurrencyFormatter } from "@/app/functions/Globals";
import Link from "next/link";
import DeleteElement from "@/components/DeleteElement";
import { RemoveProject } from "@/app/api/routeProjects";
import { IPermissionsAndComponents } from "@/interfaces/Roles"

export default function TableProjectsToEstimate({token, optConditions, isFilter, 
                          setIsFilter, isTable, projects, data, optCategories, optTypes, permissions}:
                        {token:string, optConditions: Options[], 
                          isFilter:boolean, setIsFilter:(value: boolean) => void, 
                          isTable:boolean, projects: IProjectWithEstimateMin[], data: ProjectsTable[], 
                          optCategories: Options[], optTypes: Options[], permissions:IPermissionsAndComponents}){
  
  const columnHelper = createColumnHelper<ProjectsTable>();

  const columns = [
    columnHelper.accessor('condition', {
      id: 'accion',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          <img src={row.original.imgProject} alt="foto" className="w-8 h-8" />
          <div className={`w-5 h-5`} style={{'backgroundColor': row.original.condition}}></div>
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>accion</p>
      )
    }),
    columnHelper.accessor('percentage', {
      header: 'Avance',
      id: 'avance',
      cell: ({row}) => (
        <div className="">
          <p>{row.original.percentage}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" 
              style={{"width": row.original.percentage}}></div>
          </div>
        </div>
      )
    }),
    columnHelper.accessor('account', {
      header: 'Cuenta',
      id: 'cuenta',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
          onClick={() => window.location.replace(`/projects/estimates/${row.original.id}`)}
        >{row.original.account}</p>
      )
    }),
    columnHelper.accessor('project', {
      header: 'Proyecto',
      id: 'proyecto',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/estimates/${row.original.id}`)}
        >{row.original.project}</p>
      ),
    }),
    columnHelper.accessor('category', {
      header: 'Estatus',
      id: 'categoria',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/estimates/${row.original.id}`)}
        >{row.original.category}</p>
      ),
    }),
    columnHelper.accessor('client', {
      header: 'Cliente',
      id: 'cliente',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/estimates/${row.original.id}`)}
        >{row.original.client}</p>
      ),
    }),
    columnHelper.accessor('amount', {
      header: 'Monto',
      id: 'monto',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/estimates/${row.original.id}`)}
        >
          {MoneyFormatter(row.original.amount)}
        </p>
      ),
    }),
  ]
  
  const [maxAmount, setMaxAmount] = useState<number>(0);
  useEffect(() => {
    const projectMax = projects.reduce(((previous, current) => {
      return current.amount > previous.amount ? current: previous;
    }));
    setMaxAmount(projectMax.amount);
  }, [])

  const [filteredProjects, setFilteredProjects] = useState<IProjectWithEstimateMin[]>(projects);
  const dataTable: ProjectsTable[] = ProjectEstimateDataToTableDataMin(isFilter? filteredProjects: projects);

  let view = <></>;
  if(isTable){
    view = (<Table columns={columns} data={dataTable} placeH="Buscar proyecto.." />);
  }else{
    view = (<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-3">
              {projects.map((project, index:number) => (
                <CardProject project={project} token={token} key={index} deleteIcon={false} 
                  url={`/projects/estimates/${project._id}`}  />
              ))}
            </div>)
  }

  const filterData = (conditions:string[], types:string[], 
    categories:string[], minAmount:number, maxAmount:number, startDate:number, endDate:number) => {

  }

  return(
    <>
      <div className="flex justify-end mb-5">
        {isFilter && permissions.permission.filter && <Filtering showForm={setIsFilter} optCategories={optCategories} 
                                  optTypes={optTypes} optConditions={optConditions} 
                                  FilterData={filterData} maxAmount={maxAmount}  />}
      </div>
      <div className="hidden md:block">
        {view}
      </div>
      <div className="grid md:hidden grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-3">
        {projects.map((project, index:number) => (
          <CardProject project={project} token={token} key={index} deleteIcon={false} 
            url={`/projects/estimates/${project._id}`}  />
        ))}
      </div>
    </>
  )
}

export function CardProject({project, token, deleteIcon=true, url=`/projects/${project._id}/profile`}:
  {project:IProjectWithEstimateMin, token:string, deleteIcon?:boolean, url?:string}){

return(
  <>
    <Link href={url}>
      <div className="grid grid-cols-3 gap-x-2 p-3 border border-slate-700 
          rounded-xl bg-white shadow-md shadow-slate-500 hover:shadow-xl 
          hover:shadow-slate-600">
        <div className="col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-y-1">
              <img src={'/img/projects/default.svg'} alt="logo" className="w-8 h-auto rounded-full" />
              <div className={`w-3 h-3 bg-green-500`}></div>
            </div>
            <div>
              <p>{project.title}</p>
              <p>{project.account}</p>
            </div>
            <div>
              {deleteIcon && <DeleteElement id={project._id} name={project.title} 
                                token={token} remove={RemoveProject} />}
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" 
                    style={{"width": project.porcentage?? 0}}></div>
              </div>
              <p>{project.porcentage?? 0}%</p>
            </div>
          </div>
          <div className="text-right flex flex-col justify-between">
            <p className="text-base">{CurrencyFormatter({
                currency: "USD",
                value: project.amount
              })}
            </p>
          </div>
        </div>
      </Link>
    </>
  )
}