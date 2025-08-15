import Navigation from "@/components/navigation/Navigation"
import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import { getTotalAccountReceivablesByProject, getTotalAccountReceivablesByClient, 
  getTotalAccountReceivablesPaymentByDateAndStatus, getTotalAccountReceivablesPendingByDateAndStatus, 
  getTotalAccountReceivablesByProjectResumen } from "@/app/api/routeInvoices";
import { ITotalInvoicesByProjectDashboardCollection, ITotalInvoiceByClient, 
  ITotalPaymentByDateAndStatus, ITotalPendingByDateAndStatus, ITotalAccountReceivablesByProjectResumen } from "@/interfaces/Invoices";
import DashboardCollectionsContainer from "@/components/collections/dashboard/DashboardCollectionsContainer";
import { getTotalGuaranteesByDateAndStatus } from "@/app/api/routeGuarantee";

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  let totalPrjs: ITotalInvoicesByProjectDashboardCollection[] =  await getTotalAccountReceivablesByProject(token, new Date(new Date().getFullYear(), 0, 1).toISOString(), new Date().toISOString());
  let totalClis: ITotalInvoiceByClient[] = await getTotalAccountReceivablesByClient(token, new Date(new Date().getFullYear(), 0, 1).toISOString(), new Date().toISOString());
  let totalPay: ITotalPaymentByDateAndStatus[] = await getTotalAccountReceivablesPaymentByDateAndStatus(token, new Date(new Date().getFullYear(), 0, 1).toISOString(), new Date().toISOString());
  let totalPen: ITotalPendingByDateAndStatus[] = await getTotalAccountReceivablesPendingByDateAndStatus(token, new Date(new Date().getFullYear(), 0, 1).toISOString(), new Date().toISOString());
  let resCob = await getTotalGuaranteesByDateAndStatus(token, new Date(new Date().getFullYear(), 0, 1).toISOString(), new Date().toISOString(), 'POR COBRAR');
  const resTotPrj: ITotalAccountReceivablesByProjectResumen[] = await getTotalAccountReceivablesByProjectResumen(token, new Date(new Date().getFullYear(), 0, 1).toISOString(), new Date().toISOString());

  const [totalProjects, totalClients, totalPaymentByDate, totalPending, resCobrar, totalPrjRes] = await Promise.all([
    totalPrjs, totalClis, totalPay, totalPen, resCob, resTotPrj
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

  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <DashboardCollectionsContainer 
          token={token} toalPrjRes={totalPrjRes}
          user={user._id} resC={resCobrar[0]} 
          totalProjects={totalProjects} totalPen={totalPending}
          totalClients={totalClients} totalPay={totalPaymentByDate} />
      </div>      
    </>
  )
}
