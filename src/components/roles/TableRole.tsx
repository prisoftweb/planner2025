'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import Link from "next/link";
import IconText from "../providers/IconText";
import { RoleTable } from "@/interfaces/Roles";
import { TrashIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { RemoveRole } from "@/app/api/routeRoles";
import DeleteElement from "../DeleteElement";

export default function TableRole({data, token}:
                        {data:RoleTable[], token:string}){
  
  const columnHelper = createColumnHelper<RoleTable>();

  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'id',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          <input type="checkbox" 
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
          <IconText size="w-6 h-6" sizeText="text-sm" text={row.original.name} />
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
        <div className="flex items-center gap-x-1">
          <DeleteElement id={row.original.id} name={row.original.name} remove={RemoveRole} token={token} />
          <div className="flex text-slate-500 items-end">
            <div 
              className={`w-4 h-4 ${row.original.status.status? 'bg-green-500': 'bg-red-500'}`}>
            </div>
            <p><sub>{row.original.status.routes}</sub></p>
          </div>
          <div className="flex text-slate-500 items-end">
            <UserCircleIcon className="w-6 h-6 text-slate-500" />
            <p><sub>{row.original.status.routes}</sub></p>
          </div>
        </div>
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
        <Link href={`/roles/role/${row.original.id}`}>
          <p className="py-2">{row.original.name}</p>
        </Link>
      )
    }),
    // columnHelper.accessor('status', {
    //   header: 'Status',
    //   id: 'status',
    //   cell: ({row}) => (
    //     <Link href={`/roles/role/${row.original.id}`}>
    //       <div className="flex text-slate-500 items-end">
    //         <div 
    //           className={`w-4 h-4 ml-5 ${row.original.status.status? 'bg-green-500': 'bg-red-500'}`}>
    //         </div>
    //         <p><sub>{row.original.status.routes}</sub></p>
    //       </div>
    //     </Link>       
    //   ),
    // }),
    // columnHelper.accessor('users', {
    //   header: 'Usuarios',
    //   id: 'users',
    //   cell: ({row}) => (
    //     <Link href={`/roles/role/${row.original.id}`}>
    //       <div className="flex text-slate-500 items-end">
    //         <UserCircleIcon className="w-6 h-6 text-slate-500" />
    //         <p><sub>{row.original.status.routes}</sub></p>
    //       </div>
    //     </Link>
    //   ),
    // }),
    columnHelper.accessor('components', {
      header: 'Componentes',
      id: 'components',
      cell: ({row}) => (
        <Link href={`/roles/role/${row.original.id}`}>
          <p className="py-2 text-center">{row.original.components}</p>
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
      <Table columns={columns} data={data} placeH="Buscar rol.." />
    </>
  )
}