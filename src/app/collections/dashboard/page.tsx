import Navigation from "@/components/navigation/Navigation"
import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import { getTotalAccountReceivablesByProject, getTotalAccountReceivablesByClient, 
  getTotalAccountReceivablesPaymentByDateAndStatus, getTotalAccountReceivablesPendingByDateAndStatus, 
  getTotalAccountReceivablesByClientResumen, getTotalEstimatesPendingByClient, 
  getAllTOTALPENDINGPAYMENTSByProjectMINRESUME, 
  getAllsProjectsMINAndNEConditionANDNoExistsEstimateAndAccountReceivablesRESUMEN, 
  getAllTOTALPENDINGBillingANDPENDINGEstimatesByProjectACUMULATED } from "@/app/api/routeInvoices";
import DashboardCollectionsContainer from "@/components/collections/dashboard/DashboardCollectionsContainer";
import { getTotalGuaranteesByDateAndStatus } from "@/app/api/routeGuarantee";
import { getDate } from "@/libs/dates";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL, getAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/app/api/routeRoles";
import { IAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/interfaces/Roles";

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const perm=((user.rol?._id?? '') + ('/providers/id%2Fadvances'));
  
  console.log('per => ', perm);
  
  const [totalProjects, totalClients, totalPaymentByDate, totalPending, resCobrar, totalPrjRes, totalCliRes, 
    totalEstiatesPen, totalPendEstimatesCli, pendingBilling, resresource, rescomponents] = await Promise.all([
    getTotalAccountReceivablesByProject(token, getDate(new Date(new Date().getFullYear(), 0, 1)), getDate(new Date())), 
    getTotalAccountReceivablesByClient(token, getDate(new Date(new Date().getFullYear(), 0, 1)), getDate(new Date())), 
    getTotalAccountReceivablesPaymentByDateAndStatus(token, getDate(new Date(new Date().getFullYear(), 0, 1)), getDate(new Date())), 
    getTotalAccountReceivablesPendingByDateAndStatus(token, getDate(new Date(new Date().getFullYear(), 0, 1)), getDate(new Date())), 
    getTotalGuaranteesByDateAndStatus(token, getDate(new Date(new Date().getFullYear(), 0, 1)), getDate(new Date()), 'POR COBRAR'), 
    getAllTOTALPENDINGPAYMENTSByProjectMINRESUME(token, getDate(new Date(new Date().getFullYear(), 0, 1)), getDate(new Date())), 
    getTotalAccountReceivablesByClientResumen(token, getDate(new Date(new Date().getFullYear(), 0, 1)), getDate(new Date())), 
    getAllsProjectsMINAndNEConditionANDNoExistsEstimateAndAccountReceivablesRESUMEN(token, getDate(new Date(new Date().getFullYear(), 0, 1)), getDate(new Date())), 
    getTotalEstimatesPendingByClient(token, getDate(new Date(new Date().getFullYear(), 0, 1)), getDate(new Date())), 
    getAllTOTALPENDINGBillingANDPENDINGEstimatesByProjectACUMULATED(token, getDate(new Date(new Date().getFullYear(), 0, 1)), getDate(new Date())),
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
        <ComponentError page={`/catalogs`} message={rescomponents} />
      </>
    )
  }
    
  if(typeof(totalProjects)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{totalProjects} </h1>
        </div> */}
        <ComponentError page="/collections/dashboard" message={totalProjects} />
      </>
    )
  }

  if(typeof(totalClients)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{totalClients} </h1>
        </div> */}
        <ComponentError page="/collections/dashboard" message={totalClients} />
      </>
    )
  }

  if(typeof(totalPaymentByDate)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{totalPaymentByDate} </h1>
        </div> */}
        <ComponentError page="/collections/dashboard" message={totalPaymentByDate} />
      </>
    )
  }

  if(typeof(totalPending)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{totalPending} </h1>
        </div> */}
        <ComponentError page="/collections/dashboard" message={totalPending} />
      </>
    )
  }

  if(typeof(resCobrar)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{resCobrar} </h1>
        </div> */}
        <ComponentError page="/collections/dashboard" message={resCobrar} />
      </>
    )
  }

  if(typeof(totalPrjRes)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{totalPrjRes} </h1>
        </div> */}
        <ComponentError page="/collections/dashboard" message={totalPrjRes} />
      </>
    )
  }

  if(typeof(totalCliRes)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{totalCliRes} </h1>
        </div> */}
        <ComponentError page="/collections/dashboard" message={totalCliRes} />
      </>
    )
  }

  if(typeof(totalEstiatesPen)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{totalEstiatesPen} </h1>
        </div> */}
        <ComponentError page="/collections/dashboard" message={totalEstiatesPen} />
      </>
    )
  }

  if(typeof(totalPendEstimatesCli)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{totalPendEstimatesCli} </h1>
        </div> */}
        <ComponentError page="/collections/dashboard" message={totalPendEstimatesCli} />
      </>
    )
  }

  if(typeof(pendingBilling)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{pendingBilling} </h1>
        </div> */}
        <ComponentError page="/collections/dashboard" message={pendingBilling} />
      </>
    )
  }

  // const result = {
  //   permission: rescomponents[0]?.permission ?? {},
  //   components: rescomponents.map((item: IAllComponentsByROUTESAndRESOURCESAndROLFULL) => item.component)
  // };

  return (
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <DashboardCollectionsContainer 
          token={token} toalPrjRes={totalPrjRes} company={user.profile}
          user={user._id} resC={resCobrar[0]} totalEstimatesCli={totalPendEstimatesCli}
          totalProjects={totalProjects} totalPen={totalPending}
          totalClients={totalClients} totalPay={totalPaymentByDate}
          toalCliRes={totalCliRes} totalEstimatesPen={totalEstiatesPen} totalPendingBillingByPrj={pendingBilling} />
      </div>      
    </>
  )
}