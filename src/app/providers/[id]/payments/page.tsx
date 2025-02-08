import NavTab from "@/components/providers/NavTab";
import Navigation from "@/components/navigation/Navigation";
import { cookies } from "next/headers";
import { getProvider, getProviders, GetCostsMIN } from "@/app/api/routeProviders";
import { UsrBack } from "@/interfaces/User";
import { ExpensesTableProvider, HistoryExpensesTable, Provider } from "@/interfaces/Providers";
import { Options } from "@/interfaces/Common";
import { ExpenseDataToTableHistoryProviderData, ExpenseDataToTablePaidExpensesProviderData } from "@/app/functions/providersFunctions";
import ContainerTableExpensesProvider from "@/components/providers/ContainerTableExpensesProvider";
import { Expense } from "@/interfaces/Expenses";
import { Payment, PaymentProvider } from "@/interfaces/Payments";
import { getPaymentsProvider, getPayments } from "@/app/api/routePayments";

export default async function Page({ params }: { params: { id: string }}){
  
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let provider: any;
  try {
    provider = await getProvider(params.id, token);
    if(typeof(provider) === "string")
      return <h1 className="text-center text-red-500">{provider} provedor</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos del proveedor!!</h1>  
  }

  let providers: Provider[];
  try {
    providers = await getProviders(token);
    if(typeof(providers) === "string")
      return <h1 className="text-center text-red-500">{providers} provedores</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos de los proveedores!!</h1>  
  }

  let costs: PaymentProvider[];
  try {
    costs = await getPaymentsProvider(token, params.id);
    if(typeof(costs) === "string")
      return <h1 className="text-center text-red-500">{costs} cp</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener costos del proveedor!!</h1>  
  }

  if(providers.length <= 0){
    return <h1 className="text-center text-red-500">Error al obtener proveedores...</h1>
  }
console.log('costs payment => ', costs);
  const table: ExpensesTableProvider[] = ExpenseDataToTablePaidExpensesProviderData(costs);
  
  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <NavTab idProv={params.id} tab='4' />
        <ContainerTableExpensesProvider data={table} expenses={costs} token={token} 
          user={user._id} provider={provider} />
      </div>
    </>
  )
}