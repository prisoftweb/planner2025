import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { getCatalogsByName } from "@/app/api/routeCatalogs";
import { ProjectsTable } from "@/interfaces/Projects";
import { getProjectsWithEstimatesMin, getProjectsForEstimatedByUser } from "@/app/api/routeProjects";
import { ProjectEstimateDataToTableDataMin } from "@/app/functions/SaveProject";
import ContainerEstimatesClient from "@/components/projects/estimates/ContainerEstimatesClient";
import { Options } from "@/interfaces/Common";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL } from "@/app/api/routeRoles";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let role = user.rol?.name || '';

  const [projects, catalogs, resresource] = await Promise.all([
    role.toLowerCase().includes('residente') ? getProjectsForEstimatedByUser(token, user._id) : getProjectsWithEstimatesMin(token),
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
  
  if(typeof(projects)==='string') 
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <h1 className="text-red-500 text-center text-lg">{projects}</h1>
        </div> */}
        <ComponentError page="/projects/estimates" message={projects} />
      </>
    )
  
  if(typeof(catalogs)==='string') 
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
        </div> */}
        <ComponentError page="/projects/estimates" message={catalogs} />
      </>
    )

  const optCategories: Options[] = [{
    label: 'Todas',
    value: 'all'
  }];
  const optsCategories: Options[] = [];
  catalogs[0].categorys.map((category: any) => {
    optsCategories.push({
      label: category.glossary.name,
      value: category.glossary._id
    })
    optCategories.push({
      label: category.glossary.name,
      value: category.glossary._id
    })
  })

  const optTypes: Options[] = [{
    label: 'Todos',
    value: 'all'
  }];
  const optsTypes: Options[] = [];
  catalogs[0].types.map((type: any) => {
    optsTypes.push({
      label: type.glossary.name,
      value: type.glossary._id
    })
    optTypes.push({
      label: type.glossary.name,
      value: type.glossary._id
    })
  })

  const optConditions: Options[] = [{
    label: 'Todos',
    value: 'all'
  }];
  const optsConditions: Options[] = [];
  catalogs[0].condition.map((condition: any) => {
    optsConditions.push({
      label: condition.glossary.name,
      value: condition.glossary._id
    })
    optConditions.push({
      label: condition.glossary.name,
      value: condition.glossary._id
    })
  })

  const table: ProjectsTable[] = ProjectEstimateDataToTableDataMin(projects);
  
  return(
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <ContainerEstimatesClient data={table} optCategories={optCategories} optConditionsFilter={optConditions} 
        optTypes={optTypes} projectsParam={projects} token={token} user={user} rol={role} company={user.profile} />
    </>
  )
}