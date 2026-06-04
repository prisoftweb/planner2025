import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { GetProjectMin, getProjectsLVNoCompleted } from "@/app/api/routeProjects";
import { Options } from "@/interfaces/Common";
import { getCatalogsByName } from "@/app/api/routeCatalogs";
import { getTotalInvoicesByProject } from "@/app/api/routeInvoices";
import { getCollectionsByProjectMin } from "@/app/api/routeCollections";
import ComponentError from "@/components/ComponentError";

import { getAllTotalPaymentsResumeByProjectMin } from "@/app/api/routeCollections";
import ContainerCollectionsProject from "@/components/projects/estimates/collections/ContainerCollectionsProject";

export default async function Page({ params, searchParams }: 
  { params: { idp: string }, searchParams: { page: string }}){

  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const [project, collections, totalInvoicesProject, totalPaymentsResumen, projects, catalogs] = await Promise.all([
    GetProjectMin(token, params.idp),
    getCollectionsByProjectMin(token, params.idp),
    getTotalInvoicesByProject(token, params.idp),
    getAllTotalPaymentsResumeByProjectMin(token, params.idp),
    getProjectsLVNoCompleted(token),
    getCatalogsByName(token, 'projects')
  ]);
  
  if(typeof(project) === "string"){
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <h1 className="text-center text-red-500">project min{project}</h1>
        </div> */}
        <ComponentError page={`/projects/estimates/${params.idp}/collections`} message={project} />
      </>
    )
  }
      
  if(typeof(collections) === "string"){
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <h1 className="text-center text-red-500">collections{collections}</h1>
        </div> */}
        <ComponentError page={`/projects/estimates/${params.idp}/collections`} message={collections} />
      </>
    )
  }  

  if(typeof(totalInvoicesProject) === "string"){
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <h1 className="text-center text-red-500">total invoice{totalInvoicesProject}</h1>
        </div> */}
        <ComponentError page={`/projects/estimates/${params.idp}/collections`} message={totalInvoicesProject} />
      </>
    )
  }
      
  if(typeof(totalPaymentsResumen) === "string"){
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <h1 className="text-center text-red-500">total payments resumen{totalPaymentsResumen}</h1>
        </div> */}
        <ComponentError page={`/projects/estimates/${params.idp}/collections`} message={totalPaymentsResumen} />
      </>
    )
  }

  if(typeof(projects) === "string"){
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <h1 className="text-center text-red-500">opt pro{projects}</h1>
        </div> */}
        <ComponentError page={`/projects/estimates/${params.idp}/collections`} message={projects} />
      </>
    )
  }

  if(typeof(catalogs)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <h1 className="text-red-500 text-center text-lg">catalogs{catalogs}</h1>
        </div> */}
        <ComponentError page={`/projects/estimates/${params.idp}/collections`} message={catalogs} />
      </>
    )
  }

  const optConditions: Options[] = [{
    label: 'Todos',
    value: 'all'
  }];
  catalogs[0].condition.map((condition: any) => {
    optConditions.push({
      label: condition.glossary.name,
      value: condition.glossary._id
    })
  })

  return (
    <>
      <Navigation user={user} token={token} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <ContainerCollectionsProject project={project} collections={collections} token={token} user={user._id} 
          totalInvoiceProject={totalInvoicesProject} resumenPayment={totalPaymentsResumen} 
          pageQuery={searchParams.page} company={user.profile} />
      </div>
    </>
  )
}