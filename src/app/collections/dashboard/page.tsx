import Navigation from "@/components/navigation/Navigation"
import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import { getTotalAccountReceivablesByProject, getTotalAccountReceivablesByClient, 
  getTotalAccountReceivablesPaymentByDateAndStatus, getTotalAccountReceivablesPendingByDateAndStatus, 
  getTotalAccountReceivablesByProjectResumen, getTotalAccountReceivablesByClientResumen, 
  getTotalEstimatesPendingByProject, getTotalEstimatesPendingByClient, 
  getAllTOTALPENDINGPAYMENTSByProjectMINRESUME, 
  getAllsProjectsMINAndNEConditionANDNoExistsEstimateAndAccountReceivablesRESUMEN } from "@/app/api/routeInvoices";
import { ITotalInvoicesByProjectDashboardCollection, ITotalInvoiceByClient, 
  ITotalPaymentByDateAndStatus, ITotalPendingByDateAndStatus, ITotalAccountReceivablesByProjectResumen, 
  ITotalAccountReceivablesByClientResumen, ITotalEstimatesPendingByProject, ITotalEstimatesPendingByClient, 
  IAllTOTALPENDINGPAYMENTSByProject, IAllsProjectsMINAndNEConditionANDNoExistsEstimate  } from "@/interfaces/Invoices";
import DashboardCollectionsContainer from "@/components/collections/dashboard/DashboardCollectionsContainer";
import { getTotalGuaranteesByDateAndStatus } from "@/app/api/routeGuarantee";

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  let totalPrjs: ITotalInvoicesByProjectDashboardCollection[] =  await getTotalAccountReceivablesByProject(token, getDate(new Date(new Date().getFullYear(), 0, 1)), getDate(new Date()));
  let totalClis: ITotalInvoiceByClient[] = await getTotalAccountReceivablesByClient(token, getDate(new Date(new Date().getFullYear(), 0, 1)), getDate(new Date()));
  let totalPay: ITotalPaymentByDateAndStatus[] = await getTotalAccountReceivablesPaymentByDateAndStatus(token, getDate(new Date(new Date().getFullYear(), 0, 1)), getDate(new Date()));
  let totalPen: ITotalPendingByDateAndStatus[] = await getTotalAccountReceivablesPendingByDateAndStatus(token, getDate(new Date(new Date().getFullYear(), 0, 1)), getDate(new Date()));
  let resCob = await getTotalGuaranteesByDateAndStatus(token, getDate(new Date(new Date().getFullYear(), 0, 1)), getDate(new Date()), 'POR COBRAR');
  const resTotPrj: IAllTOTALPENDINGPAYMENTSByProject[] = await getAllTOTALPENDINGPAYMENTSByProjectMINRESUME(token, getDate(new Date(new Date().getFullYear(), 0, 1)), getDate(new Date()));
  const resTotCli: ITotalAccountReceivablesByClientResumen[] = await getTotalAccountReceivablesByClientResumen(token, getDate(new Date(new Date().getFullYear(), 0, 1)), getDate(new Date()));
  const resEstPen: IAllsProjectsMINAndNEConditionANDNoExistsEstimate[] = await getAllsProjectsMINAndNEConditionANDNoExistsEstimateAndAccountReceivablesRESUMEN(token, getDate(new Date(new Date().getFullYear(), 0, 1)), getDate(new Date()));
  const resEstPenCli: ITotalEstimatesPendingByClient[] = await getTotalEstimatesPendingByClient(token, getDate(new Date(new Date().getFullYear(), 0, 1)), getDate(new Date()));

  const [totalProjects, totalClients, totalPaymentByDate, totalPending, resCobrar, totalPrjRes, totalCliRes, totalEstiatesPen, totalPendEstimatesCli] = await Promise.all([
    totalPrjs, totalClis, totalPay, totalPen, resCob, resTotPrj, resTotCli, resEstPen, resEstPenCli
  ]);
    
  if(typeof(totalProjects)==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{totalProjects} </h1>
        </div>
      </>
    )
  }

  if(typeof(totalClients)==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{totalClients} </h1>
        </div>
      </>
    )
  }

  if(typeof(totalPaymentByDate)==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{totalPaymentByDate} </h1>
        </div>
      </>
    )
  }

  if(typeof(totalPending)==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{totalPending} </h1>
        </div>
      </>
    )
  }

  if(typeof(resCobrar)==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{resCobrar} </h1>
        </div>
      </>
    )
  }

  if(typeof(totalPrjRes)==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{totalPrjRes} </h1>
        </div>
      </>
    )
  }

  if(typeof(totalCliRes)==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{totalCliRes} </h1>
        </div>
      </>
    )
  }

  if(typeof(totalEstiatesPen)==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{totalEstiatesPen} </h1>
        </div>
      </>
    )
  }

  if(typeof(totalPendEstimatesCli)==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1>{totalPendEstimatesCli} </h1>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <DashboardCollectionsContainer 
          token={token} toalPrjRes={totalPrjRes}
          user={user._id} resC={resCobrar[0]} totalEstimatesCli={totalPendEstimatesCli}
          totalProjects={totalProjects} totalPen={totalPending}
          totalClients={totalClients} totalPay={totalPaymentByDate}
          toalCliRes={totalCliRes} totalEstimatesPen={totalEstiatesPen} />
      </div>      
    </>
  )
}

function getDate(date: Date){
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()

  if(month < 10){
    return `${year}-0${month}-${day}`;
  }else{
    return `${year}-${month}-${day}`;
  }
}