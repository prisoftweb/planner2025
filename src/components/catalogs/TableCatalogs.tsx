'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import DeleteElement from "../DeleteElement";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { CatalogTable } from "@/interfaces/Catalogs";
import { RemoveCatalog } from "@/app/api/routeCatalogs";
import NewCatalog from "./NewCatalog";

export default function TableCatalogs({data, token}:
                        {data:CatalogTable[], token:string}){
  
  const columnHelper = createColumnHelper<CatalogTable>();

  const [editCat, setEditCat] = useState<boolean>(false);
  const [catEdit, setCatEdit] = useState<CatalogTable>();

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
          <PencilIcon className="w-5 h-5 text-slate-500 hover:text-slate-400 cursor-pointer" 
            onClick={() => {setCatEdit(row.original); setEditCat(true);}}
          />
          <DeleteElement id={row.original.id} name={row.original.name} remove={RemoveCatalog} token={token} />
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>accion</p>
      )
    }),
    columnHelper.accessor('name', {
      header: 'Catalogo',
      id: 'name',
      cell: ({row}) => (
        <p className="py-2 font-semibold">{row.original.name}</p>
      )
    }),
    columnHelper.accessor('collection', {
      header: 'Coleccion',
      id: 'collection',
      cell: ({row}) => (
        <p className="">{row.original.collection}</p>
      ),
    }),
  ]
  
  return(
    <>
      {editCat && <NewCatalog token={token} catalog={catEdit || ''} showForm={setEditCat} />}
      <Table columns={columns} data={data} placeH="Buscar catalogo.." />
    </>
  )
}