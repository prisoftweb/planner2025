'use client'

import { HistoryExpensesTable } from "@/interfaces/Providers"
import { Expense } from "@/interfaces/Expenses"
import TableHistoryCosts from "./TableHistoryCosts"
import ArrowReturn from "../ArrowReturn"
import IconText from "./IconText"
import { Provider } from "@/interfaces/Providers"
import { Options } from "@/interfaces/Common"
import SearchInTable from "../SearchInTable"
import { useState } from "react"
import { ExpenseDataToTableHistoryProviderData } from "@/app/functions/providersFunctions"
import { useEffect } from "react"

type Props = {
  data:HistoryExpensesTable[], 
  token:string, 
  expenses:Expense[], 
  user: string, 
  provider: Provider, 
  optTypes: Options[], 
  condition: string
}

export default function ContainerTableHistoryCosts({data, token, expenses, user, 
  provider, optTypes, condition}: Props) {

  const [filter, setFilter] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState<HistoryExpensesTable[]>(data);
  const [costsProvider, setCostProvider] = useState<Expense[]>(expenses);
  const [currentCostsProvider, setCurrentCostProvider] = useState<Expense[]>(expenses);
  
  const [maxAmount, setMaxAmount] = useState<number>(0);
  const [minAmount, setMinAmount] = useState<number>(0);

  const handleFilter = (value: boolean) => {
    setFilter(value);
  }

  const handleExpensesSelected = (value: HistoryExpensesTable[]) => {
    // const noPaid = value.filter((c) => c.Estatus._id !== '67318a51ceaf47ece0d3aa72' 
    //                     && c.Estatus._id !== '67378f77d846bbd16e1a8714');
    // const noPaid = value.filter((c) => c.Estatus._id !== '67318a51ceaf47ece0d3aa72' && 
    //                                     c.Estatus._id !== '661eade6f642112488c85fad' &&
    //                                     c.Estatus._id !== '661eaa71f642112488c85f59' &&
    //                                     c.Estatus._id !== '661eaa4af642112488c85f56' );
    // setExpensesSelected(noPaid);
  }

  useEffect(() => {
    const expenseM = expenses.reduce((previous, current) => {
      return current.cost?.subtotal > previous.cost?.subtotal ? current : previous;
    });
    const expenseMin = expenses.reduce((previous, current) => {
      return current.cost?.subtotal < previous.cost?.subtotal ? current : previous;
    });
    setMaxAmount(expenseM.cost?.subtotal);
    setMinAmount(expenseMin.cost?.subtotal > 0? 0: expenseMin.cost?.subtotal || 0);
  }, [])

  const paidValidation = (exp:Expense, isPaid:number) => {
    if(isPaid===1){
      return true;
    }else{
      if(isPaid===2){
        if(exp.ispaid){
          return true;
        }
        return false;
      }else{
        if(!exp.ispaid){
          return true;
        }
        return false;
      }
    }
  }

  const dateValidation = (exp:Expense, startDate:number, endDate:number, isPaid: number) => {
    let d = new Date(exp.date).getTime();
    if(d >= startDate && d <= endDate){
      return paidValidation(exp, isPaid);
    }
    return false;
  }

  const amountValidation = (exp:Expense, minAmount:number, maxAmount:number, 
                              startDate:number, endDate:number, isPaid: number) => {
    if(exp.cost?.subtotal >= minAmount && exp.cost?.subtotal <= maxAmount){
      return dateValidation(exp, startDate, endDate, isPaid);
    }
    return false;
  }

  const conditionValidation = (exp:Expense, minAmount:number, maxAmount:number, 
                  startDate:number, endDate:number, conditions:string[], isPaid: number) => {

    if(conditions.includes('all')){
      return amountValidation(exp, minAmount, maxAmount, startDate, endDate, isPaid);
    }else{
      // if(!exp.condition.every((cond) => !conditions.includes(cond.glossary._id))){
      //   return typesValidation(exp, minAmount, maxAmount, startDate, endDate, projects, 
      //               reports, categories, types, costcenters);
      // }
      if(conditions.includes(exp.estatus._id)){
        return amountValidation(exp, minAmount, maxAmount, startDate, endDate, isPaid);
      }
    }
    return false;
  }

  const filterData = (conditions:string[], minAmount:number, maxAmount:number, 
    startDate:number, endDate:number, isPaid: number) => {

    let filtered: Expense[] = [];
    currentCostsProvider.map((expense) => {
      if(conditionValidation(expense, minAmount, maxAmount, startDate, 
          endDate, conditions, isPaid)){
        filtered.push(expense);
      }
    });

    setCostProvider(filtered);
    setDataTable(ExpenseDataToTableHistoryProviderData(filtered));
  }
  
  return (
    <div>
      <div className="flex justify-between items-center flex-wrap gap-y-3">
        <div className="flex items-center my-2">
          <ArrowReturn link="/providers" />
          <IconText text={provider?.tradename || ''} size="w-8 h-8" sizeText="" />
          <p className="text-slate-500 mx-3">{provider.name}</p>
        </div>
        <div className="flex gap-x-2">
          <SearchInTable placeH={"Buscar gasto.."} />
        </div>
      </div>
      <TableHistoryCosts token={token} handleExpensesSelected={handleExpensesSelected}
        expenses={costsProvider} isFilter={filter} setIsFilter={handleFilter}
        user={user} isViewReports={false} data={dataTable} idProv={provider._id}
        filterData={filterData} maxAmount={maxAmount} minAmount={minAmount}
      />
    </div>
  )
}
