'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import DeleteElement from "../DeleteElement";
import { RemoveProject } from "@/app/api/routeProjects";
import { ProjectsTable, Project, ProjectMin } from "@/interfaces/Projects";
import CardProject from "./CardProject";
import { useState, useEffect } from "react";
import Filtering from "./Filtering";
import { Options } from "@/interfaces/Common";
import { ProjectDataToTableDataMin } from "@/app/functions/SaveProject";
import { useProjectsStore } from "@/app/store/projectsStore";
import { getProjectsMin } from "@/app/api/routeProjects";
import { showToastMessageError } from "../Alert";

export default function TableProjects({data, token, projects, optCategories, 
                          optTypes, optConditions, isFilter, setIsFilter, isTable, isHistory=false}:
                        {data:ProjectsTable[], token:string, projects: ProjectMin[], 
                          optCategories: Options[], optTypes: Options[], optConditions: Options[], 
                          isFilter:boolean, setIsFilter:Function, isTable:boolean, 
                          isHistory?:boolean}){
  
  const columnHelper = createColumnHelper<ProjectsTable>();

  const [filter, setFilter] = useState<boolean>(false);
  const [dataProjects, setDataProjects] = useState(data);

  const {haveDeleteProject, haveNewProject, projectStore, updateHaveDeleteProject, 
    updateHaveNewProject, updateProjectStore} = useProjectsStore();

  const linkToProfile = (id: string) => {
    if(isHistory){
      window.location.replace(`/projects/history/${id}`)
    }else{
      window.location.replace(`/projects/${id}/profile`)
    }
  }

  // const columns = [
  //   columnHelper.accessor(row => row.id, {
  //     id: 'seleccion',
  //     cell: ({row}) => (
  //       <div className="flex gap-x-2">
  //         <input type="checkbox" 
  //           checked={row.getIsSelected()}
  //           onChange={row.getToggleSelectedHandler()}
  //         />
  //       </div>
  //     ),
  //     size: 300,
  //     enableSorting:false,
  //     header: ({table}:any) => (
  //       <input type="checkbox"
  //         checked={table.getIsAllRowsSelected()}
  //         onClick={()=> {
  //           table.toggleAllRowsSelected(!table.getIsAllRowsSelected())
  //         }}
  //       />
  //     )
  //   }),
  //   columnHelper.accessor('condition', {
  //     id: 'accion',
  //     cell: ({row}) => (
  //       <div className="flex gap-x-1 items-center">
  //         <img src={row.original.imgProject} alt="foto" className="w-8 h-8" />
  //         <div className={`w-5 h-5`} style={{'backgroundColor': row.original.condition}}></div>
  //         <DeleteElement id={row.original.id} name={row.original.project} remove={RemoveProject} token={token} />
  //       </div>
  //     ),
  //     enableSorting:false,
  //     header: () => (
  //       <p>accion</p>
  //     )
  //   }),
  //   columnHelper.accessor(row => row.percentage, {
  //     id: 'avance',
  //     cell: ({row}) => (
  //       <div className="">
  //         <p>{row.original.percentage}</p>
  //         <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
  //           <div className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" 
  //             style={{"width": row.original.percentage}}></div>
  //         </div>
  //       </div>
  //     ),
  //     enableSorting:false,
  //     header: () => (
  //       <p>Avance</p>
  //     )
  //   }),
  //   columnHelper.accessor('code', {
  //     header: 'Clave',
  //     id: 'clave',
  //     cell: ({row}) => (
  //       <p className="py-2 font-semibold cursor-pointer"
  //         onClick={() => window.location.replace(`/projects/${row.original.id}/profile`)}
  //       >{row.original.code}</p>
  //     )
  //   }),
  //   columnHelper.accessor('project', {
  //     header: 'Proyecto',
  //     id: 'proyecto',
  //     cell: ({row}) => (
  //       <p className="cursor-pointer"
  //         onClick={() => window.location.replace(`/projects/${row.original.id}/profile`)}
  //       >{row.original.project}</p>
  //     ),
  //   }),
  //   columnHelper.accessor('category', {
  //     header: 'Categoria',
  //     id: 'categoria',
  //     cell: ({row}) => (
  //       <p className="cursor-pointer"
  //         onClick={() => window.location.replace(`/projects/${row.original.id}/profile`)}
  //       >{row.original.category}</p>
  //     ),
  //   }),
  //   columnHelper.accessor('client', {
  //     header: 'Cliente',
  //     id: 'cliente',
  //     cell: ({row}) => (
  //       <p className="cursor-pointer"
  //         onClick={() => window.location.replace(`/projects/${row.original.id}/profile`)}
  //       >{row.original.client}</p>
  //     ),
  //   }),
  //   columnHelper.accessor('date', {
  //     header: 'Fecha',
  //     id: 'fecha',
  //     cell: ({row}) => (
  //       <p className="cursor-pointer"
  //         onClick={() => window.location.replace(`/projects/${row.original.id}/profile`)}
  //       >{row.original.date?.substring(0, 10) || ''}</p>
  //     ),
  //   }),
  //   columnHelper.accessor('amount', {
  //     header: 'Monto',
  //     id: 'monto',
  //     cell: ({row}) => (
  //       <p className="cursor-pointer"
  //         onClick={() => window.location.replace(`/projects/${row.original.id}/profile`)}
  //       >{row.original.amount}</p>
  //     ),
  //   }),
  // ]

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
      size: 300,
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
          <img src={row.original.imgProject} alt="foto" className="w-8 h-8" />
          <div className={`w-5 h-5`} style={{'backgroundColor': row.original.condition}}></div>
          {!isHistory && <DeleteElement id={row.original.id} name={row.original.project} remove={RemoveProject} token={token} />}
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
    columnHelper.accessor('amount', {
      header: 'Avance',
      id: 'nada',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
          onClick={() => linkToProfile(row.original.id)}
        >{row.original.code}</p>
      ),
    }),
    columnHelper.accessor('code', {
      header: 'Clave',
      id: 'clave',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => linkToProfile(row.original.id)}
        >{row.original.project}</p>
      ),
    }),
    columnHelper.accessor('project', {
      header: 'Proyecto',
      id: 'proyecto',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => linkToProfile(row.original.id)}
        >{row.original.category}</p>
      ),
    }),
    columnHelper.accessor('category', {
      header: 'Categoria',
      id: 'categoria',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => linkToProfile(row.original.id)}
        >{row.original.client}</p>
      ),
    }),
    columnHelper.accessor('client', {
      header: 'Cliente',
      id: 'cliente',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => linkToProfile(row.original.id)}
        >{row.original.date?.substring(0, 10) || ''}</p>
      ),
    }),
    columnHelper.accessor('date', {
      header: 'Fecha',
      id: 'fecha',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => linkToProfile(row.original.id)}
        >{row.original.amount}</p>
      ),
    }),
    columnHelper.accessor('amount', {
      header: 'Monto',
      id: 'monto',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => linkToProfile(row.original.id)}
        > </p>
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

  const [filteredProjects, setFilteredProjects] = useState<ProjectMin[]>(projects);

  const addNewProject = async() => {
    let projs: ProjectMin[];
    try {
      projs = await getProjectsMin(token);
      if(typeof(projs)==='string') 
        showToastMessageError(projs);
      else {
        const d = ProjectDataToTableDataMin(projs);
        updateProjectStore(projs);
        setFilteredProjects(projs);
        setDataProjects(d);
      }
    } catch (error) {
      return <h1>Error al consultar los proyectos!!</h1>
    }
  }

  if(haveNewProject){
    addNewProject();
    updateHaveNewProject(false);
  }

  if(haveDeleteProject){
    const d = ProjectDataToTableDataMin(projectStore);
    setDataProjects(d);
    updateHaveDeleteProject(false);
  }

  let view = <></>;
  if(isTable){
    view = (<Table columns={columns} data={dataProjects} placeH="Buscar proyecto.." typeTable="projects" />);
  }else{
    view = (<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-3">
              {filteredProjects.map((project, index:number) => (
                <CardProject project={project} token={token} key={index} />
              ))}
            </div>)
  }
  
  const dateValidation = (date:string, startDate:number, endDate:number) => {
    let d = new Date(date).getTime();
    if(d >= startDate && d <= endDate){
      return true;
    }
    return false;
  }

  const amountValidation = (project:ProjectMin, startDate:number, endDate:number, 
        minAmount:number, maxAmount:number) => {
    if(project.amount >= minAmount && project.amount <= maxAmount){
      if(dateValidation(project.date, startDate, endDate)){
        return true;
      }
    }
    return false;
  }

  const categoriesValidation = (project:ProjectMin, startDate:number, endDate:number, 
            minAmount:number, maxAmount:number, categories:string[]) => {
    if(categories.includes('all')){
      if(amountValidation(project, startDate, endDate, minAmount, maxAmount))
        return true
      return false;
    }else{
      if(project.segment)
        if(categories.includes(project.segment._id))
          if(amountValidation(project, startDate, endDate, minAmount, maxAmount))
            return true
      return false;
    }
  }

  const typesValidation = (project:ProjectMin, startDate:number, endDate:number, 
    minAmount:number, maxAmount:number, categories:string[], types:string[]) => {
    if(types.includes('all')){
      if(categoriesValidation(project, startDate, endDate, minAmount, maxAmount, categories))
        return true;
      return false;
    }else{
      if(project.type)
        if(types.includes(project.type._id))
          if(categoriesValidation(project, startDate, endDate, minAmount, maxAmount, categories))
            return true;
      return false;
    }
  }

  const conditionsValidation = (project:ProjectMin, startDate:number, endDate:number, 
        minAmount:number, maxAmount:number, categories:string[], 
        types:string[], conditions:string[]) => {
    if(conditions.includes('all')){
      if(typesValidation(project, startDate, endDate, minAmount, maxAmount, categories, types))
        return true;
      return false;
    }else{
      if(conditions.includes(project.category._id))
        if(typesValidation(project, startDate, endDate, minAmount, maxAmount, categories, types))
          return true;
      return false;
    }
  }

  const filterData = (conditions:string[], types:string[], 
    categories:string[], minAmount:number, maxAmount:number, startDate:number, endDate:number) => {
  
    let filtered: ProjectMin[] = [];
    if(isHistory){
      projects.map((project) => {
        if(conditionsValidation(project, startDate, endDate, minAmount, maxAmount, categories, types, conditions)){
          filtered.push(project);
        }
      });
    }else{
      projectStore.map((project) => {
        if(conditionsValidation(project, startDate, endDate, minAmount, maxAmount, categories, types, conditions)){
          filtered.push(project);
        }
      });
    }
    //console.log(filtered);
    setFilteredProjects(filtered);
    setDataProjects(ProjectDataToTableDataMin(filtered));
    setFilter(true);
  }

  return(
    <>
      <div className="flex justify-end mb-5">
        {isFilter && <Filtering showForm={setIsFilter} optCategories={optCategories} 
                          optTypes={optTypes} optConditions={optConditions} 
                          FilterData={filterData} maxAmount={maxAmount}  />}
      </div>
      {view}
    </>
  )
}