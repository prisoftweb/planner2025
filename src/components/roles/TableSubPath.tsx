'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import Link from "next/link";
import { ResourceTable } from "@/interfaces/Roles";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function TableSubPath({data, token}:
                        {data:ResourceTable[], token:string}){
  
  const columnHelper = createColumnHelper<ResourceTable>();

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
        <Link href={`/roles/role/${row.original.id}`}>
          <div className="flex text-slate-500 items-end">
            <div 
              className={`w-4 h-4 ml-5 ${row.original.status? 'bg-green-500': 'bg-red-500'}`}>
            </div>
          </div>
        </Link>       
      ),
    }),
    columnHelper.accessor('name', {
      header: 'Nombre',
      id: 'name',
      cell: ({row}) => (
        <Link href={`/roles/role/${row.original.id}`}>
          <p className="py-2">{row.original.name}</p>
        </Link>
      )
    }),
    columnHelper.accessor('description', {
      header: 'Descripcion',
      id: 'description',
      cell: ({row}) => (
        <Link href={`/roles/role/${row.original.id}`}>
          <p className="py-2">{row.original.description}</p>
        </Link>
      )
    }),
  ]
  
  return(
    <>
      <Table columns={columns} data={data} placeH="Buscar ruta.." />
    </>
  )
}