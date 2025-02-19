import { useState, useEffect } from "react"
import { IInvoiceByProject, IInvoiceTable } from "@/interfaces/Invoices"
import { getInvoicesByProject, removeInvoice } from "@/app/api/routeInvoices"
import { showToastMessage, showToastMessageError } from "@/components/Alert";
import Table from "@/components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { InvoiceDataToTableData } from "@/app/functions/InvoicesFunctions";
import RemoveElement from "@/components/RemoveElement";
import { OneProjectMin } from "@/interfaces/Projects";
import Chip from "@/components/providers/Chip";

export default function TableInvoicesComponent({token, project}:{token:string, project:OneProjectMin}) {

  const [invoices, setInvoices] = useState<IInvoiceByProject[]>([]);

  useEffect(() => {
    const fetch = async() => {
      const res = await getInvoicesByProject(token, project._id);
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        setInvoices(res);
      }
    }

    fetch();
  })

  if(invoices.length <= 0){
    return (
      <>
        <div className="flex flex-col items-center">
          <p className="text-5xl mt-20 font-bold">Facturas</p>
          <p className="text-xl mt-10 text-slate-700 font-bold" 
            // style={{maxInlineSize: '45ch', textWrap:'balance' }}
            >Agregar una factura a una estimacion determinada de un proyecto.</p>
          <img src="/img/projects/default.svg" alt="image" className="w-60 h-auto" />
        </div>
      </>
    )
  }

  const delInvoice = (id:string) => {
    const fil = invoices.filter((i) => i._id !== id);
    setInvoices(fil);
  }

  const columnHelper = createColumnHelper<IInvoiceTable>();
  
  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'Accion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          {/* <input type="checkbox" 
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          /> */}
          <RemoveElement id={row.original.id} name={row.original.estimate} remove={removeInvoice} 
                      removeElement={delInvoice} token={token} />
        </div>
      ),
      size: 300,
      enableSorting:false,
      header: ({table}:any) => (
        // <input type="checkbox"
        //   checked={table.getIsAllRowsSelected()}
        //   onClick={()=> {
        //     table.toggleAllRowsSelected(!table.getIsAllRowsSelected())
        //   }}
        // />
        <p>Accion</p>
      )
    }),
    columnHelper.accessor('folio', {
      header: 'Folio',
      id: 'folio',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${project._id}/invoice/${row.original.id}`)}
        >{row.original.folio}</p>
      ),
    }),
    columnHelper.accessor('usecfdi', {
      header: 'Uso CFDI',
      id: 'cdfi',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${project._id}/invoice/${row.original.id}`)}
        >{row.original.usecfdi}</p>
      ),
    }),
    columnHelper.accessor('methodpaid', {
      header: 'Metodo de pago',
      id: 'metodo',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${project._id}/invoice/${row.original.id}`)}
        >{row.original.methodpaid}</p>
      ),
    }),
    columnHelper.accessor('formpaid', {
      header: 'Forma de pago',
      id: 'forma',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${project._id}/invoice/${row.original.id}`)}
        >{row.original.formpaid}</p>
      ),
    }),
    columnHelper.accessor('estimate', {
      header: 'Estimacion',
      id: 'estimacion',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${project._id}/invoice/${row.original.id}`)}
        >{row.original.estimate}</p>
      )
    }),
    columnHelper.accessor('condition', {
      header: 'Condicion',
      id: 'condicion',
      cell: ({row}) => (
        <Chip label={row.original.condition.name} color={row.original.condition.color} />
      ),
    }),
    columnHelper.accessor('fecha', {
      header: 'Fecha',
      id: 'fecha',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${project._id}/invoice/${row.original.id}`)}
        >{row.original.fecha.substring(0, 10)}</p>
      ),
    }),
    columnHelper.accessor('amount', {
      header: 'Monto',
      id: 'monto',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${project._id}/invoice/${row.original.id}`)}
        >{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.amount
        })}</p>
      ),
    }),
  ]

  const data = InvoiceDataToTableData(invoices);

  return (
    <>
      <Table columns={columns} data={data} placeH="buscar factura" />
    </>
  )
}
