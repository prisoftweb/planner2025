import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { getClients } from "../api/routeClients";
import { Options } from "@/interfaces/Common";
import { ClientBack } from "@/interfaces/Clients";
import { GlossaryCatalog } from "@/interfaces/Glossary";
import { getCatalogsByName } from "../api/routeCatalogs";
import { getCompaniesLV } from "../api/routeCompany";
import { getActiveProjectsMin, GetCollectionsAccumByProjectMin, GetCostsAccumByProjectMin } from "../api/routeProjects";
import { ProjectsTable, ProjectMin, ICostsAccumByProject, ICollectionAccumByProject } from "@/interfaces/Projects";
import { ProjectDataToTableDataWithUtilitiesMin } from "../functions/SaveProject";
import ContainerClient from "@/components/projects/ContainerClient";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let projects: ProjectMin[];
  try {
    projects = await getActiveProjectsMin(token);
    if(typeof(projects)==='string') 
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-red-500 text-center text-lg">{projects}</h1>
        </>
      )
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1>Error al consultar los proyectos!!</h1>
      </>
    )
  }

  let clients: ClientBack[];
  try {
    clients = await getClients(token);
    if(typeof(clients)==='string') 
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-red-500 text-center text-lg">{clients}</h1>
        </>
      )
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1>Error al consultar clientes!!</h1>
      </>
    )
  }

  let costs: ICostsAccumByProject[];
  try {
    costs = await GetCostsAccumByProjectMin(token);
    if(typeof(costs)==='string') 
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-red-500 text-center text-lg">{costs}</h1>
        </>
      )
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1>Error al consultar los costos de los proyectos!!</h1>
      </>
    )
  }

  let collections: ICollectionAccumByProject[];
  try {
    collections = await GetCollectionsAccumByProjectMin(token);
    if(typeof(collections)==='string') 
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-red-500 text-center text-lg">{collections}</h1>
        </>
      )
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1>Error al consultar los cobros de los proyectos!!</h1>
      </>
    )
  }

  const optClients: Options[] = [];
  clients.map((client) => {
    optClients.push({
      label: client.name,
      value: client._id
    })
  })

  let catalogs: GlossaryCatalog[];
  try {
    catalogs = await getCatalogsByName(token, 'projects');
    if(typeof(catalogs)==='string') return <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
  } catch (error) {
    return <h1>Error al consultar catalogos!!</h1>
  }

  const condition = catalogs[0].condition[0].glossary._id;
  
  let optCompanies: Options[] = [];
  try {
    optCompanies = await getCompaniesLV(token);
    if(typeof(optCompanies)==='string') 
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-red-500 text-center text-lg">{optCompanies}</h1>
        </>
      )
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-red-500 text-center text-lg">Error al consultar compañias!!</h1>
      </>
    )
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
  });

  const table: ProjectsTable[] = ProjectDataToTableDataWithUtilitiesMin(projects, collections, costs);
  
  return(
    <>
      <Navigation user={user} />
      <ContainerClient data={table} optCategories={optsCategories} optCategoriesFilter={optCategories}
        optClients={optClients} optCompanies={optCompanies} optConditionsFilter={optConditions} 
        optTypes={optsTypes} optTypesFilter={optTypes} projects={projects} token={token} user={user} 
        condition={condition} />
    </>
  )
}