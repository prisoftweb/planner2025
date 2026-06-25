import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import { getClients } from "@/app/api/routeClients";
import { GetProjectMin, getProjectsLV, getProjectsByUserLV } from "@/app/api/routeProjects";
import { Options } from "@/interfaces/Common";
import { NextUiProviders } from "@/components/NextUIProviderComponent";
import Navigation from "@/components/navigation/Navigation";
import Selectize from "@/components/Selectize";
import NavTabProject from "@/components/projects/NavTabProject";
import ProjectCli from "@/components/projects/ProjectClient";
import Header from "@/components/HeaderPage";
import { getCatalogsByName } from "@/app/api/routeCatalogs";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL } from "@/app/api/routeRoles";

export default async function Page({ params }: 
  { params: { id: string }}){
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let role = user.rol?.name || '';

  const [project, options, clients, catalogs, resresource] = await Promise.all([
    GetProjectMin(token, params.id),
    role.toLowerCase().includes('residente') ? getProjectsByUserLV(token, user._id) : getProjectsLV(token),
    getClients(token),
    getCatalogsByName(token, 'projects'),
    getAllResourcesByROL(token, user.rol?._id?? ''),
  ]);

  if(typeof(resresource)==='string'){
      return (
        <>
          <ComponentError page="/" message={resresource} />
        </>
      )
    }
  
  if(typeof(project) === "string")
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{project}</h1>
        </div> */}
        <ComponentError page={`/projects/${params.id}/profile`} message={project} />
      </>
    )
  
  if(typeof(options) === "string")
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{options}</h1>
        </div> */}
        <ComponentError page={`/projects/${params.id}/profile`} message={options} />
      </>
    )
  
  if(typeof(clients)==='string') 
    return (
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-red-500 text-center text-lg">{clients}</h1>
        </div> */}
        <ComponentError page={`/projects/${params.id}/profile`} message={clients} />
      </>
    )

  if(typeof(catalogs)==='string') 
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
        </div> */}
        <ComponentError page={`/projects/${params.id}/profile`} message={catalogs} />
      </>
    )
 
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
      <Navigation user={user} token={token} resources={resresource} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <Header title={project.title} previousPage="/projects">
          <>
            <div className="hidden sm:block w-full max-w-48 sm:max-w-80 lg:max-w-md">
              <Selectize options={options} routePage="projects" subpath="/profile" />
            </div>
          </>
        </Header>
        {/* <ResponsiveHeader title={project.title} placeHolder="" >
          <Selectize options={options} routePage="projects" subpath="/profile" />
        </ResponsiveHeader> */}
        <div className="block sm:hidden mt-2">
          <Selectize options={options} routePage="projects" subpath="/profile" />
        </div>
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