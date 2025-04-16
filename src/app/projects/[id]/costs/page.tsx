import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import { GetProjectMin, getProjectsLV, GetCostsByProjectMin } from "@/app/api/routeProjects";
import { OneProjectMin, ICostsByProject } from "@/interfaces/Projects";
import { Options } from "@/interfaces/Common";
import Navigation from "@/components/navigation/Navigation";
import Selectize from "@/components/Selectize";
import NavTabProject from "@/components/projects/NavTabProject";
import Header from "@/components/HeaderPage";
// import ContainerProjectAnalysis from "@/components/projects/ContainerProjectAnalysis";
import ContainerCostsByProject from "@/components/projects/ContainerCostsByProject";

export default async function Page({ params }: 
  { params: { id: string }}){
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let project: OneProjectMin;
  try {
    project = await GetProjectMin(token, params.id);
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

  let options: Options[] = [];
  try {
    options = await getProjectsLV(token);
    if(typeof(options) === "string")
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-center text-red-500">{options}</h1>
        </>
      )
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">Ocurrio un error al obtener datos de los proyectos!!</h1>
      </>
    )  
  }

  let costs: ICostsByProject[]=[];
  try {
    costs = await GetCostsByProjectMin(token, params.id);
    if(typeof(costs) === "string")
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-center text-red-500">{costs}</h1>
        </>
      )
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">Ocurrio un error al obtener costos del proyecto!!</h1>
      </>
    )  
  }
  
  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <Header title={project.title} previousPage="/projects">
          <Selectize options={options} routePage="projects" subpath="/costs" />
        </Header>
        <NavTabProject idPro={params.id} tab='4' />
        <ContainerCostsByProject costs={costs} project={project} token={token} user={user._id} />
      </div>
    </>
  )
}