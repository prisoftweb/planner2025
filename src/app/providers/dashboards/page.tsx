import Navigation from "@/components/navigation/Navigation";
import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import DashboardContainer from "@/components/providers/dashboard/DashboardContainer";
import { getAllCostsGroupByPROVIDERWithoutTRADELINE, getAllCostsTOTALGroupByPROVIDERTRADELINE,
  getAllProvidersWithTradeLine, getTotalPayments, getTotalPendingPaymentsProvider } from "@/app/api/routeDashboardProviders";
import { CostsByProvider, ProviderWithTradeLine, TotalCostsByProvidersTradeLine } from "@/interfaces/DasboardProviders";
import { TotalPayments } from "@/interfaces/DasboardProviders";
import { ProvidersDataToTableData } from "@/app/functions/DashboardProviderFunctions";

export default async function page() {

  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  // let totalCost: TotalCostsByProvidersTradeLine[] = [];
  // let providersTradeLine: ProviderWithTradeLine[] = [];
  // let costsProviderWithTradeLine: CostsByProvider[] = [];
  // let costsProvider: CostsByProvider[] = [];
  // let totalPayments: TotalPayments[] = [];
  
  // totalCost = await getAllCostsTOTALGroupByPROVIDERTRADELINE(token);
  // providersTradeLine = await getAllProvidersWithTradeLine(token);
  // costsProviderWithTradeLine = await getAllCostsGroupByPROVIDERWithoutTRADELINE(token, 'true');
  // costsProvider = await getAllCostsGroupByPROVIDERWithoutTRADELINE(token, 'false');
  // totalPayments = await getTotalPayments(token);

  const [totalCost, providersTradeLine, costsProviderWithTradeLine, costsProvider, 
      totalPayments, penddingPayment] = await Promise.all([
    getAllCostsTOTALGroupByPROVIDERTRADELINE(token, new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString()),
    getAllProvidersWithTradeLine(token),
    getAllCostsGroupByPROVIDERWithoutTRADELINE(token, 'true', new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString()),
    getAllCostsGroupByPROVIDERWithoutTRADELINE(token, 'false', new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString()),
    getTotalPayments(token),
    getTotalPendingPaymentsProvider(token, new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString())
  ]);

  // let providers: ProviderWithTradeLine[] = [];
  
  if(typeof(totalCost)==='string'){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-red-500 text-center text-lg">{totalCost}totalCost</h1>
      </>
    )
  }

  if(typeof(providersTradeLine)==='string'){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-red-500 text-center text-lg">{providersTradeLine} providersTradeLine</h1>
      </>
    )
  }

  if(typeof(costsProviderWithTradeLine)==='string'){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-red-500 text-center text-lg">{costsProviderWithTradeLine}costsProviderWithTradeLine</h1>
      </>
    )
  }

  if(typeof(costsProvider)==='string'){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-red-500 text-center text-lg">{costsProvider}costsprovider</h1>
      </>
    )
  }

  if(typeof(totalPayments)==='string'){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-red-500 text-center text-lg">{totalPayments}totalPayments</h1>
      </>
    )
  }

  if(typeof(penddingPayment)==='string'){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-red-500 text-center text-lg">{penddingPayment}</h1>
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
          providersTradeLine={providersTradeLine} data={data} token={token}
          totalPayments={totalPayments[0]} pendingPay={penddingPayment} />
      </div>
    </>
  )
}
