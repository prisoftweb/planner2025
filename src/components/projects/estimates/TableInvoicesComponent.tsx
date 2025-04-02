import { useState, useEffect, useRef } from "react"
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
import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";
import AddNewCollectionComponent from "./collections/AddNewCollection";
import { Badge } from "@mui/material";

export default function TableInvoicesComponent({token, project, user}:
    {token:string, project:OneProjectMin, user:string}) {

  const [invoices, setInvoices] = useState<IInvoiceByProject[]>([]);
  const [selInvoice, setSelInvoice]=useState<IInvoiceTable>();
  const [showNewCollection, setShowNewCollection]=useState<boolean>(false);
  const refEstimate = useRef('');

  const handleShowForm = (value:boolean) => {
    setShowNewCollection(value);
  }

  useEffect(() => {
    const fetch = async() => {
      const res = await getInvoicesByProject(token, project._id);
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        console.log('invoices table => ', res);
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
    // const fil = invoices.filter((i) => id.includes(i._id));
    // setInvoices(fil);
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
    columnHelper.accessor('charged', {
      header: 'Cobrado',
      id: 'cobrado',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${project._id}/invoice/${row.original.id}`)}
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
        onClick={() => window.location.replace(`/projects/estimates/${project._id}/invoice/${row.original.id}`)}
        >{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.unchargedbalanceamount
        })}</p>
      ),
    }),
  ]

  console.log('invoices => ', invoices);

  const data = InvoiceDataToTableData(invoices);

  return (
    <>
      <Table columns={columns} data={data} placeH="buscar factura" />
      {showNewCollection && selInvoice && <AddNewCollectionComponent showForm={handleShowForm} user={user}
               token={token} project={project} invoiceTable={selInvoice} />}
    </>
  )
}
