'use client'

import { ExpensesTableProvider } from "@/interfaces/Providers"
import { Provider } from "@/interfaces/Providers"
import SearchInTable from "@/components/SearchInTable"
import { useState } from "react"
import { IAdvanceProvider } from "@/interfaces/Providers"
import TableAdvancesProvider from "./TableAdvancesProvider"
import WithOut from "@/components/WithOut"
import { IPermissionsAndComponents } from "@/interfaces/Roles"

type Props = {
  data:ExpensesTableProvider[], 
  token:string, 
  expenses:IAdvanceProvider[], 
  user: string, 
  provider: Provider,
  permissions:IPermissionsAndComponents
}

export default function ContainerAdvances({data, token, expenses, user, provider, permissions}: Props) {

  // const [filter, setFilter] = useState<boolean>(false);
  const [stateExpenses, setStateExpenses] = useState<IAdvanceProvider[]>(expenses);

  // const handleFilter = (value: boolean) => {
  //   setFilter(value);
  // }

  // const updateStateExpenses = async () => {
  //   try {
  //     const res = await getPaymentsProvider(token, provider._id);
  //     if(typeof(res) === 'string'){
  //       showToastMessageError('Error al actulizar tabla!!!');
  //     }else{
  //       setStateExpenses(res);
  //     }
  //   } catch (error) {
  //     showToastMessageError('Ocurrio un error al actualizar tabla!!!');
  //   }
  // }

  if(stateExpenses.length <= 0){
    return (
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        {/* <div className="flex items-center my-2">
          <ArrowReturn link="/providers" />
          <IconText text={provider?.tradename || ''} size="w-8 h-8" sizeText="" />
          <p className="text-slate-500 mx-3">{provider.name}</p>
        </div> */}
        <WithOut img="/img/payments/payments.svg" subtitle="Anticipos"
          text="Aqui puedes ver los anticipos que se han realizado del proveedor"
          title="Anticipos">
            <></>
        </WithOut>
      </div>
    )
  }

  console.log('permissions', permissions);
  
  return (
    <div>
      <div className="flex justify-end items-center flex-wrap gap-y-3">
        {/* <div className="flex items-center my-2">
          <ArrowReturn link="/providers" />
          <IconText text={provider?.tradename || ''} size="w-8 h-8" sizeText="" />
          <p className="text-slate-500 mx-3">{provider.name}</p>
        </div> */}
        <div className="flex gap-x-2 mt-2 w-full sm:max-w-md">
          {permissions.permission.searchfull && (
            <SearchInTable placeH={"Buscar anticipo.."} />
          )}
          {/* <div className={`w-24`}>
            <div className="flex gap-x-4 justify-end items-center">
              <TooltipFilterIcon handleFilter={handleFilter} />
            </div>
          </div> */}
        </div>
      </div>
      {/* <TableAdvancesProvider data={expenses} expenses={expenses} idProv={provider._id} token={token} /> */}
        {permissions.permission.readfull && (
          <TableAdvancesProvider data={expenses} expenses={expenses} idProv={provider._id} token={token} />
        )}
    </div>
  )
}
