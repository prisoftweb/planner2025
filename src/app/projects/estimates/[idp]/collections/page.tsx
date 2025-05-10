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

export default async function Page({ params, searchParams }: 
  { params: { idp: string }, searchParams: { page: string }}){

  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let project: OneProjectMin;
  try {
    project = await GetProjectMin(token, params.idp);
    if(typeof(project) === "string")
      return(
        <>
          <Navigation user={user} />
          <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
            <h1 className="text-center text-red-500">project min{project}</h1>
          </div>
        </>
      )
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <h1 className="text-center text-red-500">Ocurrio un error al obtener datos del proyecto!!</h1>
        </div>
      </>
    )
  }

  let collections: ICollectionMin[]=[];
  try {
    collections = await getCollectionsByProjectMin(token, project._id);
    if(typeof(collections) === "string")
      return(
        <>
          <Navigation user={user} />
          <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
            <h1 className="text-center text-red-500">collections{collections}</h1>
          </div>
        </>
      )
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <h1 className="text-center text-red-500">Ocurrio un error al obtener los cobros del proyecto!!</h1>
        </div>
      </>
    ) 
  }

  let totalInvoicesProject: ITotalInvoicesByProject[];
  try {
    totalInvoicesProject = await getTotalInvoicesByProject(token, params.idp);
    if(typeof(totalInvoicesProject) === "string")
      return(
        <>
          <Navigation user={user} />
          <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
            <h1 className="text-center text-red-500">total invoice{totalInvoicesProject}</h1>
          </div>
        </>
      )
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <h1 className="text-center text-red-500">Ocurrio un error al obtener el total de las facturas del proyecto!!</h1>
        </div>
      </>
    )
  }

  let totalPaymentsResumen: ITotalResumentPayment;
  try {
    totalPaymentsResumen = await getAllTotalPaymentsResumeByProjectMin(token, params.idp);
    if(typeof(totalPaymentsResumen) === "string")
      return(
        <>
          <Navigation user={user} />
          <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
            <h1 className="text-center text-red-500">total payments resumen{totalPaymentsResumen}</h1>
          </div>
        </>
      )
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <h1 className="text-center text-red-500">Ocurrio un error al obtener el resumen del proyecto!!</h1>
        </div>
      </>
    )
  }

  let projects: Options[];
  try {
    projects = await getProjectsLVNoCompleted(token);
    if(typeof(projects) === "string")
      return(
        <>
          <Navigation user={user} />
          <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
            <h1 className="text-center text-red-500">opt pro{projects}</h1>
          </div>
        </>
      )
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <h1 className="text-center text-red-500">Ocurrio un error al consultar proyectos!!</h1>
        </div>
      </>
    )
  }

  let catalogs: GlossaryCatalog[];
  try {
    catalogs = await getCatalogsByName(token, 'projects');
    if(typeof(catalogs)==='string') 
      return(
        <>
          <Navigation user={user} />
          <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
            <h1 className="text-red-500 text-center text-lg">catalogs{catalogs}</h1>
          </div>
        </>
      )
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <h1>Error al consultar catalogos!!</h1>
        </div>
      </>
    )
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
          totalInvoiceProject={totalInvoicesProject} resumenPayment={totalPaymentsResumen} pageQuery={searchParams.page} />
      </div>
    </>
  )
}