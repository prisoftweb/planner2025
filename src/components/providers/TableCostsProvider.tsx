'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { useState, useEffect, useRef } from "react";
import Chip from "../providers/Chip";
import { BsFileEarmarkPdf } from "react-icons/bs"; //Archivo PDF
import { IoAlert } from "react-icons/io5"; // No hay archivo
import { ExpenseDataToTablePaidExpensesProviderData } from "@/app/functions/providersFunctions";
import { ExpensesTableProvider } from "@/interfaces/Providers";
import FilteringPaymentsProvider from "./FilteringPaymentsProvider";
import { PaymentProvider } from "@/interfaces/Payments";
import RemovePaymentComponent from "./RemovePaymentComponent";
import { Badge } from "@mui/material";
import ContainerSideNav from "../ContainerSideNav";

type Props = {
  data:ExpensesTableProvider[], 
  token:string, 
  expenses:PaymentProvider[], 
  user: string, 
  isFilter:boolean, 
  setIsFilter:Function, 
  idProv: string, 
  udpateTable: Function
}

export default function TableCostsProvider({data, token, expenses, idProv, 
  user, isFilter, setIsFilter, udpateTable }: Props){
  
  const columnHelper = createColumnHelper<ExpensesTableProvider>();
  const refExpenses = useRef(expenses);
  
  const [dataExpenses, setDataExpenses] = useState(data);
  // const [expensesFiltered, setExpensesFiltered] = useState<PaymentProvider[]>(expenses);
  
  const handleIsFilter = (value: boolean) => {
    setIsFilter(value);
  }

  const deletePayment = (id:string) => {
    const auxExp = expenses.filter((e) => e._id!==id);
    // setExpensesFiltered(auxExp);
    refExpenses.current = auxExp;
    const dataAux = ExpenseDataToTablePaidExpensesProviderData(auxExp);
    setDataExpenses(dataAux);
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
          <Badge color="secondary" badgeContent={row.original.Quantity}>
            <img src={row.original.Responsable.photo} className="w-10 h-auto rounded-full" alt="user" />
          </Badge>
          <RemovePaymentComponent expenses={expenses} id={row.original.id} name={row.original.notes} 
              token={token} updateTable={deletePayment} user={user} />
          {row.original.archivos? <BsFileEarmarkPdf className="w-6 h-6 text-green-500" />: <IoAlert className="w-6 h-6 text-red-500" />}
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Responsable</p>
      )
    }),
    columnHelper.accessor('paymentplugin', {
      id: 'complemento',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
          onClick={() => window.location.replace(`/providers/${idProv}/payments/${row.original.id}/details`)}
        >{row.original?.paymentplugin?.plugin}</p>
      ),
      enableSorting:false,
      header: () => (
        <p>Complemento</p>
      )
    }),
    columnHelper.accessor('date', {
      header: () => (
        <>
          <p>Fecha</p>
          <p>Fecha de pago</p>
        </>
      ),
      id: 'fecha',
      cell: ({row}) => (
        <>
          <p className="cursor-pointer"
            onClick={() => window.location.replace(`/providers/${idProv}/payments/${row.original.id}/details`)}
          >{row.original.date?.substring(0, 10) || ''}</p>
          <p className="cursor-pointer"
            onClick={() => window.location.replace(`/providers/${idProv}/payments/${row.original.id}/details`)}
          >{row.original.datePaid?.substring(0, 10) || ''}</p>
        </>
      ),
    }),
    columnHelper.accessor('reference', {
      id: 'Referencia',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
          onClick={() => window.location.replace(`/providers/${idProv}/payments/${row.original.id}/details`)}
        >{row.original.reference}</p>
      ),
      enableSorting:false,
      header: () => (
        <p>Referencia de pago</p>
      )
    }),
    columnHelper.accessor('notes', {
      header: 'Notas',
      id: 'Notas',
      cell: ({row}) => (
        row.original.notes.length < 100? (
          <>
            <p className="cursor-pointer" 
              onClick={() => window.location.replace(`/providers/${idProv}/payments/${row.original.id}/details`)}
            >{row.original.notes}</p>
            <p className="cursor-pointer" 
              onClick={() => window.location.replace(`/providers/${idProv}/payments/${row.original.id}/details`)}
            >{row.original.paymentplugin.notes}</p>
          </>
        ): (
          <p className="cursor-pointer" 
            onClick={() => window.location.replace(`/providers/${idProv}/payments/${row.original.id}/details`)}
          >{row.original.notes.substring(0, 100)}</p>
        )
      ),
    }),
    columnHelper.accessor('condition', {
      header: 'Estatus',
      id: 'Estatus',
      cell: ({row}) => (
        <div className="cursor-pointer" 
          onClick={() => window.location.replace(`/providers/${idProv}/payments/${row.original.id}/details`)}>
            <Chip label={row.original.condition.name} color={row.original.condition.color}
                darktext={row?.original?.condition?.darktext?? false} />
        </div>
      ),
    }),
    columnHelper.accessor('methodofpayment', {
      header: 'Forma de pago',
      id: 'formapago',
      cell: ({row}) => (
        <div className="cursor-pointer" 
          onClick={() => window.location.replace(`/providers/${idProv}/payments/${row.original.id}/details`)}>
            <Chip label={row.original.methodofpayment.name} color={row.original.methodofpayment.color}
                darktext={row?.original?.methodofpayment?.darktext?? false} />
        </div>
      ),
    }),
    columnHelper.accessor('paid', {
      header: 'Pago',
      id: 'Pago',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/providers/${idProv}/payments/${row.original.id}/details`)}
        >{row.original.paid}</p>
      ),
    }),
    columnHelper.accessor('pending', {
      header: 'Pendiente',
      id: 'Pendiente',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/providers/${idProv}/payments/${row.original.id}/details`)}
        >{row.original.pending}</p>
      ),
    }),
  ]
  

  const view = <Table columns={columns} data={dataExpenses}
                placeH="Buscar gasto.." typeTable="payments" />

  const [maxAmount, setMaxAmount] = useState<number>(0);
  const [minAmount, setMinAmount] = useState<number>(0);
  
  useEffect(() => {
    const expenseM = expenses.reduce((previous, current) => {
      return current.payout > previous.payout ? current : previous;
    });
    const expenseMin = expenses.reduce((previous, current) => {
      return current.payout < previous.payout ? current : previous;
    });
    setMaxAmount(expenseM.payout);
    setMinAmount(expenseMin.payout > 0? 0: expenseMin.payout || 0);
  }, [])

  const paidValidation = (exp:PaymentProvider, isPaid:number) => {
    return exp.status;
  }

  const dateValidation = (exp:PaymentProvider, startDate:number, endDate:number, isPaid: number) => {
    let d = new Date(exp.date).getTime();
    if(d >= startDate && d <= endDate){
      return paidValidation(exp, isPaid);
    }
    return false;
  }

  const amountValidation = (exp:PaymentProvider, minAmount:number, maxAmount:number, 
                              startDate:number, endDate:number, isPaid: number) => {
    if(exp.payout >= minAmount && exp.payout <= maxAmount){
      return dateValidation(exp, startDate, endDate, isPaid);
    }
    return false;
  }

  const conditionValidation = (exp:PaymentProvider, minAmount:number, maxAmount:number, 
                  startDate:number, endDate:number, conditions:string[], isPaid: number) => {

    if(conditions.includes('all')){
      return amountValidation(exp, minAmount, maxAmount, startDate, endDate, isPaid);
    }else{
      return amountValidation(exp, minAmount, maxAmount, startDate, endDate, isPaid);
    }
  }

  const filterData = (conditions:string[], minAmount:number, maxAmount:number, 
    startDate:number, endDate:number, isPaid: number) => {
  
    let filtered: PaymentProvider[] = [];
    refExpenses.current.map((expense) => {
      if(conditionValidation(expense, minAmount, maxAmount, startDate, 
          endDate, conditions, isPaid)){
        filtered.push(expense);
      }
    });

    // setExpensesFiltered(filtered);
    setDataExpenses(ExpenseDataToTablePaidExpensesProviderData(filtered));
  }

  return(
    <>
      <div className="flex justify-end mt-1">
          {/* {isFilter && <FilteringPaymentsProvider showForm={handleIsFilter}  
                          FilterData={filterData} maxAmount={maxAmount} 
                          minAmount={minAmount} token={token} />} */}
        {isFilter && (
          <ContainerSideNav width="w-full max-w-md" open={isFilter}>
            <FilteringPaymentsProvider showForm={handleIsFilter}  
                            FilterData={filterData} maxAmount={maxAmount} 
                            minAmount={minAmount} token={token} />
          </ContainerSideNav>
        )}
      </div>
      
      <div className="hidden xl:block w-full">
        {view}
      </div>
      <div className="block xl:hidden w-full">
        <ListData data={data} idProv={idProv} deletePayment={deletePayment} expenses={expenses} token={token} user={user} />
      </div>
    </>
  )
}

