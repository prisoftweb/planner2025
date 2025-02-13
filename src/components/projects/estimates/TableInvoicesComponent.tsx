import { useState, useEffect } from "react"
import { IInvoice, IInvoiceTable } from "@/interfaces/Invoices"
import { getInvoices } from "@/app/api/routeInvoices"
import { showToastMessage, showToastMessageError } from "@/components/Alert";
import Table from "@/components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { TrashIcon } from "@heroicons/react/24/solid";
import { InvoiceDataToTableData } from "@/app/functions/InvoicesFunctions";

export default function TableInvoicesComponent({token}:{token:string}) {

  const [invoices, setInvoices] = useState<IInvoice[]>([]);

  useEffect(() => {
    const fetch = async() => {
      const res = await getInvoices(token);
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
    columnHelper.accessor('estimate', {
      header: 'Estimacion',
      id: 'estimacion',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
          onClick={() => window.location.replace(`/projects/estimates`)}
        >{row.original.estimate}</p>
      )
    }),
    columnHelper.accessor('folio', {
      header: 'Folio',
      id: 'folio',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/estimates`)}
        >{row.original.folio}</p>
      ),
    }),
    columnHelper.accessor('amount', {
      header: 'Monto',
      id: 'monto',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/estimates`)}
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
