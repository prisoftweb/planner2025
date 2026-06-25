import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import ContainerStimationsProject from "@/components/projects/estimates/ContainerStimationsProject";
import { GetProjectMin, getProjectsLVNoCompleted } from "@/app/api/routeProjects";
import { Options } from "@/interfaces/Common";
import { getCatalogsByName } from "@/app/api/routeCatalogs";
import { getEstimatesByProject, getTotalEstimatesByProjectMin } from "@/app/api/routeEstimates";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL } from "@/app/api/routeRoles";

export default async function Page({ params, searchParams }: 
  { params: { idp: string }, searchParams: { page: string }}){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const [project, estimates, totalEstimatedProject, projects, catalogs, resresource] = await Promise.all([
    GetProjectMin(token, params.idp),
    getEstimatesByProject(token, params.idp),
    getTotalEstimatesByProjectMin(token, params.idp),
    getProjectsLVNoCompleted(token),
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
  
  if(typeof(project) === "string"){
    // return <h1 className="text-center text-red-500">{project}</h1>
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">{project}</h1> */}
        <ComponentError page={`/projects/estimates/${params.idp}`} message={project} />
      </>
    )
  }
  
  if(typeof(estimates) === "string"){
    // return <h1 className="text-center text-red-500">{estimates}</h1>
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">{estimates}</h1> */}
        <ComponentError page={`/projects/estimates/${params.idp}`} message={estimates} />
      </>
    )
  }

  if(typeof(totalEstimatedProject) === "string"){
    // return <h1 className="text-center text-red-500">{totalEstimatedProject}</h1>
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">{totalEstimatedProject}</h1> */}
        <ComponentError page={`/projects/estimates/${params.idp}`} message={totalEstimatedProject} />
      </>
    )
  }

  if(typeof(projects) === "string"){
    // return <h1 className="text-center text-red-500">{projects}</h1>
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">{projects}</h1> */}
        <ComponentError page={`/projects/estimates/${params.idp}`} message={projects} />
      </>
    )
  }

  if(typeof(catalogs)==='string'){
    // return <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-red-500 text-center text-lg">{catalogs}</h1> */}
        <ComponentError page={`/projects/estimates/${params.idp}`} message={catalogs} />
      </>
    )
  }

  const optConditions: Options[] = [{
    label: 'Todos',
    value: 'all'
  }];
  catalogs[0].condition.map((condition:any) => {
    optConditions.push({
      label: condition.glossary.name,
      value: condition.glossary._id
    })
  });

  return (
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <ContainerStimationsProject project={project} optConditions={optConditions} optProjects={[{
            label: 'Todos',
            value: 'all'
          }, ...projects]} estimates={estimates} token={token} user={user._id} 
          totalEstimatedProject={totalEstimatedProject} pageProject={searchParams.page} company={user.profile} />
      </div>
    </>
  )
}