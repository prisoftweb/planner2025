import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import { ClientBack } from "@/interfaces/Clients";
import { getClients } from "@/app/api/routeClients";
import { GetProjectMin, getProjectsLV } from "@/app/api/routeProjects";
import { OneProjectMin } from "@/interfaces/Projects";
import { Options } from "@/interfaces/Common";
import { NextUiProviders } from "@/components/NextUIProviderComponent";
import Navigation from "@/components/navigation/Navigation";
import Selectize from "@/components/Selectize";
import NavTabProject from "@/components/projects/NavTabProject";
import ProjectCli from "@/components/projects/ProjectClient";
import Header from "@/components/HeaderPage";

import { GlossaryCatalog } from "@/interfaces/Glossary";
import { getCatalogsByName } from "@/app/api/routeCatalogs";

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

  let clients: ClientBack[];
  try {
    clients = await getClients(token);
    if(typeof(clients)==='string') 
      return (
        <>
          <Navigation user={user} />
          <h1 className="text-red-500 text-center text-lg">{clients}</h1>
        </>
      )
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1>Error al consultar clientes!!</h1>
      </>
    )
  }

  let catalogs: GlossaryCatalog[];
  try {
    catalogs = await getCatalogsByName(token, 'projects');
    if(typeof(catalogs)==='string') 
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
        </>
      )
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1>Error al consultar catalogos!!</h1>
      </>
    )
  }
 
  const optClients: Options[] = [];
  clients.map((client) => {
    optClients.push({
      label: client.name,
      value: client._id
    })
  })

  const optCategories: Options[] = [];
  catalogs[0].categorys.map((category) => {
    optCategories.push({
      label: category.glossary.name,
      value: category.glossary._id
    })
  })

  const optTypes: Options[] = [];
  catalogs[0].types.map((type) => {
    optTypes.push({
      label: type.glossary.name,
      value: type.glossary._id
    })
  })

  const optConditions: Options[] = [];
  catalogs[0].condition.map((condition) => {
    optConditions.push({
      label: condition.glossary.name,
      value: condition.glossary._id
    })
  })

  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <Header title={project.title} previousPage="/projects">
          <Selectize options={options} routePage="projects" subpath="/profile" />
        </Header>
        <NavTabProject idPro={params.id} tab='1' />
        <NextUiProviders>
          <ProjectCli token={token} id={params.id} project={project}
            optCategories={optCategories} optClients={optClients} 
            optTypes={optTypes} optConditions={optConditions} 
            user={user._id}
          />
        </NextUiProviders>
      </div>
    </>
  )
}