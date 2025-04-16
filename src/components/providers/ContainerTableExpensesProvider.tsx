'use client'

import { ExpensesTableProvider } from "@/interfaces/Providers"
import TableCostsProvider from "./TableCostsProvider"
import ArrowReturn from "../ArrowReturn"
import IconText from "./IconText"
import { Provider } from "@/interfaces/Providers"
import SearchInTable from "../SearchInTable"
import { GiSettingsKnobs } from "react-icons/gi"
import { useState } from "react"
import { PaymentProvider } from "@/interfaces/Payments"
import WithOut from "../WithOut"
import { showToastMessageError } from "../Alert"
import { getPaymentsProvider } from "@/app/api/routePayments"

type Props = {
  data:ExpensesTableProvider[], 
  token:string, 
  expenses:PaymentProvider[], 
  user: string, 
  provider: Provider
}

export default function ContainerTableExpensesProvider({data, token, expenses, user, 
  provider}: Props) {

  const [filter, setFilter] = useState<boolean>(false);
  const [stateExpenses, setStateExpenses] = useState<PaymentProvider[]>(expenses);

  const handleFilter = (value: boolean) => {
    setFilter(value);
  }

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
           <WithOut img="/img/payments/payments.svg" subtitle="Pagos"
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
        <TableCostsProvider token={token} expenses={expenses} isFilter={filter}
          setIsFilter={handleFilter} user={user} data={data} idProv={provider._id} 
          udpateTable={updateStateExpenses} />
    </div>
  )
}
