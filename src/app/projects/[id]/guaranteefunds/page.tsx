import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import { GetProjectMin, getProjectsLV, getProjectsByUserLV } from "@/app/api/routeProjects";
import { OneProjectMin } from "@/interfaces/Projects";
import { Options } from "@/interfaces/Common";
import { NextUiProviders } from "@/components/NextUIProviderComponent";
import Navigation from "@/components/navigation/Navigation";
import Selectize from "@/components/Selectize";
import NavTabProject from "@/components/projects/NavTabProject";
import Header from "@/components/HeaderPage";

import ProjectGuaranteeFundsContainer from "@/components/projects/ProjectGuaranteeFundsContainer";
import { getGuaranteesByProject } from "@/app/api/routeGuarantee";
import { IGuaranteeByPojectMin } from "@/interfaces/Guarantee";

export default async function Page({ params }: { params: { id: string }}){
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  // let project: OneProjectMin = await GetProjectMin(token, params.id);
  // let options: Options[] = await getProjectsLV(token);
  // let guarantees: IGuaranteeByPojectMin[] = await getGuaranteesByProject(token, params.id);

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
          <Selectize options={options} routePage="projects" subpath="/guaranteefunds" />
        </Header>
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