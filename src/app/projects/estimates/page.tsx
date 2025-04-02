import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { GlossaryCatalog } from "@/interfaces/Glossary";
import { getCatalogsByName } from "@/app/api/routeCatalogs";
import { ProjectsTable, ProjectMin } from "@/interfaces/Projects";
import { getActiveProjectsMin } from "@/app/api/routeProjects";
import { ProjectDataToTableDataMin } from "@/app/functions/SaveProject";
import ContainerEstimatesClient from "@/components/projects/estimates/ContainerEstimatesClient";
import { Options } from "@/interfaces/Common";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let projects: ProjectMin[];
  try {
    projects = await getActiveProjectsMin(token);
    if(typeof(projects)==='string') return <h1 className="text-red-500 text-center text-lg">{projects}</h1>
  } catch (error) {
    return <h1>Error al consultar los proyectos!!</h1>
  }

  let catalogs: GlossaryCatalog[];
  try {
    catalogs = await getCatalogsByName(token, 'projects');
    if(typeof(catalogs)==='string') return <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
  } catch (error) {
    return <h1>Error al consultar catalogos!!</h1>
  }

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

  const table: ProjectsTable[] = ProjectDataToTableDataMin(projects);
  
  return(
    <>
      <Navigation user={user} />
      <ContainerEstimatesClient data={table} optCategories={optCategories} optConditionsFilter={optConditions} 
        optTypes={optTypes} projects={projects} token={token} user={user} />
    </>
  )
}