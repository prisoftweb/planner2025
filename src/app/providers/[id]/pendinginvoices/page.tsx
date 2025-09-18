import NavTab from "@/components/providers/NavTab";
import Navigation from "@/components/navigation/Navigation";
import { cookies } from "next/headers";
import { getProvider, getProviders, GetCostsProviderMINWithoutPay } from "@/app/api/routeProviders";
import { UsrBack } from "@/interfaces/User";
import { HistoryExpensesTable } from "@/interfaces/Providers";
import { Options } from "@/interfaces/Common";
import { ExpenseDataToTableHistoryProviderData } from "@/app/functions/providersFunctions";
import { getCatalogsByNameAndType } from "@/app/api/routeCatalogs";
import ContainerTablePendinginvoices from "@/components/providers/ContainerTablePendingInvoices";

export default async function Page({ params }: { params: { id: string }}){
  
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  // let provider: any;
  // let providers: Provider[];
  // let costs: Expense[];
  // let optTypes: Options[] = [];
  
  // provider = await getProvider(params.id, token);
  // providers = await getProviders(token);
  // costs = await GetCostsProviderMINWithoutPay(token, params.id);
  // optTypes = await getCatalogsByNameAndType(token, 'payments');

  const [provider, providers, costs, optTypes] = await Promise.all([
    getProvider(params.id, token),
    getProviders(token),
    GetCostsProviderMINWithoutPay(token, params.id),
    getCatalogsByNameAndType(token, 'payments')
  ]);
  
  if(typeof(provider) === "string"){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">{provider}</h1>
      </>
    )
  }

  if(typeof(providers) === "string"){
    return(
      <>
        <h1 className="text-center text-red-500">{providers}</h1>
      </>
    )
  }

  if(typeof(costs) === "string"){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">{costs}</h1>
      </>
    )
  }

  if(typeof(optTypes)==='string'){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-red-500 text-center text-lg">{optTypes}</h1>
      </>
    )
  }

  let options: Options[] = [];

  if(providers.length <= 0){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">Error al obtener proveedores...</h1>
      </>
    )
  }

  providers.map((prov: any) => {
    options.push({
      value: prov._id,
      label: prov.name,
    })
  });

  const table: HistoryExpensesTable[] = ExpenseDataToTableHistoryProviderData(costs);
  const cond = "67318a51ceaf47ece0d3aa72";
  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <NavTab idProv={params.id} tab='2' />
        <ContainerTablePendinginvoices data={table} expenses={costs} token={token} 
          user={user._id} optTypes={optTypes} provider={provider} condition={cond} />
      </div>
    </>
  )
}