'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import DeleteElement from "../DeleteElement";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { RelationTable } from "@/interfaces/Relation";
import { removeRelation } from "@/app/api/routeRelations";

export default function TableRelations({data, token}:
                        {data:RelationTable[], token:string}){
  
  const columnHelper = createColumnHelper<RelationTable>();

  const [editRelation, setEditRelation] = useState<boolean>(false);
  const [relationEdit, setRelationEdit] = useState<RelationTable>();

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
          {/* <PencilIcon className="w-5 h-5 text-slate-500 hover:text-slate-400 cursor-pointer" 
            onClick={() => {setRelationEdit(row.original); setEditRelation(true);}}
          /> */}
          <DeleteElement id={row.original.id} name={row.original.condition} remove={removeRelation} token={token} />
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>accion</p>
      )
    }),
    columnHelper.accessor('condition', {
      header: 'Condicion',
      id: 'Condicion',
      cell: ({row}) => (
        <p className="py-2 font-semibold">{row.original.condition}</p>
      )
    }),
    columnHelper.accessor('description', {
      header: 'Descripcion',
      id: 'Descripcion',
      cell: ({row}) => (
        <p className="">{row.original.description}</p>
      ),
    }),
    columnHelper.accessor('nextNode', {
      header: 'Nodo siguiente',
      id: 'Nodo',
      cell: ({row}) => (
        <p className="">{row.original.nextNode}</p>
      ),
    }),
  ]
  
  return(
    <>
      {/* {editGloss && <NewGlossary token={token} glossary={glossEdit || ''} showForm={setEditGloss} />} */}
      <Table columns={columns} data={data} placeH="Buscar relation.." />
    </>
  )
}