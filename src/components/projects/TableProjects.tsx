'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import DeleteElement from "../DeleteElement";
import { RemoveProject } from "@/app/api/routeProjects";
import { ProjectsTable, Project } from "@/interfaces/Projects";
import Link from "next/link";
import CardProject from "./CardProject";
import { useState, useEffect } from "react";
import Filtering from "./Filtering";
import Button from "../Button";
import { Options } from "@/interfaces/Common";
import { ProjectDataToTableData } from "@/app/functions/SaveProject";
import { GiSettingsKnobs } from "react-icons/gi";
import { VscListUnordered } from "react-icons/vsc";
import { PiTableThin } from "react-icons/pi";

export default function TableProjects({data, token, projects, optCategories, 
                          optTypes, optConditions}:
                        {data:ProjectsTable[], token:string, 
                          projects: Project[], optCategories: Options[], 
                          optTypes: Options[], optConditions: Options[]}){
  
  const columnHelper = createColumnHelper<ProjectsTable>();

  const [filtering, setFiltering] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);
  const [dataProjects, setDataProjects] = useState(data);

  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'seleccion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          <input type="checkbox" 
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        </div>
      ),
      enableSorting:false,
      header: ({table}:any) => (
        <input type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onClick={()=> {
            table.toggleAllRowsSelected(!table.getIsAllRowsSelected())
          }}
        />
      )
    }),
    columnHelper.accessor('condition', {
      id: 'accion',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          <div className={`w-5 h-5`} style={{'backgroundColor': row.original.condition}}></div>
          <DeleteElement id={row.original.id} name={row.original.project} remove={RemoveProject} token={token} />
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>accion</p>
      )
    }),
    columnHelper.accessor(row => row.percentage, {
      id: 'avance',
      cell: ({row}) => (
        <div className="">
          <p>{row.original.percentage}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" 
              style={{"width": row.original.percentage}}></div>
          </div>
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Avance</p>
      )
    }),
    columnHelper.accessor('code', {
      header: 'Clave',
      id: 'clave',
      cell: ({row}) => (
        <Link href={`/projects/${row.original.id}/profile`}>
          <p className="py-2 font-semibold">{row.original.code}</p>
        </Link>
      )
    }),
    columnHelper.accessor('project', {
      header: 'Proyecto',
      id: 'proyecto',
      cell: ({row}) => (
        <Link href={`/projects/${row.original.id}/profile`}>
          <p className="">{row.original.project}</p>
        </Link>
      ),
    }),
    columnHelper.accessor('category', {
      header: 'Categoria',
      id: 'categoria',
      cell: ({row}) => (
        <Link href={`/projects/${row.original.id}/profile`}>
          <p className="">{row.original.category}</p>
        </Link>
      ),
    }),
    columnHelper.accessor('client', {
      header: 'Cliente',
      id: 'cliente',
      cell: ({row}) => (
        <Link href={`/projects/${row.original.id}/profile`}>
          <p className="">{row.original.client}</p>
        </Link>
      ),
    }),
    columnHelper.accessor('date', {
      header: 'Fecha',
      id: 'fecha',
      cell: ({row}) => (
        <Link href={`/projects/${row.original.id}/profile`}>
          <p className="">{row.original.date?.substring(0, 10) || ''}</p>
        </Link>
      ),
    }),
    columnHelper.accessor('amount', {
      header: 'Monto',
      id: 'monto',
      cell: ({row}) => (
        <Link href={`/projects/${row.original.id}/profile`}>
          <p className="">{row.original.amount}</p>
        </Link>
      ),
    }),
  ]
  
  const [maxAmount, setMaxAmount] = useState<number>(0);
  useEffect(() => {
    const projectM = projects.reduce((previous, current) => {
      return current.amount > previous.amount ? current : previous;
    });
    setMaxAmount(projectM.amount);
  }, [])

  const [isTable, setIsTable] = useState<boolean>(true);
  const [view, setView] = useState<JSX.Element>(<></>);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  useEffect(() => {
    if(isTable){
      setView(<Table columns={columns} data={dataProjects} placeH="Buscar proyecto.." />);
    }else{
      setView(<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-3">
                {projects.map((project, index:number) => (
                  <CardProject project={project} token={token} key={index} />
                ))}
              </div>)
    }
  }, [ , isTable]);

  useEffect(() => {
    if(filter){
      if(isTable){
        setView(<Table columns={columns} data={dataProjects} placeH="Buscar proyecto.." />);
      }
      else{
        setView(<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-3">
                  {filteredProjects.map((project, index:number) => (
                    <CardProject project={project} token={token} key={index} />
                  ))}
                </div>)
      }
      setFilter(false);
    }
  }, [filter]);
  
  const dateValidation = (date:string, startDate:number, endDate:number) => {
    let d = new Date(date).getTime();
    if(d >= startDate && d <= endDate){
      return true;
    }
    return false;
  }

  const amountValidation = (project:Project, startDate:number, endDate:number, 
                              minAmount:number, maxAmount:number) => {
    if(project.amount >= minAmount && project.amount <= maxAmount){
      if(dateValidation(project.date, startDate, endDate)){
        return true;
      }
    }
    return false;
  }

  const categoriesValidation = (project:Project, startDate:number, endDate:number, 
                  minAmount:number, maxAmount:number, categories:string[]) => {
    if(categories.includes('all')){
      if(amountValidation(project, startDate, endDate, minAmount, maxAmount))
        return true
      return false;
    }else{
      if(project.categorys)
        if(categories.includes(project.categorys._id))
          if(amountValidation(project, startDate, endDate, minAmount, maxAmount))
            return true
      return false;
    }
  }

  const typesValidation = (project:Project, startDate:number, endDate:number, 
    minAmount:number, maxAmount:number, categories:string[], types:string[]) => {
    if(types.includes('all')){
      if(categoriesValidation(project, startDate, endDate, minAmount, maxAmount, categories))
        return true;
      return false;
    }else{
      if(project.types)
        if(types.includes(project.types._id))
          if(categoriesValidation(project, startDate, endDate, minAmount, maxAmount, categories))
            return true;
      return false;
    }
  }

  const conditionsValidation = (project:Project, startDate:number, endDate:number, 
              minAmount:number, maxAmount:number, categories:string[], 
              types:string[], conditions:string[]) => {
    if(conditions.includes('all')){
      if(typesValidation(project, startDate, endDate, minAmount, maxAmount, categories, types))
        return true;
      return false;
    }else{
      if(!project.condition.every((cond) => !conditions.includes(cond.glossary._id)))
        if(typesValidation(project, startDate, endDate, minAmount, maxAmount, categories, types))
          return true;
      return false;
    }
  }

  const filterData = (conditions:string[], types:string[], 
      categories:string[], minAmount:number, maxAmount:number, startDate:number, endDate:number) => {
    
    let filtered: Project[] = [];
    projects.map((project) => {
      if(conditionsValidation(project, startDate, endDate, minAmount, maxAmount, categories, types, conditions)){
        filtered.push(project);
      }
    });

    console.log(filtered);
    setFilteredProjects(filtered);
    setDataProjects(ProjectDataToTableData(filtered));
    setFilter(true);
  }

  return(
    <>
      <div className="flex justify-end mb-5">
        <div className="inline-flex rounded-md shadow-sm mx-2">
          <VscListUnordered className="text-red-600 w-8 h-8 cursor-pointer hover:text-red-300" 
            onClick={() => setIsTable(true)}
          />
          {/* <button type="button" className={`px-3 py-1 text-sm border border-green-400 rounded-md 
                    ${isTable? 'bg-green-500 text-white': ''}`}
            onClick={() => setIsTable(true)}
          >
            Tabla
          </button> */}
          <PiTableThin onClick={() => setIsTable(false)} 
            className="text-red-600 w-8 h-8 cursor-pointer hover:text-red-300"
          />
          {/* <button type="button" className={`px-3 py-1 text-sm border border-red-400 rounded-md 
                    ${!isTable? 'bg-red-500 text-white': ''}`}
            onClick={() => setIsTable(false)}
          >
            Tarjetas
          </button> */}
        </div>
        {/* <Button type="button" onClick={() => setFiltering(!filtering)}>Filtrar</Button> */}
          <GiSettingsKnobs onClick={() => setFiltering(!filtering)}
            className="text-slate-600 w-8 h-8 cursor-pointer hover:text-slate-300"
          />
          {filtering && <Filtering showForm={setFiltering} optCategories={optCategories} 
                            optTypes={optTypes} optConditions={optConditions} 
                            FilterData={filterData} maxAmount={maxAmount}  />}
      </div>
      {view}
      {/* <Table columns={columns} data={data} placeH="Buscar proyecto.." /> */}
      {/* <div className="grid grid-cols-3 gap-x-4 gap-y-3">
        {projects.map((project, index:number) => (
          <CardProject project={project} token={token} key={index} />
        ))}
      </div> */}
    </>
  )
}