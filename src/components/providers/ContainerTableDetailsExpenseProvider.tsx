'use client'

import { ExpensesTableProvider } from "@/interfaces/Providers"
import { Expense, ExpensesTable } from "@/interfaces/Expenses"
//import TableCostsProvider from "./TableCostsProvider"
//import Selectize from "../Selectize"
import ArrowReturn from "../ArrowReturn"
import IconText from "./IconText"
import { Provider } from "@/interfaces/Providers"
import SearchInTable from "../SearchInTable"
import { GiSettingsKnobs } from "react-icons/gi"
import { useState } from "react"
import TableCostsDetailProvider from "./TableCostsDetailProvider"
import { DetailExpensesTableProvider } from "@/interfaces/Providers"

export default function ContainerTableDetailsExpenseProvider({data, token, expenses, user, 
    provider}:
  {data:DetailExpensesTableProvider[], token:string, expenses:Expense[], 
    user: string, provider: Provider}) {

  const [filter, setFilter] = useState<boolean>(false);
  // const [expensesSelected, setExpensesSelected] = useState<ExpensesTableProvider[]>([]);
  //const [paidExpenses, setPaidExpenses] = useState<boolean>(false);

  const handleFilter = (value: boolean) => {
    setFilter(value);
  }

  // const handlePaidExpenses = (value: boolean) => {
  //   setPaidExpenses(value);
  // }

  // const handleExpensesSelected = (value: ExpensesTableProvider[]) => {
  //   setExpensesSelected(value);
  // }
  
  return (
    <div>
      <div className="flex justify-between items-center flex-wrap gap-y-3">
        <div className="flex items-center my-2">
          <ArrowReturn link={`/providers/${provider._id}/payments/details`} />
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
            </div>
          </div>
        </div>
      </div>
      <TableCostsDetailProvider token={token} expenses={expenses} isFilter={filter} setIsFilter={handleFilter}
        user={user} data={data} />
    </div>
  )
}