const ListData = ({data, idProv, deletePayment, token, expenses, user}: 
  {data: ExpensesTableProvider[], idProv:string, token:string, expenses:PaymentProvider[], user: string,
    deletePayment: (id: string) => void}) => {

  // const [dataReports, setDataReports] = useState(data);

  // const {search} = useTableStates();

  // const filterData = useMemo(() => {
  //   if(search.trim() === ''){
  //     return data;
  //   }else{
  //     const d = data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
  //     return d;
  //   }
  // }, [search]);

  return(
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full max-w-2xl rounded-xl bg-clip-border] h-[calc(100vh-264px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {data.map((e) => (
            <CardExpenses expense={e} key={e.id} idProv={idProv} deletePayment={deletePayment} expenses={expenses} token={token} user={user} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardExpenses = ({expense, idProv, token, expenses, user, deletePayment}: 
  {expense:ExpensesTableProvider, idProv:string, token:string, expenses:PaymentProvider[], user: string,
    deletePayment: (id: string) => void }) => {

  return(
    <div role="button"
      key={expense.id}
      // onClick={() => window.location.replace(`/reports/${report.id}/profile`)}
      className={`flex flex-col w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center">
          <Badge color="secondary" badgeContent={expense.Quantity}>
            <img alt="responsable" src={ expense.Responsable?.photo ?? '/img/users/default.jpg'}
              className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
          </Badge>
          <RemovePaymentComponent expenses={expenses} id={expense.id} name={expense.notes} 
              token={token} updateTable={deletePayment} user={user} />
          {/* <DeleteElement id={expense.id} name={expense.name} remove={RemoveCompany} token={token} /> */}
        </div>
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3"
            onClick={() => window.location.replace(`/providers/${idProv}/payments/${expense.id}/details`)}
          >
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 w-full max-w-32 ">
                <Chip label={expense.methodofpayment.name} color={expense.methodofpayment.color}
                  darktext={expense?.methodofpayment?.darktext?? false} />
              </h6>
              {/* <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {expense.notes}
              </p> */}
            </div>
            <div className="text-right w-full max-w-40">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                {expense.paid}
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                {expense.pending}
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
        {expense.notes}
      </p>

    </div>
  )
}