import Navigation from "@/components/navigation/Navigation";
import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import DashboardContainer from "@/components/providers/dashboard/DashboardContainer";
import { getAllCostsGroupByPROVIDERWithoutTRADELINE, getAllCostsTOTALGroupByPROVIDERTRADELINE,
  getAllProvidersWithTradeLine, getTotalPayments } from "@/app/api/routeDashboardProviders";
import { CostsByProvider, ProviderWithTradeLine, TotalCostsByProvidersTradeLine } from "@/interfaces/DasboardProviders";
import { TotalPayments } from "@/interfaces/DasboardProviders";
import { ProvidersDataToTableData } from "@/app/functions/DashboardProviderFunctions";

export default async function page() {

  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let totalCost: TotalCostsByProvidersTradeLine[] = [];
  try {
    totalCost = await getAllCostsTOTALGroupByPROVIDERTRADELINE(token);
    if(typeof(totalCost)==='string'){
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-red-500 text-center text-lg">{totalCost}totalCost</h1>
        </>
      )
    }
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-red-500 text-center text-lg">Error al obtener total de los costos por proveedor!!</h1>
      </>
    )
  }

  let providersTradeLine: ProviderWithTradeLine[] = [];
  try {
    providersTradeLine = await getAllProvidersWithTradeLine(token);
    if(typeof(providersTradeLine)==='string'){
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-red-500 text-center text-lg">{providersTradeLine} providersTradeLine</h1>
        </>
      )
    }
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-red-500 text-center text-lg">Error al obtener proveedores con linea de credito!!</h1>
      </>
    )
  }

  let costsProviderWithTradeLine: CostsByProvider[] = [];
  try {
    costsProviderWithTradeLine = await getAllCostsGroupByPROVIDERWithoutTRADELINE(token, 'true');
    if(typeof(costsProviderWithTradeLine)==='string'){
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-red-500 text-center text-lg">{costsProviderWithTradeLine}costsProviderWithTradeLine</h1>
        </>
      )
    }
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-red-500 text-center text-lg">Error al obtener costos por proveedor con linea de credito!!</h1>
      </>
    )
  }

  let costsProvider: CostsByProvider[] = [];
  try {
    costsProvider = await getAllCostsGroupByPROVIDERWithoutTRADELINE(token, 'false');
    if(typeof(costsProvider)==='string'){
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-red-500 text-center text-lg">{costsProvider}costsprovider</h1>
        </>
      )
    }
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-red-500 text-center text-lg">Error al obtener costos por proveedor con linea de credito!!</h1>
      </>
    )
  }

  let totalPayments: TotalPayments[] = [];
  try {
    totalPayments = await getTotalPayments(token);
    if(typeof(totalPayments)==='string'){
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-red-500 text-center text-lg">{totalPayments}totalPayments</h1>
        </>
      )
    }
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-red-500 text-center text-lg">Error al obtener total de pagos de proveedores!!</h1>
      </>
    )
  }

  const data = ProvidersDataToTableData(providersTradeLine);

  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <DashboardContainer costsProvider={costsProvider} totalCost={totalCost}
          costsProviderWithTradeLine={costsProviderWithTradeLine} 
          providersTradeLine={providersTradeLine} data={data} totalPayments={totalPayments[0]} />
      </div>
    </>
  )
}
