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
    columnHelper.accessor('status', {
      id: 'accion',
      cell: ({row}) => (
        <div className="flex items-center">
          <div className={`w-6 h-6 ${row.original.status? 'bg-green-500': 'bg-red-500'}`}></div>
          <TrashIcon className="text-red-500 w-6 h-6" />
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>accion</p>
      )
    }),
    columnHelper.accessor('resource', {
      header: 'Recurso',
      id: 'recurso',
      cell: ({row}) => (
        <Link href={`#`}>
          <p className="py-2">{row.original.resource}</p>
        </Link>
      )
    }),
    columnHelper.accessor('routes', {
      header: 'Rutas',
      id: 'rutas',
      cell: ({row}) => (
        <Link href={`#`}>
          <p className="py-2">{row.original.routes}</p>
        </Link>
      )
    }),
    columnHelper.accessor('components', {
      header: 'Componentes',
      id: 'componentes',
      cell: ({row}) => (
        <Link href={`#`}>
          <p className="py-2">{row.original.components}</p>
        </Link>
      )
    }),
  ]
  
  return(
    <>
      <Table columns={columns} data={data} placeH="Buscar arbol.." />
    </>
  )
}