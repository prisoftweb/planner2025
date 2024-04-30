'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import Link from "next/link";
import { Resource, ResourceTable } from "@/interfaces/Roles";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import NewRoute from "./NewRoute";
import NewSubPath from "./NewSubPath";
import NewComponent from "./NewComponent";

export default function TableResource({data, token, option}:
                        {data:ResourceTable[], token:string, option:number}){
  
//option 1 resources 2 routes y 3 components

  const columnHelper = createColumnHelper<ResourceTable>();
  const [dataResource, setDataResource] = useState<Resource>({__v: 0,
                           _id: '', description: '', id: '', name: '', title: ''});

  const updateResource = (row:ResourceTable) => {
    setDataResource({
      __v: 0,
      _id: row.id,
      description: row.description,
      id: row.id,
      name: row.name,
      title: row.title,
    })
    setOpenForm(true);
  }

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
      id: 'accion',
      cell: ({row}) => (
        // <DeleteClient client={row.original} token={token} />
        <div className="flex">
          <TrashIcon className="text-red-500 w-6 h-6" />
          <PencilSquareIcon className="text-slate-500 w-6 h-6 cursor-pointer" 
            onClick={() => updateResource(row.original)}
          />
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>accion</p>
      )
    }),
    columnHelper.accessor('name', {
      header: 'Nombre',
      id: 'nombre',
      cell: ({row}) => (
        <Link href={`#`}>
          <p className="py-2">{row.original.name}</p>
        </Link>
      )
    }),
    columnHelper.accessor('title', {
      header: 'Titulo',
      id: 'titulo',
      cell: ({row}) => (
        <Link href={`#`}>
          <p className="py-2">{row.original.title}</p>
        </Link>
      )
    }),
    columnHelper.accessor('description', {
      header: 'Descripcion',
      id: 'descripcion',
      cell: ({row}) => (
        <Link href={`#`}>
          <p className="py-2">{row.original.description}</p>
        </Link>
      )
    }),
  ]
  
  const [openForm, setOpenForm] = useState<boolean>(false);

  const view = (option === 1? 
                  <NewRoute showForm={setOpenForm} token={token} resource={dataResource} />: 
                      (option === 2? <NewSubPath showForm={setOpenForm} token={token} route={dataResource} /> : 
                          (option === 3? <NewComponent showForm={setOpenForm} token={token} component={dataResource} /> :
                            <NewRoute showForm={setOpenForm} token={token} resource={dataResource} />)) )

  return(
    <>
      {openForm && view}
      <Table columns={columns} data={data} placeH={`${option=== 2? 'Buscar ruta..': 
                                                        (option===3? 'Buscar componente..': 
                                                          'Buscar recurso..')}`} />
    </>
  )
}