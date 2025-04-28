import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { GlossaryCatalog } from "@/interfaces/Glossary";
import { getCatalogsByName } from "@/app/api/routeCatalogs";
import { ProjectsTable, IProjectWithEstimateMin } from "@/interfaces/Projects";
import { getProjectsWithEstimatesMin } from "@/app/api/routeProjects";
import { ProjectEstimateDataToTableDataMin } from "@/app/functions/SaveProject";
import ContainerEstimatesClient from "@/components/projects/estimates/ContainerEstimatesClient";
import { Options } from "@/interfaces/Common";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let projects: IProjectWithEstimateMin[] = await getProjectsWithEstimatesMin(token);
  let catalogs: GlossaryCatalog[] = await getCatalogsByName(token, 'projects');
  
  if(typeof(projects)==='string') 
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <h1 className="text-red-500 text-center text-lg">{projects}</h1>
        </div>
      </>
    )
  
  if(typeof(catalogs)==='string') 
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
        </div>
      </>
    )

  const optCategories: Options[] = [{
    label: 'Todas',
    value: 'all'
  }];
  const optsCategories: Options[] = [];
  catalogs[0].categorys.map((category) => {
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
  catalogs[0].types.map((type) => {
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
  catalogs[0].condition.map((condition) => {
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
      <Navigation user={user} />
      <ContainerEstimatesClient data={table} optCategories={optCategories} optConditionsFilter={optConditions} 
        optTypes={optTypes} projectsParam={projects} token={token} user={user} />
    </>
  )
}