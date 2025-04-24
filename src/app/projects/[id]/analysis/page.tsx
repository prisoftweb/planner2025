import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import { GetProjectMin, getProjectsLV } from "@/app/api/routeProjects";
import { OneProjectMin } from "@/interfaces/Projects";
import { Options } from "@/interfaces/Common";
import Navigation from "@/components/navigation/Navigation";
import Selectize from "@/components/Selectize";
import NavTabProject from "@/components/projects/NavTabProject";
import Header from "@/components/HeaderPage";
import ContainerProjectAnalysis from "@/components/projects/ContainerProjectAnalysis";

export default async function Page({ params }: 
  { params: { id: string }}){
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let project: OneProjectMin = await GetProjectMin(token, params.id);
  let options: Options[] = await getProjectsLV(token);
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

  
  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <Header title={project.title} previousPage="/projects">
          <Selectize options={options} routePage="projects" subpath="/analysis" />
        </Header>
        <NavTabProject idPro={params.id} tab='2' />
        <ContainerProjectAnalysis id={params.id} project={project} token={token} user={user._id} />
      </div>
    </>
  )
}