'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { useState, useEffect, useRef } from "react";
import { Expense } from "@/interfaces/Expenses";
import Chip from "../providers/Chip";
import { BsFileEarmarkPdf } from "react-icons/bs"; //Archivo PDF
import { BsFiletypeXml } from "react-icons/bs"; //Archivo XML
import { IoAlert } from "react-icons/io5"; // No hay archivo
import { ExpenseDataToTableDetailExpensesProviderData } from "@/app/functions/providersFunctions";
import { DetailExpensesTableProvider } from "@/interfaces/Providers";
import FilteringExpensesProvider from "./FilteredExpensesHistoryProvider";
import { CostPayment } from "@/interfaces/Payments";
import { CurrencyFormatter } from "@/app/functions/Globals";

export default function TableCostsDetailProvider({data, token, expenses, 
                          user, isFilter, setIsFilter }:
                        {data:DetailExpensesTableProvider[], token:string, expenses:CostPayment[], 
                        user: string, isFilter:boolean, setIsFilter:Function }){
  
  const columnHelper = createColumnHelper<DetailExpensesTableProvider>();
  const refExpenses = useRef(expenses);
  
  const [dataExpenses, setDataExpenses] = useState(data);
  const [expensesFiltered, setExpensesFiltered] = useState<CostPayment[]>(expenses);
  
  const handleIsFilter = (value: boolean) => {
    // if(value){
    //   if(!refFilter.current){
    //     refFilter.current = true;
    //     setDataExpenses(ExpenseDataToTableData(refExpenses.current));
    //   }
    // }else{
    //   refFilter.current = false;
    // }
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
    // columnHelper.accessor('paid', {
    //   header: 'Pagado',
    //   id: 'Pagado',
    //   cell: ({row}) => (
    //     <div className="cursor-pointer" >
    //         <Chip label={row.original.paid? 'Pagado': 'No pagado'} color={row.original.paid? '#0f0': '#f00'} />
    //     </div>
    //   ),
    // }),
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
          {/* {row.original.previoudbalanceamount} */}
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
          {/* {row.original.payout} */}
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
          {/* {row.original.unpaidbalanceamount} */}
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
    // if(isPaid===1){
    //   return true;
    // }else{
    //   if(isPaid===2){
    //     if(exp.ispaid){
    //       return true;
    //     }
    //     return false;
    //   }else{
    //     if(!exp.ispaid){
    //       return true;
    //     }
    //     return false;
    //   }
    // }
    return true;
  }

  const dateValidation = (exp:CostPayment, startDate:number, endDate:number, isPaid: number) => {
    let d = new Date(exp.date).getTime();
    //console.log('get time ', d);
    if(d >= startDate && d <= endDate){
      return paidValidation(exp, isPaid);
      //return true;
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

  // const projectValidation = (exp:CostPayment, minAmount:number, maxAmount:number, 
  //                     startDate:number, endDate:number, projects:string[], 
  //                     isPaid: number) => {
  //   if(projects.includes('all')){
  //     return amountValidation(exp, minAmount, maxAmount, startDate, endDate, isPaid);
  //   }else{
  //     if(exp.costs.project){
  //       if(projects.includes(exp.costs.project._id)){
  //         return amountValidation(exp, minAmount, maxAmount, startDate, endDate, isPaid);
  //       }
  //     }
  //   }
  //   return false;
  // }

  // const reportValidation = (exp:CostPayment, minAmount:number, maxAmount:number, 
  //             startDate:number, endDate:number, projects:string[], 
  //             reports:string[], isPaid: number) => {
  //   if(reports.includes('all')){
  //     return projectValidation(exp, minAmount, maxAmount, startDate, endDate, projects, isPaid); 
  //   }else{
  //     if(exp.costs.report){
  //       if(reports.includes(exp.costs.report._id)){
  //         return projectValidation(exp, minAmount, maxAmount, startDate, endDate, projects, isPaid);
  //       }
  //     }
  //   }
  //   return false;
  // }

  const conditionValidation = (exp:CostPayment, minAmount:number, maxAmount:number, 
                  startDate:number, endDate:number, conditions:string[], isPaid: number) => {

    if(conditions.includes('all')){
      // return reportValidation(exp, minAmount, maxAmount, startDate, endDate, projects, reports, isPaid);
      return amountValidation(exp, minAmount, maxAmount, startDate, endDate, isPaid);
    }else{
      // if(!exp.condition.every((cond) => !conditions.includes(cond.glossary._id))){
      //   return typesValidation(exp, minAmount, maxAmount, startDate, endDate, projects, 
      //               reports, categories, types, costcenters);
      // }
      if(conditions.includes(exp.costs.estatus._id)){
        // return reportValidation(exp, minAmount, maxAmount, startDate, endDate, projects, reports, isPaid);
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

    //console.log(filtered);
    //setFilteredExpenses(filtered);
    setExpensesFiltered(filtered);
    //setDataExpenses(ExpenseDataToTableData(filtered));
    setDataExpenses(ExpenseDataToTableDetailExpensesProviderData(filtered));
    //setFilter(true);
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