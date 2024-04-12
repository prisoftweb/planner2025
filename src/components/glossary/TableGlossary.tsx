'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import DeleteElement from "../DeleteElement";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { GlossaryTable } from "@/interfaces/Glossary";
import { RemoveGlossary } from "@/app/api/routeGlossary";
import NewGlossary from "./NewGlossary";

export default function TableLists({data, token}:
                        {data:GlossaryTable[], token:string}){
  
  const columnHelper = createColumnHelper<GlossaryTable>();

  const [editGloss, setEditGloss] = useState<boolean>(false);
  const [glossEdit, setGlossEdit] = useState<GlossaryTable>();

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
          <div className="w-5 h-5" style={{backgroundColor: row.original.color}}></div>
          <PencilIcon className="w-5 h-5 text-slate-500 hover:text-slate-400 cursor-pointer" 
            onClick={() => {setGlossEdit(row.original); setEditGloss(true);}}
          />
          <DeleteElement id={row.original.id} name={row.original.name} remove={RemoveGlossary} token={token} />
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>accion</p>
      )
    }),
    columnHelper.accessor('name', {
      header: 'Glosario',
      id: 'name',
      cell: ({row}) => (
        <p className="py-2 font-semibold">{row.original.name}</p>
      )
    }),
    columnHelper.accessor('description', {
      header: 'Descripcion',
      id: 'description',
      cell: ({row}) => (
        <p className="">{row.original.description}</p>
      ),
    }),
  ]
  
  return(
    <>
      {editGloss && <NewGlossary token={token} glossary={glossEdit || ''} showForm={setEditGloss} />}
      <Table columns={columns} data={data} placeH="Buscar lista.." />
    </>
  )
}