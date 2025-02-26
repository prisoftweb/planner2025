import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { OneProjectMin } from "@/interfaces/Projects";
import { GetProjectMin } from "@/app/api/routeProjects";
import { ITotalInvoicesByProject, IInvoiceMin, IConceptInvoice } from "@/interfaces/Invoices";
import { getInvoiceMin, getTotalInvoicesByProject, getConceptsInvoice } from "@/app/api/routeInvoices";
import ContainerDetailInvoice from "@/components/projects/estimates/ContainerDetailInvoice";

export default async function Page({ params }: { params: { idp: string, idi:string }}){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let project: OneProjectMin;
  try {
    project = await GetProjectMin(token, params.idp);
    if(typeof(project) === "string")
      return <h1 className="text-center text-red-500">{project}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos del proyecto!!</h1>  
  }

  let invoice: IInvoiceMin;
  try {
    invoice = await getInvoiceMin(token, params.idi);
    console.log('get invoice min => ', invoice);
    if(typeof(invoice) === "string")
      return <h1 className="text-center text-red-500">{invoice}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener factura!!</h1>  
  }

  let totalInvoiceProject: ITotalInvoicesByProject[];
  try {
    totalInvoiceProject = await getTotalInvoicesByProject(token, params.idp);
    if(typeof(totalInvoiceProject) === "string")
      return <h1 className="text-center text-red-500">{totalInvoiceProject}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener el total de la factura del proyecto!!</h1>  
  }
  
  let concepts: IConceptInvoice[];
  try {
    concepts = await getConceptsInvoice(token, params.idi);
    console.log('concepts invoice min => ', concepts);
    if(typeof(concepts) === "string")
      return <h1 className="text-center text-red-500">{concepts}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener los conceptos de la factura!!</h1>  
  }

  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <ContainerDetailInvoice invoice={invoice} project={project} token={token} user={user._id} 
          concepts={concepts} totalInvoiceProject={totalInvoiceProject} />
      </div>
    </>
  )
}