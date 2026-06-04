import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { ProjectMin } from "@/interfaces/Projects";
import { getActiveProjectsMin } from "@/app/api/routeProjects";
import DragAndDropProjects from "@/components/projects/DragAndDropProjects";
import Header from "@/components/HeaderPage";
import ComponentError from "@/components/ComponentError";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let projects: ProjectMin[] = await getActiveProjectsMin(token);

  if(typeof(projects) === "string"){
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <h1 className="text-center text-red-500">{projects}</h1>
        </div> */}
        <ComponentError page="/projects/board" message={projects} />
      </>
    )
  }

  return (
    <>
      <Navigation user={user} token={token} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <Header previousPage="/" title="Proyectos">
          <></>
        </Header>
        <div className="mt-3">
          <DragAndDropProjects projectsParam={projects} token={token} user={user._id} />
        </div>
      </div>
    </>
  )
}