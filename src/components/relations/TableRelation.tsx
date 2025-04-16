'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import DeleteElement from "../DeleteElement";
import { RelationTable } from "@/interfaces/Relation";
import { removeRelation } from "@/app/api/routeRelations";

export default function TableRelations({data, token}:
  {data:RelationTable[], token:string}){
  
  const columnHelper = createColumnHelper<RelationTable>();

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
      <Table columns={columns} data={data} placeH="Buscar relation.." />
    </>
  )
}