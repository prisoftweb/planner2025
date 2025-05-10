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
import ProjectStatusContainer from "@/components/projects/ProjectStatusContainer";
import Header from "@/components/HeaderPage";

import { GlossaryCatalog } from "@/interfaces/Glossary";
import { getCatalogsByName } from "@/app/api/routeCatalogs";

export default async function Page({ params }: { params: { id: string }}){
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let project: OneProjectMin = await GetProjectMin(token, params.id);
  let options: Options[] = await getProjectsLV(token);
  let clients: ClientBack[] = await getClients(token);
  let catalogs: GlossaryCatalog[] = await getCatalogsByName(token, 'projects');
  
  if(typeof(project) === "string")
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{project}</h1>
        </div>
      </>
    )
  
  if(typeof(options) === "string")
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{options}</h1>
        </div>
      </>
    )
  
  if(typeof(clients)==='string') 
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-red-500 text-center text-lg">{clients}</h1>
        </div>
      </>
    )
  
  if(typeof(catalogs)==='string') 
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
        </div>
      </>
    )
 
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
          <Selectize options={options} routePage="projects" subpath="/status" />
        </Header>
        <NavTabProject idPro={params.id} tab='5' />
        <NextUiProviders>
          <ProjectStatusContainer token={token} id={params.id} project={project}
            optCategories={optCategories} optClients={optClients} 
            optTypes={optTypes} optConditions={optConditions} 
            user={user._id}
          />
        </NextUiProviders>
      </div>
    </>
  )
}