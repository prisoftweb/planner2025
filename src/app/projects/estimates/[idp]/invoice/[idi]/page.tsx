import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { OneProjectMin } from "@/interfaces/Projects";
import { GetProjectMin } from "@/app/api/routeProjects";
import { ITotalInvoicesByProject, IInvoiceMinFull, ICollectiosByInvoice } from "@/interfaces/Invoices";
import { getInvoiceMinFull, getTotalInvoicesByProject, getCollectionsByInvoice } from "@/app/api/routeInvoices";
import ContainerDetailInvoice from "@/components/projects/estimates/ContainerDetailInvoice";

export default async function Page({ params, searchParams }: 
  { params: { idp: string, idi:string }, searchParams: { page: string }}){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  // let project: OneProjectMin;
  // let invoice: IInvoiceMinFull;
  // let totalInvoiceProject: ITotalInvoicesByProject[];
  // let collections: ICollectiosByInvoice[]=[];
  
  // project = await GetProjectMin(token, params.idp);
  // invoice = await getInvoiceMinFull(token, params.idi);
  // totalInvoiceProject = await getTotalInvoicesByProject(token, params.idp);
  // collections = await getCollectionsByInvoice(token, params.idi);

  const [project, invoice, totalInvoiceProject, collections] = await Promise.all([
    GetProjectMin(token, params.idp),
    getInvoiceMinFull(token, params.idi),
    getTotalInvoicesByProject(token, params.idp),
    getCollectionsByInvoice(token, params.idi)
  ]);

  if(typeof(project) === "string"){
    return <h1 className="text-center text-red-500">{project}</h1>
  }      

  if(typeof(invoice) === "string"){
    return <h1 className="text-center text-red-500">{invoice}</h1>
  }

  if(typeof(totalInvoiceProject) === "string"){
    return <h1 className="text-center text-red-500">{totalInvoiceProject}</h1>
  }
  
  if(typeof(collections) === "string"){
    return <h1 className="text-center text-red-500">{collections}</h1>
  }

  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <ContainerDetailInvoice invoice={invoice} project={project} token={token} user={user._id} 
          collections={collections} totalInvoiceProject={totalInvoiceProject} pageQuery={searchParams.page} />
      </div>
    </>
  )
}