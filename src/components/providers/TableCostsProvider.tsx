'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { useState, useEffect, useRef } from "react";
import { ExpensesTable, Expense } from "@/interfaces/Expenses";
import Chip from "../providers/Chip";
import { BsFileEarmarkPdf } from "react-icons/bs"; //Archivo PDF
import { BsFiletypeXml } from "react-icons/bs"; //Archivo XML
import { IoAlert } from "react-icons/io5"; // No hay archivo
import { ExpenseDataToTablePaidExpensesProviderData } from "@/app/functions/providersFunctions";
import { ExpensesTableProvider } from "@/interfaces/Providers";
// import FilteringExpensesProvider from "./FilteredExpensesHistoryProvider";
import FilteringPaymentsProvider from "./FilteringPaymentsProvider";
import { PaymentProvider } from "@/interfaces/Payments";
import RemoveElement from "../RemoveElement";
import { showToastMessageError } from "../Alert";
import { removePayment } from "@/app/api/routePayments";
import RemovePaymentComponent from "./RemovePaymentComponent";

export default function TableCostsProvider({data, token, expenses, idProv, 
                          user, isFilter, setIsFilter, udpateTable }:
                        {data:ExpensesTableProvider[], token:string, expenses:PaymentProvider[], 
                        user: string, isFilter:boolean, setIsFilter:Function, 
                        idProv: string, udpateTable: Function}){
  
  const columnHelper = createColumnHelper<ExpensesTableProvider>();
  const refExpenses = useRef(expenses);
  
  const [dataExpenses, setDataExpenses] = useState(data);
  const [expensesFiltered, setExpensesFiltered] = useState<PaymentProvider[]>(expenses);
  
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

  const deletePayment = (id:string) => {
    // const exp = expenses.find((e) => e._id=== id);
    // console.log(exp);
    const auxExp = expenses.filter((e) => e._id!==id);
    setExpensesFiltered(auxExp);
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
          <img src={row.original.Responsable.photo} className="w-10 h-auto rounded-full" alt="user" />
          {/* <button type="button" onClick={() => deletePayment(row.original.id)}>eliminar</button> */}
          <RemovePaymentComponent expenses={expenses} id={row.original.id} name={row.original.notes} 
              token={token} updateTable={deletePayment} user={user} />
          {row.original.archivos? <BsFileEarmarkPdf className="w-6 h-6 text-green-500" />: <IoAlert className="w-6 h-6 text-red-500" />}
          {/* <RemoveElement id={row.original.id} name={row.original.notes} token={token} 
              remove={removePayment} removeElement={delPayment} /> */}
          {/* <div className="w-20 flex gap-x-1 items-center">
            {row.original.archivos.includes('xml') && <BsFiletypeXml className="w-6 h-6 text-green-500" />}
            {row.original.archivos.includes('pdf') && <BsFileEarmarkPdf className="w-6 h-6 text-green-500" />}
            {row.original.archivos.includes('none') && <IoAlert className="w-6 h-6 text-red-500" />}
          </div> */}
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Responsable</p>
      )
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
        <p>Referencia</p>
      )
    }),
    columnHelper.accessor('range', {
      header: 'Rango',
      id: 'Rango',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
          onClick={() => window.location.replace(`/providers/${idProv}/payments/${row.original.id}/details`)}
        >{row.original.range}</p>
      )
    }),
    columnHelper.accessor('notes', {
      header: 'Notas',
      id: 'Notas',
      cell: ({row}) => (
        row.original.notes.length < 100? (
          <p className="cursor-pointer" 
            onClick={() => window.location.replace(`/providers/${idProv}/payments/${row.original.id}/details`)}
          >{row.original.notes}</p>
        ): (
          <p className="cursor-pointer" 
            onClick={() => window.location.replace(`/providers/${idProv}/payments/${row.original.id}/details`)}
          >{row.original.notes.substring(0, 100)}</p>
        )
      ),
    }),
    columnHelper.accessor('Estatus', {
      header: 'Estatus',
      id: 'Estatus',
      cell: ({row}) => (
        <div className="cursor-pointer" 
          onClick={() => window.location.replace(`/providers/${idProv}/payments/${row.original.id}/details`)}>
            <Chip label={row.original.Estatus? 'Pagado': 'No pagado'} color={row.original.Estatus? '#0f0': '#f00'} />
        </div>
      ),
    }),
    columnHelper.accessor('date', {
      header: 'Fecha',
      id: 'fecha',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/providers/${idProv}/payments/${row.original.id}/details`)}
        >{row.original.date?.substring(0, 10) || ''}</p>
      ),
    }),
    columnHelper.accessor('Quantity', {
      header: 'Cantidad',
      id: 'Cantidad',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/providers/${idProv}/payments/${row.original.id}/details`)}
        >{row.original.Quantity}</p>
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
  

  // const view = <Table columns={columns} data={dataExpenses} selectFunction={handleExpensesSelected}
  //               placeH="Buscar gasto.." />
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
    return exp.status;
  }

  const dateValidation = (exp:PaymentProvider, startDate:number, endDate:number, isPaid: number) => {
    let d = new Date(exp.date).getTime();
    //console.log('get time ', d);
    if(d >= startDate && d <= endDate){
      return paidValidation(exp, isPaid);
      //return true;
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
      console.log('conditions => ', exp);
      return amountValidation(exp, minAmount, maxAmount, startDate, endDate, isPaid);
    }else{
      return amountValidation(exp, minAmount, maxAmount, startDate, endDate, isPaid);
      // if(!exp.condition.every((cond) => !conditions.includes(cond.glossary._id))){
      //   return typesValidation(exp, minAmount, maxAmount, startDate, endDate, projects, 
      //               reports, categories, types, costcenters);
      // }
      
      // if(conditions.includes(exp.estatus._id)){
      //   return reportValidation(exp, minAmount, maxAmount, startDate, endDate, projects, reports, isPaid);
      // }
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

    //console.log(filtered);
    //setFilteredExpenses(filtered);
    setExpensesFiltered(filtered);
    //setDataExpenses(ExpenseDataToTableData(filtered));
    setDataExpenses(ExpenseDataToTablePaidExpensesProviderData(filtered));
    //setFilter(true);
  }

  return(
    <>
      <div className="flex justify-end my-5">
        {/* <Button type="button" onClick={() => setFiltering(!filtering)}>Filtrar</Button> */}
        {/* <GiSettingsKnobs onClick={() => setFiltering(!filtering)}
          className="text-slate-600 w-8 h-8 cursor-pointer hover:text-slate-300"
        /> */}
          {isFilter && <FilteringPaymentsProvider showForm={handleIsFilter}  
                          FilterData={filterData} maxAmount={maxAmount} 
                          minAmount={minAmount} token={token} />}
      </div>
      {/* <Button onClick={changeConditionInCost}>Validar</Button> */}
      {view}
    </>
  )
}