'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import Link from "next/link";
import { ResourceTable } from "@/interfaces/Roles";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function TableResource({data, token}:
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
    columnHelper.accessor('name', {
      header: 'Nombre',
      id: 'name',
      cell: ({row}) => (
        <Link href={`#`}>
          <p className="py-2">{row.original.name}</p>
        </Link>
      )
    }),
    columnHelper.accessor('title', {
      header: 'Titulo',
      id: 'title',
      cell: ({row}) => (
        <Link href={`#`}>
          <p className="py-2">{row.original.title}</p>
        </Link>
      )
    }),
    columnHelper.accessor('description', {
      header: 'Descripcion',
      id: 'description',
      cell: ({row}) => (
        <Link href={`#`}>
          <p className="py-2">{row.original.description}</p>
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