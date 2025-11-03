import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { Options } from "@/interfaces/Common";
import { getCatalogsByName } from "@/app/api/routeCatalogs";
import { getProjectsMin } from "@/app/api/routeProjects";
import ContainerBudgetClient from "@/components/projects/budget/ContainerBudgetClient";
import { getBudgetsMin } from "@/app/api/routeBudget";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const [projects, budgets, catalogs] = await Promise.all([
    getProjectsMin(token),
    getBudgetsMin(token),
    getCatalogsByName(token, 'budgets')
  ]);
  
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
  projects.map((prj:any) => {
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
  catalogs[0].condition.map((condition:any) => {
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