'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { CatalogTable } from "@/interfaces/Catalogs";
import { RemoveCatalog } from "@/app/api/routeCatalogs";
import NewCatalog from "./NewCatalog";
import RemoveElement from "../RemoveElement";
import { useListsStore } from "@/app/store/listStore";
import { showToastMessageError } from "../Alert";
import {Tooltip} from "@nextui-org/react";

export default function TableCatalogs({data, token}: {data:CatalogTable[], token:string}){
  
  const columnHelper = createColumnHelper<CatalogTable>();

  const {listsStore, updateListsStore} = useListsStore();

  const [editCat, setEditCat] = useState<boolean>(false);
  const [catEdit, setCatEdit] = useState<CatalogTable>();

  let props = {
    variants: {
      exit: {
        opacity: 0,
        transition: {
          duration: 0.1,
          ease: "easeIn",
        }
      },
      enter: {
        opacity: 1,
        transition: {
          duration: 0.15,
          ease: "easeOut",
        }
      },
    },
  }

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
          <Tooltip closeDelay={0} delay={100} motionProps={props} content='Modificar' 
              placement="right" className="text-black bg-white rounded-md border border-slate-400">
            <PencilIcon className="w-5 h-5 text-slate-500 hover:text-slate-400 cursor-pointer hover:bg-blue-100" 
              onClick={() => {setCatEdit(row.original); setEditCat(true);}}
            />
          </Tooltip>
          <RemoveElement id={row.original.id} name={row.original.name} token={token} 
              remove={RemoveCatalog} removeElement={delReport} />
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>accion</p>
      )
    }),
    columnHelper.accessor('name', {
      header: 'Catalogo',
      id: 'catalogo',
      cell: ({row}) => (
        <p className="py-2 font-semibold">{row.original.name}</p>
      )
    }),
    columnHelper.accessor('collection', {
      header: 'Coleccion',
      id: 'coleccion',
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