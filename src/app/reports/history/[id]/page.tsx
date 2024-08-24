import { Options } from "@/interfaces/Common";
// import { getCompaniesLV } from "@/app/api/routeCompany";
// import { getDepartmentsLV } from "@/app/api/routeDepartments";
// import { getProjectsLV } from "@/app/api/routeProjects";
import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import ArrowReturn from "@/components/ArrowReturn";
import Selectize from "@/components/Selectize";
import NavTab from "@/components/reports/NavTab";
import { GetReport, GetReportsLV, GetAllCostByReportWithDateMINAndMAX } from "@/app/api/routeReports";
import { Report, DateReport } from "@/interfaces/Reports";
import ReportHistoryClient from "@/components/reports/ReportHistoryClient";

export default async function Page({ params }: { params: { id: string }}){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let report: Report;
  try {
    report = await GetReport(token, params.id);
    if(typeof(report)==='string'){
      return <h1 className="text-center text-lg text-red-500">{report}</h1>
    }
  } catch (error) {
    return <h1 className="text-center text-lg text-red-500">Error al consultar reporte!!</h1>
  }

  let dateReport: DateReport[];
  try {
    dateReport = await GetAllCostByReportWithDateMINAndMAX(token, params.id);
    if(typeof(dateReport)==='string'){
      return <h1 className="text-center text-lg text-red-500">{dateReport}</h1>
    }
  } catch (error) {
    return <h1 className="text-center text-lg text-red-500">Error al consultar fechas del reporte!!</h1>
  }
  
  let optReports:Options[] = [];
  try {
    optReports = await GetReportsLV(token);
    if(typeof(optReports)==='string'){
      return <h1 className="text-lg text-center text-red-500">{optReports}</h1>
    }
  } catch (error) {
    return <h1 className="text-lg text-center text-red-500">Ocurrio un error al consultar reportes!!</h1>
  }

  // let optCompanies: Options[] = [];
  // try {
  //   optCompanies = await getCompaniesLV(token);
  // } catch (error) {
  //   return <h1 className="text-center text-lg text-red">Error al consultar las compañias</h1>
  // }

  // let optDepartments: Options[] = [];
  // try {
  //   optDepartments = await getDepartmentsLV(token);
  // } catch (error) {
  //   return <h1 className="text-center text-lg text-red">Error al consultar los departamentos</h1>
  // }

  // let optProjects: Options[] = [];
  // try {
  //   optProjects = await getProjectsLV(token);
  // } catch (error) {
  //   return <h1 className="text-center text-lg text-red-500">Error al consultar los proyectos</h1>
  // }

  // let costs:CostReport[] = [];
  // try {
  //   costs = await getCostByReportMin(params.id, token);
  //   if(typeof(costs)==='string') 
  //     return <h1 className="text-center text-lg text-red-500">{costs}</h1>
  // } catch (error) {
  //   return <h1 className="text-center text-lg text-red-500">Error al consultar los costos del reporte!</h1>
  // }

  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <div className="flex justify-between items-center flex-wrap gap-y-3">
          <div className="flex items-center my-2">
            <ArrowReturn link="/reports/history" />
            <p className="text-xl ml-4 font-medium">{report.name}</p>
          </div>
          <Selectize options={optReports} routePage="reports/history" subpath="" />
        </div>
        <NavTab idRep={params.id} tab='1' />
        <ReportHistoryClient report={report} id={params.id} token={token} 
          user={user} dates={dateReport} />
      </div>
    </>
  )
}