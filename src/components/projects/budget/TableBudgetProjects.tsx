'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
//import DeleteElement from "@/components/DeleteElement";
//import { RemoveProject } from "@/app/api/routeProjects";
import { ProjectMin, ProjectsBudgetTable } from "@/interfaces/Projects";
//import CardProject from "../CardProject";
import CardBudgetProject from "./CardBudgetProject";
import { useState, useEffect } from "react";
import Filtering from "../Filtering";
import { Options } from "@/interfaces/Common";
import { ProjectBudgetDataToTableDataMin } from "@/app/functions/SaveProject";
import { useProjectsStore } from "@/app/store/projectsStore";
import { getProjectsMin } from "@/app/api/routeProjects";
import { showToastMessageError } from "@/components/Alert";
import Chip from "@/components/providers/Chip";
import { BudgetMin } from "@/interfaces/Budget";
import { removeBudget } from "@/app/api/routeBudget";
import { useBudgetStore } from "@/app/store/budgetProject";
import RemoveElement from "@/components/RemoveElement";

export default function TableBudgetProjects({data, token, budgets, optCategories, 
                          optTypes, optConditions, isFilter, setIsFilter, isTable}:
                        {data:ProjectsBudgetTable[], token:string, 
                          budgets: BudgetMin[], optCategories: Options[], 
                          optTypes: Options[], optConditions: Options[], 
                          isFilter:boolean, setIsFilter:Function, isTable:boolean}){
  
  const columnHelper = createColumnHelper<ProjectsBudgetTable>();

  const {budgetsStore, updateBudgetsStore} = useBudgetStore();

  //const [filtering, setFiltering] = useState<boolean>(false);
  //const [filter, setFilter] = useState<boolean>(false);
 // const [dataProjects, setDataProjects] = useState(data);

  const delBudget = async(id: string) => {
    try {
      if(budgetsStore){
        const arrBud = budgetsStore.filter(bud => bud._id !== id);
        updateBudgetsStore(arrBud);
      }
    } catch (error) {
      showToastMessageError('Error al quitar glosario de la tabla!!');
    }
  }

  // const {haveDeleteProject, haveNewProject, projectStore, updateHaveDeleteProject, 
  //   updateHaveNewProject, updateProjectStore} = useProjectsStore();

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
    columnHelper.accessor('id', {
      id: 'Accion',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          {/* <DeleteElement id={row.original.id} name={row.original.project} remove={RemoveProject} token={token} /> */}
          <RemoveElement id={row.original.id} name={row.original.project} remove={removeBudget} 
              removeElement={delBudget} token={token} />
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Accion</p>
      )
    }),

    // columnHelper.accessor('condition', {
    //   id: 'accion',
    //   cell: ({row}) => (
    //     <div className="flex gap-x-1 items-center">
    //       <div className={`w-5 h-5`} style={{'backgroundColor': row.original.condition}}></div>
    //       <DeleteElement id={row.original.id} name={row.original.project} remove={RemoveProject} token={token} />
    //     </div>
    //   ),
    //   enableSorting:false,
    //   header: () => (
    //     <p>accion</p>
    //   )
    // }),
    columnHelper.accessor(row => row.percentage, {
      id: 'porcentaje',
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
        <p>Porcentaje presupuesto</p>
      )
    }),
    // columnHelper.accessor('code', {
    //   header: 'Clave',
    //   id: 'clave',
    //   cell: ({row}) => (
    //     // <Link href={`/projects/${row.original.id}`}>
    //     //   <p className="py-2 font-semibold">{row.original.code}</p>
    //     // </Link>
    //     <p className="py-2 font-semibold cursor-pointer"
    //       onClick={() => window.location.replace(`/projects/${row.original.id}`)}
    //     >{row.original.code}</p>
    //   )
    // }),
    columnHelper.accessor('project', {
      header: 'Proyecto',
      id: 'proyecto',
      cell: ({row}) => (
        // <Link href={`/projects/${row.original.id}`}>
        //   <p className="">{row.original.project}</p>
        // </Link>
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/budget/${row.original.id}`)}
        >{row.original.project}</p>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      id: 'Status',
      cell: ({row}) => (
        <div className="flex justify-center items-center">
          <div className={`w-4 h-4 ${row.original.status? 'bg-green-500': 'bg-red-500'}`}></div>
        </div>
      ),
    }),
    columnHelper.accessor('segment', {
      header: 'Segmento',
      id: 'segment',
      cell: ({row}) => (
        <Chip label={row.original.segment} color={row.original.color} />
      ),
    }),
    // columnHelper.accessor('category', {
    //   header: 'Categoria',
    //   id: 'categoria',
    //   cell: ({row}) => (
    //     // <Link href={`/projects/${row.original.id}`}>
    //     //   <p className="">{row.original.category}</p>
    //     // </Link>
    //     <p className="cursor-pointer"
    //       onClick={() => window.location.replace(`/projects/${row.original.id}`)}
    //     >{row.original.category}</p>
    //   ),
    // }),
    columnHelper.accessor('client', {
      header: 'Cliente',
      id: 'cliente',
      cell: ({row}) => (
        // <Link href={`/projects/${row.original.id}`}>
        //   <p className="">{row.original.client}</p>
        // </Link>
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/budget/${row.original.id}`)}
        >{row.original.client}</p>
      ),
    }),
    // columnHelper.accessor('date', {
    //   header: 'Fecha',
    //   id: 'fecha',
    //   cell: ({row}) => (
    //     // <Link href={`/projects/${row.original.id}`}>
    //     //   <p className="">{row.original.date?.substring(0, 10) || ''}</p>
    //     // </Link>
    //     <p className="cursor-pointer"
    //       onClick={() => window.location.replace(`/projects/${row.original.id}`)}
    //     >{row.original.date?.substring(0, 10) || ''}</p>
    //   ),
    // }),
    columnHelper.accessor('amountBudget', {
      header: 'Monto presupuesto',
      id: 'Monto presupuesto',
      cell: ({row}) => (
        // <Link href={`/projects/${row.original.id}`}>
        //   <p className="">{row.original.amount}</p>
        // </Link>
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/budget/${row.original.id}`)}
        >{row.original.amountBudget}</p>
      ),
    }),
    columnHelper.accessor('pending', {
      header: 'Pendiente',
      id: 'pendiente',
      cell: ({row}) => (
        // <Link href={`/projects/${row.original.id}`}>
        //   <p className="">{row.original.amount}</p>
        // </Link>
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/budget/${row.original.id}`)}
        >{row.original.pending}</p>
      ),
    }),
  ]
  
  const [maxAmount, setMaxAmount] = useState<number>(0);
  useEffect(() => {
    // const projectM = projects.reduce((previous, current) => {
    //   return current.amount > previous.amount ? current : previous;
    // });
    const budgetMax = budgets.reduce(((previous, current) => {
      return current.pending > previous.pending ? current: previous;
    }));
    setMaxAmount(budgetMax.pending);
  }, [])

  //const [isTable, setIsTable] = useState<boolean>(true);
  //const [view, setView] = useState<JSX.Element>(<></>);
  const [filteredBudgets, setFilteredBudgets] = useState<BudgetMin[]>(budgets);

  // useEffect(() => {
  //   if(isTable){
  //     setView(<Table columns={columns} data={dataProjects} placeH="Buscar proyecto.." />);
  //   }else{
  //     setView(<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-3">
  //               {projects.map((project, index:number) => (
  //                 <CardProject project={project} token={token} key={index} />
  //               ))}
  //             </div>)
  //   }
  // }, [ , isTable]);

  // useEffect(() => {
  //   if(filter){
  //     if(isTable){
  //       setView(<Table columns={columns} data={dataProjects} placeH="Buscar proyecto.." />);
  //     }
  //     else{
  //       setView(<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-3">
  //                 {filteredProjects.map((project, index:number) => (
  //                   <CardProject project={project} token={token} key={index} />
  //                 ))}
  //               </div>)
  //     }
  //     setFilter(false);
  //   }
  // }, [filter]);

  // const addNewProject = async() => {
  //   let projs: ProjectMin[];
  //   try {
  //     projs = await getProjectsMin(token);
  //     if(typeof(projs)==='string') 
  //       showToastMessageError(projs);
  //     else {
  //       const d = ProjectBudgetDataToTableDataMin(projs);
  //       updateProjectStore(projs);
  //       setFilteredProjects(projs);
  //       setDataProjects(d);
  //     }
  //   } catch (error) {
  //     return <h1>Error al consultar los proyectos!!</h1>
  //   }
  // }

  // if(haveNewProject){
  //   addNewProject();
  //   updateHaveNewProject(false);
  // }

  // if(haveDeleteProject){
  //   const d = ProjectBudgetDataToTableDataMin(projectStore);
  //   //setExpensesFiltered(expensesTable);
  //   setDataProjects(d);
  //   updateHaveDeleteProject(false);
  // }

  let view = <></>;
  if(isTable){
    view = (<Table columns={columns} data={data} placeH="Buscar proyecto.." />);
  }else{
    view = (<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-3">
              {budgets.map((budget, index:number) => (
                <CardBudgetProject budget={budget} token={token} key={index} />
              ))}
            </div>)
  }

  // if(isTable){
  //   view = (<Table columns={columns} data={dataProjects} placeH="Buscar proyecto.." />);
  // }else{
  //   view = (<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-3">
              
  //           </div>)
  // }
  
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
  
    // let filtered: ProjectMin[] = [];
    // projectStore.map((project) => {
    //   if(conditionsValidation(project, startDate, endDate, minAmount, maxAmount, categories, types, conditions)){
    //     filtered.push(project);
    //   }
    // });

    // //setFilteredProjects(filtered);
    // setDataProjects(ProjectBudgetDataToTableDataMin(filtered));
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