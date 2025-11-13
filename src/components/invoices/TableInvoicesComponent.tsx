'use client'

import { useState, useEffect, useRef } from "react"
import { IInvoiceTable, ITotalAmountInvoicesPending, IInvoiceByDateAndConditionMin } from "@/interfaces/Invoices"
import { getAllInvoicesMINByDateAndCondition, removeInvoice, getAllTotalAmountInvoicePending } from "@/app/api/routeInvoices"
import { showToastMessageError } from "@/components/Alert";
import Table from "@/components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { CurrencyFormatter } from "@/app/functions/Globals";
import RemoveElement from "@/components/RemoveElement";
import Chip from "@/components/providers/Chip";
import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";
import AddNewCollectionInvoice from "./AddNewCollectionInvoice";
import { Badge } from "@mui/material";
import Link from "next/link";
import Button from "../Button";
import SearchInTable from "../SearchInTable";
import { TbArrowNarrowLeft } from "react-icons/tb";
import AddNewInvoiceComponent from "./AddNewInvoiceComponent";
import {Tooltip} from "@nextui-org/react";
import TooltipContainerIcon from "../tooltipIcons/TooltipContainerIcon";

import { DateRangePicker, DateRangePickerValue, } from "@tremor/react";
import { es } from "date-fns/locale"
import { Chip as ChipMui } from "@mui/material";
import ContainerSideNav from "../ContainerSideNav";

