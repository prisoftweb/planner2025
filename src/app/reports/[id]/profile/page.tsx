import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import ReportClient from "@/components/reports/ReportClient";
import { GetReport, GetReportsLV, GetAllCostByReportWithDateMINAndMAX, 
  updateReport, insertConditionInReportViewer  } from "@/app/api/routeReports";
import { getNodesByDepto } from "@/app/api/routeNodes";
import { Node } from "@/interfaces/Nodes";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL } from "@/app/api/routeRoles";

export default async function Page({ params }: { params: { id: string }}){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const [report, dateReport, optReports, nodes, resresource]=await Promise.all([
    GetReport(token, params.id),
    GetAllCostByReportWithDateMINAndMAX(token, params.id),
    GetReportsLV(token),
    getNodesByDepto(token, typeof(user.department)==='string'? user.department : user.department._id),
    getAllResourcesByROL(token, user.rol?._id?? ''),
  ]);

  if(typeof(resresource)==='string'){
    return (
      <>
        <ComponentError page="/" message={resresource} />
      </>
    )
  }
  
  if(typeof(report)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-lg text-red-500">{report}</h1> */}
        <ComponentError page={`/reports/${params.id}/profile`} message={report} />
      </>
    )
  }

  if(typeof(dateReport)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-lg text-red-500">{dateReport}</h1> */}
        <ComponentError page={`/reports/${params.id}/profile`} message={dateReport} />
      </>
    )
  }
  
  if(typeof(optReports)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-lg text-center text-red-500">{optReports}</h1> */}
        <ComponentError page={`/reports/${params.id}/profile`} message={optReports} />
      </>
    )
  }

  let node:(Node | null) = null;
  
  if(typeof(nodes)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-lg text-red-500 text-center-500">{nodes}</h1> */}
        <ComponentError page={`/reports/${params.id}/profile`} message={nodes} />
      </>
    )
  }

  if(!nodes || nodes.length <= 0){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-lg text-red-500 text-center">Error al consultar posicion en el flujo de trabajo del informe!!!</h1> */}
        <ComponentError page={`/reports/${params.id}/profile`} message="Error al consultar posicion en el flujo de trabajo del informe!!!" />
      </>
    )
  }

  node = nodes[0];

  const watched=(typeof(user.department)!=='string'? report.department.id===user.department.id : report.department.id===user.department);

  if(!report.wached && node != null && watched){
    try {
      const data = {wached: true};
      const res = await updateReport(token, params.id, data);
      if(typeof(res)==='string'){
        return(
          <>
            <Navigation user={user} token={token} resources={resresource} />
            {/* <h1 className="text-center text-lg text-red-500">{res}</h1> */}
            <ComponentError page={`/reports/${params.id}/profile`} message={res} />
          </>
        )
      }
    } catch (error) {
      return(
        <>
          <Navigation user={user} token={token} resources={resresource} />
          {/* <h1 className="text-center text-lg text-red-500">Ocurrio un problema al actualizar estatus del informe</h1> */}
          <ComponentError page={`/reports/${params.id}/profile`} message="Ocurrio un problema al actualizar estatus del informe" />
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

      const res = await insertConditionInReportViewer(token, report._id, data);
      if(res !== 200){
        return(
          <>
            <Navigation user={user} token={token} resources={resresource} />
            {/* <h1 className="text-center text-lg text-red-500">{res}</h1> */}
            <ComponentError page={`/reports/${params.id}/profile`} message={`Ocurrio un problema al actualizar el flujo del informe: ${res}`} />
          </>
        )
      }
    } catch (error) {
      return(
        <>
          <Navigation user={user} token={token} resources={resresource} />
          {/* <h1 className="text-center text-lg text-red-500">Ocurrio un error al actualizar estatus del flujo informes </h1> */}
          <ComponentError page={`/reports/${params.id}/profile`} message="Ocurrio un error al actualizar estatus del flujo informes" />
        </>
      )
    }
  }

  return(
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <ReportClient report={report} token={token} id={params.id} 
          user={user} node={node} dates={dateReport} optReports={optReports}
        />
      </div>
    </>
  )
}