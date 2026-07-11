import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { Options } from "@/interfaces/Common";
import { getCatalogsByName } from "@/app/api/routeCatalogs";
import { getProjectsMin } from "@/app/api/routeProjects";
import ContainerBudgetClient from "@/components/projects/budget/ContainerBudgetClient";
import { getBudgetsMin } from "@/app/api/routeBudget";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL, getAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/app/api/routeRoles";
import { IAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/interfaces/Roles";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const [projects, budgets, catalogs, resresource, rescomponents] = await Promise.all([
    getProjectsMin(token),
    getBudgetsMin(token),
    getCatalogsByName(token, 'budgets'),
    getAllResourcesByROL(token, user.rol?._id?? ''),
    getAllComponentsByROUTESAndRESOURCESAndROLFULL(token, (user.rol?._id?? ''), 'projects', 'budget'),
  ]);

  if(typeof(resresource)==='string'){
    return (
      <>
        <ComponentError page="/" message={resresource} />
      </>
    )
  }

  if(typeof(rescomponents) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        <ComponentError page={`/projects/budget`} message={rescomponents} />
      </>
    )
  }
  
  if(typeof(projects)==='string') 
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-red-500 text-center text-lg">{projects}</h1>
        </div> */}
        <ComponentError page="/projects/budget" message={projects} />
      </>
    )
  
  if(typeof(budgets)==='string') 
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-red-500 text-center text-lg">{budgets}</h1>
        </div> */}
        <ComponentError page="/projects/budget" message={budgets} />
      </>
    )

  if(typeof(catalogs)==='string') 
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
        </div>         */}
        <ComponentError page="/projects/budget" message={catalogs} />
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

  const result = {
    permission: rescomponents[0]?.permission ?? {},
    components: rescomponents.map((item: IAllComponentsByROUTESAndRESOURCESAndROLFULL) => item.component)
  };

  return(
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <ContainerBudgetClient optConditionsFilter={optConditions} projects={projects} 
        token={token} user={user} budgets={budgets} optProjectsFilter={optProjects} />
    </>
  )
}