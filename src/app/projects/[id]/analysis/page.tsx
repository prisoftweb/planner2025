import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import { GetProjectMin, getProjectsLV, getProjectsByUserLV } from "@/app/api/routeProjects";
import Navigation from "@/components/navigation/Navigation";
import Selectize from "@/components/Selectize";
import NavTabProject from "@/components/projects/NavTabProject";
import Header from "@/components/HeaderPage";
import ContainerProjectAnalysis from "@/components/projects/ContainerProjectAnalysis";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL, getAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/app/api/routeRoles";
import { IAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/interfaces/Roles";

export default async function Page({ params }: 
  { params: { id: string }}){
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let role = user.rol?.name || '';

  const [project, options, resresource, rescomponents] = await Promise.all([
    GetProjectMin(token, params.id),
    role.toLowerCase().includes('residente') ? getProjectsByUserLV(token, user._id) : getProjectsLV(token),
    getAllResourcesByROL(token, user.rol?._id?? ''),
    getAllComponentsByROUTESAndRESOURCESAndROLFULL(token, (user.rol?._id?? ''), 'projects', 'id/analysis'),
  ]);

  if(typeof(resresource)==='string'){
      return (
        <>
          <ComponentError page="/" message={resresource} />
        </>
      )
    }

  if(typeof(rescomponents) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        <ComponentError page={`/glossary`} message={rescomponents} />
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
        <ComponentError page={`/projects/${params.id}/analysis`} message={project} />
      </>
    )

  if(typeof(options) === "string")
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{options}</h1>
        </div> */}
        <ComponentError page={`/projects/${params.id}/analysis`} message={options} />
      </>
    )

  const result = {
    permission: rescomponents[0]?.permission ?? {},
    components: rescomponents.map((item: IAllComponentsByROUTESAndRESOURCESAndROLFULL) => item.component)
  };
  
  return(
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <Header title={project.title} previousPage="/projects">
          <>
            {result.components.includes('findall') && (
              <div className="hidden sm:block w-full max-w-48 sm:max-w-80 lg:max-w-md">
                <Selectize options={options} routePage="projects" subpath="/analysis" />
              </div>
            )}
          </>
        </Header>
        {result.components.includes('findall') && (
          <div className="block sm:hidden mt-2">
            <Selectize options={options} routePage="projects" subpath="/analysis" />
          </div>
        )}
        <NavTabProject idPro={params.id} tab='2' />
        <ContainerProjectAnalysis id={params.id} project={project} token={token} user={user._id} company={user.profile}
            permissions={result} />
      </div>
    </>
  )
}