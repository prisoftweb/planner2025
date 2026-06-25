import NavTab from "@/components/providers/NavTab";
import Navigation from "@/components/navigation/Navigation";
import { cookies } from "next/headers";
import { getProvider, getProviders, GetCostsMIN } from "@/app/api/routeProviders";
import { UsrBack } from "@/interfaces/User";
import { HistoryExpensesTable } from "@/interfaces/Providers";
import { Options } from "@/interfaces/Common";
import { ExpenseDataToTableHistoryProviderData } from "@/app/functions/providersFunctions";
import ContainerTableHistoryCosts from "@/components/providers/ContainerTableHistoryCosts";
import { getCatalogsByNameAndType } from "@/app/api/routeCatalogs";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL } from "@/app/api/routeRoles";

export default async function Page({ params }: { params: { id: string }}){
  
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const [provider, providers, costs, optTypes, resresource] = await Promise.all([
    getProvider(params.id, token),
    getProviders(token),
    GetCostsMIN(token, params.id),
    getCatalogsByNameAndType(token, 'payments'),
    getAllResourcesByROL(token, user.rol?._id?? ''),
  ]);

  if(typeof(resresource)==='string'){
    return (
      <>
        <ComponentError page="/" message={resresource} />
      </>
    )
  }
  
  if(typeof(provider) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">{provider}</h1> */}
        <ComponentError page={`/providers/${params.id}/invoiceHistory`} message={provider} />
      </>
    )
  }

  if(typeof(providers) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">{providers}</h1> */}
        <ComponentError page={`/providers/${params.id}/invoiceHistory`} message={providers} />
      </>
    )
  }

  if(typeof(costs) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">{costs}</h1> */}
        <ComponentError page={`/providers/${params.id}/invoiceHistory`} message={costs} />
      </>
    )
  }

  if(typeof(optTypes)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-red-500 text-center text-lg">{optTypes}</h1> */}
        <ComponentError page={`/providers/${params.id}/invoiceHistory`} message={optTypes} />
      </>
    )
  }

  let options: Options[] = [];

  if(providers.length <= 0){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">Error al obtener proveedores...</h1> */}
        <ComponentError page={`/providers/${params.id}/invoiceHistory`} message="Error al obtener proveedores..." />
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
      <Navigation user={user} token={token} resources={resresource} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <NavTab idProv={params.id} tab='3' />
        <ContainerTableHistoryCosts data={table} expenses={costs} token={token} 
          user={user._id} optTypes={optTypes} provider={provider} condition={cond} />
      </div>
    </>
  )
}