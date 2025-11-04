import NavTab from "@/components/providers/NavTab";
import Navigation from "@/components/navigation/Navigation";
import { cookies } from "next/headers";
import { getProvider, getProviders } from "@/app/api/routeProviders";
import { UsrBack } from "@/interfaces/User";
import { ExpensesTableProvider, Provider } from "@/interfaces/Providers";
import { ExpenseDataToTablePaidExpensesProviderData } from "@/app/functions/providersFunctions";
import ContainerTableExpensesProvider from "@/components/providers/ContainerTableExpensesProvider";
import { PaymentProvider } from "@/interfaces/Payments";
import { getPaymentsProvider } from "@/app/api/routePayments";

export default async function Page({ params }: { params: { id: string }}){
  
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  // let provider: any;
  // let providers: Provider[];
  // let costs: PaymentProvider[];
  
  // provider = await getProvider(params.id, token);
  // providers = await getProviders(token);
  // costs = await getPaymentsProvider(token, params.id);

  const [provider, providers, costs] = await Promise.all([
    getProvider(params.id, token),
    getProviders(token),
    getPaymentsProvider(token, params.id)
  ]);
  
  if(typeof(provider) === "string"){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">{provider} provedor</h1>
      </>
    )
  }

  if(typeof(providers) === "string"){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">{providers} provedores</h1>
      </>
    )
  } 

  if(typeof(costs) === "string"){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">{costs} cp</h1>
      </>
    )
  }

  if(providers.length <= 0){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">Error al obtener proveedores...</h1>
      </>
    )
  }

  const table: ExpensesTableProvider[] = ExpenseDataToTablePaidExpensesProviderData(costs);
  
  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <NavTab idProv={params.id} tab='5' />
        <ContainerTableExpensesProvider data={table} expenses={costs} token={token} 
          user={user._id} provider={provider} />
      </div>
    </>
  )
}