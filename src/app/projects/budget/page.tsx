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

  let projects: ProjectMin[] = await getProjectsMin(token);
  let budgets: BudgetMin[] = await getBudgetsMin(token);
  let catalogs: GlossaryCatalog[] = await getCatalogsByName(token, 'budgets');
  
  if(typeof(projects)==='string') 
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-red-500 text-center text-lg">{projects}</h1>
        </div>
      </>
    )
  
  if(typeof(budgets)==='string') 
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-red-500 text-center text-lg">{budgets}</h1>
        </div>
      </>
    )

  if(typeof(catalogs)==='string') 
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
        </div>        
      </>
    )

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