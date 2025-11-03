import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import ContainerStimationsProject from "@/components/projects/estimates/ContainerStimationsProject";
import { GetProjectMin, getProjectsLVNoCompleted } from "@/app/api/routeProjects";
import { Options } from "@/interfaces/Common";
import { getCatalogsByName } from "@/app/api/routeCatalogs";
import { getEstimatesByProject, getTotalEstimatesByProjectMin } from "@/app/api/routeEstimates";

export default async function Page({ params, searchParams }: 
  { params: { idp: string }, searchParams: { page: string }}){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const [project, estimates, totalEstimatedProject, projects, catalogs] = await Promise.all([
    GetProjectMin(token, params.idp),
    getEstimatesByProject(token, params.idp),
    getTotalEstimatesByProjectMin(token, params.idp),
    getProjectsLVNoCompleted(token),
    getCatalogsByName(token, 'projects')
  ]);
  
  if(typeof(project) === "string"){
    return <h1 className="text-center text-red-500">{project}</h1>
  }
  
  if(typeof(estimates) === "string"){
    return <h1 className="text-center text-red-500">{estimates}</h1>
  }

  if(typeof(totalEstimatedProject) === "string"){
    return <h1 className="text-center text-red-500">{totalEstimatedProject}</h1>
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
  catalogs[0].condition.map((condition:any) => {
    optConditions.push({
      label: condition.glossary.name,
      value: condition.glossary._id
    })
  });

  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <ContainerStimationsProject project={project} optConditions={optConditions} optProjects={[{
            label: 'Todos',
            value: 'all'
          }, ...projects]} estimates={estimates} token={token} user={user._id} 
          totalEstimatedProject={totalEstimatedProject} pageProject={searchParams.page} />
      </div>
    </>
  )
}