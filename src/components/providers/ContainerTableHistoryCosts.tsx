'use client'

import { HistoryExpensesTable } from "@/interfaces/Providers"
import { Expense } from "@/interfaces/Expenses"
import TableHistoryCosts from "./TableHistoryCosts"
//import Selectize from "../Selectize"
import ArrowReturn from "../ArrowReturn"
import IconText from "./IconText"
import { Provider } from "@/interfaces/Providers"
import { Options } from "@/interfaces/Common"
import SearchInTable from "../SearchInTable"
import { GiSettingsKnobs } from "react-icons/gi"
import { useState } from "react"
import PaidHistoryExpenses from "./PaidHistoryExpenses"
import { TbPaywall } from "react-icons/tb"
import { GetCostsMIN } from "@/app/api/routeProviders";
import { showToastMessageError } from "../Alert"
import { ExpenseDataToTableHistoryProviderData } from "@/app/functions/providersFunctions"
import { useEffect } from "react"

export default function ContainerTableHistoryCosts({data, token, expenses, user, 
    provider, optTypes, condition}:
  {data:HistoryExpensesTable[], token:string, expenses:Expense[], 
    user: string, provider: Provider, optTypes: Options[], condition: string}) {

  const [filter, setFilter] = useState<boolean>(false);
  const [expensesSelected, setExpensesSelected] = useState<HistoryExpensesTable[]>([]);
  const [paidExpenses, setPaidExpenses] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState<HistoryExpensesTable[]>(data);
  const [costsProvider, setCostProvider] = useState<Expense[]>(expenses);
  const [currentCostsProvider, setCurrentCostProvider] = useState<Expense[]>(expenses);
  
  const [maxAmount, setMaxAmount] = useState<number>(0);
  const [minAmount, setMinAmount] = useState<number>(0);

  const handleFilter = (value: boolean) => {
    setFilter(value);
  }

  const handlePaidExpenses = (value: boolean) => {
    setPaidExpenses(value);
  }

  const handleExpensesSelected = (value: HistoryExpensesTable[]) => {
    // const noPaid = value.filter((c) => c.Estatus._id !== '67318a51ceaf47ece0d3aa72' 
    //                     && c.Estatus._id !== '67378f77d846bbd16e1a8714');
    const noPaid = value.filter((c) => c.Estatus._id !== '67318a51ceaf47ece0d3aa72');
    setExpensesSelected(noPaid);
  }

  const updateTable = async () => {
    let costs: Expense[];
    try {
      costs = await GetCostsMIN(token, provider._id);
      if(typeof(costs) === "string")
        showToastMessageError('Error al actualizar tabla!!!');
      else{
        const table: HistoryExpensesTable[] = ExpenseDataToTableHistoryProviderData(costs);
        setDataTable(table);
        setCurrentCostProvider(costs);
        setCostProvider(costs);
      }
    } catch (error) {
      showToastMessageError('Error al actualizar tabla!!!');  
    }
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
    //console.log('get time ', d);
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

  // const projectValidation = (exp:Expense, minAmount:number, maxAmount:number, 
  //                     startDate:number, endDate:number, projects:string[], 
  //                     isPaid: number) => {
  //   if(projects.includes('all')){
  //     return amountValidation(exp, minAmount, maxAmount, startDate, endDate, isPaid);
  //   }else{
  //     if(exp.project){
  //       if(projects.includes(exp.project._id)){
  //         return amountValidation(exp, minAmount, maxAmount, startDate, endDate, isPaid);
  //       }
  //     }
  //   }
  //   return false;
  // }

  // const reportValidation = (exp:Expense, minAmount:number, maxAmount:number, 
  //             startDate:number, endDate:number, projects:string[], 
  //             reports:string[], isPaid: number) => {
  //   if(reports.includes('all')){
  //     return projectValidation(exp, minAmount, maxAmount, startDate, endDate, projects, isPaid); 
  //   }else{
  //     if(exp.report){
  //       if(reports.includes(exp.report._id)){
  //         return projectValidation(exp, minAmount, maxAmount, startDate, endDate, projects, isPaid);
  //       }
  //     }
  //   }
  //   return false;
  // }

  const conditionValidation = (exp:Expense, minAmount:number, maxAmount:number, 
                  startDate:number, endDate:number, conditions:string[], isPaid: number) => {

    console.log('conditions => ', conditions);
    if(conditions.includes('all')){
      console.log('conditions all');
      return amountValidation(exp, minAmount, maxAmount, startDate, endDate, isPaid);
    }else{
      console.log('validation condition');
      console.log('expense => ', exp);
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

    console.log('filter data ');
  
    let filtered: Expense[] = [];
    console.log('costs providers => ', costsProvider);
    currentCostsProvider.map((expense) => {
      console.log('expense map => ', expense);
      if(conditionValidation(expense, minAmount, maxAmount, startDate, 
          endDate, conditions, isPaid)){
        filtered.push(expense);
      }
    });

    setCostProvider(filtered);
    setDataTable(ExpenseDataToTableHistoryProviderData(filtered));
    // setExpensesFiltered(filtered);
    // setDataExpenses(ExpenseDataToTableHistoryProviderData(filtered));
  }
  
  return (
    <div>
      <div className="flex justify-between items-center flex-wrap gap-y-3">
        <div className="flex items-center my-2">
          <ArrowReturn link="/providers" />
          <IconText text={provider?.tradename || ''} size="w-8 h-8" sizeText="" />
          <p className="text-slate-500 mx-3">{provider.name}</p>
        </div>
        {/* <Selectize options={options} routePage="providers" subpath="/invoiceHistory" /> */}
        <div className="flex gap-x-2">
          <SearchInTable placeH={"Buscar gasto.."} />
          <div className={`w-24`}>
            <div className="flex gap-x-4 justify-end items-center">
              <GiSettingsKnobs onClick={() => handleFilter(true)}
                className="text-slate-600 w-8 h-8 cursor-pointer hover:text-slate-300"
              />
              {expensesSelected.length > 0 && (
                <TbPaywall onClick={() => handlePaidExpenses(true)}
                  className="text-slate-600 w-8 h-8 cursor-pointer hover:text-slate-300"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <TableHistoryCosts token={token} handleExpensesSelected={handleExpensesSelected}
        expenses={costsProvider} isFilter={filter} setIsFilter={handleFilter}
        user={user} isViewReports={false} data={dataTable} idProv={provider._id}
        filterData={filterData} maxAmount={maxAmount} minAmount={minAmount}
      />
      {paidExpenses && (
        <PaidHistoryExpenses dataTable={expensesSelected} token={token} condition={condition}
            showForm={handlePaidExpenses} provider={provider} user={user} updateTable={updateTable}
            optTypes={optTypes} />
      )}
    </div>
  )
}
