import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import ContainerStimationsProject from "@/components/projects/estimates/ContainerStimationsProject";
import { OneProjectMin } from "@/interfaces/Projects";
import { GetProjectMin, getProjectsLV } from "@/app/api/routeProjects";
import { GlossaryCatalog } from "@/interfaces/Glossary";
import { Options } from "@/interfaces/Common";
import { getCatalogsByName } from "@/app/api/routeCatalogs";
import { IEstimateProject, IEstimate, IConceptEstimate } from "@/interfaces/Estimate";
import { getEstimatesByProject, getEstimate, getConeptsEstimate } from "@/app/api/routeEstimates";
import ContainerDetailEstimate from "@/components/projects/estimates/ContainerDetailEstimate";

export default async function Page({ params }: { params: { idp: string, ide:string }}){
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

  let estimate: IEstimate;
  try {
    estimate = await getEstimate(token, params.ide);
    // console.log('estimate min => ', estimate);
    if(typeof(estimate) === "string")
      return <h1 className="text-center text-red-500">{estimate}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener estimacion!!</h1>  
  }
  
  let concepts: IConceptEstimate[];
  try {
    concepts = await getConeptsEstimate(token, params.ide);
    console.log('concepts min => ', concepts);
    if(typeof(concepts) === "string")
      return <h1 className="text-center text-red-500">{concepts}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener los conceptos de la estimacion!!</h1>  
  }

  // let projects: Options[];
  // try {
  //   projects = await getProjectsLV(token);
  //   if(typeof(projects) === "string")
  //     return <h1 className="text-center text-red-500">{projects}</h1>
  // } catch (error) {
  //   return <h1 className="text-center text-red-500">Ocurrio un error al consultar proyectos!!</h1>  
  // }

  // let catalogs: GlossaryCatalog[];
  // try {
  //   catalogs = await getCatalogsByName(token, 'projects');
  //   if(typeof(catalogs)==='string') return <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
  // } catch (error) {
  //   return <h1>Error al consultar catalogos!!</h1>
  // }

  // const optConditions: Options[] = [{
  //   label: 'Todos',
  //   value: 'all'
  // }];
  // catalogs[0].condition.map((condition) => {
  //   optConditions.push({
  //     label: condition.glossary.name,
  //     value: condition.glossary._id
  //   })
  // })

  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <ContainerDetailEstimate estimate={estimate} project={project} token={token} user={user._id} 
          concepts={concepts} idEstimate={params.ide} />
        {/* <ContainerStimationsProject project={project} optConditions={optConditions} optProjects={[{
            label: 'Todos',
            value: 'all'
          }, ...projects]} estimates={estimates} token={token} user={user._id} /> */}
      </div>
    </>
  )
}