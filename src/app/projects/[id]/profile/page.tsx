import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import { ClientBack } from "@/interfaces/Clients";
import { getClients } from "@/app/api/routeClients";
import { GetProject, getProjectsLV } from "@/app/api/routeProjects";
import { Project } from "@/interfaces/Projects";
import { Options } from "@/interfaces/Common";
import { NextUiProviders } from "@/components/NextUIProviderComponent";
import Navigation from "@/components/navigation/Navigation";
import Selectize from "@/components/Selectize";
import NavTabProject from "@/components/projects/NavTabProject";
import ProjectCli from "@/components/projects/ProjectClient";
import Header from "@/components/HeaderPage";

import { GlossaryCatalog } from "@/interfaces/Glossary";
import { getCatalogsByName } from "@/app/api/routeCatalogs";

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

  let options: Options[] = [];
  try {
    options = await getProjectsLV(token);
    if(typeof(options) === "string")
      return <h1 className="text-center text-red-500">{options}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos de los proyectos!!</h1>  
  }

  // let options: Options[] = [];

  // if(projects.length <= 0){
  //   return <h1 className="text-center text-red-500">Error al obtener proyectos...</h1>
  // }

  // projects.map((proj) => {
  //   options.push({
  //     value: proj._id,
  //     label: proj.title,
  //   })
  // })

  let clients: ClientBack[];
  try {
    clients = await getClients(token);
    if(typeof(clients)==='string') return <h1 className="text-red-500 text-center text-lg">{clients}</h1>
  } catch (error) {
    return <h1>Error al consultar clientes!!</h1>
  }

  let catalogs: GlossaryCatalog[];
  try {
    catalogs = await getCatalogsByName(token, 'projects');
    if(typeof(catalogs)==='string') return <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
  } catch (error) {
    return <h1>Error al consultar catalogos!!</h1>
  }
  
  // let companies: Company[];
  // try {
  //   companies = await getCompanies(token);
  //   if(typeof(companies)==='string') return <h1 className="text-red-500 text-center text-lg">{companies}</h1>
  // } catch (error) {
  //   return <h1 className="text-red-500 text-center text-lg">Error al consultar compañias!!</h1>
  // }

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

  // if(companies.length <= 0){
  //   <h1 className="text-red-500 text-center text-lg">Error no hay compañias!!</h1>
  // }

  // const optCompanies: Options[] = [];
  // companies.map((company) => {
  //   optCompanies.push({
  //     label: company.name,
  //     value: company._id
  //   })
  // })

  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <Header title={project.title} previousPage="/projects">
          <Selectize options={options} routePage="projects" subpath="/profile" />
        </Header>
        {/* <div className="flex justify-between items-center flex-wrap gap-y-3">
          <div className="flex items-center my-2">
            <ArrowReturn link="/projects" />
            <img src={project.photo? project.photo: '/img/projects.svg'} 
                      alt="logo cliente" className="w-12 h-12" />
            <p className="text-slate-500 mx-3">{project.title}</p>
          </div>
          <Selectize options={options} routePage="projects" subpath="/profile" />
        </div> */}
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