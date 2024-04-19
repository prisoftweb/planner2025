import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import { ClientBack } from "@/interfaces/Clients";
import { getClient, getClients } from "@/app/api/routeClients";
import { GetProject, getProjects } from "@/app/api/routeProjects";
import { Project } from "@/interfaces/Projects";
import { getTags } from "@/app/api/routeClients";
import { Options } from "@/interfaces/Common";
import { Tag } from "@/interfaces/Clients";
import { NextUiProviders } from "@/components/NextUIProviderComponent";
import ClientCli from "@/components/clients/Clientcli";
import Navigation from "@/components/navigation/Navigation";
import ArrowReturn from "@/components/ArrowReturn";
import Selectize from "@/components/Selectize";
import NavTab from "@/components/clients/NavTab";
import ProjectCli from "@/components/projects/ProjectClient";

export default async function Page({ params }: { params: { id: string }}){
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let project: Project;
  try {
    project = await GetProject(token, params.id);
    if(typeof(project) === "string")
      return <h1 className="text-center text-red-500">{project}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos del proyecto!!</h1>  
  }

  let projects: Project[];
  try {
    projects = await getProjects(token);
    if(typeof(projects) === "string")
      return <h1 className="text-center text-red-500">{projects}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos de los proyectos!!</h1>  
  }

  let options: Options[] = [];

  if(projects.length <= 0){
    return <h1 className="text-center text-red-500">Error al obtener proyectos...</h1>
  }

  // let tags = [];
  // try {
  //   tags = await getTags(token);
  //   if(typeof(tags)==='string'){
  //     return <h1 className="text-center text-red-500">{tags}</h1>
  //   }
  // } catch (error) {
  //   return <h1 className="text-center text-red-500">Error al obtener etiquetas!!</h1>
  // }

  // let arrTags: Options[] = [];
  // if(tags.length > 0){
  //   tags.map((tag:Tag) => {
  //     arrTags.push({
  //       'label': tag.name,
  //       'value': tag._id,
  //     })
  //   })
  // }else{
  //   return <h1 className="text-red-500 text-2xl text-center">Error al obtener etiquetas!!</h1>
  // }
  
  projects.map((proj) => {
    options.push({
      value: proj._id,
      label: proj.title,
    })
  })

  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <div className="flex justify-between items-center flex-wrap gap-y-3">
          <div className="flex items-center my-2">
            <ArrowReturn link="/projects" />
            <img src={project.photo? project.photo: '/img/clients.svg'} 
                      alt="logo cliente" className="w-12 h-12" />
            <p className="text-slate-500 mx-3">{project.title}</p>
          </div>
          <Selectize options={options} routePage="projects" subpath="/projects" />
        </div>
        <NavTab idCli={params.id} tab='1' />
        <NextUiProviders>
          <ProjectCli token={token} id={params.id} project={project} />
        </NextUiProviders>
      </div>
    </>
  )
}