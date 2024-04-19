'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import DeleteElement from "../DeleteElement";
import { RemoveProject } from "@/app/api/routeProjects";
import { ProjectsTable } from "@/interfaces/Projects";
import Link from "next/link";

export default function TableProjects({data, token}:
                        {data:ProjectsTable[], token:string}){
  
  const columnHelper = createColumnHelper<ProjectsTable>();

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
        <div className="flex gap-x-2">
          <DeleteElement id={row.original.id} name={row.original.project} remove={RemoveProject} token={token} />
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>accion</p>
      )
    }),
    columnHelper.accessor('code', {
      header: 'Clave',
      id: 'code',
      cell: ({row}) => (
        <Link href={`/projects/${row.original.id}/profile`}>
          <p className="py-2 font-semibold">{row.original.code}</p>
        </Link>
      )
    }),
    columnHelper.accessor('project', {
      header: 'Proyecto',
      id: 'project',
      cell: ({row}) => (
        <Link href={`/projects/${row.original.id}/profile`}>
          <p className="">{row.original.project}</p>
        </Link>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Estatus',
      id: 'statuses',
      cell: ({row}) => (
        <Link href={`/projects/${row.original.id}/profile`}>
          <div className={`w-5 h-5 ${row.original.status? 'bg-green-500': 'bg-red-500'}`}></div>
        </Link> 
      ),
    }),
    columnHelper.accessor('category', {
      header: 'Categoria',
      id: 'category',
      cell: ({row}) => (
        <Link href={`/projects/${row.original.id}/profile`}>
          <p className="">{row.original.category}</p>
        </Link>
      ),
    }),
    columnHelper.accessor('client', {
      header: 'Cliente',
      id: 'client',
      cell: ({row}) => (
        <Link href={`/projects/${row.original.id}/profile`}>
          <p className="">{row.original.client}</p>
        </Link>
      ),
    }),
    columnHelper.accessor('date', {
      header: 'Fecha',
      id: 'date',
      cell: ({row}) => (
        <Link href={`/projects/${row.original.id}/profile`}>
          <p className="">{row.original.date.substring(0, 10)}</p>
        </Link>
      ),
    }),
    columnHelper.accessor('amount', {
      header: 'Monto',
      id: 'amount',
      cell: ({row}) => (
        <Link href={`/projects/${row.original.id}/profile`}>
          <p className="">{row.original.amount}</p>
        </Link>
      ),
    }),
  ]
  
  return(
    <>
      <Table columns={columns} data={data} placeH="Buscar proyecto.." />
    </>
  )
}