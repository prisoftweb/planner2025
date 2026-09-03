import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { getActiveProjectsMin } from "@/app/api/routeProjects";
import DragAndDropProjects from "@/components/projects/DragAndDropProjects";
import Header from "@/components/HeaderPage";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL, getAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/app/api/routeRoles";
import { IAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/interfaces/Roles";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const [projects, resresource, rescomponents ] = await Promise.all([
    getActiveProjectsMin(token),
    getAllResourcesByROL(token, user.rol?._id?? ''),
    getAllComponentsByROUTESAndRESOURCESAndROLFULL(token, (user.rol?._id?? ''), 'projects', 'id/status'),
  ]);

  if(typeof(resresource)==='string'){
      return (
        <>
          <ComponentError page="/" message={resresource} />
        </>
      )
    }

  if(typeof(projects) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <h1 className="text-center text-red-500">{projects}</h1>
        </div> */}
        <ComponentError page="/projects/board" message={projects} />
      </>
    )
  }

  return (
    <>
      <Navigation user={user} token={token} resources={resresource} />
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