'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import DeleteElement from "../DeleteElement";
import { removeWorkFlow } from "@/app/api/routeWorkflows";
import { WorkflowTable } from "@/interfaces/Workflows";

export default function TableWorkflows({data, token}:
  {data:WorkflowTable[], token:string}){
  
  const columnHelper = createColumnHelper<WorkflowTable>();

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
    columnHelper.accessor(row => row.id, {
      id: 'Accion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          <DeleteElement id={row.original.id} name={row.original.title} remove={removeWorkFlow} token={token} />
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>accion</p>
      )
    }),
    columnHelper.accessor('title', {
      header: 'Workflow',
      id: 'workflow',
      cell: ({row}) => (
        <p className="py-2 font-semibold">{row.original.title}</p>
      )
    }),
    columnHelper.accessor('description', {
      header: 'Descripcion',
      id: 'Descripcion',
      cell: ({row}) => (
        <p className="">{row.original.description}</p>
      ),
    }),
  ]
  
  return(
    <>
      <Table columns={columns} data={data} placeH="Buscar workflow.." />
    </>
  )
}