import NavTab from "@/components/providers/NavTab";
import Navigation from "@/components/navigation/Navigation";
import { cookies } from "next/headers";
import Selectize from "@/components/Selectize";
import IconText from "@/components/providers/IconText";
import { getProvider, getProviders, GetCostsMIN } from "@/app/api/routeProviders";
import { UsrBack } from "@/interfaces/User";
import { HistoryExpensesTable, Provider } from "@/interfaces/Providers";
import ArrowReturn from "@/components/ArrowReturn";
import { Options } from "@/interfaces/Common";
import { Expense } from "@/interfaces/Expenses";
import TableExpenses from "@/components/expenses/TableExpenses";
// import { ExpensesTable } from "@/interfaces/Expenses";
// import { ExpenseDataToTableData } from "@/app/functions/CostsFunctions";
import { ExpenseDataToTableHistoryProviderData } from "@/app/functions/providersFunctions";
import ContainerTableHistoryCosts from "@/components/providers/ContainerTableHistoryCosts";
import { getCatalogsByNameAndType } from "@/app/api/routeCatalogs";

export default async function Page({ params }: { params: { id: string }}){
  
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let provider: any;
  try {
    provider = await getProvider(params.id, token);
    if(typeof(provider) === "string")
      return <h1 className="text-center text-red-500">{provider}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos del proveedor!!</h1>  
  }

  let providers: Provider[];
  try {
    providers = await getProviders(token);
    if(typeof(providers) === "string")
      return <h1 className="text-center text-red-500">{providers}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos de los proveedores!!</h1>  
  }

  let costs: Expense[];
  try {
    costs = await GetCostsMIN(token, params.id);
    if(typeof(costs) === "string")
      return <h1 className="text-center text-red-500">{costs}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener costos del proveedor!!</h1>  
  }

  let optTypes: Options[] = [];
  try {
    optTypes = await getCatalogsByNameAndType(token, 'payments');
    if(typeof(optTypes)==='string') return <h1 className="text-red-500 text-center text-lg">{optTypes}</h1>
  } catch (error) {
    return <h1>Error al consultar catalogos de pagos!!</h1>
  }

  let options: Options[] = [];

  if(providers.length <= 0){
    return <h1 className="text-center text-red-500">Error al obtener proveedores...</h1>
  }

  providers.map((prov: any) => {
    options.push({
      value: prov._id,
      label: prov.name,
    })
  });

  const table: HistoryExpensesTable[] = ExpenseDataToTableHistoryProviderData(costs);
  
  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <NavTab idProv={params.id} tab='2' />
        <ContainerTableHistoryCosts data={table} expenses={costs} token={token} 
          user={user._id} optTypes={optTypes} provider={provider} condition="67318a51ceaf47ece0d3aa72" />
      </div>
    </>
  )
}