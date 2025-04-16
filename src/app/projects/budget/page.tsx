import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { Options } from "@/interfaces/Common";
import { GlossaryCatalog } from "@/interfaces/Glossary";
import { getCatalogsByName } from "@/app/api/routeCatalogs";
import { getProjectsMin } from "@/app/api/routeProjects";
import { ProjectMin } from "@/interfaces/Projects";
import ContainerBudgetClient from "@/components/projects/budget/ContainerBudgetClient";
import { getBudgetsMin } from "@/app/api/routeBudget";
import { BudgetMin } from "@/interfaces/Budget";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let projects: ProjectMin[];
  try {
    projects = await getProjectsMin(token);
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

  let optProjects: Options[] = [{
    label: 'Todos',
    value: "all"
  }];
  projects.map((prj) => {
    optProjects.push({
      label: prj.title,
      value: prj._id
    });
  });

  let budgets: BudgetMin[];
  try {
    budgets = await getBudgetsMin(token);
    if(typeof(budgets)==='string') 
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-red-500 text-center text-lg">{budgets}</h1>
        </>
      )
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1>Error al consultar los presupuestos!!</h1>
      </>
    )
  }

  let catalogs: GlossaryCatalog[];
  try {
    catalogs = await getCatalogsByName(token, 'budgets');
    if(typeof(catalogs)==='string') 
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
        </>
      )
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1>Error al consultar catalogos!!</h1>
      </>
    )
  }

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

  return(
    <>
      <Navigation user={user} />
      <ContainerBudgetClient optConditionsFilter={optConditions} projects={projects} 
        token={token} user={user} budgets={budgets} optProjectsFilter={optProjects} />
    </>
  )
}