export default function TableInvoicesComponent({token, user}: 
  {token:string, user:string}) {

  const [invoices, setInvoices] = useState<IInvoiceByDateAndConditionMin[]>([]);
  const [selInvoice, setSelInvoice]=useState<IInvoiceTable>();
  const [showNewCollection, setShowNewCollection]=useState<boolean>(false);

  const [showNewInvoice, setShowNewinvoice]=useState<boolean>(false);
  const refEstimate = useRef('');
  const [totalInvoices, setTotalInvoices]=useState<ITotalAmountInvoicesPending>();

  const [widthPage, setWidthPage] = useState<number>(900);
  const [statuses, setStatuses]=useState<string[]>([]);
  
  // const [rangeDate, setRangeDate] = useState<DateRangePickerValue>({
  //   from: new Date('2024-01-01'),
  //   to: new Date('2025-04-30'),
  // });

  const [rangeDate, setRangeDate] = useState<DateRangePickerValue>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  let props = {
    variants: {
      exit: {
        opacity: 0,
        transition: {
          duration: 0.1,
          ease: "easeIn",
        }
      },
      enter: {
        opacity: 1,
        transition: {
          duration: 0.15,
          ease: "easeOut",
        }
      },
    },
  }

  const handleShowForm = (value:boolean) => {
    setShowNewCollection(value);
  }

  const handleResize = () => {
    setWidthPage(Math.max(
      document.body.scrollWidth, document.documentElement.scrollWidth,
      document.body.offsetWidth, document.documentElement.offsetWidth,
      document.body.clientWidth, document.documentElement.clientWidth
    ));
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setWidthPage(Math.max(
      document.body.scrollWidth, document.documentElement.scrollWidth,
      document.body.offsetWidth, document.documentElement.offsetWidth,
      document.body.clientWidth, document.documentElement.clientWidth
    ));
    return () => window.removeEventListener('scroll', handleResize);
  }, []);

  useEffect(() => {
    const fetch = async() => {
      const dataInvoices = {
        condition: ["678ed05cc5f08e8a0f36d5e1", "67d20e2959865f640af92682", "67d20cb359865f640af92638"]
      }

      const data = {
        conditionPayment: [],
        conditionIssued: [
            "67d20cb359865f640af92638"
        ],
        conditionOverdue: [
            "67d20cb359865f640af92638","67d20e2959865f640af92682"
        ]
      }
      
      // const res = await getAllInvoicesMINByDateAndCondition(token, (rangeDate?.from?.toISOString().substring(0, 10) || ''), (rangeDate?.to?.toISOString().substring(0, 10) || ''), dataInvoices);
      // const rest = await getAllTotalAmountInvoicePending(token, '2025-01-01', '2025-12-31', data);

      const [res, rest] = await Promise.all([
        getAllInvoicesMINByDateAndCondition(token, (rangeDate?.from?.toISOString().substring(0, 10) || ''), (rangeDate?.to?.toISOString().substring(0, 10) || ''), dataInvoices),
        getAllTotalAmountInvoicePending(token, '2025-01-01', '2025-12-31', data)
      ]);
      
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        setInvoices(res);
      }

      if(typeof(rest)==='string'){
        showToastMessageError(rest);
      }else{
        setTotalInvoices(rest);
      }
    }

    fetch();
  }, []);

  const delInvoice = (id:string) => {
    window.location.reload();
  }

  const addStatus = (status:string) => {
    const newStatus = [...statuses, status];
    setStatuses(newStatus);
    if(rangeDate.from && rangeDate.to){
      handleFilter(rangeDate.from, rangeDate.to, newStatus);
    }else{
      showToastMessageError('Seleccione un rango de fechas para filtrar');
    }
  }

  const deleteStatus = (status:string) => {
    const newStatus = statuses.filter((s) => s !== status);
    setStatuses(newStatus);
    if(rangeDate.from && rangeDate.to){
      handleFilter(rangeDate.from, rangeDate.to, newStatus);
    }else{
      showToastMessageError('Seleccione un rango de fechas para filtrar');
    }
  }

  const handleFilter = (dateS:Date, dateE:Date, arrStatuses:Array<string>) => {
    updateTotal(getDate(dateS), getDate(dateE), arrStatuses);
  }

  const columnHelper = createColumnHelper<IInvoiceTable>();
  
  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'Accion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          <input type="checkbox" 
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
          <RemoveElement id={ row.original.idEstimates? `${row.original.id}/${row.original.idEstimates}`: `${row.original.id}`} 
                      name={row.original.estimate ?? row.original.folio} remove={removeInvoice} 
                      removeElement={delInvoice} token={token} />
          {row.original.ischargedfull? (
            <Tooltip closeDelay={0} delay={100} motionProps={props} content='Cobrada' 
              placement="right" className="text-black bg-white rounded-md border border-slate-400">
                {row.original.accountreceivablesCount > 0? (
                  <Badge color="secondary" badgeContent={row.original.accountreceivablesCount}>
                    <DocumentArrowDownIcon className="h-6 w-6 hover:bg-blue-100 text-green-500 hover:text-green-300" />
                  </Badge> 
                ): (
                  <DocumentArrowDownIcon className="h-6 w-6 hover:bg-blue-100 text-green-500 hover:text-green-300" />
                )}
          </Tooltip>
          ): (
            <Tooltip closeDelay={0} delay={100} motionProps={props} content='Cobrar' 
                placement="right" className="text-black bg-white rounded-md border border-slate-400">
              {row.original.accountreceivablesCount > 0? (
                <Badge color="secondary" badgeContent={row.original.accountreceivablesCount}>
                  <DocumentArrowDownIcon className="h-6 w-6 text-red-500 hover:bg-blue-100 cursor-pointer hover:text-red-300" onClick={() => {
                    refEstimate.current = row.original.id;
                    setSelInvoice(row.original);
                    setShowNewCollection(true);
                  }}/>
                </Badge>
              ): (
                <DocumentArrowDownIcon className="h-6 w-6 text-red-500 hover:bg-blue-100 cursor-pointer hover:text-red-300" onClick={() => {
                  refEstimate.current = row.original.id;
                  setSelInvoice(row.original);
                  setShowNewCollection(true);
                }}/>
              )}
            </Tooltip>
          )}
        </div>
      ),
      size: 300,
      enableSorting:false,
      header: ({table}:any) => (
        <div className="flex gap-x-2 items-center">
          <input type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onClick={()=> {
              table.toggleAllRowsSelected(!table.getIsAllRowsSelected())
            }}
          />
          <p>Accion</p>
        </div>
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
    columnHelper.accessor('nameProject', {
      header: 'Proyecto',
      id: 'proyecto',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${row.original.project}/invoice/${row.original.id}?page=invoices`)}
        >{row.original.nameProject}</p>
      ),
    }),
    columnHelper.accessor('client', {
      header: 'Cliente',
      id: 'cliente',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${row.original.project}/invoice/${row.original.id}?page=invoices`)}
        >{row.original.client}</p>
      ),
    }),
    columnHelper.accessor('usecfdi', {
      header: 'Uso CFDI',
      id: 'cdfi',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${row.original.project}/invoice/${row.original.id}?page=invoices`)}
        >{row.original.usecfdi}</p>
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
        <Chip label={row.original.condition.name} color={row.original.condition.color} darktext={row.original?.condition?.darktext?? false} />
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

  const updateTotal = async (dateI:string, dateF:string, statuses:string[]) => {
    const data = {
      conditionPayment: statuses,
      conditionIssued: [
          "67d20cb359865f640af92638"
      ],
      conditionOverdue: [
          "67d20cb359865f640af92638","67d20e2959865f640af92682"
      ]
    }

    const dataInvoices = {
      condition: statuses
    }

    // const rest = await getAllTotalAmountInvoicePending(token, dateI, dateF, data);
    // const res = await getAllInvoicesMINByDateAndCondition(token, dateI, dateF, dataInvoices);

    const [res, rest] = await Promise.all([
      getAllInvoicesMINByDateAndCondition(token, dateI, dateF, dataInvoices),
      getAllTotalAmountInvoicePending(token, dateI, dateF, data)
    ]);
    
    if(typeof(rest)==='string'){
      showToastMessageError(rest);
    }else{
      // console.log('rest => ', rest);
      setTotalInvoices(rest);
    }

    if(typeof(res)==='string'){
      showToastMessageError(res);
    }else{
      console.log('res invoices => ', res);
      setInvoices(res);
    }
  }

  const handleDate = (dateI: Date, dateF: Date) => {
    handleFilter(dateI, dateF, statuses);
    
    //actualizar total con el rango de fechas
    updateTotal(getDate(dateI), getDate(dateF), statuses);
  }

  // const invoiceM = invoices.reduce((previous, current) => {
  //   return current.cost.total > previous.cost.total ? current : previous;
  // });

  // console.log('invoiceM => ', invoiceM);
  // const maxAmount = invoiceM.cost.total;
  // const maxAmount=110;
  // const maxAmount = invoiceM;

  // const dateValidation = (exp:IInvoiceByDateAndConditionMin, startDate:number, endDate:number) => {
  //   let d = new Date(exp.date).getTime();
  //   if(d >= startDate && d <= endDate){
  //     return true;
  //   }
  //   return false;
  // }

  // const amountValidation = (exp:IInvoiceByDateAndConditionMin, minAmount:number, maxAmount:number, 
  //                             startDate:number, endDate:number) => {
  //   if(exp.cost?.subtotal >= minAmount && exp.cost?.subtotal <= maxAmount){
  //     return dateValidation(exp, startDate, endDate);
  //   }
  //   return false;
  // }

  // const projectValidation = (exp:IInvoiceByDateAndConditionMin, minAmount:number, maxAmount:number, 
  //                     startDate:number, endDate:number, projects:string[]) => {
  //   if(projects.includes('all')){
  //     return amountValidation(exp, minAmount, maxAmount, startDate, endDate);
  //   }else{
  //     if(exp.project){
  //       if(projects.includes(exp.project._id)){
  //         return amountValidation(exp, minAmount, maxAmount, startDate, endDate);
  //       }
  //     }
  //   }
  //   return false;
  // }

  // const conditionValidation = (exp:IInvoiceByDateAndConditionMin, minAmount:number, maxAmount:number, 
  //                 startDate:number, endDate:number, projects:string[], 
  //                 conditions:string[]) => {

  //   if(conditions.includes('all')){
  //     return projectValidation(exp, minAmount, maxAmount, startDate, endDate, projects);
  //   }else{
  //     if(conditions.includes(exp.condition._id)){
  //       return projectValidation(exp, minAmount, maxAmount, startDate, endDate, projects);
  //     }
  //   }
  //   return false;
  // }

  // const filterData = (conditions:string[], minAmount:number, maxAmount:number, 
  //   projects:string[], startDate:number, endDate:number) => {
  
  //   let filtered: IInvoiceByDateAndConditionMin[] = [];
  //   invoices.map((invoice) => {
  //     if(conditionValidation(invoice, minAmount, maxAmount, startDate, 
  //         endDate, projects, conditions)){
  //       filtered.push(invoice);
  //     }
  //   });

  //   // console.log('filtered => ', filtered);
  //   setFilteredInvoices(filtered);
  //   setIsFilter(true);
  //   updateTotal(getDate(new Date(startDate)), getDate(new Date(endDate)), conditions);
  //   // setDataExpenses(ExpenseDataToTableData(filtered));
  // }
  
  // const data = InvoiceDataToTableData(invoices);
  // let data = [];
  // if(isFilter){
  //   data = InvoiceDataToTableData(filteredInvoices);
  // }else{
  //   data = InvoiceDataToTableData(invoices);
  // }

  const data = InvoiceDataToTableData(invoices);

  let filterElemnts = <div className="flex gap-x-4 justify-end items-center">
                  <ChipStatus id="67d20cb359865f640af92638" addStatus={addStatus} removeStatus={deleteStatus} title="Emitida" />
                  <ChipStatus id="67be2eb9b2df60407a559542" addStatus={addStatus} removeStatus={deleteStatus} title="Vencida" />
                  <ChipStatus id="678ed05cc5f08e8a0f36d5e1" addStatus={addStatus} removeStatus={deleteStatus} title="Pagada" />
                  <ChipStatus id="67d20e2959865f640af92682" addStatus={addStatus} removeStatus={deleteStatus} title="Pagada parcial" />
                  <ChipStatus id="678ecf6ec5f08e8a0f36d5dd" addStatus={addStatus} removeStatus={deleteStatus} title="Cancelada" />
                  <div>
                    {/* <Label htmlFor='date'>Fecha</Label> */}
                    <DateRangePicker 
                      className='mt-2'
                      placeholder='Seleccione un rango de fechas'
                      onValueChange={(e) => {
                        setRangeDate(e);
                        if(e.from && e.to){
                          handleDate(e.from, e.to);
                        }
                      }}
                      value={rangeDate}
                      locale={es}
                    />
                  </div>
                </div>

  return (
    <>
      <div className="grid grid-cols-4 gap-x-3">
        <Card amount={totalInvoices?.totalInvoicesPayment?.total || 0} title="Pagadas" footer={(totalInvoices?.totalInvoicesPayment?.quantity || 0)+" facturas"}></Card>
        <Card amount={totalInvoices?.totalInvoiceIssued?.total || 0} title="Emitidas" footer={(totalInvoices?.totalInvoiceIssued?.quantity || 0)+" facturas"}></Card>
        <Card amount={totalInvoices?.totalInvoiceOverdue?.total || 0} title="Vencidas" footer={(totalInvoices?.totalInvoiceOverdue?.quantity || 0)+" facturas"}></Card>
        <Card amount={0} title="Total" footer="0 facturas"></Card>
      </div>
      <div className="flex justify-between flex-wrap sm:flex-nowrap gap-x-5 gap-y-2 items-center mt-5">
        <div className="flex items-center w-full max-w-96">
          <Link href={'/'}>
            <TooltipContainerIcon label="Regresar">
              <div className="p-1 border border-slate-400 bg-white rounded-md hover:bg-blue-100">
                <TbArrowNarrowLeft className="w-10 h-10 text-slate-600" />
              </div>
            </TooltipContainerIcon>
          </Link>
          <p className="text-xl ml-4 font-medium">Facturas</p>
        </div>
        <div className={`flex gap-x-3 gap-y-3 w-full justify-end`}>
          <SearchInTable placeH={"Buscar factura.."} />
          <div className={''}>
            <div className="flex gap-x-4 justify-end items-center">
              {/* <GiSettingsKnobs 
                onClick={() => setShowIsFilter(true)}
                className="text-slate-600 w-8 h-8 cursor-pointer hover:text-slate-300"
              />   */}
              <Button onClick={() => setShowNewinvoice(true)}>Nueva</Button>
            </div>
          </div>
        </div>
      </div>
      {widthPage > 1080 && filterElemnts}
      <Table columns={columns} data={data} placeH="buscar factura" typeTable="invoices" />
      {showNewCollection && selInvoice && (
        <ContainerSideNav width="w-full max-w-xl">
          <AddNewCollectionInvoice showForm={handleShowForm} user={user}
               token={token} invoiceTable={selInvoice} />
        </ContainerSideNav>
        // <div className="fixed inset-0 bg-black bg-opacity-40  z-40">
        //   <AddNewCollectionInvoice showForm={handleShowForm} user={user}
        //        token={token} invoiceTable={selInvoice} />
        // </div>
      )}
      {showNewInvoice && (
        <ContainerSideNav width="w-full max-w-3xl">
          <AddNewInvoiceComponent showForm={setShowNewinvoice} token={token} user={user} />
        </ContainerSideNav>
        // <div className="fixed inset-0 bg-black bg-opacity-40  z-40">
        //   <AddNewInvoiceComponent showForm={setShowNewinvoice} token={token} user={user} />
        // </div>
      ) }
    </>
  )
}

function InvoiceDataToTableData(invoicess:IInvoiceByDateAndConditionMin[]){
  const table: IInvoiceTable[] = [];

  console.log('invoicess => ', invoicess);
  invoicess.map((inv) => {
    const aux = inv.useCFDI + '/' + inv.paymentMethod + '/' + inv.paymentWay;
    table.push({
      amount: inv.cost.total,
      condition: inv.condition,
      estimate: inv.estimate.name,
      fecha: inv.date,
      folio: inv.folio,
      formpaid: inv.paymentWay,
      id: inv._id,
      methodpaid: inv.paymentMethod,
      usecfdi: aux,
      idEstimates:inv.estimate._id, 
      charged: inv.accountreceivables?.length > 0? inv.accountreceivables[inv.accountreceivables.length-1].charged: 0,
      unchargedbalanceamount: inv.accountreceivables?.length > 0 ? inv.accountreceivables[inv.accountreceivables.length-1].unchargedbalanceamount: 0,
      previousBalance: inv.accountreceivables?.length > 0? inv.accountreceivables[inv.accountreceivables.length-1].previousbalanceamount: 0,
      accountreceivablesCount: inv.accountreceivables[inv.accountreceivables.length - 1].partialitynumber,
      ischargedfull: inv.ischargedfull,
      project: inv.project._id,
      nameProject: inv.project.title,
      client: inv.client.name
    })
  });

  return table;
}

export const Card = ({amount, title, footer}: {title:string, amount:number, footer:string}) => {
  return(
    <div className="p-3 flex gap-x-3 items-center bg-white shadow-md shadow-slate-300 rounded-md">
      <div>
        <p className="text-slate-600">{title}</p>
        <p className="text-xl font-bold">{CurrencyFormatter({
          currency: 'MXN',
          value: amount
        })}</p>
        <p className="text-xs text-slate-400">{footer}</p>
      </div>
    </div>
  )
}

function getDate(date: Date){
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()

  if(month < 10){
    return `${year}-0${month}-${day}`;
  }else{
    return `${year}-${month}-${day}`;
  }
}

const ChipStatus = ({ addStatus, id, removeStatus, title}: 
  {title:string, id:string, addStatus:Function, removeStatus:Function}) => {
  const [active, setActive] = useState<boolean>(false);

  const view = active? 
                  <ChipMui label={title} className="p-3" color="success" onClick={() => {removeStatus(id); setActive(false)}}>
                  </ChipMui>: 
                  <ChipMui label={title} color="default" onClick={() => {addStatus(id); setActive(true)}}></ChipMui>

  return(
    <>
      {view }
    </>
  )
}