import NavTab from "@/components/providers/NavTab";
import Navigation from "@/components/navigation/Navigation";
import { cookies } from "next/headers";
import { getProvider, getProviders } from "@/app/api/routeProviders";
import { UsrBack } from "@/interfaces/User";
import { ExpensesTableProvider, Provider } from "@/interfaces/Providers";
import { ExpenseDataToTablePaidExpensesProviderData } from "@/app/functions/providersFunctions";
import ContainerTableExpensesProvider from "@/components/providers/ContainerTableExpensesProvider";
import { getPaymentsProvider } from "@/app/api/routePayments";
import {getAllTotalAccumResumeProgramingByProviderMINWithoutPAY} from "@/app/api/routeCost"
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL, getAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/app/api/routeRoles";
import { IAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/interfaces/Roles";

export default async function Page({ params }: { params: { id: string }}){
  
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const perm=((user.rol?._id?? '') + ('/providers/id%2Fpayments'));
  
  console.log('per => ', perm);

  const [provider, providers, costs, pending, resresource, rescomponents] = await Promise.all([
    getProvider(params.id, token),
    getProviders(token),
    getPaymentsProvider(token, params.id),
    getAllTotalAccumResumeProgramingByProviderMINWithoutPAY(params.id, token),
    getAllResourcesByROL(token, user.rol?._id?? ''),
    getAllComponentsByROUTESAndRESOURCESAndROLFULL(token, perm),
  ]);

  if(typeof(resresource)==='string'){
      return (
        <>
          <ComponentError page="/" message={resresource} />
        </>
      )
    }

  if(typeof(rescomponents) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        <ComponentError page={`/projects/history/${params.id}`} message={rescomponents} />
      </>
    )
  }
  
  if(typeof(provider) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">{provider} provedor</h1> */}
        <ComponentError page={`/providers/${params.id}/payments`} message={provider} />
      </>
    )
  }

  if(typeof(providers) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">{providers} provedores</h1> */}
        <ComponentError page={`/providers/${params.id}/payments`} message={providers} />
      </>
    )
  } 

  if(typeof(costs) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">{costs} cp</h1> */}
        <ComponentError page={`/providers/${params.id}/payments`} message={costs} />
      </>
    )
  }

  if(providers.length <= 0){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">Error al obtener proveedores...</h1> */}
        <ComponentError page={`/providers/${params.id}/payments`} message="Error al obtener proveedores..." />
      </>
    )
  }

  if(typeof(pending) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">{pending}</h1> */}
        <ComponentError page={`/providers/${params.id}/payments`} message={pending} />
      </>
    )
  }

  const table: ExpensesTableProvider[] = ExpenseDataToTablePaidExpensesProviderData(costs);

  const result = {
    permission: rescomponents[0]?.permission ?? {},
    components: rescomponents.map((item: IAllComponentsByROUTESAndRESOURCESAndROLFULL) => item.component)
  };
  
  return(
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <NavTab idProv={params.id} tab='5' />
        <ContainerTableExpensesProvider data={table} expenses={costs} token={token} permissions={result}
          user={user._id} provider={provider} pending={pending.flat()} company={user.profile} />
      </div>
    </>
  )
}