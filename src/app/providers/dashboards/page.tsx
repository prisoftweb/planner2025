import Navigation from "@/components/navigation/Navigation";
import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import DashboardContainer from "@/components/providers/dashboard/DashboardContainer";
import { getAllCostsGroupByPROVIDERWithoutTRADELINE, getTotalPayments, getTotalPendingPaymentsProvider, 
  getTotalCostPendingPaymentByProviderEstatusMIN, getTotalCostPendingPaymentByProvidersMIN, 
  getTotalCostApplyPaymentByProvidersTradelineMIN } from "@/app/api/routeDashboardProviders";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL } from "@/app/api/routeRoles";

export default async function page() {

  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const [totalCost, providersTradeLine, costsProviderWithTradeLine, costsProvider, 
      totalPayments, penddingPayment, pendingPaymentProv, resresource] = await Promise.all([
    getTotalCostApplyPaymentByProvidersTradelineMIN(token, new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString()),
    getTotalCostPendingPaymentByProviderEstatusMIN(token, new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString()),
    getAllCostsGroupByPROVIDERWithoutTRADELINE(token, 'true', new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString()),
    getAllCostsGroupByPROVIDERWithoutTRADELINE(token, 'false', new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString()),
    getTotalPayments(token),
    getTotalPendingPaymentsProvider(token, new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString()),
    getTotalCostPendingPaymentByProvidersMIN(token, new Date(new Date().getFullYear(), 0, 1).toDateString(), new Date().toDateString()),
    getAllResourcesByROL(token, user.rol?._id?? ''),
  ]);

  if(typeof(resresource)==='string'){
    return (
      <>
        <ComponentError page="/" message={resresource} />
      </>
    )
  }

  if(typeof(totalCost)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-red-500 text-center text-lg">{totalCost}totalCost</h1> */}
        <ComponentError page="/providers/dashboard" message={totalCost} />
      </>
    )
  }

  if(typeof(providersTradeLine)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-red-500 text-center text-lg">{providersTradeLine} providersTradeLine</h1> */}
        <ComponentError page="/providers/dashboard" message={providersTradeLine} />
      </>
    )
  }

  if(typeof(costsProviderWithTradeLine)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-red-500 text-center text-lg">{costsProviderWithTradeLine}costsProviderWithTradeLine</h1> */}
        <ComponentError page="/providers/dashboard" message={costsProviderWithTradeLine} />
      </>
    )
  }

  if(typeof(costsProvider)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-red-500 text-center text-lg">{costsProvider}costsprovider</h1> */}
        <ComponentError page="/providers/dashboard" message={costsProvider} />
      </>
    )
  }

  if(typeof(totalPayments)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-red-500 text-center text-lg">{totalPayments}totalPayments</h1> */}
        <ComponentError page="/providers/dashboard" message={totalPayments} />
      </>
    )
  }

  if(typeof(penddingPayment)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-red-500 text-center text-lg">{penddingPayment}</h1> */}
        <ComponentError page="/providers/dashboard" message={penddingPayment} />
      </>
    )
  }

  if(typeof(pendingPaymentProv)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-red-500 text-center text-lg">{penddingPayment}</h1> */}
        <ComponentError page="/providers/dashboard" message={pendingPaymentProv} />
      </>
    )
  }

  return (
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <DashboardContainer costsProvider={costsProvider} totalCost={totalCost}
          costsProviderWithTradeLine={costsProviderWithTradeLine} 
          providersTradeLine={providersTradeLine} token={token}
          totalPayments={totalPayments[0]} pendingPay={penddingPayment}
          pendingPayProv={pendingPaymentProv} />
      </div>
    </>
  )
}
