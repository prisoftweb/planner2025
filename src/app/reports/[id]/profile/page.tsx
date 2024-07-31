import { Options } from "@/interfaces/Common";
//import { Company } from "@/interfaces/Companies";
import { getCompaniesLV } from "@/app/api/routeCompany";
//import { Department } from "@/interfaces/Departments";
import { getDepartmentsLV } from "@/app/api/routeDepartments";
//import { Project } from "@/interfaces/Projects";
import { getProjectsLV } from "@/app/api/routeProjects";
import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import ArrowReturn from "@/components/ArrowReturn";
import Selectize from "@/components/Selectize";
import NavTab from "@/components/reports/NavTab";
import ReportClient from "@/components/reports/ReportClient";
import { GetReport, GetReportsLV, updateReport, 
    insertMovementsInReport, getCostByReportMin } from "@/app/api/routeReports";
import { Report, CostReport  } from "@/interfaces/Reports";
//import { Expense } from "@/interfaces/Expenses";
import { getNodesByDepto } from "@/app/api/routeNodes";
import { Node } from "@/interfaces/Nodes";

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
  
  let optReports:Options[] = [];
  try {
    optReports = await GetReportsLV(token);
    if(typeof(optReports)==='string'){
      return <h1 className="text-lg text-center text-red-500">{optReports}</h1>
    }
  } catch (error) {
    return <h1 className="text-lg text-center text-red-500">Ocurrio un error al consultar reportes!!</h1>
  }

  //let costs:CostReport[] = [];
  // try {
  //   costs = await getCostByReportMin(params.id, token);
  //   if(typeof(costs)==='string') 
  //     return <h1 className="text-center text-lg text-red-500">{costs}</h1>
  // } catch (error) {
  //   return <h1 className="text-center text-lg text-red-500">Error al consultar los costos del reporte!</h1>
  // }

  let node:(Node | null) = null;
  
  let nodes:(Node[] | null) = null;
  try {
    nodes = await getNodesByDepto(token, typeof(user.department)==='string'? user.department : user.department._id);
    if(typeof(nodes)==='string'){
      return <h1 className="text-lg text-red-500 text-center-500">{nodes}</h1>
    }
  } catch (error) {
    //console.log('error ', error);
    return <h1 className="text-lg text-red-500 text-center-500">Error al consultar posicion en el flujo de trabajo del informe!!!</h1>
  }

  if(!nodes || nodes.length <= 0){
    return <h1 className="text-lg text-red-500 text-center">Error al consultar posicion en el flujo de trabajo del informe!!!</h1>
  }

  node = nodes[0];

  if(!report.wached){
    console.log('reporte no visto!!');
    try {
      const data = {wached: true};
      const res = await updateReport(token, params.id, data);
      if(typeof(res)==='string'){
        return <h1 className="text-center text-lg text-red-500">{res}</h1>
      }
    } catch (error) {
      return <h1 className="text-center text-lg text-red-500">Ocurrio un problema al actualizar estatus del informe</h1>
    }

    try {
      const data = {
        moves: [{
            condition: node.glossary._id,
            notes: 'El informe ha sido visto por el usuario ' + user.name,
            user: user._id,
            department: typeof(user.department)==='string'? user.department : user.department._id
        }]
      };
      const res = await insertMovementsInReport(token, report._id, data);
      if(res !== 200){
        return <h1 className="text-center text-lg text-red-500">{res}</h1>
      }
    } catch (error) {
      return <h1 className="text-center text-lg text-red-500">Ocurrio un error al actualizar estatus del flujo informes </h1>
    }
  }

  // if(!node){
  //   return <h1 className="text-lg text-red-500 text-center">Error al consultar posicion en el flujo de trabajo del informe!!!</h1>
  // }
  console.log('opt reps selectice => ', optReports);
  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <div className="flex justify-between items-center flex-wrap gap-y-3">
          <div className="flex items-center my-2">
            <ArrowReturn link="/reports" />
            <p className="text-xl ml-4 font-medium">{report.name}</p>
          </div>
          <Selectize options={optReports} routePage="reports" subpath="/profile" />
        </div>
        <NavTab idRep={params.id} tab='1' />
        <ReportClient report={report} token={token} id={params.id} 
          user={user} node={node}
        />
      </div>
    </>
  )
}