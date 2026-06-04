import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import { GetReport, GetReportsLV, GetAllCostByReportWithDateMINAndMAX } from "@/app/api/routeReports";
import ReportHistoryClient from "@/components/reports/ReportHistoryClient";
import ComponentError from "@/components/ComponentError";

export default async function Page({ params }: { params: { id: string }}){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const [report, dateReport, optReports]=await Promise.all([
    GetReport(token, params.id),
    GetAllCostByReportWithDateMINAndMAX(token, params.id),
    GetReportsLV(token)
  ]);
  
  if(typeof(report)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <h1 className="text-center text-lg text-red-500">{report}</h1> */}
        <ComponentError page={`/reports/history/${params.id}`} message={report} />
      </>
    )
  }

  if(typeof(dateReport)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <h1 className="text-center text-lg text-red-500">{dateReport}</h1> */}
        <ComponentError page={`/reports/history/${params.id}`} message={dateReport} />
      </>
    )
  }
  
  if(typeof(optReports)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <h1 className="text-lg text-center text-red-500">{optReports}</h1> */}
        <ComponentError page={`/reports/history/${params.id}`} message={optReports} />
      </>
    )
  }

  return(
    <>
      <Navigation user={user} token={token} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <ReportHistoryClient report={report} id={params.id} token={token} 
          user={user} dates={dateReport} optReports={optReports} />
      </div>
    </>
  )
}