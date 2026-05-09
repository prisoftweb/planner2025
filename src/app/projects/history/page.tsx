import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { Options } from "@/interfaces/Common";
import { getCatalogsByName } from "@/app/api/routeCatalogs";
import { getProjectsMin } from "@/app/api/routeProjects";
import { ProjectsTable } from "@/interfaces/Projects";
import { ProjectDataToTableDataMin } from "@/app/functions/SaveProject";
import ContainerHistoryClient from "@/components/projects/ContainerHistoryClient";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const [projects, catalogs] = await Promise.all([
    getProjectsMin(token),
    getCatalogsByName(token, 'projects')
  ]);
  
  if(typeof(projects)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        <h1 className="text-red-500 text-center text-lg">{projects}</h1>
      </>
    )
  }

  if(typeof(catalogs)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
      </>
    )
  }

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

  const table: ProjectsTable[] = ProjectDataToTableDataMin(projects);
  
  return(
    <>
      <Navigation user={user} token={token} />
      <ContainerHistoryClient data={table} optCategoriesFilter={optCategories}
        optConditionsFilter={optConditions} optTypesFilter={optTypes} 
        projects={projects} token={token} user={user} />
    </>
  )
}