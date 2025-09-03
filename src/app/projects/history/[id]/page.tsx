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
import Header from "@/components/HeaderPage";
import ProjectHistoryCli from "@/components/projects/ProjectHistoryCli";

import { GlossaryCatalog } from "@/interfaces/Glossary";
import { getCatalogsByName } from "@/app/api/routeCatalogs";

export default async function Page({ params }: { params: { id: string }}){
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  // let project: OneProjectMin;
  // let options: Options[] = [];
  // let clients: ClientBack[];
  // let catalogs: GlossaryCatalog[];
  
  // project = await GetProjectMin(token, params.id);
  // options = await getProjectsLV(token);
  // clients = await getClients(token);
  // catalogs = await getCatalogsByName(token, 'projects');

  const [project, options, clients, catalogs] = await Promise.all([
    GetProjectMin(token, params.id),
    getProjectsLV(token),
    getClients(token),
    getCatalogsByName(token, 'projects')
  ]);
  
  if(typeof(project) === "string"){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">{project}</h1>
      </>
    )
  }

  if(typeof(options) === "string"){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">{options}</h1>
      </>
    )
  }

  if(typeof(clients)==='string'){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-red-500 text-center text-lg">{clients}</h1>
      </>
    )
  }

  if(typeof(catalogs)==='string'){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
      </>
    )
  }

  const optClients: Options[] = [];
  clients.map((client: any) => {
    optClients.push({
      label: client.name,
      value: client._id
    })
  })

  const optCategories: Options[] = [];
  catalogs[0].categorys.map((category: any) => {
    optCategories.push({
      label: category.glossary.name,
      value: category.glossary._id
    })
  })

  const optTypes: Options[] = [];
  catalogs[0].types.map((type: any) => {
    optTypes.push({
      label: type.glossary.name,
      value: type.glossary._id
    })
  })

  const optConditions: Options[] = [];
  catalogs[0].condition.map((condition: any) => {
    optConditions.push({
      label: condition.glossary.name,
      value: condition.glossary._id
    })
  })

  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <Header title={project.title} previousPage="/projects/history">
          <Selectize options={options} routePage="projects/history" subpath="" />
        </Header>
        <NavTabProject idPro={params.id} tab='1' />
        <NextUiProviders>
          <ProjectHistoryCli project={project} id={params.id} token={token} />
        </NextUiProviders>
      </div>
    </>
  )
}