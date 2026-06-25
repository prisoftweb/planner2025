import Navigation from "@/components/navigation/Navigation";
import { cookies } from "next/headers";
import { getProviderMin, getProviders } from "@/app/api/routeProviders";
import { UsrBack } from "@/interfaces/User";
import { DetailExpensesTableProvider, IProviderMin } from "@/interfaces/Providers";
import { ExpenseDataToTableDetailExpensesProviderData } from "@/app/functions/providersFunctions";
import ContainerTableDetailsExpenseProvider from "@/components/providers/ContainerTableDetailsExpenseProvider";
import { getCostsPayment, getPayment } from "@/app/api/routePayments";
import {getAllTotalAccumResumeProgramingByProviderMINWithoutPAY} from "@/app/api/routeCost"
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL } from "@/app/api/routeRoles";

export default async function Page({ params }: { params: { id: string, idP: string }}){
  
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let provider: IProviderMin;

  const [arrProvider, providers, costs, payment, pending, resresource] = await Promise.all([
    getProviderMin(params.id, token),
    getProviders(token),
    getCostsPayment(token, params.idP),
    getPayment(token, params.idP),
    getAllTotalAccumResumeProgramingByProviderMINWithoutPAY(params.id, token),
    getAllResourcesByROL(token, user.rol?._id?? ''),
  ]);

  if(typeof(resresource)==='string'){
    return (
      <>
        <ComponentError page="/" message={resresource} />
      </>
    )
  }
  
  if(typeof(arrProvider) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">{arrProvider}provedor</h1> */}
        <ComponentError page={`/providers/${params.id}/payments/${params.idP}/details`} message={arrProvider} />
      </>
    )
  }
  else{
    provider = arrProvider[0];
  }

  if(typeof(providers) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">{providers} provedores</h1> */}
        <ComponentError page={`/providers/${params.id}/payments/${params.idP}/details`} message={providers} />
      </>
    )
  }

  if(typeof(costs) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">{costs} costos</h1> */}
        <ComponentError page={`/providers/${params.id}/payments/${params.idP}/details`} message={costs} />
      </>
    )
  }

  if(typeof(payment) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">{payment} one payment</h1> */}
        <ComponentError page={`/providers/${params.id}/payments/${params.idP}/details`} message={payment} />
      </>
    )
  }

  if(typeof(pending) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">{pending}</h1> */}
        <ComponentError page={`/providers/${params.id}/payments/${params.idP}/details`} message={pending} />
      </>
    )
  }

  if(providers.length <= 0){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">Error al obtener proveedores...</h1> */}
        <ComponentError page={`/providers/${params.id}/payments/${params.idP}/details`} message="Error al obtener proveedores..." />
      </>
    )
  }

  const table: DetailExpensesTableProvider[] = ExpenseDataToTableDetailExpensesProviderData(costs);
  
  return(
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <ContainerTableDetailsExpenseProvider data={table} expenses={costs} token={token}
          user={user} provider={provider} payment={payment} pending={pending.flat()} />
      </div>
    </>
  )
}