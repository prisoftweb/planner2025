import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { OneProjectMin } from "@/interfaces/Projects";
import { GetProjectMin, getProjectsLVNoCompleted } from "@/app/api/routeProjects";
import { GlossaryCatalog } from "@/interfaces/Glossary";
import { Options } from "@/interfaces/Common";
import { getCatalogsByName } from "@/app/api/routeCatalogs";
import { getTotalInvoicesByProject } from "@/app/api/routeInvoices";
import { ITotalInvoicesByProject } from "@/interfaces/Invoices";
import { getCollectionsByProjectMin } from "@/app/api/routeCollections";

import { getAllTotalPaymentsResumeByProjectMin } from "@/app/api/routeCollections";
import { ICollectionMin, ITotalResumentPayment } from "@/interfaces/Collections";
import ContainerCollectionsProject from "@/components/projects/estimates/collections/ContainerCollectionsProject";

export default async function Page({ params }: { params: { idp: string }}){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let project: OneProjectMin;
  try {
    project = await GetProjectMin(token, params.idp);
    // console.log('project min => ', project);
    if(typeof(project) === "string")
      return <h1 className="text-center text-red-500">{project}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos del proyecto!!</h1>  
  }

  let collections: ICollectionMin[]=[];
  try {
    collections = await getCollectionsByProjectMin(token, project._id);
    console.log('collections min => ', collections);
    if(typeof(collections) === "string")
      return <h1 className="text-center text-red-500">{collections}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener los cobros del proyecto!!</h1>  
  }

  let totalInvoicesProject: ITotalInvoicesByProject[];
  try {
    totalInvoicesProject = await getTotalInvoicesByProject(token, params.idp);
    if(typeof(totalInvoicesProject) === "string")
      return <h1 className="text-center text-red-500">{totalInvoicesProject}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener el total de las facturas del proyecto!!</h1>  
  }

  let totalPaymentsResumen: ITotalResumentPayment;
  try {
    totalPaymentsResumen = await getAllTotalPaymentsResumeByProjectMin(token, params.idp);
    if(typeof(totalPaymentsResumen) === "string")
      return <h1 className="text-center text-red-500">{totalPaymentsResumen}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener el resumen del proyecto!!</h1>  
  }

  let projects: Options[];
  try {
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
        <ContainerCollectionsProject project={project} collections={collections} token={token} user={user._id} 
          totalInvoiceProject={totalInvoicesProject} resumenPayment={totalPaymentsResumen} />
      </div>
    </>
  )
}