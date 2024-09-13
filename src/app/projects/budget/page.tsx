import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { getClients, getClientsLV } from "@/app/api/routeClients";
import { Options } from "@/interfaces/Common";
import { ClientBack } from "@/interfaces/Clients";
import { GlossaryCatalog } from "@/interfaces/Glossary";
import { getCatalogsByName } from "@/app/api/routeCatalogs";
import { getCompaniesLV } from "@/app/api/routeCompany";
import { getProjectsMin } from "@/app/api/routeProjects";
import { ProjectsTable, ProjectMin, ProjectsBudgetTable } from "@/interfaces/Projects";
import { ProjectBudgetDataToTableDataMin } from "@/app/functions/SaveProject";
//import ContainerClient from "@/components/projects/ContainerClient";
import ContainerBudgetClient from "@/components/projects/budget/ContainerBudgetClient";
import { CostoCenterLV } from "@/interfaces/CostCenter";
import { getCostoCentersLV } from "@/app/api/routeCostCenter";

import { getBudgetsMin } from "@/app/api/routeBudget";
import { BudgetMin } from "@/interfaces/Budget";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let projects: ProjectMin[];
  try {
    projects = await getProjectsMin(token);
    if(typeof(projects)==='string') return <h1 className="text-red-500 text-center text-lg">{projects}</h1>
  } catch (error) {
    return <h1>Error al consultar los proyectos!!</h1>
  }

  let budgets: BudgetMin[];
  try {
    budgets = await getBudgetsMin(token);
    if(typeof(budgets)==='string') return <h1 className="text-red-500 text-center text-lg">{budgets}</h1>
  } catch (error) {
    return <h1>Error al consultar los presupuestos!!</h1>
  }

  //let clients: ClientBack[];
  let optClients: Options[] = [];
  try {
    //clients = await getClients(token);
    optClients = await getClientsLV(token);
    if(typeof(optClients)==='string') return <h1 className="text-red-500 text-center text-lg">{optClients}</h1>
  } catch (error) {
    return <h1>Error al consultar clientes!!</h1>
  }

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
    if(typeof(optCompanies)==='string') return <h1 className="text-red-500 text-center text-lg">{optCompanies}</h1>
  } catch (error) {
    return <h1 className="text-red-500 text-center text-lg">Error al consultar compañias!!</h1>
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

  let costoCenterLV: CostoCenterLV[] = [];
  
  try {
    costoCenterLV = await getCostoCentersLV(token);
    if(typeof(costoCenterLV)==='string'){
      return <p>{costoCenterLV}</p>
    }
  } catch (error) {
    return <p>Error al consultas los centros de costos!!!</p>
  }

  // const table: ProjectsTable[] = ProjectDataToTableDataMin(projects);
  // const table: ProjectsBudgetTable[] = ProjectBudgetDataToTableDataMin(budgets);
  
  return(
    <>
      <Navigation user={user} />
      <ContainerBudgetClient optCategories={optsCategories} optCategoriesFilter={optCategories}
        optClients={optClients} optCompanies={optCompanies} optConditionsFilter={optConditions} 
        optTypes={optsTypes} optTypesFilter={optTypes} projects={projects} token={token} user={user} 
        condition={condition} costoCentersLV={costoCenterLV} budgets={budgets} />
    </>
  )
}