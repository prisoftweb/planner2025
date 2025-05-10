'use client'
import { OneProjectMin, IBudgetByProject } from "@/interfaces/Projects"
import { createColumnHelper } from "@tanstack/react-table"
import Table from "../Table"
import { MoneyFormatter } from "@/app/functions/Globals"
import { ProjectsBudgetTable } from "@/interfaces/Projects"
import { ProjectBudgetDataToTableDataProjectMin } from "@/app/functions/SaveProject"

type Props = {
  project:OneProjectMin, 
  token:string, 
  user:string,
  budgets: IBudgetByProject[]
}

export default function ContainerBudgetsByProject({project, token, user, budgets}: Props){

  const columnHelper = createColumnHelper<ProjectsBudgetTable>();

  const queryParam= `?project=${project._id}`;

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
          <p>{Number(row.original.percentage.replace(/[$, M, X, N,%]/g, "")).toFixed(2)}%</p>
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
          onClick={() => window.location.replace(`/projects/budget/${row.original.id}${queryParam}`)}
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
    // columnHelper.accessor('segment', {
    //   header: 'Estatus',
    //   id: 'Estatus',
    //   cell: ({row}) => (
    //     <Chip label={row.original.segment} color={row.original.color} />
    //   ),
    // }),
    columnHelper.accessor('amountBudget', {
      header: 'Monto presupuesto',
      id: 'Monto presupuesto',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/budget/${row.original.id}${queryParam}`)}
        >
          {MoneyFormatter(row.original.amountBudget)}
        </p>
      ),
    }),
    columnHelper.accessor('budgeted', {
      header: 'Presupuestado',
      id: 'Presupuestado',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/budget/${row.original.id}${queryParam}`)}
        >
          {MoneyFormatter(row.original.budgeted)}
        </p>
      ),
    }),
    columnHelper.accessor('pending', {
      header: 'Pendiente',
      id: 'pendiente',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/budget/${row.original.id}${queryParam}`)}
        >
          {MoneyFormatter(row.original.pending)}
        </p>
      ),
    }),
  ]

  const dataExpenses = ProjectBudgetDataToTableDataProjectMin(budgets);

  return(
    <>
      <Table columns={columns} data={dataExpenses} placeH="Buscar gasto.." />
    </>
  )
}