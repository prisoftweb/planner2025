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

  // let project: OneProjectMin;
  // let estimate: IEstimate;
  // let totalEstimatedProject: TotalEstimatedByProject[];
  // let concepts: IConceptEstimate[];
  
  // project = await GetProjectMin(token, params.idp);
  // estimate = await getEstimate(token, params.ide);
  // totalEstimatedProject = await getTotalEstimatesByProjectMin(token, params.idp);
  // concepts = await getAllConceptsDetailsByEstimateMin(token, params.ide);

  const [project, estimate, totalEstimatedProject, concepts] = await Promise.all([
    GetProjectMin(token, params.idp),
    getEstimate(token, params.ide),
    getTotalEstimatesByProjectMin(token, params.idp),
    getAllConceptsDetailsByEstimateMin(token, params.ide)
  ]);
  
  if(typeof(project) === "string"){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">{project}</h1>
      </>
    )
  }

  if(typeof(estimate) === "string"){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">{estimate}</h1>
      </>
    )
  }

  if(typeof(totalEstimatedProject) === "string"){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">{totalEstimatedProject}</h1>
      </>
    )
  }
  
  if(typeof(concepts) === "string"){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">{concepts}</h1>
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