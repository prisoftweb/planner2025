'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { useState, useEffect, useRef } from "react";
import Chip from "../providers/Chip";
import { BsFileEarmarkPdf } from "react-icons/bs"; //Archivo PDF
import { BsFiletypeXml } from "react-icons/bs"; //Archivo XML
import { IoAlert } from "react-icons/io5"; // No hay archivo
import { ExpenseDataToTableDetailExpensesProviderData } from "@/app/functions/providersFunctions";
import { DetailExpensesTableProvider } from "@/interfaces/Providers";
import FilteringExpensesProvider from "./FilteredExpensesHistoryProvider";
import { CostPayment } from "@/interfaces/Payments";
import { CurrencyFormatter } from "@/app/functions/Globals";
import ContainerSideNav from "../ContainerSideNav";

type Props = {
  data:DetailExpensesTableProvider[], 
  token:string, 
  expenses:CostPayment[], 
  user: string, 
  isFilter:boolean, 
  setIsFilter:Function 
}

export default function TableCostsDetailProvider({data, token, expenses, 
  user, isFilter, setIsFilter }: Props){
  
  const columnHelper = createColumnHelper<DetailExpensesTableProvider>();
  const refExpenses = useRef(expenses);
  
  const [dataExpenses, setDataExpenses] = useState(data);
  
  const handleIsFilter = (value: boolean) => {
    setIsFilter(value);
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
          <img src={row.original.Responsable.photo} className="w-10 h-auto rounded-full" alt="user" />
          <div className="w-20 flex gap-x-1 items-center">
            {row.original.archivos.includes('xml') && <BsFiletypeXml className="w-6 h-6 text-green-500" />}
            {row.original.archivos.includes('pdf') && <BsFileEarmarkPdf className="w-6 h-6 text-green-500" />}
            {row.original.archivos.includes('none') && <IoAlert className="w-6 h-6 text-red-500" />}
          </div>
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Responsable</p>
      )
    }),
    columnHelper.accessor('project', {
      id: 'Proyecto',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
        >{row.original.project}</p>
      ),
      enableSorting:false,
      header: () => (
        <p>Proyecto</p>
      )
    }),
    columnHelper.accessor('report', {
      header: 'Informe',
      id: 'Informe',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
        >{row.original.report}</p>
      )
    }),
    columnHelper.accessor('description', {
      header: 'descripcion',
      id: 'Notas',
      cell: ({row}) => (
        row.original.description.length < 100? (
          <p className="cursor-pointer" 

          >{row.original.description}</p>
        ): (
          <p className="cursor-pointer" 

          >{row.original.description.substring(0, 100)}</p>
        )
      ),
    }),
    columnHelper.accessor('date', {
      header: 'Fecha',
      id: 'fecha',
      cell: ({row}) => (
        <p className="cursor-pointer"
        >{row.original.date?.substring(0, 10) || ''}</p>
      ),
    }),
    columnHelper.accessor('Estatus', {
      header: 'Estatus',
      id: 'Estatus',
      cell: ({row}) => (
        <p className="cursor-pointer"
        ><Chip label={row.original.Estatus.name} color={row.original.Estatus.color} 
            darktext={row?.original?.Estatus?.darktext?? false} /></p>
      ),
    }),
    columnHelper.accessor('previoudbalanceamount', {
      header: 'Saldo anterior',
      id: 'saldo anterior',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
        >
          {CurrencyFormatter({
            currency: "USD",
            value: row.original.previoudbalanceamount
          })}
        </p>
      )
    }),
    columnHelper.accessor('payout', {
      header: 'Pagado',
      id: 'pagado',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
        >
          {CurrencyFormatter({
            currency: 'USD',
            value: row.original.payout
          })}
        </p>
      )
    }),
    columnHelper.accessor('unpaidbalanceamount', {
      header: 'Saldo pendiente',
      id: 'pendiente',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
        >
          {CurrencyFormatter({
            currency: 'USD',
            value: row.original.unpaidbalanceamount
          })}
        </p>
      )
    }),
    columnHelper.accessor('partitialnumber', {
      header: 'Parcialidad',
      id: 'parcialidad',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
        >{row.original.partitialnumber}</p>
      )
    }),
  ]
  

  const view = <Table columns={columns} data={dataExpenses} placeH="Buscar gasto.." typeTable="paymentDetails" />
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

  const paidValidation = (exp:CostPayment, isPaid:number) => {
    return true;
  }

  const dateValidation = (exp:CostPayment, startDate:number, endDate:number, isPaid: number) => {
    let d = new Date(exp.date).getTime();
    if(d >= startDate && d <= endDate){
      return paidValidation(exp, isPaid);
    }
    return false;
  }

  const amountValidation = (exp:CostPayment, minAmount:number, maxAmount:number, 
                              startDate:number, endDate:number, isPaid: number) => {
    if(exp.costs.pay[0].payout >= minAmount && exp.costs.pay[0].payout <= maxAmount){
      return dateValidation(exp, startDate, endDate, isPaid);
    }
    return false;
  }

  const conditionValidation = (exp:CostPayment, minAmount:number, maxAmount:number, 
                  startDate:number, endDate:number, conditions:string[], isPaid: number) => {

    if(conditions.includes('all')){
      return amountValidation(exp, minAmount, maxAmount, startDate, endDate, isPaid);
    }else{
      if(conditions.includes(exp.costs.estatus._id)){
        return amountValidation(exp, minAmount, maxAmount, startDate, endDate, isPaid);
      }
    }
    return false;
  }

  const filterData = (conditions:string[], minAmount:number, maxAmount:number, 
    startDate:number, endDate:number, isPaid: number) => {
  
    let filtered: CostPayment[] = [];
    refExpenses.current.map((expense) => {
      if(conditionValidation(expense, minAmount, maxAmount, startDate, 
          endDate, conditions, isPaid)){
        filtered.push(expense);
      }
    });

    // setExpensesFiltered(filtered);
    setDataExpenses(ExpenseDataToTableDetailExpensesProviderData(filtered));
  }

  return(
    <>
      {/* <div className="flex justify-end my-5">
        {isFilter && <FilteringExpensesProvider showForm={handleIsFilter}  
                          FilterData={filterData} maxAmount={maxAmount} 
                          minAmount={minAmount} token={token} showPaidValidation={false} />}
      </div> */}

      <ContainerSideNav width="w-full max-w-md" open={isFilter}>
        <FilteringExpensesProvider showForm={handleIsFilter}  
                          FilterData={filterData} maxAmount={maxAmount} 
                          minAmount={minAmount} token={token} showPaidValidation={false} />
      </ContainerSideNav>
      
      <div className="hidden xl:block w-full">
        {view}
      </div>
      <div className="block xl:hidden">
        <ListData data={dataExpenses} />
      </div>
    </>
  )
}

const ListData = ({data}: {data: DetailExpensesTableProvider[]}) => {

  return(
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full max-w-2xl rounded-xl bg-clip-border] h-[calc(100vh-264px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {data.map((e) => (
            <CardInvoices expense={e} key={e.id} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardInvoices = ({expense }: 
  {expense:DetailExpensesTableProvider }) => {

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
          <img alt="responsable" src={ expense.Responsable?.photo ?? '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
          {/* <DeleteElement id={expense.id} name={expense.name} remove={RemoveCompany} token={token} /> */}
        </div>
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3"
            // onClick={() => window.location.replace(`/expenses/${expense.id}/profile?prov=${idProv}`)}
          >
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {expense.project}
              </h6>
              {/* <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {expense.description}
              </p> */}
            </div>
            <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                {CurrencyFormatter({
                  currency: 'USD',
                  value: expense.payout
                })}
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                {CurrencyFormatter({
                  currency: 'USD', 
                  value: expense.unpaidbalanceamount?? 0
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
        {expense.description}
      </p>

    </div>
  )
}