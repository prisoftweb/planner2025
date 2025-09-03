import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { OneProjectMin } from "@/interfaces/Projects";
import { GetProjectMin, getProjectsLVNoCompleted } from "@/app/api/routeProjects";
import { GlossaryCatalog } from "@/interfaces/Glossary";
import { Options } from "@/interfaces/Common";
import { getCatalogsByName } from "@/app/api/routeCatalogs";
import { getTotalInvoicesByProject, getInvoicesByProject, getTotalInvoiceResumenByProject } from "@/app/api/routeInvoices";
import { ITotalInvoicesByProject, IInvoiceByProject, ITotalInvoiceResumen } from "@/interfaces/Invoices";
import ContainerInvoicesProject from "@/components/projects/estimates/ContainerInvoicesProject";

export default async function Page({ params, searchParams }: 
  { params: { idp: string }, searchParams: { page: string }}){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  // let project: OneProjectMin;
  // let invoices: IInvoiceByProject[];
  // let totalInvoicesProject: ITotalInvoicesByProject[];
  // let totalInvoicesResumen: ITotalInvoiceResumen;
  // let projects: Options[];
  // let catalogs: GlossaryCatalog[];
  
  // project = await GetProjectMin(token, params.idp);
  // invoices = await getInvoicesByProject(token, params.idp);
  // totalInvoicesProject = await getTotalInvoicesByProject(token, params.idp);
  // totalInvoicesResumen = await getTotalInvoiceResumenByProject(token, params.idp);
  // projects = await getProjectsLVNoCompleted(token);
  // catalogs = await getCatalogsByName(token, 'projects');

  const [project, invoices, totalInvoicesProject, totalInvoicesResumen, projects, catalogs] = await Promise.all([
    GetProjectMin(token, params.idp),
    getInvoicesByProject(token, params.idp),
    getTotalInvoicesByProject(token, params.idp),
    getTotalInvoiceResumenByProject(token, params.idp),
    getProjectsLVNoCompleted(token),
    getCatalogsByName(token, 'projects')
  ]);
  
  if(typeof(project) === "string"){
    return <h1 className="text-center text-red-500">{project}</h1>
  }

  if(typeof(invoices) === "string"){
    return <h1 className="text-center text-red-500">{invoices}</h1>
  }
  
  if(typeof(totalInvoicesProject) === "string"){
    return <h1 className="text-center text-red-500">{totalInvoicesProject}</h1>
  }

  if(typeof(totalInvoicesResumen) === "string"){
    return <h1 className="text-center text-red-500">{totalInvoicesResumen}</h1>
  }

  if(typeof(projects) === "string"){
    return <h1 className="text-center text-red-500">{projects}</h1>
  }

  if(typeof(catalogs)==='string'){
    return <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
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
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <ContainerInvoicesProject project={project} optConditions={optConditions} optProjects={[{
            label: 'Todos',
            value: 'all'
          }, ...projects]} pageQuery={searchParams.page} invoices={invoices} token={token} user={user._id} 
          totalInvoiceProject={totalInvoicesProject} resumenInvoice={totalInvoicesResumen} />
      </div>
    </>
  )
}