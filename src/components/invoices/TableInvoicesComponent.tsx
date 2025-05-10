'use client'

import { useState, useEffect, useRef } from "react"
import { IInvoiceMin, IInvoiceTable } from "@/interfaces/Invoices"
import { getInvoicesMin, removeInvoice } from "@/app/api/routeInvoices"
import { showToastMessageError } from "@/components/Alert";
import Table from "@/components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { CurrencyFormatter } from "@/app/functions/Globals";
import RemoveElement from "@/components/RemoveElement";
import { OneProjectMin } from "@/interfaces/Projects";
import Chip from "@/components/providers/Chip";
import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";
import AddNewCollectionInvoice from "./AddNewCollectionInvoice";
import { Badge } from "@mui/material";

export default function TableInvoicesComponent({token, user}: 
  {token:string, user:string}) {

  const [invoices, setInvoices] = useState<IInvoiceMin[]>([]);
  const [selInvoice, setSelInvoice]=useState<IInvoiceTable>();
  const [showNewCollection, setShowNewCollection]=useState<boolean>(false);
  const refEstimate = useRef('');

  const handleShowForm = (value:boolean) => {
    setShowNewCollection(value);
  }

  useEffect(() => {
    const fetch = async() => {
      const res = await getInvoicesMin(token);
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        setInvoices(res);
      }
    }

    fetch();
  }, []);

  if(invoices.length <= 0){
    return (
      <>
        <div className="flex flex-col items-center">
          <p className="text-5xl mt-20 font-bold">Facturas</p>
          <p className="text-xl mt-10 text-slate-700 font-bold" 
            // style={{maxInlineSize: '45ch', textWrap:'balance' }}
            >Agregar una factura a una estimacion determinada de un proyecto.</p>
          <img src="/img/estimates/invoices.svg" alt="image" className="w-60 h-auto" />
        </div>
      </>
    )
  }

  const delInvoice = (id:string) => {
    window.location.reload();
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
          <RemoveElement id={`${row.original.id}/${row.original.idEstimates}`} name={row.original.estimate} remove={removeInvoice} 
                      removeElement={delInvoice} token={token} />
          {row.original.ischargedfull? (
            <Badge color="secondary" badgeContent={row.original.accountreceivablesCount}>
              <DocumentArrowDownIcon className="h-6 w-6 text-green-500 hover:text-green-300" />
            </Badge>
          ): (
            <Badge color="secondary" badgeContent={row.original.accountreceivablesCount}>
              <DocumentArrowDownIcon className="h-6 w-6 text-red-500 cursor-pointer hover:text-red-300" onClick={() => {
                refEstimate.current = row.original.id;
                setSelInvoice(row.original);
                setShowNewCollection(true);
              }}/>
            </Badge>
          )}
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
        onClick={() => window.location.replace(`/projects/estimates/${row.original.project}/invoice/${row.original.id}?page=invoices`)}
        >{row.original.folio}</p>
      ),
    }),
    columnHelper.accessor('usecfdi', {
      header: 'Uso CFDI',
      id: 'cdfi',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${row.original.project}/invoice/${row.original.id}?page=invoices`)}
        >{row.original.usecfdi.substring(row.original.usecfdi.length-3)}</p>
      ),
    }),
    columnHelper.accessor('methodpaid', {
      header: 'Metodo de pago',
      id: 'metodo',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${row.original.project}/invoice/${row.original.id}?page=invoices`)}
        >{row.original.methodpaid.substring(row.original.methodpaid.length-3)}</p>
      ),
    }),
    columnHelper.accessor('formpaid', {
      header: 'Forma de pago',
      id: 'forma',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${row.original.project}/invoice/${row.original.id}?page=invoices`)}
        >{row.original.formpaid.substring(row.original.formpaid.length-3)}</p>
      ),
    }),
    columnHelper.accessor('estimate', {
      header: 'Estimacion',
      id: 'estimacion',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${row.original.project}/invoice/${row.original.id}?page=invoices`)}
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
        onClick={() => window.location.replace(`/projects/estimates/${row.original.project}/invoice/${row.original.id}?page=invoices`)}
        >{row.original.fecha.substring(0, 10)}</p>
      ),
    }),
    columnHelper.accessor('amount', {
      header: 'Monto',
      id: 'monto',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${row.original.project}/invoice/${row.original.id}?page=invoices`)}
        >{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.amount
        })}</p>
      ),
    }),
    columnHelper.accessor('charged', {
      header: 'Cobrado',
      id: 'cobrado',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${row.original.project}/invoice/${row.original.id}?page=invoices`)}
        >{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.charged
        })}</p>
      ),
    }),
    columnHelper.accessor('unchargedbalanceamount', {
      header: 'Pendiente',
      id: 'pendiente',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${row.original.project}/invoice/${row.original.id}?page=invoices`)}
        >{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.unchargedbalanceamount
        })}</p>
      ),
    }),
  ]
  
  const data = InvoiceDataToTableData(invoices);

  return (
    <>
      <Table columns={columns} data={data} placeH="buscar factura" />
      {showNewCollection && selInvoice && <AddNewCollectionInvoice showForm={handleShowForm} user={user}
               token={token} invoiceTable={selInvoice} />}
    </>
  )
}

function InvoiceDataToTableData(invoices:IInvoiceMin[]){
  const table: IInvoiceTable[] = [];
  invoices.map((inv) => {
    table.push({
      amount: inv.cost.total,
      condition: inv.condition,
      estimate: inv.estimate.name,
      fecha: inv.date,
      folio: inv.folio,
      formpaid: inv.paymentWay,
      id: inv._id,
      methodpaid: inv.paymentMethod,
      usecfdi: inv.useCFDI,
      idEstimates:inv.estimate._id, 
      charged: (inv.lastpayment?.unchargedbalanceamount >= 0 && inv.lastpayment?.unchargedbalanceamount <= 100? 
                              inv.cost.total: inv.cost.total - inv.lastpayment?.previousbalanceamount) || inv.cost.total,
      // charged: inv.cost.total,
      unchargedbalanceamount: inv.lastpayment?.unchargedbalanceamount || 0,
      previousBalance: inv.lastpayment?.previousbalanceamount || 0,
      accountreceivablesCount: inv.accountreceivablesCount,
      ischargedfull: inv.ischargedfull,
      project: inv.project._id
    })
  });

  return table;
}