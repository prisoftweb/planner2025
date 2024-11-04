'use client'

import { ExpensesTableProvider } from "@/interfaces/Providers"
import { Expense, ExpensesTable } from "@/interfaces/Expenses"
import TableCostsProvider from "./TableCostsProvider"
//import Selectize from "../Selectize"
import ArrowReturn from "../ArrowReturn"
import IconText from "./IconText"
import { Provider } from "@/interfaces/Providers"
import SearchInTable from "../SearchInTable"
import { GiSettingsKnobs } from "react-icons/gi"
import { useState } from "react"
import { PaymentProvider } from "@/interfaces/Payments"
import { ExpenseDataToTablePaidExpensesProviderData } from "@/app/functions/providersFunctions"
import WithOut from "../WithOut"
import { showToastMessage, showToastMessageError } from "../Alert"
import { getPaymentsProvider } from "@/app/api/routePayments"

export default function ContainerTableExpensesProvider({data, token, expenses, user, 
    provider}:
  {data:ExpensesTableProvider[], token:string, expenses:PaymentProvider[], 
    user: string, provider: Provider}) {

  const [filter, setFilter] = useState<boolean>(false);
  // const [expensesSelected, setExpensesSelected] = useState<ExpensesTableProvider[]>([]);
  // const [paidExpenses, setPaidExpenses] = useState<boolean>(false);
  const [stateExpenses, setStateExpenses] = useState<PaymentProvider[]>(expenses);

  const handleFilter = (value: boolean) => {
    setFilter(value);
  }

  // const handlePaidExpenses = (value: boolean) => {
  //   setPaidExpenses(value);
  // }

  // const handleExpensesSelected = (value: ExpensesTableProvider[]) => {
  //   setExpensesSelected(value);
  // }

  const updateStateExpenses = async () => {
    try {
      const res = await getPaymentsProvider(token, provider._id);
      if(typeof(res) === 'string'){
        showToastMessageError('Error al actulizar tabla!!!');
      }else{
        setStateExpenses(res);
      }
    } catch (error) {
      showToastMessageError('Ocurrio un error al actualizar tabla!!!');
    }
  }

  if(stateExpenses.length <= 0){
    return (
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
           <WithOut img="/img/provider.svg" subtitle="Pagos"
            text="Aqui puedes ver los pagos que se han realizado del proveedor"
            title="Pagos">
              <></>
          </WithOut>
        </div>
    )
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
              {/* {expensesSelected.length > 0 && (
                <GiSettingsKnobs onClick={() => handlePaidExpenses(true)}
                  className="text-red-600 w-8 h-8 cursor-pointer hover:text-slate-300"
                />
              )} */}
            </div>
          </div>
        </div>
      </div>
      {/* <TableCostsProvider token={token} handleExpensesSelected={handleExpensesSelected}
        expenses={expenses} isFilter={filter} setIsFilter={handleFilter}
        user={user} data={data} idProv={provider._id} udpateTable={updateStateExpenses} /> */}
        <TableCostsProvider token={token} expenses={expenses} isFilter={filter}
          setIsFilter={handleFilter} user={user} data={data} idProv={provider._id} 
          udpateTable={updateStateExpenses} />
    </div>
  )
}
