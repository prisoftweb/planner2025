import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { GetProjectMin } from "@/app/api/routeProjects";
import { getAllConceptsDetailsByEstimateMin, getTotalEstimatesByProjectMin, 
  getEstimate } from "@/app/api/routeEstimates";
import ContainerDetailEstimate from "@/components/projects/estimates/ContainerDetailEstimate";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL } from "@/app/api/routeRoles";

export default async function Page({ params, searchParams }: 
  { params: { idp: string, ide:string }, searchParams: { page: string }}){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const [project, estimate, totalEstimatedProject, concepts, resresource] = await Promise.all([
    GetProjectMin(token, params.idp),
    getEstimate(token, params.ide),
    getTotalEstimatesByProjectMin(token, params.idp),
    getAllConceptsDetailsByEstimateMin(token, params.ide),
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
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">{project}</h1> */}
        <ComponentError page={`/projects/estimates/${params.idp}/${params.ide}`} message={project} />
      </>
    )
  }

  if(typeof(estimate) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">{estimate}</h1> */}
        <ComponentError page={`/projects/estimates/${params.idp}/${params.ide}`} message={estimate} />
      </>
    )
  }

  if(typeof(totalEstimatedProject) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">{totalEstimatedProject}</h1> */}
        <ComponentError page={`/projects/estimates/${params.idp}/${params.ide}`} message={totalEstimatedProject} />
      </>
    )
  }
  
  if(typeof(concepts) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">{concepts}</h1> */}
        <ComponentError page={`/projects/estimates/${params.idp}/${params.ide}`} message={concepts} />
      </>
    )
  }

  return (
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <ContainerDetailEstimate estimate={estimate} project={project} token={token} user={user._id} 
          concepts={concepts} idEstimate={params.ide} totalEstimatedProject={totalEstimatedProject}
          page={searchParams.page} company={user.profile} />
      </div>
    </>
  )
}