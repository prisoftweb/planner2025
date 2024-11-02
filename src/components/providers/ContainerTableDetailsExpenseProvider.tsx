'use client'

import { ExpensesTableProvider } from "@/interfaces/Providers"
// import { Expense, ExpensesTable } from "@/interfaces/Expenses"
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
import { CostPayment } from "@/interfaces/Payments"
import { OnePayment } from "@/interfaces/Payments"
import { CurrencyFormatter } from "@/app/functions/Globals"
import Chip from "./Chip"
import { ProgressCircle } from "@tremor/react"

export default function ContainerTableDetailsExpenseProvider({data, token, expenses, user, 
    provider, payment}:
  {data:DetailExpensesTableProvider[], token:string, expenses:CostPayment[], 
    user: string, provider: Provider, payment: OnePayment}) {

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
      <div className=" grid grid-cols-6 gap-x-3">
        <div className="bg-white col-span-3">
          <div>
            <p>{provider.rfc}</p>
            <p>{provider.name}</p>
          </div>
          <div className="grid grid-cols-3 gap-x-2">
            <div>
              <p>Monto pagado</p>
              <p>{CurrencyFormatter({
                currency: 'MXN',
                value: payment.payout
              })}</p>
            </div>

            <div>
              <p>Pendiente por pagar</p>
              <p>{CurrencyFormatter({
                currency: 'MXN',
                value: payment.pending
              })}</p>
            </div>

            <div>
              <p>Total de facturas</p>
              <p>{payment.costs.length} documentos</p>
            </div>
          </div>
        </div>

        <div className="bg-white col-span-2">
        <div>
            <p>Fecha</p>
            <p>{payment.date.substring(0, 10)}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <div>
              <p>Rango</p>
              <p>{'agregar rango'}</p>
            </div>

            <div>
              <p>Comentarios</p>
              <p>{payment.notes}</p>
            </div>
          </div>
        </div>

        <div className="bg-white col-span-1">
          <Chip label="Pagado" color="#0f0" />
          <ProgressCircle value={82}>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-50">
              {82}%
            </span>
          </ProgressCircle>
        </div>

      </div>
      <TableCostsDetailProvider token={token} expenses={expenses} isFilter={filter} setIsFilter={handleFilter}
        user={user} data={data} />
    </div>
  )
}
