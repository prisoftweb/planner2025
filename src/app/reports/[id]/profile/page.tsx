import { Options } from "@/interfaces/Common";
import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import ReportClient from "@/components/reports/ReportClient";
import { GetReport, GetReportsLV, GetAllCostByReportWithDateMINAndMAX, 
  updateReport, insertMovementsInReport  } from "@/app/api/routeReports";
import { Report, DateReport  } from "@/interfaces/Reports";
import { getNodesByDepto } from "@/app/api/routeNodes";
import { Node } from "@/interfaces/Nodes";

export default async function Page({ params }: { params: { id: string }}){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  // let report: Report;
  // let dateReport: DateReport[];
  // let optReports:Options[] = [];
  // let nodes:(Node[] | null) = null;
  
  // report = await GetReport(token, params.id);
  // dateReport = await GetAllCostByReportWithDateMINAndMAX(token, params.id);
  // optReports = await GetReportsLV(token);
  // nodes = await getNodesByDepto(token, typeof(user.department)==='string'? user.department : user.department._id);

  const [report, dateReport, optReports, nodes]=await Promise.all([
    GetReport(token, params.id),
    GetAllCostByReportWithDateMINAndMAX(token, params.id),
    GetReportsLV(token),
    getNodesByDepto(token, typeof(user.department)==='string'? user.department : user.department._id)
  ]);
  
  if(typeof(report)==='string'){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-lg text-red-500">{report}</h1>
      </>
    )
  }

  if(typeof(dateReport)==='string'){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-lg text-red-500">{dateReport}</h1>
      </>
    )
  }
  
  if(typeof(optReports)==='string'){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-lg text-center text-red-500">{optReports}</h1>
      </>
    )
  }

  let node:(Node | null) = null;
  
  if(typeof(nodes)==='string'){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-lg text-red-500 text-center-500">{nodes}</h1>
      </>
    )
  }

  if(!nodes || nodes.length <= 0){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-lg text-red-500 text-center">Error al consultar posicion en el flujo de trabajo del informe!!!</h1>
      </>
    )
  }

  node = nodes[0];

  if(!report.wached && node != null){
    try {
      const data = {wached: true};
      const res = await updateReport(token, params.id, data);
      if(typeof(res)==='string'){
        return(
          <>
            <Navigation user={user} />
            <h1 className="text-center text-lg text-red-500">{res}</h1>
          </>
        )
      }
    } catch (error) {
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-center text-lg text-red-500">Ocurrio un problema al actualizar estatus del informe</h1>
        </>
      )
    }

    try {
      const data = {
        moves: [{
            condition: node.glossary._id,
            notes: 'El informe ha sido visto por el usuario ' + user.name,
            user: user._id,
            department: typeof(user.department)==='string'? user.department : user.department._id,
            date: new Date()
        }]
      };
      const res = await insertMovementsInReport(token, report._id, data);
      if(res !== 200){
        return(
          <>
            <Navigation user={user} />
            <h1 className="text-center text-lg text-red-500">{res}</h1>
          </>
        )
      }
    } catch (error) {
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-center text-lg text-red-500">Ocurrio un error al actualizar estatus del flujo informes </h1>
        </>
      )
    }
  }

  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        {/* <div className="flex justify-between items-center flex-wrap gap-y-3">
          <div className="flex items-center my-2">
            <ArrowReturn link="/reports" />
            <p className="text-xl ml-4 font-medium">{report.name}</p>
          </div>
          <Selectize options={optReports} routePage="reports" subpath="/profile" />
        </div> */}
        {/* <NavTab idRep={params.id} tab='1' /> */}
        <ReportClient report={report} token={token} id={params.id} 
          user={user} node={node} dates={dateReport} optReports={optReports}
        />
      </div>
    </>
  )
}