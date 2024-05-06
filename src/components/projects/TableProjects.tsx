'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import DeleteElement from "../DeleteElement";
import { RemoveProject } from "@/app/api/routeProjects";
import { ProjectsTable, Project } from "@/interfaces/Projects";
import Link from "next/link";
import CardProject from "./CardProject";
import { useState, useEffect } from "react";

export default function TableProjects({data, token, projects}:
                        {data:ProjectsTable[], token:string, projects: Project[]}){
  
  const columnHelper = createColumnHelper<ProjectsTable>();

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
    columnHelper.accessor('condition', {
      id: 'accion',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          <div className={`w-5 h-5`} style={{'backgroundColor': row.original.condition}}></div>
          <DeleteElement id={row.original.id} name={row.original.project} remove={RemoveProject} token={token} />
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>accion</p>
      )
    }),
    columnHelper.accessor(row => row.percentage, {
      id: 'avance',
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
        <p>Avance</p>
      )
    }),
    columnHelper.accessor('code', {
      header: 'Clave',
      id: 'clave',
      cell: ({row}) => (
        <Link href={`/projects/${row.original.id}/profile`}>
          <p className="py-2 font-semibold">{row.original.code}</p>
        </Link>
      )
    }),
    columnHelper.accessor('project', {
      header: 'Proyecto',
      id: 'proyecto',
      cell: ({row}) => (
        <Link href={`/projects/${row.original.id}/profile`}>
          <p className="">{row.original.project}</p>
        </Link>
      ),
    }),
    // columnHelper.accessor('status', {
    //   header: 'Estatus',
    //   id: 'statuses',
    //   cell: ({row}) => (
    //     <Link href={`/projects/${row.original.id}/profile`}>
    //       <div className={`w-5 h-5 ${row.original.status? 'bg-green-500': 'bg-red-500'}`}></div>
    //     </Link> 
    //   ),
    // }),
    columnHelper.accessor('category', {
      header: 'Categoria',
      id: 'categoria',
      cell: ({row}) => (
        <Link href={`/projects/${row.original.id}/profile`}>
          <p className="">{row.original.category}</p>
        </Link>
      ),
    }),
    columnHelper.accessor('client', {
      header: 'Cliente',
      id: 'cliente',
      cell: ({row}) => (
        <Link href={`/projects/${row.original.id}/profile`}>
          <p className="">{row.original.client}</p>
        </Link>
      ),
    }),
    columnHelper.accessor('date', {
      header: 'Fecha',
      id: 'fecha',
      cell: ({row}) => (
        <Link href={`/projects/${row.original.id}/profile`}>
          <p className="">{row.original.date?.substring(0, 10) || ''}</p>
        </Link>
      ),
    }),
    columnHelper.accessor('amount', {
      header: 'Monto',
      id: 'monto',
      cell: ({row}) => (
        <Link href={`/projects/${row.original.id}/profile`}>
          <p className="">{row.original.amount}</p>
        </Link>
      ),
    }),
  ]
  
  const [isTable, setIsTable] = useState<boolean>(true);
  const [view, setView] = useState<JSX.Element>(<></>);

  useEffect(() => {
    if(isTable){
      setView(<Table columns={columns} data={data} placeH="Buscar proyecto.." />);
    }else{
      setView(<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-3">
                {projects.map((project, index:number) => (
                  <CardProject project={project} token={token} key={index} />
                ))}
              </div>)
    }
  }, [ , isTable]);

  return(
    <>
      <div className="flex justify-end mb-5">
        <div className="inline-flex rounded-md shadow-sm mx-2">
          <button type="button" className={`px-3 py-1 text-sm border border-green-400 rounded-md 
                    ${isTable? 'bg-green-500 text-white': ''}`}
            onClick={() => setIsTable(true)}
          >
            Tabla
          </button>
          <button type="button" className={`px-3 py-1 text-sm border border-red-400 rounded-md 
                    ${!isTable? 'bg-red-500 text-white': ''}`}
            onClick={() => setIsTable(false)}
          >
            Tarjetas
          </button>
        </div>
      </div>
      {view}
      {/* <Table columns={columns} data={data} placeH="Buscar proyecto.." /> */}
      {/* <div className="grid grid-cols-3 gap-x-4 gap-y-3">
        {projects.map((project, index:number) => (
          <CardProject project={project} token={token} key={index} />
        ))}
      </div> */}
    </>
  )
}