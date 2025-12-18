import { useState, useEffect, useRef } from "react"
import { IInvoiceByProject, IInvoiceTable, ITotalInvoiceResumen } from "@/interfaces/Invoices"
import { getInvoicesByProject, removeInvoice } from "@/app/api/routeInvoices"
import { showToastMessageError } from "@/components/Alert";
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
import { PDFDownloadLink } from "@react-pdf/renderer";
import {Tooltip} from "@nextui-org/react";
import { BsFileEarmarkPdf } from "react-icons/bs";
import DownloadInvoicesByProjectPDF from "@/components/invoices/DownloadInvoicesByProjectPDF";
import TooltipContainerIcon from "@/components/tooltipIcons/TooltipContainerIcon";
import ContainerSideNav from "@/components/ContainerSideNav";
import { propsTooltip } from "@/libs/animations";

export default function TableInvoicesComponent({token, project, user, pageQuery, resumenInvoice}: 
  {token:string, project:OneProjectMin, user:string, pageQuery:string | undefined, resumenInvoice:ITotalInvoiceResumen}) {

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
            <TooltipContainerIcon label="Cobrada">
              {row.original.accountreceivablesCount > 0? (
                <Badge color="secondary" badgeContent={row.original.accountreceivablesCount}>
                  <DocumentArrowDownIcon className="h-6 w-6 text-green-500 hover:text-green-300" />
                </Badge>
              ): (
                <DocumentArrowDownIcon className="h-6 w-6 text-green-500 hover:text-green-300" />
              )}
            </TooltipContainerIcon>
          ): row.original.accountreceivablesCount > 0? (
            <Badge color="secondary" badgeContent={row.original.accountreceivablesCount}>
              <TooltipContainerIcon label="Falta cobro">
                <DocumentArrowDownIcon className="h-6 w-6 text-red-500 cursor-pointer hover:text-red-300" onClick={() => {
                  refEstimate.current = row.original.id;
                  setSelInvoice(row.original);
                  setShowNewCollection(true);
                }}/>
              </TooltipContainerIcon>
            </Badge>
          ): (
            <TooltipContainerIcon label="Falta cobro">
              <DocumentArrowDownIcon className="h-6 w-6 text-red-500 cursor-pointer hover:text-red-300" onClick={() => {
                refEstimate.current = row.original.id;
                setSelInvoice(row.original);
                setShowNewCollection(true);
              }}/>
            </TooltipContainerIcon>
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
        onClick={() => window.location.replace(pageQuery? `/projects/estimates/${project._id}/invoice/${row.original.id}?page=projects`: 
                              `/projects/estimates/${project._id}/invoice/${row.original.id}`)}
        >{row.original.folio}</p>
      ),
    }),
    columnHelper.accessor('usecfdi', {
      header: 'Uso CFDI',
      id: 'cdfi',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(pageQuery? `/projects/estimates/${project._id}/invoice/${row.original.id}?page=projects`: 
                              `/projects/estimates/${project._id}/invoice/${row.original.id}`)}
        >{row.original.usecfdi.substring(row.original.usecfdi.length-3)}</p>
      ),
    }),
    columnHelper.accessor('methodpaid', {
      header: 'Metodo de pago',
      id: 'metodo',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(pageQuery? `/projects/estimates/${project._id}/invoice/${row.original.id}?page=projects`: 
                              `/projects/estimates/${project._id}/invoice/${row.original.id}`)}
        >{row.original.methodpaid.substring(row.original.methodpaid.length-3)}</p>
      ),
    }),
    columnHelper.accessor('formpaid', {
      header: 'Forma de pago',
      id: 'forma',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(pageQuery? `/projects/estimates/${project._id}/invoice/${row.original.id}?page=projects`: 
                              `/projects/estimates/${project._id}/invoice/${row.original.id}`)}
        >{row.original.formpaid.substring(row.original.formpaid.length-3)}</p>
      ),
    }),
    columnHelper.accessor('estimate', {
      header: 'Estimacion',
      id: 'estimacion',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
        onClick={() => window.location.replace(pageQuery? `/projects/estimates/${project._id}/invoice/${row.original.id}?page=projects`: 
                              `/projects/estimates/${project._id}/invoice/${row.original.id}`)}
        >{row.original.estimate}</p>
      )
    }),
    columnHelper.accessor('condition', {
      header: 'Condicion',
      id: 'condicion',
      cell: ({row}) => (
        <Chip label={row.original.condition.name} color={row.original.condition.color}
            darktext={row.original?.condition?.darktext?? false} />
      ),
    }),
    columnHelper.accessor('fecha', {
      header: 'Fecha',
      id: 'fecha',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(pageQuery? `/projects/estimates/${project._id}/invoice/${row.original.id}?page=projects`: 
                              `/projects/estimates/${project._id}/invoice/${row.original.id}`)}
        >{row.original.fecha.substring(0, 10)}</p>
      ),
    }),
    columnHelper.accessor('amount', {
      header: 'Monto',
      id: 'monto',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(pageQuery? `/projects/estimates/${project._id}/invoice/${row.original.id}?page=projects`: 
                              `/projects/estimates/${project._id}/invoice/${row.original.id}`)}
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
        onClick={() => window.location.replace(pageQuery? `/projects/estimates/${project._id}/invoice/${row.original.id}?page=projects`: 
                              `/projects/estimates/${project._id}/invoice/${row.original.id}`)}
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
        onClick={() => window.location.replace(pageQuery? `/projects/estimates/${project._id}/invoice/${row.original.id}?page=projects`: 
                              `/projects/estimates/${project._id}/invoice/${row.original.id}`)}
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
      <div className="flex justify-end p-3">
        <PDFDownloadLink document={<DownloadInvoicesByProjectPDF invoices={invoices} project={project}
                                      resumenInvoice={resumenInvoice} token={token} />} fileName={'Cobranza - ' + project.title} >
          {({loading, url, error, blob}) => 
            loading? (
              <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Informe' 
                  placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
                <BsFileEarmarkPdf className="w-8 h-8 text-slate-500" />
              </Tooltip>
            ) : (
              <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Informe' 
                  placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
                <BsFileEarmarkPdf className="w-8 h-8 text-green-500" />
              </Tooltip>
            ) }
        </PDFDownloadLink>
      </div>
      <Table columns={columns} data={data} placeH="buscar factura" />
      {showNewCollection && selInvoice && (
        <ContainerSideNav width="w-full max-w-xl">
          <AddNewCollectionComponent showForm={handleShowForm} user={user}
               token={token} project={project} invoiceTable={selInvoice} />
        </ContainerSideNav>
        // <div className="fixed inset-0 bg-black bg-opacity-40  z-40">
        //   <AddNewCollectionComponent showForm={handleShowForm} user={user}
        //        token={token} project={project} invoiceTable={selInvoice} />
        // </div>
      )}
    </>
  )
}
