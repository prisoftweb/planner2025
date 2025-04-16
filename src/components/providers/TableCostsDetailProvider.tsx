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
        ><Chip label={row.original.Estatus.name} color={row.original.Estatus.color} /></p>
      ),
    }),
    columnHelper.accessor('previoudbalanceamount', {
      header: 'Saldo anterior',
      id: 'saldo anterior',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
        >
          {CurrencyFormatter({
            currency: "MXN",
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
            currency: 'MXN',
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
            currency: 'MXN',
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
      <div className="flex justify-end my-5">
        {isFilter && <FilteringExpensesProvider showForm={handleIsFilter}  
                          FilterData={filterData} maxAmount={maxAmount} 
                          minAmount={minAmount} token={token} showPaidValidation={false} />}
      </div>
      {view}
    </>
  )
}