import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import { getProjects } from "@/app/api/routeProjects";
import { Project } from "@/interfaces/Projects";
import { Options } from "@/interfaces/Common";
import { NextUiProviders } from "@/components/NextUIProviderComponent";
import Navigation from "@/components/navigation/Navigation";
import Selectize from "@/components/Selectize";
import Header from "@/components/HeaderPage";

import { GetCost, GetCosts } from "@/app/api/routeCost";
import ExpenseClient from "@/components/expenses/ExpenseClient";
import { Expense } from "@/interfaces/Expenses";
import NavTabExpense from "@/components/expenses/NavTabExpense";
import { CostCenter } from "@/interfaces/CostCenter";
import { getCostCenters } from "@/app/api/routeCostCenter";
import { Glossary } from "@/interfaces/Glossary";
import { getGlossaries } from "@/app/api/routeGlossary";
import { Provider } from "@/interfaces/Providers";
import { getProviders } from "@/app/api/routeProviders";
import { getUsers } from "@/app/api/routeUser";

export default async function Page({ params }: { params: { id: string }}){
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let cost: Expense;
  try {
    cost = await GetCost(token, params.id);
    if(typeof(cost) === "string")
      return <h1 className="text-center text-red-500">{cost}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos del Costo!!</h1>  
  }

  let costs: Expense[];
  try {
    costs = await GetCosts(token);
    if(typeof(costs) === "string")
      return <h1 className="text-center text-red-500">{costs}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos de los costos!!</h1>  
  }

  let options: Options[] = [];

  if(costs.length <= 0){
    return <h1 className="text-center text-red-500">Error al obtener costos...</h1>
  }

  costs.map((cos) => {
    options.push({
      value: cos._id,
      label: cos.description,
    })
  })

  let costcenters: CostCenter[];
  try {
    costcenters = await getCostCenters(token);
    if(typeof(costcenters)==='string'){
      return <h1 className="text-center text-lg text-red-500">{costcenters}</h1>
    }    
  } catch (error) {
    return <h1 className="text-center text-lg text-red-500">Error al consultar los centros de costos!!</h1>
  }

  const optCostCenter:Options[]= [];
  costcenters.map((costcenter) => {
    optCostCenter.push({
      label: costcenter.name,
      value: costcenter._id
    });
  });

  let glossaries: Glossary[];
  try {
    glossaries = await getGlossaries(token);
    if(typeof(glossaries)==='string'){
      return <h1 className="text-center text-lg text-red-500">{glossaries}</h1>
    }    
  } catch (error) {
    return <h1 className="text-center text-lg text-red-500">Error al consultar los catalogos!!</h1>
  }

  const optGlossaries:Options[]= [];
  glossaries.map((glossary) => {
    optGlossaries.push({
      label: glossary.name,
      value: glossary._id
    });
  });

  let projects: Project[];
  try {
    projects = await getProjects(token);
    if(typeof(projects)==='string'){
      return <h1 className="text-center text-lg text-red-500">{projects}</h1>
    }    
  } catch (error) {
    return <h1 className="text-center text-lg text-red-500">Error al consultar los proyectos!!</h1>
  }

  const optProjects:Options[]= [];
  projects.map((project) => {
    optProjects.push({
      label: project.title,
      value: project._id
    });
  });

  let responsibles: UsrBack[];
  try {
    responsibles = await getUsers(token);
    if(typeof(responsibles)==='string'){
      return <h1 className="text-center text-lg text-red-500">{responsibles}</h1>
    }    
  } catch (error) {
    return <h1 className="text-center text-lg text-red-500">Error al consultar los usuarios!!</h1>
  }

  const optResponsibles:Options[]= [];
  responsibles.map((responsible) => {
    optResponsibles.push({
      label: responsible.name,
      value: responsible._id
    });
  });

  let providers: Provider[];
  try {
    providers = await getProviders(token);
    if(typeof(providers)==='string'){
      return <h1 className="text-center text-lg text-red-500">{providers}</h1>
    }    
  } catch (error) {
    return <h1 className="text-center text-lg text-red-500">Error al consultar los proveedores!!</h1>
  }

  const optProviders:Options[]= [];
  providers.map((provider) => {
    optProviders.push({
      label: provider.name,
      value: provider._id
    });
  });

  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <Header title={cost.subtotal.toString()} previousPage="/expenses">
          <Selectize options={options} routePage="expenses" subpath="/profile" />
        </Header>
        <NavTabExpense idExp={params.id} tab="1" />
        <NextUiProviders>
          <ExpenseClient expense={cost} id={params.id} token={token} 
              user={user._id} optCostCenter={optCostCenter} optGlossaries={optGlossaries} 
              optProjects={optProjects} optProviders={optProviders} optResponsibles={optResponsibles}
          />
        </NextUiProviders>
      </div>
    </>
  )
}