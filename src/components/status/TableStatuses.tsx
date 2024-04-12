'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import DeleteElement from "../DeleteElement";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { StatusTable } from "@/interfaces/Status";
import { RemoveGlossary } from "@/app/api/routeGlossary";

export default function TableLists({data, token}:
                        {data:StatusTable[], token:string}){
  
  const columnHelper = createColumnHelper<StatusTable>();

  // const [editGloss, setEditGloss] = useState<boolean>(false);
  // const [glossEdit, setGlossEdit] = useState<GlossaryTable>();

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
          <div className="w-5 h-5 bg-blue-700"></div>
          <PencilIcon className="w-5 h-5 text-slate-500 hover:text-slate-400 cursor-pointer" 
            //onClick={() => {setGlossEdit(row.original); setEditGloss(true);}}
          />
          <DeleteElement id={row.original.id} name={row.original.catalog} remove={RemoveGlossary} token={token} />
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>accion</p>
      )
    }),
    columnHelper.accessor('catalog', {
      header: 'Catalogo',
      id: 'catalog',
      cell: ({row}) => (
        <p className="py-2 font-semibold">{row.original.catalog}</p>
      )
    }),
    columnHelper.accessor('collection', {
      header: 'Coleccion',
      id: 'collection',
      cell: ({row}) => (
        <p className="">{row.original.collection}</p>
      ),
    }),
    columnHelper.accessor('statuses', {
      header: 'Status',
      id: 'statuses',
      cell: ({row}) => (
        <p className="">{row.original.statuses}</p>
      ),
    }),
  ]
  
  return(
    <>
      {/* {editGloss && <NewGlossary token={token} glossary={glossEdit || ''} showForm={setEditGloss} />} */}
      <Table columns={columns} data={data} placeH="Buscar status.." />
    </>
  )
}