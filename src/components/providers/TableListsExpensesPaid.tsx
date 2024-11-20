'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import Chip from "../providers/Chip";
import { BsFileEarmarkPdf } from "react-icons/bs"; //Archivo PDF
import { BsFiletypeXml } from "react-icons/bs"; //Archivo XML
import { IoAlert } from "react-icons/io5"; // No hay archivo
import { HistoryExpensesTable } from "@/interfaces/Providers";
import Button from "../Button";
import { CostsPaymentTable } from "@/interfaces/Providers";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import NewPartialCost from "./NewPartialCost";

export default function TableListExpensesPaid({data, nextPage, updateCostPartial}:
  {data:CostsPaymentTable[], nextPage: Function, updateCostPartial: Function}){
  
  const columnHelper = createColumnHelper<CostsPaymentTable>();
  const [showNewpartial, setShowNewPartial] = useState<boolean>(false);
  const [costCurrent, setCostCurrent] = useState<CostsPaymentTable>();

  const handleShowPartial = (value: boolean) => {
    setShowNewPartial(value);
  }

  const update = (value: CostsPaymentTable) => {
    setShowNewPartial(false);
    updateCostPartial(value);
  }

  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'seleccion',
      cell: ({row}) => (
        <div className="flex gap-x-2 justify-center">
          <input type="checkbox" 
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="w-24 cursor-pointer"
          />
        </div>
      ),
      enableSorting:false,
      header: ({table}:any) => (
        <div className="w-8">
          <input type="checkbox"
            className="w-24 cursor-pointer"
            checked={table.getIsAllRowsSelected()}
            onClick={()=> {
              table.toggleAllRowsSelected(!table.getIsAllRowsSelected())
            }}
          />
        </div>
      )
    }),
    columnHelper.accessor('Responsable', {
      id: 'Responsable',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          <img src={row.original.Responsable.photo} className="w-10 h-auto rounded-full" alt="user" />
          <PlusCircleIcon className="w-8 h-8 text-green-500 cursor-pointer hover:text-green-400" 
            onClick={() => {
              setCostCurrent(row.original);
              setShowNewPartial(true);
            }} />
          <div className="w-20 flex gap-x-1 items-center">
            {row.original.archivos.includes('xml') && <BsFiletypeXml className="w-6 h-6 text-green-500" />}
            {row.original.archivos.includes('pdf') && <BsFileEarmarkPdf className="w-6 h-6 text-green-500" />}
            {row.original.archivos.includes('none') && <IoAlert className="w-6 h-6 text-red-500" />}
          </div>
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Responsable</p>
      )
    }),
    // columnHelper.accessor('isPaid', {
    //   header: 'Pagado',
    //   id: 'pagado',
    //   cell: ({row}) => (
    //     <div className="cursor-pointer" 
    //       >
    //         <Chip label={row.original.isPaid? 'Pagado': 'No pagado'} color={row.original.isPaid? '#0f0': '#f00'} />
    //     </div>
    //   ),
    // }),
    columnHelper.accessor('condition', {
      header: 'Estatus',
      id: 'estatus',
      cell: ({row}) => (
        <div className="cursor-pointer">
            <Chip label={row.original.condition.name} color={row.original.condition.color} />
        </div>
      ),
    }),
    columnHelper.accessor('Fecha', {
      header: 'Fecha',
      id: 'fecha',
      cell: ({row}) => (
        <p className="cursor-pointer"
          
        >{row.original.Fecha?.substring(0, 10) || ''}</p>
      ),
    }),
    columnHelper.accessor('Total', {
      header: 'Importe saldo anterior',
      id: 'importe',
      cell: ({row}) => (
        <p className="cursor-pointer">{row.original.Total}</p>
      ),
    }),
    columnHelper.accessor('paid', {
      header: 'Importe saldo pagado',
      id: 'importe pagado',
      cell: ({row}) => (
        <p className="cursor-pointer">{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.paid
        })}</p>
      ),
    }),
    columnHelper.accessor('pending', {
      header: 'Importe saldo insoluto',
      id: 'importe insoluto',
      cell: ({row}) => (
        <p className="cursor-pointer">{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.pending
        })}</p>
      ),
    }),
  ]

  return(
    <>
      <Table columns={columns} data={data} placeH="Buscar gasto.." />
      <div className="mt-2 flex justify-center">
        <Button onClick={() => nextPage(1)}>Siguiente</Button>
      </div>
      {showNewpartial && costCurrent && <NewPartialCost setShowForm={handleShowPartial} cost={costCurrent} updateCost={update} />}
    </>
  )
}