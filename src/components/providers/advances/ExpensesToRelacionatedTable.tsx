import React from 'react'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { ICostRelAdvance } from '@/interfaces/Expenses';
import { IoAlert } from "react-icons/io5";
import { BsFileEarmarkPdf } from "react-icons/bs";
import Chip from '../Chip';
import { CurrencyFormatter } from '@/app/functions/Globals';

export default function ExpensesToRelacionatedTable({costs}:{costs:ICostRelAdvance[]}) {

  const columnHelper = createColumnHelper<ICostRelAdvance>();

  const columns = [
    // columnHelper.accessor(row => row._id, {
    //   id: 'seleccion',
    //   cell: ({row}) => (
    //     <div className="flex gap-x-2 justify-center">
    //       <input type="checkbox" 
    //         checked={row.getIsSelected()}
    //         onChange={row.getToggleSelectedHandler()}
    //         className="w-24 cursor-pointer"
    //       />
    //     </div>
    //   ),
    //   enableSorting:false,
    //   header: ({table}:any) => (
    //     <div className="w-8">
    //       <input type="checkbox"
    //         className="w-24 cursor-pointer"
    //         checked={table.getIsAllRowsSelected()}
    //         onClick={()=> {
    //           table.toggleAllRowsSelected(!table.getIsAllRowsSelected())
    //         }}
    //       />
    //     </div>
    //   )
    // }),
    columnHelper.accessor('user._id', {
      id: 'Responsable',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          <img src={row.original.user.photo} className="w-10 h-auto rounded-full" alt="user" />
          {/* <RemovePaymentComponent expenses={expenses} id={row.original._id} name={row.original.notes} 
              token={token} updateTable={deletePayment} user={user} /> */}
          {row.original.files? <BsFileEarmarkPdf className="w-6 h-6 text-green-500" />: <IoAlert className="w-6 h-6 text-red-500" />}
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Responsable</p>
      )
    }),
    columnHelper.accessor('estatus._id', {
      id: 'estatus',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
          // onClick={() => window.location.replace(`/providers/${idProv}/advances/${row.original._id}/profile`)}
        >
          <Chip darktext={row.original?.estatus?.darktext?? false} label={row.original?.estatus.name} color={row.original?.estatus.color} />
        </p>
      ),
      enableSorting:false,
      header: () => (
        <p>Estatus</p>
      )
    }),
    columnHelper.accessor('folio', {
      id: 'folio',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
          // onClick={() => window.location.replace(`/providers/${idProv}/advances/${row.original._id}/profile`)}
        >{row.original.folio}</p>
      ),
      enableSorting:false,
      header: () => (
        <p>Folio</p>
      )
    }),
    // columnHelper.accessor('description', {
    //   id: 'descripcion',
    //   cell: ({row}) => (
    //     <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content={row.original.description} 
    //         placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
    //       <p className="py-2 font-semibold cursor-pointer"
    //         // onClick={() => window.location.replace(`/providers/${idProv}/advances/${row.original._id}/profile`)}
    //       >{row.original.description?.substring(0, 300)}</p>
    //     </Tooltip>
    //   ),
    //   enableSorting:false,
    //   header: () => (
    //     <p>Descripcion</p>
    //   )
    // }),
    columnHelper.accessor('date', {
      id: 'fecha',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
          // onClick={() => window.location.replace(`/providers/${idProv}/advances/${row.original._id}/profile`)}
        >{row.original?.date?.substring(0, 10)}</p>
      ),
      enableSorting:false,
      header: () => (
        <p>Fecha</p>
      )
    }),
    columnHelper.accessor('cost.subtotal', {
      header: 'Importe',
      id: 'importe',
      cell: ({row}) => (
        <p className="cursor-pointer"
          // onClick={() => window.location.replace(`/providers/${idProv}/advances/${row.original._id}/profile`)}
        >{CurrencyFormatter({
          currency: 'MXN', 
          value: row.original.cost.subtotal?? 0
        })}</p>
      ),
    }),
    // columnHelper.accessor('cost.total', {
    //   header: 'Saldo disponible',
    //   id: 'saldo',
    //   cell: ({row}) => (
    //     <p className="cursor-pointer"
    //       // onClick={() => window.location.replace(`/providers/${idProv}/advances/${row.original._id}/profile`)}
    //     >{CurrencyFormatter({
    //       currency: 'MXN',
    //       value: row.original.cost.total?? 0
    //     })}</p>
    //   ),
    // }),
  ]

  return (
    <div className='mt-5'>
      <Table columns={columns} data={costs} placeH="Buscar gasto.." typeTable="advance"/>
    </div>
  )
}
