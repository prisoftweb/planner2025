import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import ContainerStimationsProject from "@/components/projects/estimates/ContainerStimationsProject";
import { OneProjectMin } from "@/interfaces/Projects";
import { GetProjectMin, getProjectsLVNoCompleted } from "@/app/api/routeProjects";
import { GlossaryCatalog } from "@/interfaces/Glossary";
import { Options } from "@/interfaces/Common";
import { getCatalogsByName } from "@/app/api/routeCatalogs";
import { IEstimateProject, TotalEstimatedByProject} from "@/interfaces/Estimate";
import { getEstimatesByProject, getTotalEstimatesByProjectMin } from "@/app/api/routeEstimates";

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

  let estimates: IEstimateProject[];
  try {
    estimates = await getEstimatesByProject(token, params.idp);
    console.log('estimates min => ', estimates);
    if(typeof(estimates) === "string")
      return <h1 className="text-center text-red-500">{estimates}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener las estimaciones del proyecto!!</h1>  
  }

  let totalEstimatedProject: TotalEstimatedByProject[];
  try {
    totalEstimatedProject = await getTotalEstimatesByProjectMin(token, params.idp);
    if(typeof(totalEstimatedProject) === "string")
      return <h1 className="text-center text-red-500">{totalEstimatedProject}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener el total de las estimaciones del proyecto!!</h1>  
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
  });

  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <ContainerStimationsProject project={project} optConditions={optConditions} optProjects={[{
            label: 'Todos',
            value: 'all'
          }, ...projects]} estimates={estimates} token={token} user={user._id} 
          totalEstimatedProject={totalEstimatedProject} />
      </div>
    </>
  )
}