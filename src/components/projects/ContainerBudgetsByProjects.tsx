'use client'
import { OneProjectMin, IBudgetByProject } from "@/interfaces/Projects"
import { createColumnHelper } from "@tanstack/react-table"
import Table from "../Table"
import { CurrencyFormatter, MoneyFormatter } from "@/app/functions/Globals"
import { ProjectsBudgetTable } from "@/interfaces/Projects"
import { ProjectBudgetDataToTableDataProjectMin } from "@/app/functions/SaveProject"
import { IPermissionsAndComponents } from "@/interfaces/Roles"

type Props = {
  project:OneProjectMin, 
  token:string, 
  user:string,
  budgets: IBudgetByProject[],
  permissions:IPermissionsAndComponents
}

export default function ContainerBudgetsByProject({project, token, user, budgets, permissions}: Props){

  const columnHelper = createColumnHelper<ProjectsBudgetTable>();

  const queryParam= `?project=${project._id}`;

  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'seleccion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          {permissions.permission.select && (
            <input type="checkbox" 
              checked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
            />
          )}
        </div>
      ),
      enableSorting:false,
      header: ({table}:any) => (
        <>
          {permissions.permission.select && (
            <input type="checkbox"
              checked={table.getIsAllRowsSelected()}
              onClick={()=> {
                table.toggleAllRowsSelected(!table.getIsAllRowsSelected())
              }}
            />
          )}
        </>
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
      {permissions.permission.readfull && (
        <>
          <div className="hidden lg:block w-full">
            <Table columns={columns} data={dataExpenses} placeH="Buscar presupuesto.." />
          </div>
          <div className="block lg:hidden w-full">
            <ListData data={dataExpenses} queryParam={queryParam} />
          </div>
        </>
      )}
    </>
  )
}

const ListData = ({data, queryParam }: 
  {data: ProjectsBudgetTable[], queryParam:string }) => {

  return(
    <div className="mt-2">
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border] h-[calc(100vh-229px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {data.map((b) => (
            <CardBudget budget={b} key={b.id} queryParam={queryParam} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardBudget = ({budget, queryParam }: 
  {budget:ProjectsBudgetTable, queryParam:string }) => {
  
  return(
    <div role="button"
      key={budget.id}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center">
          <img alt="responsable" src={ budget.project.project ?? '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
        </div>
        <div className="w-full"
          onClick={() => window.location.replace(`/projects/budget/${budget.id}${queryParam}`)}
        >
          <div className="flex gap-x-3 w-full justify-between items-center p-3">
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {budget.project.budget}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {CurrencyFormatter({
                  currency: 'MXN',
                  value: budget.amountBudget
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                {CurrencyFormatter({
                  currency: 'MXN',
                  value: budget.budgeted
                })}
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                {CurrencyFormatter({
                  currency: 'MXN',
                  value: budget.pending
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}