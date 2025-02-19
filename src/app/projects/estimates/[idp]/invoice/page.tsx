import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import ContainerStimationsProject from "@/components/projects/estimates/ContainerStimationsProject";
import { OneProjectMin } from "@/interfaces/Projects";
import { GetProjectMin, getProjectsLV, getProjectsLVNoCompleted } from "@/app/api/routeProjects";
import { GlossaryCatalog } from "@/interfaces/Glossary";
import { Options } from "@/interfaces/Common";
import { getCatalogsByName } from "@/app/api/routeCatalogs";
import { IEstimateProject, TotalEstimatedByProject, ResumenEstimateProject } from "@/interfaces/Estimate";
import { getEstimatesByProject, getTotalEstimatesByProjectMin, getResumenEstimateProject } from "@/app/api/routeEstimates";
import { getTotalInvoicesByProject, getInvoicesByProject, getTotalInvoiceResumenByProject } from "@/app/api/routeInvoices";
import { ITotalInvoicesByProject, IInvoiceByProject, ITotalInvoiceResumen } from "@/interfaces/Invoices";
import ContainerInvoicesProject from "@/components/projects/estimates/ContainerInvoicesProject";

export default async function Page({ params }: { params: { idp: string }}){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let project: OneProjectMin;
  try {
    project = await GetProjectMin(token, params.idp);
    console.log('project min => ', project);
    if(typeof(project) === "string")
      return <h1 className="text-center text-red-500">{project}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos del proyecto!!</h1>  
  }

  // let estimates: IEstimateProject[];
  // try {
  //   estimates = await getEstimatesByProject(token, params.idp);
  //   console.log('estimates min => ', estimates);
  //   if(typeof(estimates) === "string")
  //     return <h1 className="text-center text-red-500">{estimates}</h1>
  // } catch (error) {
  //   return <h1 className="text-center text-red-500">Ocurrio un error al obtener las estimaciones del proyecto!!</h1>  
  // }

  let invoices: IInvoiceByProject[];
  try {
    invoices = await getInvoicesByProject(token, params.idp);
    console.log('invoices min => ', invoices);
    if(typeof(invoices) === "string")
      return <h1 className="text-center text-red-500">{invoices}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener las estimaciones del proyecto!!</h1>  
  }

  let totalInvoicesProject: ITotalInvoicesByProject[];
  try {
    totalInvoicesProject = await getTotalInvoicesByProject(token, params.idp);
    // console.log('res total estimated => ', totalInvoicesProject);
    // console.log('estimates min => ', estimates);
    if(typeof(totalInvoicesProject) === "string")
      return <h1 className="text-center text-red-500">{totalInvoicesProject}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener el total de las facturas del proyecto!!</h1>  
  }

  let totalInvoicesResumen: ITotalInvoiceResumen;
  try {
    totalInvoicesResumen = await getTotalInvoiceResumenByProject(token, params.idp);
    // console.log('res total estimated => ', totalInvoicesResumen);
    // console.log('estimates min => ', estimates);
    if(typeof(totalInvoicesResumen) === "string")
      return <h1 className="text-center text-red-500">{totalInvoicesResumen}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener el resumen de las facturas del proyecto!!</h1>  
  }

  let projects: Options[];
  try {
    // projects = await getProjectsLV(token);
    projects = await getProjectsLVNoCompleted(token);
    if(typeof(projects) === "string")
      return <h1 className="text-center text-red-500">{projects}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al consultar proyectos!!</h1>  
  }

  let catalogs: GlossaryCatalog[];
  try {
    catalogs = await getCatalogsByName(token, 'projects');
    if(typeof(catalogs)==='string') return <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
  } catch (error) {
    return <h1>Error al consultar catalogos!!</h1>
  }

  const optConditions: Options[] = [{
    label: 'Todos',
    value: 'all'
  }];
  catalogs[0].condition.map((condition) => {
    optConditions.push({
      label: condition.glossary.name,
      value: condition.glossary._id
    })
  })

  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <ContainerInvoicesProject project={project} optConditions={optConditions} optProjects={[{
            label: 'Todos',
            value: 'all'
          }, ...projects]} invoices={invoices} token={token} user={user._id} 
          totalInvoiceProject={totalInvoicesProject} resumenInvoice={totalInvoicesResumen} />
      </div>
    </>
  )
}