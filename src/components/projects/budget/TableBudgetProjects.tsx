'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
//import DeleteElement from "@/components/DeleteElement";
//import { RemoveProject } from "@/app/api/routeProjects";
import { ProjectMin, ProjectsBudgetTable } from "@/interfaces/Projects";
//import CardProject from "../CardProject";
import CardBudgetProject from "./CardBudgetProject";
import { useState, useEffect } from "react";
//import Filtering from "../Filtering";
import Filtering from "./FilteringBudgets";
import { Options } from "@/interfaces/Common";
import { ProjectBudgetDataToTableDataMin } from "@/app/functions/SaveProject";
import { showToastMessageError } from "@/components/Alert";
import Chip from "@/components/providers/Chip";
import { BudgetMin } from "@/interfaces/Budget";
import { removeBudget } from "@/app/api/routeBudget";
import { useBudgetStore } from "@/app/store/budgetProject";
import RemoveElement from "@/components/RemoveElement";

export default function TableBudgetProjects({token, budgets, optConditions, isFilter, 
                          setIsFilter, isTable, optProjects}:
                        {token:string, budgets: BudgetMin[], optConditions: Options[], 
                          optProjects: Options[], isFilter:boolean, setIsFilter:Function, isTable:boolean}){
  
  const columnHelper = createColumnHelper<ProjectsBudgetTable>();

  const {budgetsStore, updateBudgetsStore} = useBudgetStore();

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
          <img src={row.original.project.project} alt="sin imagen" className="w-10 h-10" />
          {/* <DeleteElement id={row.original.id} name={row.original.project} remove={RemoveProject} token={token} /> */}
          <RemoveElement id={row.original.id} name={row.original.project.budget} remove={removeBudget} 
              removeElement={delBudget} token={token} />
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Accion</p>
      )
    }),
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
    columnHelper.accessor('project', {
      header: 'Presupuesto',
      id: 'presupuesto',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/budget/${row.original.id}`)}
        >{row.original.project.budget}</p>
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
      header: 'Estatus',
      id: 'Estatus',
      cell: ({row}) => (
        <Chip label={row.original.segment} color={row.original.color} />
      ),
    }),
    columnHelper.accessor('amountBudget', {
      header: 'Monto presupuesto',
      id: 'Monto presupuesto',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/budget/${row.original.id}`)}
        >{row.original.amountBudget}</p>
      ),
    }),
    columnHelper.accessor('budgeted', {
      header: 'Presupuestado',
      id: 'Presupuestado',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/budget/${row.original.id}`)}
        >{row.original.budgeted}</p>
      ),
    }),
    columnHelper.accessor('pending', {
      header: 'Pendiente',
      id: 'pendiente',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/budget/${row.original.id}`)}
        >{row.original.pending}</p>
      ),
    }),
  ]
  
  const [maxAmount, setMaxAmount] = useState<number>(0);
  useEffect(() => {
    const budgetMax = budgets.reduce(((previous, current) => {
      return current.amount > previous.amount ? current: previous;
    }));
    setMaxAmount(budgetMax.amount);
  }, [])

  const [filteredBudgets, setFilteredBudgets] = useState<BudgetMin[]>(budgetsStore? budgetsStore: budgets);

  useEffect(() => {
    if(budgetsStore){
      setFilteredBudgets(budgetsStore)
    }else{
      setFilteredBudgets([]);
    }
  }, [budgetsStore]);

  const dataTable: ProjectsBudgetTable[] = ProjectBudgetDataToTableDataMin(filteredBudgets);

  let view = <></>;
  if(isTable){
    // view = (<Table columns={columns} data={data} placeH="Buscar proyecto.." />);
    view = (<Table columns={columns} data={dataTable} placeH="Buscar proyecto.." />);
  }else{
    view = (<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-3">
              {filteredBudgets.map((budget, index:number) => (
                <CardBudgetProject budget={budget} token={token} key={index} />
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

  const amountValidation = (budget:BudgetMin, startDate:number, endDate:number, 
        minAmount:number, maxAmount:number) => {
    if(budget.amount >= minAmount && budget.amount <= maxAmount){
      if(dateValidation(budget.date, startDate, endDate)){
        return true;
      }
    }
    return false;
  }

  const projectsValidation = (budget:BudgetMin, startDate:number, endDate:number, 
    minAmount:number, maxAmount:number, projects:string[]) => {
    if(projects.includes('all')){
      if(amountValidation(budget, startDate, endDate, minAmount, maxAmount))
        return true;
      return false;
    }else{
      if(budget.project)
        if(projects.includes(budget.project._id))
          if(amountValidation(budget, startDate, endDate, minAmount, maxAmount))
            return true;
      return false;
    }
    // if(categoriesValidation(budget, startDate, endDate, minAmount, maxAmount, projects))
    //   return true;
    // return false;
  }

  const conditionsValidation = (budget:BudgetMin, startDate:number, endDate:number, 
        minAmount:number, maxAmount:number, conditions:string[], projects: string[]) => {
    if(conditions.includes('all')){
      if(projectsValidation(budget, startDate, endDate, minAmount, maxAmount, projects))
        return true;
      return false;
    }else{
      if(conditions.includes(budget.lastmove.condition._id))
        if(projectsValidation(budget, startDate, endDate, minAmount, maxAmount, projects))
          return true;
      return false;
    }
  }

  const filterData = (conditions:string[], minAmount:number, maxAmount:number, 
    startDate:number, endDate:number, projects: string[]) => {
  
    let filtered: BudgetMin[] = [];
    budgetsStore?.map((budget) => {
      if(conditionsValidation(budget, startDate, endDate, minAmount, maxAmount, conditions, projects)){
        filtered.push(budget);
      }
    });

    setFilteredBudgets(filtered);
    // setDataProjects(ProjectBudgetDataToTableDataMin(filtered));
  }

  return(
    <>
      <div className="flex justify-end mb-5">
        {isFilter && <Filtering showForm={setIsFilter} optConditions={optConditions} 
                          FilterData={filterData} maxAmount={maxAmount} optProjects={optProjects}  />}
      </div>
      {view}
    </>
  )
}