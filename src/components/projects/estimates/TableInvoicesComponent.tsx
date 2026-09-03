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
import { Company } from "@/interfaces/Companies";
import { getCompany } from "@/app/api/routeCompany";
import { IPermissionsAndComponents } from "@/interfaces/Roles"

export default function TableInvoicesComponent({token, project, user, pageQuery, resumenInvoice, company, permissions}: 
  {token:string, project:OneProjectMin, user:string, pageQuery:string | undefined, 
    resumenInvoice:ITotalInvoiceResumen, company:string, permissions:IPermissionsAndComponents}) {

  const [invoices, setInvoices] = useState<IInvoiceByProject[]>([]);
  const [selInvoice, setSelInvoice]=useState<IInvoiceTable>();
  const [showNewCollection, setShowNewCollection]=useState<boolean>(false);
  const refEstimate = useRef('');

  const [satCompany, setSatCompany]=useState<Company>();

  useEffect(() => {
    const fetch = async () => {
      const [rescomp] = await Promise.all([
        getCompany(token, company),
      ]);
      
      if(typeof(rescomp)==='string'){
        showToastMessageError(rescomp);
      }else{
        setSatCompany(rescomp);
      }
    }

    fetch();
  }, []);

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
          {permissions.permission.readfull && (
            <RemoveElement id={`${row.original.id}/${row.original.idEstimates}`} name={row.original.estimate} remove={removeInvoice} 
                      removeElement={delInvoice} token={token} />
          )}
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
          currency: '',
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
          currency: '',
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
          currency: '',
          value: row.original.unchargedbalanceamount
        })}</p>
      ),
    }),
  ]
  
  const data = InvoiceDataToTableData(invoices);

  return (
    <>
      <div className="flex justify-end p-3">
        {satCompany && /*permissions.permission.print && */ (
          <PDFDownloadLink document={<DownloadInvoicesByProjectPDF invoices={invoices} project={project} satCompany={satCompany}
                                        resumenInvoice={resumenInvoice} token={token} />} fileName={'Estado de cuenta - ' + project.title} >
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
        )}
      </div>
      
      {permissions.permission.readfull && (
        <>
          <div className="hidden md:block w-full">
            <Table columns={columns} data={data} placeH="buscar factura" />
          </div>
          <div className="block md:hidden w-full mt-3">
            <ListData data={data} token={token} delInvoice={delInvoice} pageQuery={pageQuery} project={project}
              permissions={permissions} />
          </div>
        </>
      )}

      {showNewCollection && selInvoice && (
        <ContainerSideNav width="w-full max-w-xl">
          <AddNewCollectionComponent showForm={handleShowForm} user={user}
               token={token} project={project} invoiceTable={selInvoice} company={company} />
        </ContainerSideNav>
      )}
      {/* <ContainerSideNav width="w-full max-w-xl" open={showNewCollection && selInvoice!=undefined}>
        <AddNewCollectionComponent showForm={handleShowForm} user={user}
              token={token} project={project} invoiceTable={selInvoice!} />
      </ContainerSideNav> */}
    </>
  )
}

const ListData = ({data, token, delInvoice, pageQuery, project, permissions}: 
  {data: IInvoiceTable[], token:string, delInvoice: (id: string) => void, 
    project:OneProjectMin, pageQuery:string | undefined, permissions:IPermissionsAndComponents}) => {

  // const [dataReports, setDataReports] = useState(data);
  // const {search} = useTableStates();

  // const filterData = useMemo(() => {
  //   if(search.trim() === ''){
  //     return data;
  //   }else{
  //     const d = data.filter(item => item.folio.toLowerCase().includes(search.toLowerCase()));
  //     return d;
  //   }
  // }, [search]);

  // let filterData = [];
  // if(search.trim() === ''){
  //   filterData=data;
  // }else{
  //   const d = data.filter(item => item.folio.toLowerCase().includes(search.toLowerCase()));
  //   filterData=d;
  // }

  return(
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border] h-[calc(100vh-249px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {data.map((i) => (
            <CardInvoice invoice={i} key={i.id} token={token} delInvoice={delInvoice} pageQuery={pageQuery} 
                project={project} permissions={permissions} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardInvoice = ({invoice, token, delInvoice, pageQuery, project, permissions }: 
  {invoice:IInvoiceTable, token:string, delInvoice: (id: string) => void, 
    project:OneProjectMin, pageQuery:string | undefined, permissions:IPermissionsAndComponents }) => {
  
  return(
    <div role="button"
      key={invoice.id}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
      // onClick={() => window.location.replace(`/projects/estimates/${invoice.project}/invoice/${invoice.id}?page=invoices`)}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center">
          {/* <img alt="responsable" src={ invoice.Responsable?.photo ?? '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" /> */}
          {/* <RemoveElement id={glossary.id} name={glossary.name} token={token} 
              remove={RemoveGlossary} removeElement={delGlossary} /> */}
            {permissions.permission.delete && (
              <RemoveElement id={ invoice.idEstimates? `${invoice.id}/${invoice.idEstimates}`: `${invoice.id}`} 
                      name={invoice.estimate ?? invoice.folio} remove={removeInvoice} 
                      removeElement={delInvoice} token={token} />
            )}
            {invoice.ischargedfull? (
              <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Cobrada' 
                placement="right" className="text-black bg-white rounded-md border border-slate-400">
                  {invoice.accountreceivablesCount > 0? (
                    <Badge color="secondary" badgeContent={invoice.accountreceivablesCount}>
                      <DocumentArrowDownIcon className="h-6 w-6 hover:bg-blue-100 text-green-500 hover:text-green-300" />
                    </Badge> 
                  ): (
                    <DocumentArrowDownIcon className="h-6 w-6 hover:bg-blue-100 text-green-500 hover:text-green-300" />
                  )}
            </Tooltip>
            ): (
              <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Cobrar' 
                  placement="right" className="text-black bg-white rounded-md border border-slate-400">
                {invoice.accountreceivablesCount > 0? (
                  <Badge color="secondary" badgeContent={invoice.accountreceivablesCount}>
                    <DocumentArrowDownIcon className="h-6 w-6 text-red-500 hover:bg-blue-100 cursor-pointer hover:text-red-300" onClick={() => {
                      // refEstimate.current = invoice.id;
                      // setSelInvoice(invoice);
                      // setShowNewCollection(true);
                    }}/>
                  </Badge>
                ): (
                  <DocumentArrowDownIcon className="h-6 w-6 text-red-500 hover:bg-blue-100 cursor-pointer hover:text-red-300" onClick={() => {
                    // refEstimate.current = invoice.id;
                    // setSelInvoice(row.original);
                    // setShowNewCollection(true);
                  }}/>
                )}
              </Tooltip>
            )}
            {/* <RemoveElement id={invoice.id} name={invoice.Descripcion} 
              remove={RemoveCost} removeElement={delCost} 
              token={token} colorIcon="text-slate-500 hover:text-slate-300" /> */}
        </div>
        <div className="w-full"
          onClick={() => window.location.replace(pageQuery? `/projects/estimates/${project._id}/invoice/${invoice.id}?page=projects`: 
                              `/projects/estimates/${project._id}/invoice/${invoice.id}`)}
        >
          <div className="flex gap-x-3 w-full justify-between items-center p-3">
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {invoice.nameProject}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {invoice.folio}
              </p>
            </div>
            <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                {CurrencyFormatter({
                  currency: '',
                  value: invoice.amount
                })}
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                {CurrencyFormatter({
                  currency: '',
                  value: invoice.charged
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}