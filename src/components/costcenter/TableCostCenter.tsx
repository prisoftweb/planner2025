'use client'
import { CostCenterTable } from "@/interfaces/CostCenter";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../Table";
import DeleteElement from "../DeleteElement";
import { RemoveCostoCenter } from "@/app/api/routeCostCenter";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import NewCostCenter from "./NewCostCenter";

export default function TableCostCenter({data, token}: {data:CostCenterTable[], token:string}){

  const columnHelper = createColumnHelper<CostCenterTable>();

  const [editCostCenter, setEditCostCenter] = useState<boolean>(false);
  const [costCenter, setCostCenter] = useState<CostCenterTable>();

  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'seleccion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          <input type="checkbox" 
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
          <div 
            className={`rounded-md text-white bg-gray-600 text-center
            uppercase w-6 h-6 flex items-center justify-center`}>
            <p className={`text-xs uppercase `} >{row.original.code.toString()}</p>
          </div>
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
    columnHelper.accessor('code', {
      id: 'accion',
      cell: ({row}) => (
        <div className="flex items-center gap-x-1">
          <PencilIcon className="w-6 h-6 text-slate-600 cursor-pointer" 
            onClick={() => {
              setCostCenter(row.original);
              setEditCostCenter(true);
            }} />
          <DeleteElement remove={RemoveCostoCenter} id={row.original.id} 
              token={token} name={row.original.category} />
          <p className="text-base font-semibold">{row.original.code}</p>
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Accion</p>
      )
    }),
    columnHelper.accessor('category', {
      id: 'Categoria',
      cell: ({row}) => (
        <p className=" font-semibold text-base">{row.original.category}</p>
      ),
      enableSorting:false,
      header: () => (
        <p>Categoria</p>
      )
    }),
    columnHelper.accessor('status', {
      id: 'Status',
      cell: ({row}) => (
        <div className={`w-6 h-6 ${row.original.status? 'bg-green-500': 'bg-red-500'}`}></div>
      ),
      enableSorting:false,
      header: () => (
        <p>Status</p>
      )
    }),
    columnHelper.accessor('concept', {
      id: 'Concepto',
      cell: ({row}) => (
        <p className="text-slate-600 font-semibold">{row.original.concept}</p>
      ),
      enableSorting:false,
      header: () => (
        <p>Concepto</p>
      )
    }),
  ]

  return(
    <>
      {editCostCenter && <NewCostCenter costCenter={costCenter || ''} showForm={setEditCostCenter} token={token} /> }
      <Table columns={columns} data={data} placeH="Buscar centro de costo.." />
    </>
  )
}