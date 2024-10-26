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

export default function ContainerTableHistoryCosts({data, token, expenses, user, 
    provider, options}:
  {data:HistoryExpensesTable[], token:string, expenses:Expense[], 
    user: string, provider: Provider, options: Options[]}) {

  const [filter, setFilter] = useState<boolean>(false);
  const [expensesSelected, setExpensesSelected] = useState<HistoryExpensesTable[]>([]);
  const [paidExpenses, setPaidExpenses] = useState<boolean>(false);

  const handleFilter = (value: boolean) => {
    setFilter(value);
  }

  const handlePaidExpenses = (value: boolean) => {
    setPaidExpenses(value);
  }

  const handleExpensesSelected = (value: HistoryExpensesTable[]) => {
    setExpensesSelected(value);
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
                <GiSettingsKnobs onClick={() => handlePaidExpenses(true)}
                  className="text-red-600 w-8 h-8 cursor-pointer hover:text-slate-300"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <TableHistoryCosts token={token} handleExpensesSelected={handleExpensesSelected}
        expenses={expenses} isFilter={filter} setIsFilter={handleFilter}
        user={user} isViewReports={false} data={data}
      />
      {paidExpenses && (
        <PaidHistoryExpenses dataTable={expensesSelected} token={token}
            showForm={handlePaidExpenses} provider={provider} />
      )}
    </div>
  )
}
