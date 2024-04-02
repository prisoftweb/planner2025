'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import Link from "next/link";
import { TreeTable } from "@/interfaces/Roles";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function TableTree({data, token, idTree}:
                        {data:TreeTable[], token:string, idTree:string}){
  
  const columnHelper = createColumnHelper<TreeTable>();

  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'id',
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
      id: 'action',
      cell: ({row}) => (
        // <DeleteClient client={row.original} token={token} />
        <TrashIcon className="text-red-500 w-6 h-6" />
      ),
      enableSorting:false,
      header: () => (
        <p>accion</p>
      )
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      id: 'status',
      cell: ({row}) => (
        <Link href={`#`}>
          <div className="flex items-center">
            <div className={`w-6 h-6 ${row.original.status? 'bg-green-500': 'bg-red-500'}`}></div>
          </div>
        </Link>
      )
    }),
    columnHelper.accessor('resource', {
      header: 'Recurso',
      id: 'resource',
      cell: ({row}) => (
        <Link href={`#`}>
          <p className="py-2">{row.original.resource}</p>
        </Link>
      )
    }),
    columnHelper.accessor('routes', {
      header: 'Rutas',
      id: 'routes',
      cell: ({row}) => (
        <Link href={`#`}>
          <p className="py-2">{row.original.routes}</p>
        </Link>
      )
    }),
  ]
  
  return(
    <>
      <Table columns={columns} data={data} placeH="Buscar rol.." />
    </>
  )
}