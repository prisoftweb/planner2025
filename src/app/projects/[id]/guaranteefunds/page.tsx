import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import { GetProjectMin, getProjectsLV, getProjectsByUserLV } from "@/app/api/routeProjects";
import { NextUiProviders } from "@/components/NextUIProviderComponent";
import Navigation from "@/components/navigation/Navigation";
import Selectize from "@/components/Selectize";
import NavTabProject from "@/components/projects/NavTabProject";
import Header from "@/components/HeaderPage";

import ProjectGuaranteeFundsContainer from "@/components/projects/ProjectGuaranteeFundsContainer";
import { getGuaranteesByProject } from "@/app/api/routeGuarantee";

export default async function Page({ params }: { params: { id: string }}){
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let role = user.rol?.name || '';

  const [project, options, guarantees] = await Promise.all([
    GetProjectMin(token, params.id),
    role.toLowerCase().includes('residente') ? getProjectsByUserLV(token, user._id) : getProjectsLV(token),
    getGuaranteesByProject(token, params.id)
  ]);
  
  if(typeof(project) === "string")
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{project}</h1>
        </div>
      </>
    )

  if(typeof(guarantees) === "string")
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{guarantees}</h1>
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

  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <Header title={project.title} previousPage="/projects">
          <>
            <div className="hidden sm:block w-full max-w-48 sm:max-w-80 lg:max-w-md">
              <Selectize options={options} routePage="projects" subpath="/guaranteefunds" />
            </div>
          </>
        </Header>
        <div className="block sm:hidden mt-2">
          <Selectize options={options} routePage="projects" subpath="/guaranteefunds" />
        </div>
        <NavTabProject idPro={params.id} tab='8' />
        <NextUiProviders>
          <ProjectGuaranteeFundsContainer token={token} id={params.id} project={project}
            user={user._id} guarantees={guarantees}
          />
        </NextUiProviders>
      </div>
    </>
  )
}