import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import { GetProjectMin, getProjectsLV, getProjectsByUserLV, GetBudgetsByProjectMin } from "@/app/api/routeProjects";
import Navigation from "@/components/navigation/Navigation";
import Selectize from "@/components/Selectize";
import NavTabProject from "@/components/projects/NavTabProject";
import Header from "@/components/HeaderPage";
import ContainerBudgetsByProject from "@/components/projects/ContainerBudgetsByProjects";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL } from "@/app/api/routeRoles";

export default async function Page({ params }: 
  { params: { id: string }}){
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  // let role = user.rol?.name || '';

  const [project, options, budgets, resresource] = await Promise.all([
    GetProjectMin(token, params.id),
    getProjectsLV(token),
    // role.toLowerCase().includes('residente') ? getProjectsByUserLV(token, user._id) : getProjectsLV(token),
    GetBudgetsByProjectMin(token, params.id),
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
        <ComponentError page={`/projects/${params.id}/budgets`} message={project} />
      </>
    )
  
  if(typeof(options) === "string")
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{options}</h1>
        </div> */}
        <ComponentError page={`/projects/${params.id}/budgets`} message={options} />
      </>
    )
  
  if(typeof(budgets) === "string")
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{budgets}</h1>
        </div> */}
        <ComponentError page={`/projects/${params.id}/budgets`} message={budgets} />
      </>
    )
  
  return(
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <Header title={project.title} previousPage="/projects">
          <>
            <div className="hidden sm:block w-full max-w-48 sm:max-w-80 lg:max-w-md">
              <Selectize options={options} routePage="projects" subpath="/budgets" />
            </div>
          </>
        </Header>
        <div className="block sm:hidden mt-2">
          <Selectize options={options} routePage="projects" subpath="/budgets" />
        </div>
        <NavTabProject idPro={params.id} tab='3' />
        <ContainerBudgetsByProject budgets={budgets} project={project} token={token} user={user._id} />
      </div>
    </>
  )
}