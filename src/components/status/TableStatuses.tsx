'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import DeleteElement from "../DeleteElement";
import RemoveElement from "../RemoveElement";
//import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
//import { useState } from "react";
import { StatusTable } from "@/interfaces/Status";
//import { RemoveGlossary } from "@/app/api/routeGlossary";
import { RemoveCatalog } from "@/app/api/routeCatalogs";
import { showToastMessageError } from "../Alert";
import { useListsStore } from "@/app/store/listStore";

export default function TableStatus({data, token}:
                        {data:StatusTable[], token:string}){
  
  const columnHelper = createColumnHelper<StatusTable>();

  // const [editGloss, setEditGloss] = useState<boolean>(false);
  // const [glossEdit, setGlossEdit] = useState<GlossaryTable>();
  const {listsStore, updateListsStore} = useListsStore();

  const delReport = async(id: string) => {
    try {
      const arrLists = listsStore.filter(list => list._id !== id);
      updateListsStore(arrLists);
    } catch (error) {
      showToastMessageError('Error al quitar informe de la tabla!!');
    }
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
        <div className="flex gap-x-2">
          <div className="w-5 h-5 bg-blue-700"></div>
          {/* <DeleteElement id={row.original.id} name={row.original.catalog} remove={RemoveCatalog} token={token} /> */}
          <RemoveElement id={row.original.id} name={row.original.catalog} token={token} 
              remove={RemoveCatalog} removeElement={delReport} />
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>accion</p>
      )
    }),
    columnHelper.accessor('catalog', {
      header: 'Catalogo',
      id: 'catalogo',
      cell: ({row}) => (
        <p className="py-2 font-semibold">{row.original.catalog}</p>
      )
    }),
    columnHelper.accessor('collection', {
      header: 'Coleccion',
      id: 'coleccion',
      cell: ({row}) => (
        <p className="">{row.original.collection}</p>
      ),
    }),
    columnHelper.accessor('statuses', {
      header: 'Estatus',
      id: 'estatus',
      cell: ({row}) => (
        //<p className="">{row.original.statuses}</p>
        <div className="flex items-center gap-x-1">
          {row.original.statuses.arrStatuses.map((st, index:number) => (
            <div className="flex items-center gap-x-1" key={index}>
              <p>{st}</p>
              <div className="w-2 h-2" style={{backgroundColor: row.original.statuses.arrColors[index]}}></div>
            </div>
          ))}
        </div>
      ),
    }),
    columnHelper.accessor('categories', {
      header: 'Categorias',
      id: 'categorias',
      cell: ({row}) => (
        <p className="">{row.original.categories}</p>
      ),
    }),
    columnHelper.accessor('types', {
      header: 'Tipos',
      id: 'tipos',
      cell: ({row}) => (
        <p className="">{row.original.types}</p>
      ),
    }),
  ]
  
  return(
    <>
      {/* {editGloss && <NewGlossary token={token} glossary={glossEdit || ''} showForm={setEditGloss} />} */}
      <Table columns={columns} data={data} placeH="Buscar catalogo.." />
    </>
  )
}