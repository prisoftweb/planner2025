import Navigation from "@/components/navigation/Navigation"
import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import DashBoardFinanceContainer from "@/components/projects/dashboard/DashboardFinanceContainer";
import { Options } from "@/interfaces/Common";
import { getTotalAccountReceivablesByProject, getTotalAccountReceivablesByClient } from "@/app/api/routeInvoices";
import { ITotalInvoicesByProject, ITotalInvoiceByClient } from "@/interfaces/Invoices";
import DashboardCollectionsContainer from "@/components/collections/dashboard/DashboardCollectionsContainer";

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  let totalProjects: ITotalInvoicesByProject[] =  await getTotalAccountReceivablesByProject(token);
  let totalClients: ITotalInvoiceByClient[] = await getTotalAccountReceivablesByClient(token);
    
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

  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <DashboardCollectionsContainer 
          token={token} 
          user={user._id} 
          totalProjects={totalProjects} 
          totalClients={totalClients} />
      </div>      
    </>
  )
}
