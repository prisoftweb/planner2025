import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { OneProjectMin } from "@/interfaces/Projects";
import { GetProjectMin } from "@/app/api/routeProjects";
import { IEstimate, IConceptEstimate, TotalEstimatedByProject } from "@/interfaces/Estimate";
import { getAllConceptsDetailsByEstimateMin, getTotalEstimatesByProjectMin, 
  getEstimate } from "@/app/api/routeEstimates";
import ContainerDetailEstimate from "@/components/projects/estimates/ContainerDetailEstimate";

export default async function Page({ params, searchParams }: 
  { params: { idp: string, ide:string }, searchParams: { page: string }}){
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
          <h1 className="text-center text-red-500">{project}</h1>
        </>
      )
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">Ocurrio un error al obtener datos del proyecto!!</h1>
      </>
    )  
  }

  let estimate: IEstimate;
  try {
    estimate = await getEstimate(token, params.ide);
    if(typeof(estimate) === "string")
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-center text-red-500">{estimate}</h1>
        </>
      )
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">Ocurrio un error al obtener estimacion!!</h1>
      </>
    )  
  }

  let totalEstimatedProject: TotalEstimatedByProject[];
  try {
    totalEstimatedProject = await getTotalEstimatesByProjectMin(token, params.idp);
    if(typeof(totalEstimatedProject) === "string")
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-center text-red-500">{totalEstimatedProject}</h1>
        </>
      )
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">Ocurrio un error al obtener el total de las estimaciones del proyecto!!</h1>
      </>
    ) 
  }
  
  let concepts: IConceptEstimate[];
  try {
    concepts = await getAllConceptsDetailsByEstimateMin(token, params.ide);
    if(typeof(concepts) === "string")
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-center text-red-500">{concepts}</h1>
        </>
      )
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">Ocurrio un error al obtener los conceptos de la estimacion!!</h1>
      </>
    ) 
  }

  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <ContainerDetailEstimate estimate={estimate} project={project} token={token} user={user._id} 
          concepts={concepts} idEstimate={params.ide} totalEstimatedProject={totalEstimatedProject}
          page={searchParams.page} />
      </div>
    </>
  )
}