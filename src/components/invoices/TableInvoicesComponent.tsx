'use client'

import { useState, useEffect, useRef } from "react"
import { IInvoiceMin, IInvoiceTable, ITotalAmountInvoicesPending } from "@/interfaces/Invoices"
import { getInvoicesMin, removeInvoice, getAllTotalAmountInvoicePending } from "@/app/api/routeInvoices"
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
import { GiSettingsKnobs } from "react-icons/gi";
import { TbArrowNarrowLeft } from "react-icons/tb";
import FilteringInvoiceComponent from "./FilteringInvoiceComponent";
import AddNewInvoiceComponent from "./AddNewInvoiceComponent";

export default function TableInvoicesComponent({token, user}: 
  {token:string, user:string}) {

  const [invoices, setInvoices] = useState<IInvoiceMin[]>([]);
  const [selInvoice, setSelInvoice]=useState<IInvoiceTable>();
  const [showNewCollection, setShowNewCollection]=useState<boolean>(false);

  const [showNewInvoice, setShowNewinvoice]=useState<boolean>(false);
  const [showIsFilter, setShowIsFilter]=useState<boolean>(false);
  const [filteredInvoices, setFilteredInvoices]=useState<IInvoiceMin[]>([]);
  const [isFilter, setIsFilter]=useState<boolean>(false);
  const refEstimate = useRef('');
  // const refInvoice=useRef('');
  const [totalInvoices, setTotalInvoices]=useState<ITotalAmountInvoicesPending>();

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
        console.log('inoice => ', res[0]);
      }

      const data = {
        // conditionPayment: [
        //     "678ed05cc5f08e8a0f36d5e1","67d20e2959865f640af92682"
        // ],
        conditionPayment: [],
        conditionIssued: [
            "67d20cb359865f640af92638"
        ],
        conditionOverdue: [
            "67d20cb359865f640af92638","67d20e2959865f640af92682"
        ]
      }
      const rest = await getAllTotalAmountInvoicePending(token, '2025-01-01', '2025-12-31', data);
      if(typeof(rest)==='string'){
        showToastMessageError(rest);
      }else{
        setTotalInvoices(rest);
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

  const updateTotal = async (dateI:string, dateF:string, statuses:string[]) => {
    // const data={
    //   condition: statuses,
    //   conditionCharged:['678ed05cc5f08e8a0f36d5e1', '67d20e2959865f640af92682'],
    //   conditionAccountsReceivable:['67d20cb359865f640af92638'],
    // }

    const data = {
      // conditionPayment: [
      //     "678ed05cc5f08e8a0f36d5e1","67d20e2959865f640af92682"
      // ],
      conditionPayment: statuses,
      conditionIssued: [
          "67d20cb359865f640af92638"
      ],
      conditionOverdue: [
          "67d20cb359865f640af92638","67d20e2959865f640af92682"
      ]
    }

    const rest = await getAllTotalAmountInvoicePending(token, dateI, dateF, data);
    if(typeof(rest)==='string'){
      showToastMessageError(rest);
    }else{
      setTotalInvoices(rest);
    }
  }

  const invoiceM = invoices.reduce((previous, current) => {
    return current.cost.total > previous.cost.total ? current : previous;
  });

  const maxAmount = invoiceM.cost.total;

  const dateValidation = (exp:IInvoiceMin, startDate:number, endDate:number) => {
    let d = new Date(exp.date).getTime();
    if(d >= startDate && d <= endDate){
      return true;
    }
    return false;
  }

  const amountValidation = (exp:IInvoiceMin, minAmount:number, maxAmount:number, 
                              startDate:number, endDate:number) => {
    if(exp.cost?.subtotal >= minAmount && exp.cost?.subtotal <= maxAmount){
      return dateValidation(exp, startDate, endDate);
    }
    return false;
  }

  const projectValidation = (exp:IInvoiceMin, minAmount:number, maxAmount:number, 
                      startDate:number, endDate:number, projects:string[]) => {
    if(projects.includes('all')){
      return amountValidation(exp, minAmount, maxAmount, startDate, endDate);
    }else{
      if(exp.project){
        if(projects.includes(exp.project._id)){
          return amountValidation(exp, minAmount, maxAmount, startDate, endDate);
        }
      }
    }
    return false;
  }

  const conditionValidation = (exp:IInvoiceMin, minAmount:number, maxAmount:number, 
                  startDate:number, endDate:number, projects:string[], 
                  conditions:string[]) => {

    if(conditions.includes('all')){
      return projectValidation(exp, minAmount, maxAmount, startDate, endDate, projects);
    }else{
      if(conditions.includes(exp.condition._id)){
        return projectValidation(exp, minAmount, maxAmount, startDate, endDate, projects);
      }
    }
    return false;
  }

  const filterData = (conditions:string[], minAmount:number, maxAmount:number, 
    projects:string[], startDate:number, endDate:number) => {
  
    let filtered: IInvoiceMin[] = [];
    invoices.map((invoice) => {
      if(conditionValidation(invoice, minAmount, maxAmount, startDate, 
          endDate, projects, conditions)){
        filtered.push(invoice);
      }
    });

    // console.log('filtered => ', filtered);
    setFilteredInvoices(filtered);
    setIsFilter(true);
    updateTotal(getDate(new Date(startDate)), getDate(new Date(endDate)), conditions);
    // setDataExpenses(ExpenseDataToTableData(filtered));
  }
  
  // const data = InvoiceDataToTableData(invoices);
  let data = [];
  if(isFilter){
    data = InvoiceDataToTableData(filteredInvoices);
  }else{
    data = InvoiceDataToTableData(invoices);
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-x-3">
        <Card amount={totalInvoices?.totalInvoicesPayment?.total || 0} title="Pagadas" footer={(totalInvoices?.totalInvoicesPayment?.quantity || 0)+" facturas"}></Card>
        <Card amount={totalInvoices?.totalInvoiceIssued?.amount || 0} title="Emitidas" footer={(totalInvoices?.totalInvoiceIssued?.quantity || 0)+" facturas"}></Card>
        <Card amount={totalInvoices?.totalInvoiceOverdue?.total || 0} title="Vencidas" footer={(totalInvoices?.totalInvoiceOverdue?.quantity || 0)+" facturas"}></Card>
        <Card amount={0} title="Total" footer="0 facturas"></Card>
      </div>
      <div className="flex justify-between flex-wrap sm:flex-nowrap gap-x-5 gap-y-2 items-center mt-5">
        <div className="flex items-center w-full max-w-96">
          <Link href={'/'}>
            <div className="p-1 border border-slate-400 bg-white rounded-md">
              <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" />
            </div>
          </Link>
          <p className="text-xl ml-4 font-medium">Facturas</p>
        </div>
        <div className={`flex gap-x-3 gap-y-3 w-full justify-end`}>
          <SearchInTable placeH={"Buscar factura.."} />
          <div className={''}>
            <div className="flex gap-x-4 justify-end items-center">
              <GiSettingsKnobs 
                onClick={() => setShowIsFilter(true)}
                className="text-slate-600 w-8 h-8 cursor-pointer hover:text-slate-300"
              />  
              <Button onClick={() => setShowNewinvoice(true)}>Nueva</Button>
            </div>
          </div>
        </div>
      </div>
      <Table columns={columns} data={data} placeH="buscar factura" />
      {showNewCollection && selInvoice && <AddNewCollectionInvoice showForm={handleShowForm} user={user}
               token={token} invoiceTable={selInvoice} />}
      {showIsFilter && <FilteringInvoiceComponent FilterData={filterData} maxAmount={maxAmount} 
                              showForm={setShowIsFilter} token={token} />}
      {showNewInvoice && <AddNewInvoiceComponent showForm={setShowNewinvoice} token={token} user={user} /> }
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

export const Card = ({amount, title, footer}: {title:string, amount:number, footer:string}) => {
  return(
    <div className="p-3 flex gap-x-3 items-center bg-white shadow-md shadow-slate-300 rounded-md">
      {/* {children} */}
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